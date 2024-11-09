"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      {/* Header Image Section */}
      <div className="w-full h-48 relative bg-gradient-to-r from-blue-900 to-black">
        <div className="absolute inset-0 bg-black/50"></div>
        <Image
          src="/header/banner.jpg"
          alt="Anime Header"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Logo on Bottom Left Corner */}
        <div className="absolute bottom-0 left-0 p-4">
          <Link
            href="/"
            className="text-5xl font-bold text-white tracking-wider"
          >
            Anime<span className="text-blue-500">Wall</span>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2 rounded-md transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden bg-black">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="text-gray-300 hover:text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Home
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
