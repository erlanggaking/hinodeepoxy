import { NextRequest, NextResponse } from "next/server";
import portfolioData from "@/data/portfolio.json";

// GET /api/portfolio - List portfolio projects, filterable by location
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
