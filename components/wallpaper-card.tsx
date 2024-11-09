"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useState } from "react";

interface WallpaperCardProps {
  imagePath: string;
  publicId: string;
  fileName: string;
}

const WallpaperCard = ({
  imagePath,
  publicId,
  fileName,
}: WallpaperCardProps) => {
  // console.log(fileName);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/wp/${publicId}`}>
      <div
        className="relative group rounded-xl overflow-hidden bg-gray-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image Container */}
        <div className="relative aspect-video w-full">
          <CldImage
            src={imagePath}
            width={400}
            height={300}
            alt="Wallpaper"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay that appears on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : ""
          }`}
        >
          <p className="absolute p-5 bottom-0 left-0">
            {fileName.length > 25
              ? fileName.substring(0, 25) + " ..."
              : fileName || "Not available"}
          </p>

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
            <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors">
              {/* Bookmark Icon */}
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
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WallpaperCard;
