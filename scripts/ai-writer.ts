/**
 * HINODE EPOXY - AI Article Writer (Scaffold)
 * 
 * This script is designed to run as a Cron Job (daily at 09:00 WIB)
 * via GitHub Actions or Vercel Cron.
 * 
 * Flow:
 * 1. Fetch target keyword from the keyword list
 * 2. Generate article content using Google Gemini API
 * 3. Validate the content (H1, meta description, structure)
 * 4. Publish to CMS via API
 * 5. Request Google indexing
 * 
 * Usage:
 *   GEMINI_API_KEY=your_key npx ts-node scripts/ai-writer.ts
 */

// ============= CONFIGURATION =============

const CONFIG = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000",
  systemPrompt: `Kamu adalah penulis konten profesional untuk HINODE EPOXY, perusahaan jasa aplikator lantai epoxy yang melayani wilayah Jabodetabek, Jawa Barat, dan Banten.

ATURAN KONTEN:
1. Gunakan bahasa Indonesia yang profesional namun mudah dipahami
2. Setiap artikel WAJIB memiliki:
   - Judul H1 yang mengandung keyword utama
   - Meta description (150-160 karakter)
   - Minimal 3 heading H2
   - Minimal 800 kata
   - Internal link ke halaman layanan HINODE EPOXY
   - Call-to-Action yang mendorong pembaca menghubungi via WhatsApp
3. Fokus pada solusi dan edukasi, bukan hard-selling
4. Sertakan data/fakta yang relevan
5. Gunakan format yang SEO-friendly

INFORMASI PERUSAHAAN:
- Nama: HINODE EPOXY
- Layanan: Epoxy Coating, Self-Leveling, Heavy Duty
- Area: Jabodetabek, Jawa Barat, Banten
- WhatsApp: +6281287370601
- Website: hinodeepoxy.com`,
};

// ============= KEYWORD LIST =============

const KEYWORD_LIST = [
  "jasa epoxy lantai jakarta",
  "harga epoxy lantai per meter 2025",
  "kontraktor epoxy lantai pabrik",
  "epoxy lantai gudang terbaik",
  "perbedaan epoxy coating dan self leveling",
  "tips memilih jasa epoxy lantai",
  "epoxy lantai rumah sakit anti bakteri",
  "lantai epoxy untuk cold storage",
  "cara merawat lantai epoxy",
  "keunggulan lantai epoxy vs keramik",
  "epoxy lantai showroom mobil",
  "harga epoxy self leveling 2025",
  "epoxy lantai anti slip untuk parkiran",
  "lantai epoxy untuk cafe dan restoran",
  "epoxy heavy duty untuk pabrik",
  "biaya aplikasi epoxy lantai bekasi",
  "epoxy lantai tangerang banten",
  "jasa epoxy lantai bogor depok",
  "epoxy lantai decorative flake chip",
  "metallic epoxy floor indonesia",
];

// ============= TYPES =============

interface ArticleData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  metaDescription: string;
}

// ============= FUNCTIONS =============

function getNextKeyword(): string {
  // In production, track used keywords in a database
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return KEYWORD_LIST[dayOfYear % KEYWORD_LIST.length];
}

async function generateArticle(keyword: string): Promise<ArticleData> {
  console.log(`🤖 Generating article for keyword: "${keyword}"`);

  const prompt = `Buatkan artikel SEO-friendly tentang topik: "${keyword}"

Format output dalam JSON:
{
  "title": "Judul artikel (mengandung keyword)",
  "excerpt": "Ringkasan 1-2 kalimat",
  "content": "Konten artikel lengkap dalam format Markdown",
  "category": "Kategori artikel (Edukasi/Tips & Trik/Info Harga/Studi Kasus)",
  "metaDescription": "Meta description 150-160 karakter"
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${CONFIG.geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: CONFIG.systemPrompt },
                { text: prompt },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No content generated from Gemini API");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("❌ Error generating article:", error);
    throw error;
  }
}

function validateArticle(article: ArticleData): boolean {
  const errors: string[] = [];

  if (!article.title || article.title.length < 10) {
    errors.push("Title is too short or missing");
  }
  if (!article.content || article.content.split(" ").length < 300) {
    errors.push("Content is too short (minimum 300 words)");
  }
  if (!article.content.includes("## ")) {
    errors.push("Content must include H2 headings");
  }
  if (!article.metaDescription || article.metaDescription.length > 160) {
    errors.push("Meta description missing or too long");
  }
  if (!article.excerpt) {
    errors.push("Excerpt is missing");
  }

  if (errors.length > 0) {
    console.error("❌ Validation failed:", errors);
    return false;
  }

  console.log("✅ Article validated successfully");
  return true;
}

async function publishArticle(article: ArticleData): Promise<boolean> {
  console.log(`📤 Publishing article: "${article.title}"`);

  try {
    const response = await fetch(`${CONFIG.apiBaseUrl}/api/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Publish failed: ${error.error}`);
    }

    console.log("✅ Article published successfully");
    return true;
  } catch (error) {
    console.error("❌ Error publishing article:", error);
    return false;
  }
}

// ============= MAIN =============

async function main() {
  console.log("====================================");
  console.log("🚀 HINODE EPOXY AI Writer - Starting");
  console.log(`📅 Date: ${new Date().toISOString()}`);
  console.log("====================================\n");

  try {
    // 1. Get keyword
    const keyword = getNextKeyword();
    console.log(`🎯 Target keyword: "${keyword}"\n`);

    // 2. Generate article
    const article = await generateArticle(keyword);
    console.log(`📝 Title: "${article.title}"\n`);

    // 3. Validate
    if (!validateArticle(article)) {
      console.error("❌ Article validation failed. Aborting.");
      process.exit(1);
    }

    // 4. Publish
    const published = await publishArticle(article);
    if (!published) {
      console.error("❌ Article publishing failed. Aborting.");
      process.exit(1);
    }

    // 5. Request indexing (placeholder)
    console.log("\n📊 Google Indexing: Skipped (requires Search Console API setup)");

    console.log("\n====================================");
    console.log("✅ AI Writer completed successfully!");
    console.log("====================================");
  } catch (error) {
    console.error("\n❌ AI Writer failed:", error);
    process.exit(1);
  }
}

main();
