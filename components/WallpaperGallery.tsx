"use client";

import { useEffect, useState } from "react";
import WallpaperCard from "./wallpaper-card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Image {
  public_id: string;
  display_name: string;
  secure_url: string;
  height: number;
  width: number;
}

const WallpaperGallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalImages, setTotalImages] = useState(0);
  const limit = 24; // Number of images per page

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const fetchImages = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/images?page=${pageNum}&limit=${limit}`);

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to fetch images");
      }

      const data = await response.json();
      setImages(data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getTotalImages = async () => {
    try {
      const res = await fetch("/api/getTotalImages");
      if (!res.ok) {
        throw new Error("Failed to fetch total images count");
      }
      const data = await res.json();
      setTotalImages(data);
    } catch (err) {
      console.error("Failed to fetch total images:", err);
    }
  };

  useEffect(() => {
    getTotalImages();
    fetchImages(page);
  }, [page]);

  const totalPages = Math.ceil(totalImages / limit);
  const isLastPage = page >= totalPages;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/?page=${newPage}`);
    }
  };

  if (loading && !images.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
      <h2 className="text-2xl font-semibold text-red-500 mb-4">Error loading wallpapers</h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="flex gap-3 justify-center">
      <button
      onClick={() => fetchImages(page)}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
      >
      Retry
      </button>
      <Link
      href="/"
      className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-all"
      >
      Go Home
      </Link>
      </div>
      </div>
    );
  }

  if (!images.length && !loading) {
    return (
      <div className="text-center py-10">
      <h2 className="text-2xl font-semibold mb-4">No wallpapers found</h2>
      <p className="text-gray-600 mb-6">We couldn't find any wallpapers matching your criteria.</p>
      <div className="flex gap-3 justify-center">
      <button
      onClick={() => router.back()}
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
      >
      Go Back
      </button>
      <Link
      href="/"
      className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-all"
      >
      Go Home
      </Link>
      </div>
      </div>
    );
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {images.map((image) => (
      <WallpaperCard
      key={image.public_id}
      fileName={image.display_name || image.public_id}
      imagePath={image.secure_url}
      publicId={image.public_id}
      height={image.height}
      width={image.width}
      />
    ))}
    </div>

    {totalPages > 1 && (
      <div className="flex justify-between items-center mt-8">
      <button
      onClick={() => handlePageChange(page - 1)}
      disabled={page === 1}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
      Previous
      </button>

      <span className="text-gray-700">
      Page {page} of {totalPages}
      </span>

      <button
      onClick={() => handlePageChange(page + 1)}
      disabled={isLastPage}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
      Next
      </button>
      </div>
    )}
    </main>
  );
};

export default WallpaperGallery;
