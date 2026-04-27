import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;

const SYSTEM_PROMPT = `Kamu adalah penulis konten profesional untuk HINODE EPOXY, perusahaan jasa aplikator lantai epoxy yang melayani wilayah Jabodetabek, Jawa Barat, dan Banten.

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
- Website: hinodeepoxy.com`;

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

// List of models to try in order of preference
const MODELS_TO_TRY = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro",
  "gemini-pro"
];

export async function GET(request: NextRequest) {
  // 1. Verify Cron Secret
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ success: false, error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  try {
    // 2. Select Keyword
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const keyword = KEYWORD_LIST[dayOfYear % KEYWORD_LIST.length];

    console.log(`🤖 Triggering AI Writer for: ${keyword}`);

    // 3. Generate Content with Fallback Models
    let lastError = null;
    let article = null;

    const prompt = `Buatkan artikel SEO-friendly tentang topik: "${keyword}"

Format output harus valid JSON:
{
  "title": "Judul artikel (mengandung keyword)",
  "excerpt": "Ringkasan 1-2 kalimat",
  "content": "Konten artikel lengkap dalam format Markdown",
  "category": "Kategori artikel (Edukasi/Tips & Trik/Info Harga/Studi Kasus)",
  "metaDescription": "Meta description 150-160 karakter",
  "featuredImage": "PILIH URL GAMBAR DARI UNSPLASH yang berbeda setiap kali bertema industrial atau flooring. Format: https://images.unsplash.com/[PHOTO_ID]?q=80&w=800"
}`;

    for (const model of MODELS_TO_TRY) {
      try {
        console.log(`📡 Trying model: ${model}...`);
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: SYSTEM_PROMPT + "\n\n" + prompt }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
            }),
          }
        );

        if (!geminiRes.ok) {
          const err = await geminiRes.json();
          throw new Error(`Model ${model} failed: ${err.error?.message}`);
        }

        const data = await geminiRes.json();
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        article = JSON.parse(text);
        
        console.log(`✅ Success with model: ${model}`);
        break; // Stop if successful
      } catch (e: any) {
        console.warn(`⚠️ Model ${model} failed, trying next... Error: ${e.message}`);
        lastError = e;
      }
    }

    if (!article) {
      throw new Error(`All models failed. Last error: ${lastError?.message}`);
    }

    // 4. Save to JSON
    const articlesPath = path.join(process.cwd(), "src/data/articles.json");
    const currentArticles = JSON.parse(await fs.readFile(articlesPath, "utf-8"));
    
    const newArticle = {
      ...article,
      slug: article.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-'),
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.ceil(article.content.split(" ").length / 200)} min read`
    };

    const updatedArticles = [newArticle, ...currentArticles];
    await fs.writeFile(articlesPath, JSON.stringify(updatedArticles, null, 2));

    return NextResponse.json({
      success: true,
      message: "Article generated successfully",
      article: { title: newArticle.title, slug: newArticle.slug }
    });

  } catch (error: any) {
    console.error("AI Writer Final Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
