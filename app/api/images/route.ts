// app/api/images/route.ts
import { NextResponse } from "next/server";
import { getCloudinaryImages } from "@/config/cloudinary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const images = await getCloudinaryImages();
  const paginatedImages = images.slice(offset, offset + limit);

  return NextResponse.json(paginatedImages, {
    headers: {
      "Cache-Control": "s-maxage=10, stale-while-revalidate=59", // Enable revalidation
    },
  });
}
