import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import path from "path";

// GET /api/images - List all uploaded images
export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");
    const categories = await readdir(imagesDir, { withFileTypes: true });

    const images: Array<{
      filename: string;
      url: string;
      category: string;
      size: number;
    }> = [];

    for (const cat of categories) {
      if (!cat.isDirectory()) continue;

      const catDir = path.join(imagesDir, cat.name);
      const files = await readdir(catDir);

      for (const file of files) {
        if (file.startsWith(".")) continue;
        const filePath = path.join(catDir, file);
        const fileStat = await stat(filePath);

        images.push({
          filename: file,
          url: `/images/${cat.name}/${file}`,
          category: cat.name,
          size: fileStat.size,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: images,
      total: images.length,
    });
  } catch {
    return NextResponse.json({
      success: true,
      data: [],
      total: 0,
    });
  }
}
