import WallpaperCard from "@/components/wallpaper-card";
import { getCloudinaryImages } from "@/config/cloudinary";

export default async function Home() {
  try {
    const walls = await getCloudinaryImages();

    if (!walls || walls.length === 0) {
      return (
        <main className="px-5 md:px-10 xl:px-32 max-w-[1600px]">
          <p className="text-center text-gray-600">No wallpapers found.</p>
        </main>
      );
    }
    // console.log(walls[0]);

    return (
      <main className="px-5 md:px-10 xl:px-32 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 animate-fadeIn">
          {walls.map((wall) => {
            return (
              <WallpaperCard
                key={wall.public_id}
                fileName={wall.display_name}
                imagePath={wall.secure_url}
                publicId={wall.public_id}
              />
            );
          })}
        </div>
      </main>
    );
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to load wallpapers"
    );
  }
}
