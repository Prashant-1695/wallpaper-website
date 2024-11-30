"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black shadow-md">
      {/* Logo at the top left corner */}
      <div className="p-4 bg-black">
        <Link
          href="/"
          className="font-bold text-white tracking-wider text-3xl sm:text-4xl lg:text-5xl"
        >
          Anime<span className="text-blue-500">Wall</span>
        </Link>
      </div>

      {/* Navigation Bar */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Will add additional navigation links here in the future */}
            <div className="hidden sm:block"></div>
          </div>
        </div>
      </nav>
    </header>
  );
}
