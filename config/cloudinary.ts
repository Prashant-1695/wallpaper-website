// app/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function getCloudinaryImages() {
  const result = await cloudinary.api.resources_by_asset_folder("Walls", {
    resource_type: "image",
    type: "upload",
    max_results: 500,
  });

  return result.resources;
}

export async function getCloudinaryImageById(publicId: string) {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: "image",
      type: "upload",
    });

    return result;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

// app/lib/cloudinary.ts

export async function getCloudinaryImageByFilename(filename: string) {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: "Walls", // Your folder name
      max_results: 1,
      expression: `filename:${filename}*`, // Using wildcard to match partial names
    });

    // Return first match or null
    return result.resources.length > 0 ? result.resources[0] : null;
  } catch (error) {
    console.error("Error fetching image by filename:", error);
    return null;
  }
}

// Alternative using search API for more precise matching
export async function searchCloudinaryImageByFilename(filename: string) {
  try {
    const result = await cloudinary.search
      .expression(`resource_type:image AND filename:${filename}`)
      .execute();

    return result.resources.length > 0 ? result.resources[0] : null;
  } catch (error) {
    console.error("Error searching image by filename:", error);
    return null;
  }
}
