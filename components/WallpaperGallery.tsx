"use client";

import { useEffect, useState } from 'react';
import WallpaperCard from './wallpaper-card';

const WallpaperGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
      fileName={image.display_name}
      imagePath={image.secure_url}
      publicId={image.public_id}
      />
    ))}
    </div>
    </main>
  );
};

export default WallpaperGallery;
