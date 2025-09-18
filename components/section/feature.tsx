"use client"

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Users, BarChart3, Sparkles, ArrowRight, Play, Star, Zap } from 'lucide-react';

export function FeatureSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Project Management",
      description: "Create and manage projects with clear objectives, milestones, and team collaboration features.",
      bgGradient: "from-violet-500 to-purple-500",
      bgLight: "from-violet-50 to-purple-50",
      iconColor: "text-violet-600",
      stats: "Unlimited projects"
    },
    {
      icon: CheckCircle,
      title: "Task Management",
      description: "Organize tasks with priorities, due dates, assignments, and progress tracking for better productivity.",
      bgGradient: "from-emerald-500 to-green-500",
      bgLight: "from-emerald-50 to-green-50",
      iconColor: "text-emerald-600",
      stats: "Smart organization"
    },
    {
      icon: Clock,
      title: "Time Logging",
      description: "Track time spent on tasks and projects with detailed logs and comprehensive time reports.",
      bgGradient: "from-blue-500 to-cyan-500",
      bgLight: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
      stats: "Accurate tracking"
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Get insights into your productivity with visual charts, progress reports, and performance metrics.",
      bgGradient: "from-pink-500 to-rose-500",
      bgLight: "from-pink-50 to-rose-50",
      iconColor: "text-pink-600",
      stats: "Real-time insights"
    },
    {
      icon: Sparkles,
      title: "Smart Notifications",
      description: "Stay updated with intelligent alerts for deadlines, task updates, and important project changes.",
      bgGradient: "from-amber-500 to-orange-500",
      bgLight: "from-amber-50 to-orange-50",
      iconColor: "text-amber-600",
      stats: "Never miss anything"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 relative overflow-hidden py-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-400/10 to-fuchsia-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Interactive Mouse Follow Element */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-violet-300/5 to-fuchsia-300/5 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200 rounded-full px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group mb-8">
            <Sparkles className="w-4 h-4 text-violet-600 mr-3 animate-spin" />
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-gray-700">Powerful Features</span>
            <ArrowRight className="w-4 h-4 ml-3 text-violet-600 group-hover:translate-x-1 transition-transform duration-300" />
          </div>

          <h2 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Stay Productive
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of productivity tools with AI-powered features, seamless collaboration, and intelligent automation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgLight} opacity-0 group-hover:opacity-50 rounded-3xl transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.bgGradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${feature.iconColor} bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full`}>
                    {feature.stats}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${feature.iconColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile App Preview with Image */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-1 border border-white/20 hover:shadow-3xl transition-all duration-500 group">
          <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/30 p-12">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
              
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 rounded-full px-4 py-2 text-sm font-semibold">
                    <Star className="w-4 h-4 text-emerald-600 mr-2" />
                    <span className="text-emerald-700">All-in-One Solution</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-black leading-tight">
                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Complete Project
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      Management
                    </span>
                  </h3>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Everything you need to manage projects, track tasks, log time, and stay organized in one intuitive platform.
                  </p>
                </div>
                
                {/* Feature List */}
                <div className="space-y-4">
                  {[
                    { icon: Users, text: "Multi-project workspace", color: "violet" },
                    { icon: CheckCircle, text: "Task progress tracking", color: "emerald" },
                    { icon: Clock, text: "Detailed time reports", color: "blue" },
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 bg-gradient-to-r from-${item.color}-100 to-${item.color}-50 rounded-2xl border border-${item.color}-200/50 hover:shadow-lg transition-all duration-300 group`}>
                      <div className={`w-12 h-12 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile App Image */}
              <div className="relative">
                <div className="relative group">
                  {/* Main Mobile App Image */}
                  <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-3 border border-white/20 hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
                    <div className="rounded-2xl overflow-hidden">
                      <img 
                        src="/dashboard-mockup-2.png" 
                        alt="Project Owner Interface"
                        className="w-full h-auto object-cover rounded-2xl"
                      />
                      
                      {/* Overlay with glassmorphism effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Feature badges */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg animate-pulse">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-semibold text-gray-700">Live Sync</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl p-3 shadow-xl text-white animate-float delay-1000">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-semibold">Fast & Secure</span>
                    </div>
                  </div>

                  {/* Decorative floating elements */}
                  <div className="absolute -top-8 left-1/4 w-16 h-16 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-2xl blur-lg animate-bounce delay-700"></div>
                  <div className="absolute -bottom-8 right-1/4 w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl blur-lg animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}

export default FeatureSection;