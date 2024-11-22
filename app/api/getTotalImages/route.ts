import { NextResponse } from "next/server";
import { getCloudinaryImages } from "@/config/cloudinary";

export async function GET() {
    const images = await getCloudinaryImages();
    return NextResponse.json(images.length, {
        headers: {
            "Cache-Control": "s-maxage=10, stale-while-revalidate=59"
        },
    });
}