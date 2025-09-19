"use client"

import { Sparkles, Star, Heart, Zap } from "lucide-react"

interface DashboardHeroProps {
  userName: string
}

export function DashboardHero({ userName }: DashboardHeroProps) {
  return (
    <div className="relative px-6 pt-8 pb-8 md:px-12 md:pt-12 md:pb-10">
      {/* Icon trang trí */}
      <div className="absolute top-4 right-8">
        <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-bounce" />
      </div>
      <div className="absolute top-8 right-20">
        <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse delay-300" />
      </div>
      <div className="absolute top-12 right-32">
        <Zap className="w-5 h-5 text-blue-400 fill-blue-400 animate-pulse delay-700" />
      </div>
      <div className="absolute top-6 left-8">
        <Sparkles
          className="w-6 h-6 text-purple-400 animate-spin"
          style={{ animationDuration: "3s" }}
        />
      </div>

      {/* Nội dung chính */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center border-3 border-black shadow-lg transform rotate-3">
          <Sparkles className="h-6 w-6 text-white animate-pulse" />
        </div>
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">
          Chào buổi sáng, {userName}!
        </h1>
      </div>
      <p className="text-gray-700 text-xl font-bold bg-yellow-200 inline-block px-4 py-2 rounded-full border-2 border-black shadow-md transform -rotate-1">
        Đây là những gì đang diễn ra với dự án của bạn hôm nay ✨
      </p>
    </div>
  )
}