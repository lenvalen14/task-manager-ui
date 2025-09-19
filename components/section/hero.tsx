"use client";

import React from 'react';
import { ArrowRight, Play, CheckCircle, Users, Sparkles } from 'lucide-react';
import { useState, useEffect } from "react"
import Link from 'next/link';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Interactive Mouse Follow Element */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-violet-300/10 to-fuchsia-300/10 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center min-h-screen py-20">
          <div className="space-y-8">
            {/* New Feature Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200 rounded-full px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <Sparkles className="w-4 h-4 text-violet-600 mr-3 animate-spin" />
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              <span className="text-gray-700">Mới: Nhật ký thời gian cho công việc</span>
              <ArrowRight className="w-4 h-4 ml-3 text-violet-600 group-hover:translate-x-1 transition-transform duration-300" />
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Năng suất
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Được tái định nghĩa
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Quản lý công việc cá nhân của bạn một cách dễ dàng với Kanban, danh sách và nhật ký thời gian chi tiết để theo dõi hiệu suất. Luôn theo sát deadline với thông báo thông minh cho công việc sắp đến hạn và quá hạn.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="btn-register"
              >
                <button className="group relative bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    Bắt đầu dùng thử miễn phí
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              <button className="group bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white">
                <div className="flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Xem demo
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Người dùng hoạt động</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Thời gian hoạt động</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Trên App Store</div>
              </div>
            </div>
          </div>

          {/* Dashboard Image Preview */}
          <div className="relative">
            <div className="relative group">
              {/* Main Dashboard Image */}
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-3 border border-white/20 hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/dashboard-mockup.png" 
                    alt="Giao diện bảng điều khiển hiện đại"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                  
                  {/* Overlay with glassmorphism effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl hover:scale-110 transition-transform duration-200 cursor-pointer">
                      <Play className="w-8 h-8 text-violet-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-white/30 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Cập nhật trực tiếp</span>
                </div>
              </div>

              <div className="absolute -top-6 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-white/30 animate-float delay-500">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-semibold text-gray-700">24 đang online</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl p-3 shadow-xl text-white animate-float delay-1000">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Hoàn thành: 78%</span>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-8 left-1/3 w-16 h-16 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 rounded-2xl blur-lg animate-bounce delay-700"></div>
              <div className="absolute -bottom-8 left-1/4 w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-2xl blur-lg animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
