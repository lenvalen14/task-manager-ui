"use client";

import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "SJ",
      content: "This task manager has completely transformed how our team collaborates. The intuitive interface and powerful features have increased our productivity by 40%.",
      rating: 5,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      name: "Michael Chen",
      role: "Design Lead",
      company: "Creative Studio",
      avatar: "MC",
      content: "The time tracking feature is a game-changer. I can now accurately bill clients and track project progress with ease. Highly recommended!",
      rating: 5,
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      name: "Emily Rodriguez",
      role: "Project Manager",
      company: "StartupXYZ",
      avatar: "ER",
      content: "Finally, a task manager that actually works for remote teams. The real-time updates and mobile app make collaboration seamless.",
      rating: 5,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white border-2 border-black rounded-full px-4 py-2 text-sm font-medium mb-6 shadow-md">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Testimonials
          </div>
          <h2 className="text-4xl font-bold text-black mb-4">
            Hear What Our Users Are Saying
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover how our task manager is helping teams achieve their goals and boost productivity.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border-2 border-black rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${testimonial.bgColor} rounded-lg flex items-center justify-center border border-black`}>
                  <span className={`text-sm font-bold ${testimonial.textColor}`}>
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-black">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-black">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <p className="text-gray-700 font-medium">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <p className="text-gray-700 font-medium">Tasks Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <p className="text-gray-700 font-medium">Uptime</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">4.9/5</div>
              <p className="text-gray-700 font-medium">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
