import { NextRequest, NextResponse } from "next/server";
import portfolioData from "@/data/portfolio.json";
import fs from "fs/promises";
import path from "path";

// GET /api/portfolio - List portfolio projects, filterable
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const type = searchParams.get("type");

  let filteredData = [...portfolioData];

  if (location) {
    filteredData = filteredData.filter((p) =>
      p.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (type) {
    filteredData = filteredData.filter((p) => p.type === type);
  }

  return NextResponse.json({
    success: true,
    data: filteredData,
    total: filteredData.length,
    filters: { location, type },
  });
}

// POST /api/portfolio - Create new portfolio project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, location, area, type, description, duration } = body;

    if (!title || !location) {
      return NextResponse.json(
        { success: false, error: "Title and location are required" },
        { status: 400 }
      );
    }

    const newProject = {
      id: String(Date.now()),
      title,
      location,
      area: area || "N/A",
      type: type || "coating",
      description: description || "",
      duration: duration || "N/A",
      year: new Date().getFullYear().toString(),
    };

    const updatedData = [newProject, ...portfolioData];
    
    // Save to JSON file
    const filePath = path.join(process.cwd(), "src/data/portfolio.json");
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Portfolio project successfully added",
      data: newProject,
    });
  } catch (error) {
    console.error("Portfolio creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create portfolio project" },
      { status: 500 }
    );
  }
}
