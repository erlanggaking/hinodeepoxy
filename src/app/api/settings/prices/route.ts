import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import servicesData from "@/data/services.json";

// GET /api/settings/prices
export async function GET() {
  return NextResponse.json({ success: true, data: servicesData });
}

// POST /api/settings/prices
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { coating, selfLeveling, heavyDuty } = body;

    if (!coating || !selfLeveling || !heavyDuty) {
      return NextResponse.json({ success: false, error: "Missing price data" }, { status: 400 });
    }

    const updatedData = {
      coating: { ...servicesData.coating, pricePerM2: parseInt(coating) },
      selfLeveling: { ...servicesData.selfLeveling, pricePerM2: parseInt(selfLeveling) },
      heavyDuty: { ...servicesData.heavyDuty, pricePerM2: parseInt(heavyDuty) },
    };

    const filePath = path.join(process.cwd(), "src/data/services.json");
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Harga paket berhasil diperbarui!",
      data: updatedData
    });
  } catch (error: any) {
    console.error("Price update error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
