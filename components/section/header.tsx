"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

export const selectUser = (state: RootState) => state.user

export function HeaderSection() {
  const user = useSelector(selectUser)
  const isAuthenticated = !!user?.access_token

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
          <Link href="/public/features" className="nav-link">Features</Link>
          <Link href="/public/pricing" className="nav-link">Pricing</Link>
          <Link href="/public/about" className="nav-link">About</Link>
          <Link href="/public/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Auth / Dashboard Buttons */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="btn-dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="nav-link">Sign In</Link>
              <Link
                href="/auth/register"
                className="btn-signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
