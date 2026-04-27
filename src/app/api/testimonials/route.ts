import { NextRequest, NextResponse } from "next/server";
import testimonialsData from "@/data/testimonials.json";
import fs from "fs/promises";
import path from "path";

// GET /api/testimonials - List all testimonials
export async function GET() {
  return NextResponse.json({
    success: true,
    data: testimonialsData,
    total: testimonialsData.length,
  });
}

// POST /api/testimonials - Create new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, company, text, rating } = body;

    if (!name || !text) {
      return NextResponse.json(
        { success: false, error: "Name and testimonial text are required" },
        { status: 400 }
      );
    }

    const newTestimonial = {
      id: String(Date.now()),
      name,
      role: role || "Klien",
      company: company || "",
      text,
      rating: parseInt(rating) || 5,
      date: new Date().toISOString().split('T')[0],
    };

    const updatedData = [newTestimonial, ...testimonialsData];
    
    // Save to JSON file
    const filePath = path.join(process.cwd(), "src/data/testimonials.json");
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Testimonial successfully added",
      data: newTestimonial,
    });
  } catch (error) {
    console.error("Testimonial creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
