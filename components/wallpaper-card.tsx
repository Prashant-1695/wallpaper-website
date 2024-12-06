"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useState } from "react";

interface WallpaperCardProps {
  imagePath: string;
  publicId: string;
  fileName?: string;
  height: number;
  width: number;
}

const getResolutionTag = (width: number, height: number) => {
  if (width >= 7680 && height >= 4320) return "8K";
  if (width >= 3840 && height >= 2160) return "4K";
  if (width >= 1920 && height >= 1080) return "1080p";
  return `${width}x${height}`;
};

const WallpaperCard = ({
  imagePath,
  publicId,
  fileName,
  height,
  width,
}: WallpaperCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link href={`/wp/${publicId}`}>
      <div
        className="relative group rounded-xl overflow-hidden bg-gray-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-8 h-8 border-4 border-transparent border-t-blue-500 border-t-4 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Main Image Container with Zoom Effect */}
        <div className="relative aspect-video w-full transition-transform duration-300 transform group-hover:scale-105">
          <CldImage
            src={imagePath}
            width={400}
            height={300}
            alt="Wallpaper"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>

        {/* Overlay that appears on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : ""
          }`}
        >
          {/* Display Name */}
          {fileName && (
            <p
              className={`absolute p-5 bottom-0 left-0 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-100 md:opacity-0"
              }`}
            >
              {fileName.length > 20
                ? fileName.substring(0, 20) + " ..."
                : fileName}
            </p>
          )}

          {/* Resolution Tag */}
          <div
            className={`absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-100 md:opacity-0"
            }`}
          >
            {getResolutionTag(width, height)}
          </div>

          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors">
              {/* Heart Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WallpaperCard;
