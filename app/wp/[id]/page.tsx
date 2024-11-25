import {
  getCloudinaryImages,
  getCloudinaryImageById,
} from "@/config/cloudinary";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function WallpaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const wall = await getCloudinaryImageById(id);
  const images = await getCloudinaryImages(); // Fetch all images

  if (!wall) {
    notFound();
  }

  // Find the current image index
  const currentIndex = images.findIndex(
    (image) => image.public_id === wall.public_id
  );
  const previousImage = currentIndex > 0 ? images[currentIndex - 1] : null;
  const nextImage =
    currentIndex < images.length - 1 ? images[currentIndex + 1] : null;

  // TODO: Hardcoding for now! to be fetched from database
  const likes = Math.ceil(Math.random() * 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto relative">
        <Image
          src={wall.secure_url}
          alt="Wallpaper"
          width={wall.width}
          height={wall.height}
          className="rounded-lg shadow-lg"
          priority
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Wallpaper Details</h1>
          <p className="my-2">Name: {wall.display_name}</p>
          <p>
            Resolution: {wall.width} x {wall.height}
          </p>
          <div className="mt-4">
            <p className="text-lg font-semibold">Likes: {likes}</p>
          </div>
          <a
            href={wall.secure_url}
            download
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 relative z-10" // Add z-10 to bring it above other elements
          >
            Download Wallpaper
          </a>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-center">
          {previousImage && (
            <Link
              href={`/wp/${previousImage.public_id}`}
              className="absolute top-1/4 sm:top-1/3 left-4 transform -translate-y-1/2 text-4xl text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
            >
              &lt;
            </Link>
          )}
          {nextImage && (
            <Link
              href={`/wp/${nextImage.public_id}`}
              className="absolute top-1/4 sm:top-1/3 right-4 transform -translate-y-1/2 text-4xl text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
            >
              &gt;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
