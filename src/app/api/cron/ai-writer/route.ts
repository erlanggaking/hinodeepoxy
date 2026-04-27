import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
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

export async function GET(request: NextRequest) {
  // 1. Verify Cron Secret
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!OPENROUTER_API_KEY) {
    return NextResponse.json({ success: false, error: "OPENROUTER_API_KEY not configured" }, { status: 500 });
  }

  try {
    // 2. Select Keyword
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const keyword = KEYWORD_LIST[dayOfYear % KEYWORD_LIST.length];

    console.log(`🤖 Triggering OpenRouter AI Writer for: ${keyword}`);

    const prompt = `Buatkan artikel SEO-friendly tentang topik: "${keyword}"

Format output harus valid JSON:
{
  "title": "Judul artikel (mengandung keyword)",
  "excerpt": "Ringkasan 1-2 kalimat",
  "content": "Konten artikel lengkap dalam format Markdown",
  "category": "Kategori artikel (Edukasi/Tips & Trik/Info Harga/Studi Kasus)",
  "metaDescription": "Meta description 150-160 karakter",
  "featuredImage": "PILIH URL GAMBAR DARI UNSPLASH bertema industrial/flooring. Format: https://images.unsplash.com/[PHOTO_ID]?q=80&w=800"
}`;

    // 3. Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "HINODE EPOXY AI Writer",
      },
      body: JSON.stringify({
        model: "google/gemini-flash-1.5", // Versi stabil & cepat
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`OpenRouter Error: ${JSON.stringify(err)}`);
    }

    const data = await response.json();
    const article = JSON.parse(data.choices[0].message.content);

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
      message: "Article generated via OpenRouter successfully",
      article: { title: newArticle.title, slug: newArticle.slug }
    });

  } catch (error: any) {
    console.error("OpenRouter AI Writer Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
