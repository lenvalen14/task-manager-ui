"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function HeaderSection() {
  return (
    <header className="bg-gradient-to-r from-white to-gray-50 border-b-2 border-black shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative">
            <Image
              src="/logo.svg"
              alt="Task Manager Logo"
              width={76}
              height={60}
              className="w-19 h-15 object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-black font-semibold hover:text-blue-600 transition-all duration-200 relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link href="/pricing" className="text-black font-semibold hover:text-blue-600 transition-all duration-200 relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link href="/about" className="text-black font-semibold hover:text-blue-600 transition-all duration-200 relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link href="/contact" className="text-black font-semibold hover:text-blue-600 transition-all duration-200 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-6">
          <Link href="/auth/login" className="text-black font-semibold hover:text-blue-600 transition-all duration-200 relative group">
            Sign In
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link 
            href="/auth/register" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold px-8 py-3 rounded-xl border-2 border-black shadow-lg transform hover:scale-105 hover:shadow-xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
