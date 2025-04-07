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
  aspectRatio?: string;
}

const getResolutionTag = (width: number, height: number) => {
  if (width >= 7680 && height >= 4320) return "8K";
  if (width >= 3840 && height >= 2160) return "4K";
  if (width >= 2560 && height >= 1440) return "1440p";
  if (width >= 1920 && height >= 1080) return "1080p";
  return `${width}x${height}`;
};

const WallpaperCard = ({
  imagePath,
  publicId,
  fileName,
  height,
  width,
  aspectRatio = "aspect-video",
}: WallpaperCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Truncate filename if too long
  const displayName = fileName
  ? fileName.length > 20
  ? `${fileName.substring(0, 20)}...`
  : fileName
  : "";

  return (
    <Link
    href={`/wp/${publicId}`}
    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl"
    aria-label={`View wallpaper ${displayName}`}
    >
    <div
    className="relative group rounded-xl overflow-hidden bg-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
    {/* Loading Skeleton */}
    {isLoading && (
      <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${aspectRatio}`}>
      <div className="w-10 h-10 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )}

    {/* Main Image Container */}
    <div className={`relative ${aspectRatio} w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]`}>
    <CldImage
    src={imagePath}
    width={600}  // Increased for better quality
    height={Math.round(600 * (height/width))}
    alt={fileName || "Wallpaper"}
    className={`w-full h-full object-cover transition-opacity duration-500 ${
      isLoading ? "opacity-0" : "opacity-100"
    }`}
    onLoad={() => setIsLoading(false)}
    onError={() => setIsLoading(false)}
    loading="lazy"
    quality={80}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    </div>

    {/* Gradient Overlay */}
    <div
    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ${
      isHovered ? "opacity-100" : "opacity-90 md:opacity-70"
    }`}
    />

    {/* Content Overlay */}
    <div className="absolute inset-0 p-4 flex flex-col justify-between">
    {/* Top Actions */}
    <div
    className={`flex justify-end gap-2 transition-opacity duration-300 ${
      isHovered ? "opacity-100" : "opacity-0"
    }`}
    >
    <button
    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all"
    aria-label="Add to favorites"
    onClick={(e) => e.preventDefault()}
    >
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
    className="text-white hover:text-red-400 transition-colors"
    >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
    </button>
    </div>

    {/* Bottom Info */}
    <div className="mt-auto">
    {/* File Name and Resolution */}
    <div className="flex justify-between items-end">
    {displayName && (
      <p className="text-white font-medium text-sm md:text-base truncate max-w-[70%]">
      {displayName}
      </p>
    )}

    <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
    {getResolutionTag(width, height)}
    </span>
    </div>
    </div>
    </div>
    </div>
    </Link>
  );
};

export default WallpaperCard;
