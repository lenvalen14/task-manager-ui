"use client";

import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowRight, Sparkles, TrendingUp, Users, Award, Heart } from 'lucide-react';

export function TestimonialSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      company: "Independent",
      avatar: "SJ",
      content: "This task manager has completely transformed my workflow. The dashboard gives me clear insights into my productivity and the time tracking helps me bill clients accurately.",
      rating: 5,
      bgGradient: "from-blue-500 to-cyan-500",
      highlight: "40% more organized"
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      company: "Self-employed",
      avatar: "MC",
      content: "The project management features are perfect for juggling multiple client projects. I love how I can track time and see exactly where I'm spending my hours.",
      rating: 5,
      bgGradient: "from-emerald-500 to-green-500",
      highlight: "Perfect for freelancers"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Consultant",
      company: "Freelancer",
      avatar: "ER",
      content: "Finally found a simple yet powerful tool that keeps all my projects organized. The notifications ensure I never miss deadlines and stay on top of everything.",
      rating: 5,
      bgGradient: "from-violet-500 to-purple-500",
      highlight: "Never miss deadlines"
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
            <Quote className="w-4 h-4 text-violet-600 mr-3" />
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-gray-700">User Stories</span>
            <ArrowRight className="w-4 h-4 ml-3 text-violet-600 group-hover:translate-x-1 transition-transform duration-300" />
          </div>

          <h2 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Loved by Teams
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how individuals and freelancers are boosting their productivity and staying organized with our simple yet powerful tools.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              onMouseEnter={() => setActiveTestimonial(index)}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <Quote className="w-12 h-12 text-gray-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
                <div className={`ml-4 inline-flex items-center bg-gradient-to-r ${testimonial.bgGradient} px-3 py-1 rounded-full`}>
                  <span className="text-xs font-semibold text-white">{testimonial.highlight}</span>
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-8 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.bgGradient} rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                  <span className="text-white font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;