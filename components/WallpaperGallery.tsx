"use client";

import { useEffect, useState } from "react";
import WallpaperCard from "./wallpaper-card";

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
  const [page, setPage] = useState(1);
  const limit = 24; // Number of images per page

  const fetchImages = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/images?page=${page}&limit=${limit}`);
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

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!images.length) {
    return <p>No wallpapers found.</p>;
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
          className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-blue-300"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default WallpaperGallery;
