import React from 'react';
import { ArrowRight, Play, Calendar, CheckCircle, Settings, Users, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-30 animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* New Feature Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-300 to-orange-300 border-2 border-black rounded-full px-6 py-3 text-sm font-bold shadow-lg transform hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-red-600 mr-2 animate-pulse" />
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              New: We've just released a new feature
              <ArrowRight className="w-4 h-4 ml-2 animate-bounce" />
            </div>

            <h1 className="text-6xl font-bold text-black leading-tight">
              Boost Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Productivity</span>,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">Simplify Your Life</span>
            </h1>

            <p className="text-xl text-gray-800 leading-relaxed max-w-lg">
              We're here to simplify the intricacies of your life, providing a user-friendly platform that not only manages your tasks effortlessly but also enhances your overall efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center border-2 border-black shadow-xl transform hover:scale-105 hover:shadow-2xl">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-gradient-to-r from-pink-200 to-purple-200 border-2 border-black text-black px-10 py-4 rounded-xl font-bold hover:from-pink-300 hover:to-purple-300 transition-all duration-300 flex items-center justify-center shadow-xl transform hover:scale-105 hover:shadow-2xl">
                <Play className="w-5 h-5 mr-2" />
                Preview Platform
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 border-2 border-black hover:shadow-3xl">
              {/* Mock Dashboard */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-white to-gray-50 px-6 py-4 border-b-2 border-black flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center border-2 border-black shadow-lg">
                      <span className="text-white text-sm font-bold">AS</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-black text-lg">Hi Shakib!</h3>
                      <p className="text-sm text-gray-600">Team Manager</p>
                    </div>
                  </div>
                  <div className="text-sm text-black font-bold bg-yellow-200 px-3 py-1 rounded-full border border-black">
                    62% completed
                  </div>
                </div>

                {/* Sidebar */}
                <div className="flex">
                  <div className="w-24 bg-gradient-to-b from-white to-gray-50 border-r-2 border-black py-6">
                    <div className="space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl flex items-center justify-center mb-2 border-2 border-black shadow-md">
                          <Calendar className="w-5 h-5 text-yellow-800" />
                        </div>
                        <span className="text-xs text-gray-600 font-medium">Menu</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-200 to-emerald-200 rounded-xl flex items-center justify-center mb-2 border-2 border-black shadow-md">
                          <CheckCircle className="w-5 h-5 text-green-800" />
                        </div>
                        <span className="text-xs text-green-800 font-bold">Today</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    {/* Task Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-pink-300 to-rose-300 rounded-xl p-4 border-2 border-black shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-black">SEO for New Ranking</span>
                          <Calendar className="w-4 h-4 text-black" />
                        </div>
                        <div className="flex -space-x-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full border-2 border-black shadow-md"></div>
                          <div className="w-5 h-5 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full border-2 border-black shadow-md"></div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-300 to-cyan-300 rounded-xl p-4 border-2 border-black shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-black">Create Signup Component</span>
                          <Settings className="w-4 h-4 text-black" />
                        </div>
                        <div className="flex -space-x-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full border-2 border-black shadow-md"></div>
                          <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full border-2 border-black shadow-md"></div>
                        </div>
                      </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="bg-white rounded-xl p-4 border-2 border-black shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-black text-lg">Today's Schedule</h4>
                        <Calendar className="w-5 h-5 text-gray-600" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-xl border border-black">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center border-2 border-black shadow-md">
                            <Users className="w-5 h-5 text-green-800" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-black">Project Discovery Call</p>
                            <p className="text-xs text-gray-600">10:30 AM</p>
                          </div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-black">
                          <h5 className="text-sm font-bold text-black mb-2">Design Project</h5>
                          <div className="flex items-center space-x-6 text-xs text-gray-600">
                            <span className="font-medium">114h</span>
                            <span className="font-medium">24m</span>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mr-2 border border-black"></div>
                              <span className="font-medium">2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};