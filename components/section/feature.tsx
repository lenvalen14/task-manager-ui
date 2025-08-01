"use client"

import React from 'react';
import { CheckCircle, Clock, Users, BarChart3, Zap, Shield, Sparkles } from 'lucide-react';

export function FeatureSection() {
  const features = [
    {
      icon: CheckCircle,
      title: "Task Management",
      description: "Organize and track your tasks with ease. Set priorities, deadlines, and status updates.",
      bgColor: "bg-gradient-to-br from-green-300 to-emerald-300",
      text: "text-green-800"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor time spent on tasks and projects with detailed analytics and reports.",
      bgColor: "bg-gradient-to-br from-blue-300 to-cyan-300",
      text: "text-blue-800"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates and shared project spaces.",
      bgColor: "bg-gradient-to-br from-purple-300 to-pink-300",
      text: "text-purple-800"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get insights into your productivity with comprehensive analytics and progress reports.",
      bgColor: "bg-gradient-to-br from-pink-300 to-rose-300",
      text: "text-pink-800"
    },
    {
      icon: Zap,
      title: "Quick Actions",
      description: "Speed up your workflow with customizable shortcuts and automation features.",
      bgColor: "bg-gradient-to-br from-yellow-300 to-orange-300",
      text: "text-yellow-800"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and 99.9% uptime guarantee.",
      bgColor: "bg-gradient-to-br from-red-300 to-pink-300",
      text: "text-red-800"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-10 animate-pulse delay-500"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-300 to-orange-300 border-2 border-black rounded-full px-6 py-3 text-sm font-bold mb-8 shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 text-red-600 mr-2 animate-pulse" />
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Features
          </div>
          <h2 className="text-5xl font-bold text-black mb-6 leading-tight">
            Boost productivity with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">user-friendly</span> Task Manager.
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Discover powerful features designed to streamline your workflow and enhance team collaboration with our intuitive platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border-2 border-black rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 border-2 border-black shadow-lg group-hover:shadow-xl transition-shadow`}>
                <feature.icon className={`w-8 h-8 ${feature.text}`} />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile App Preview */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-black transform hover:scale-105 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-black mb-6">
                Mobile-First <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Design</span>
              </h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Access your tasks anywhere with our responsive mobile app. Stay productive on the go with seamless synchronization across all devices.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-xl border-2 border-black shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center border-2 border-black shadow-md">
                    <CheckCircle className="w-6 h-6 text-green-800" />
                  </div>
                  <span className="text-lg font-bold text-black">Real-time sync across devices</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-xl border-2 border-black shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center border-2 border-black shadow-md">
                    <CheckCircle className="w-6 h-6 text-blue-800" />
                  </div>
                  <span className="text-lg font-bold text-black">Offline mode support</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl border-2 border-black shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center border-2 border-black shadow-md">
                    <CheckCircle className="w-6 h-6 text-purple-800" />
                  </div>
                  <span className="text-lg font-bold text-black">Push notifications</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 border-2 border-black shadow-xl">
              <div className="bg-white rounded-xl p-6 border-2 border-black shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center border-2 border-black shadow-md">
                      <span className="text-white text-sm font-bold">TM</span>
                    </div>
                    <span className="text-lg font-bold text-black">Today's Tasks</span>
                  </div>
                  <div className="text-sm text-gray-600 font-bold bg-yellow-200 px-3 py-1 rounded-full border border-black">
                    3/5 completed
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-xl border border-black">
                    <CheckCircle className="w-5 h-5 text-green-800" />
                    <span className="text-sm font-bold text-black">Review project proposal</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl border border-black">
                    <Clock className="w-5 h-5 text-yellow-800" />
                    <span className="text-sm font-bold text-black">Team meeting at 2 PM</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-xl border border-black">
                    <Users className="w-5 h-5 text-blue-800" />
                    <span className="text-sm font-bold text-black">Update client presentation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}