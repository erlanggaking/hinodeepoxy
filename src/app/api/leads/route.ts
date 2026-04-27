import { NextRequest, NextResponse } from "next/server";

// POST /api/leads - Track WhatsApp click events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const lead = {
      id: Date.now().toString(),
      source: body.source || "unknown",
      page: body.page || "/",
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "",
    };

    // In production, this would save to a database
    console.log("[LEAD TRACKED]", lead);

    return NextResponse.json({
      success: true,
      message: "Lead tracked successfully",
      data: lead,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
