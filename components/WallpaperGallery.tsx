"use client";

import { useEffect, useState } from "react";
import WallpaperCard from "./wallpaper-card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const WallpaperGallery = () => {
  interface Image {
    public_id: string;
    display_name: string;
    secure_url: string;
    height: number;
    width: number;
  }

  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalImages, setTotalImages] = useState(0);
  const limit = 24; // Number of images per page

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const fetchImages = async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/images?page=${pageNum}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImagesLength = async () => {
    try {
      const res = await fetch("/api/getTotalImages");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setTotalImages(data);
    } catch (error) {
      console.error("Failed to fetch total images:", error);
    }
  };
  useEffect(() => {
    getImagesLength();
  }, []);

  const isLastPage = totalImages <= page * limit;

  useEffect(() => {
    fetchImages(page);
  }, [page]); 

  const handleNextPage = () => router.push(`/?page=${page + 1}`);
  const handlePreviousPage = () => {
    const prevPage = Math.max(page - 1, 1);
    router.push(`/?page=${prevPage}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <>
        <p className="text-3xl font-semibold">No wallpapers found.</p>

        <div className="flex gap-3 flex-row mt-4">
          <p
            onClick={router.back}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer transition-all duration-300"
          >
            {/* TODO: Add icons */}
            Go back
          </p>
          <Link
            href={"/"}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <main className="px-5 md:px-10 xl:px-32 max-w-[1600px]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 animate-fadeIn">
        {images.map((image) => (
          <WallpaperCard
            key={image.public_id}
            // TODO: USE NAME FROM DATABASE
            fileName={image.public_id}
            imagePath={image.secure_url}
            publicId={image.public_id}
            height={image.height}
            width={image.width}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-md mr-2 disabled:bg-blue-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={isLastPage}
          className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-blue-300"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default WallpaperGallery;
