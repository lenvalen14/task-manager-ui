"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { useGetUnreadCountQuery } from "@/services/notificationService"

export const selectUser = (state: RootState) => state.user

export function HeaderSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector(selectUser)
  const isAuthenticated = !!user?.access_token
  const { data: unreadCountData } = useGetUnreadCountQuery()
  const unreadCount = unreadCountData?.data.unread_count ?? 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-xl' 
        : 'bg-transparent'
    }`}>
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

        <nav className="hidden md:flex items-center gap-x-16">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#feature" className="nav-link">Features</a>
          <a href="#feedback" className="nav-link">Feedback</a>
        </nav>

        {/* Auth / Dashboard Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 relative">
                  <Link href="/dashboard/notifications">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute right-0 top-0 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </button>
                <Link
                  href="/dashboard"
                  className="btn-dashboard"
                >
                  <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Dashboard
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="btn-login"
                >
                  <button className="hidden sm:block text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-200">
                    Sign In
                  </button>
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-register"
                >
                  <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
      </div>
    </header>
  )
}
