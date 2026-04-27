import { NextRequest, NextResponse } from "next/server";
import articles from "@/data/articles.json";

// GET /api/articles - List all articles
export async function GET() {
  return NextResponse.json({
    success: true,
    data: articles,
    total: articles.length,
  });
}

// POST /api/articles - Create a new article (from AI Writer)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const required = ["title", "content", "excerpt", "category"];
    const missing = required.filter(field => !body[field]);
    
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate SEO elements
    if (!body.content.includes("## ")) {
      return NextResponse.json(
        { success: false, error: "Content must include at least one H2 heading for SEO" },
        { status: 400 }
      );
    }

    // In a real implementation, this would save to a CMS (Sanity/Strapi)
    const newArticle = {
      slug: body.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, ""),
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      date: new Date().toISOString().split("T")[0],
      readTime: `${Math.ceil(body.content.split(" ").length / 200)} menit`,
    };

    return NextResponse.json({
      success: true,
      message: "Article created successfully",
      data: newArticle,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
