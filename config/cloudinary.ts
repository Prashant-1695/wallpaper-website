// config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to get all Cloudinary images from the "Walls" folder
export async function getCloudinaryImages() {
  try {
    const result = await cloudinary.api.resources_by_asset_folder("Walls", {
      resource_type: "image",
      type: "upload",
      max_results: 500,
    });

    return result.resources.map((resource) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      display_name: resource.original_filename,
      width: resource.width,
      height: resource.height,
    }));
  } catch (error) {
    console.error("Error fetching Cloudinary images:", error);
    return [];
  }
}

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
