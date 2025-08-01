"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Camera, 
  Heart, 
  Sparkle, 
  Star, 
  User, 
  Bell, 
  Key 
} from "lucide-react"
import { Header } from '@/components/layout/header'

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState("my-details")

  const tabs = [
    { value: "my-details", label: "Details", icon: User, color: "bg-blue-300" },
    { value: "profile", label: "Profile", icon: Heart, color: "bg-pink-300" },
    { value: "password", label: "Password", icon: Key, color: "bg-green-300" },
    { value: "notifications", label: "Notifications", icon: Bell, color: "bg-yellow-300" },
  ]

  return (
    <>
      <div className="flex-1 min-h-screen bg-white">
        {/* Header - Fixed */}
        <div className="sticky top-0 z-50 bg-white border-b-4 border-pink-200 shadow-lg">
          <div className="relative px-8 pt-6 pb-8">
            {/* Decorative Elements */}
            <div className="absolute top-4 right-8">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
            </div>
            <div className="absolute top-8 right-16">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse delay-300" />
            </div>
            <div className="absolute top-6 right-24">
              <Sparkle className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse delay-700" />
            </div>

            <div className="flex items-center gap-8">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
              
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white shadow-lg border-4 border-black transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <User className="w-8 h-8" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                    Profile Settings
                  </h1>
                  <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                    Manage your account settings and preferences ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="h-[calc(100vh-100px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-pink-300 hover:scrollbar-thumb-pink-400">
          {/* Cover and Avatar Section */}
          <div className="relative">
          <div className="px-8 pt-20 pb-8">
              {/* Profile Info */}
              <div className="relative -mt-16 mb-6">
                <div className="flex items-end gap-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-black shadow-lg bg-white">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User Avatar" />
                      <AvatarFallback className="bg-pink-100 text-pink-700 text-4xl font-black">KJ</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-pink-400 hover:bg-pink-500 border-2 border-black p-0 shadow-lg transform hover:scale-110 transition-transform duration-200"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="pb-4">
                    <h2 className="text-2xl font-black text-gray-900">Killan James</h2>
                    <p className="font-bold text-gray-700 bg-blue-200 px-3 py-1 rounded-xl border-2 border-black shadow-sm inline-block mt-2">
                      Product Designer
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mb-8">
                <Button 
                  variant="outline" 
                  className="border-2 border-black rounded-xl px-6 bg-white hover:bg-gray-50 font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-pink-400 hover:bg-pink-500 text-white rounded-xl px-6 font-bold border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Save Changes
                </Button>
              </div>

              {/* Tabs Navigation - Sticky */}
              <div className="sticky top-[100px] z-40">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full max-w-2xl h-16 bg-transparent gap-2 justify-start p-2">
                    {tabs.map(tab => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={`px-6 py-3 font-bold text-gray-900 border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 data-[state=active]:${tab.color} data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:bg-white hover:bg-gray-50`}
                      >
                        <tab.icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Tab Contents */}
                  <div className="py-8">
                    {/* My Details Tab */}
                    <TabsContent value="my-details">
                      <div className="space-y-6 max-w-4xl">
                        <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-blue-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Personal Information
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">First Name</Label>
                              <Input 
                                placeholder="Enter your first name" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Last Name</Label>
                              <Input 
                                placeholder="Enter your last name" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Email</Label>
                              <Input 
                                type="email"
                                placeholder="Enter your email" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Phone Number</Label>
                              <Input 
                                type="tel"
                                placeholder="Enter your phone number" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-green-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Location
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Country</Label>
                              <Input 
                                placeholder="Enter your country" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">City</Label>
                              <Input 
                                placeholder="Enter your city" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Profile Tab */}
                    <TabsContent value="profile">
                      <div className="space-y-6 max-w-4xl">
                        <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-pink-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            About Me
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Bio</Label>
                              <Textarea 
                                placeholder="Write something about yourself..." 
                                className="min-h-[120px] border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Job Title</Label>
                              <Input 
                                placeholder="Enter your job title" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Website</Label>
                              <Input 
                                type="url"
                                placeholder="Enter your website URL" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-purple-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Social Links
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Twitter</Label>
                              <Input 
                                placeholder="Your Twitter profile" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">LinkedIn</Label>
                              <Input 
                                placeholder="Your LinkedIn profile" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">GitHub</Label>
                              <Input 
                                placeholder="Your GitHub profile" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Password Tab */}
                    <TabsContent value="password">
                      <div className="space-y-6 max-w-4xl">
                        <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-green-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Change Password
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Current Password</Label>
                              <Input 
                                type="password"
                                placeholder="Enter current password" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">New Password</Label>
                              <Input 
                                type="password"
                                placeholder="Enter new password" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Confirm New Password</Label>
                              <Input 
                                type="password"
                                placeholder="Confirm new password" 
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Two-Factor Authentication
                          </h3>
                          
                          <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                            <div className="space-y-1">
                              <h4 className="font-bold text-gray-900">Enable 2FA</h4>
                              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications">
                      <div className="space-y-6 max-w-4xl">
                        <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Email Notifications
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                              <div className="space-y-1">
                                <h4 className="font-bold text-gray-900">Project Updates</h4>
                                <p className="text-sm text-gray-600">Get notified about project changes and updates</p>
                              </div>
                              <Switch />
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                              <div className="space-y-1">
                                <h4 className="font-bold text-gray-900">Task Comments</h4>
                                <p className="text-sm text-gray-600">Receive notifications when someone comments on your tasks</p>
                              </div>
                              <Switch />
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                              <div className="space-y-1">
                                <h4 className="font-bold text-gray-900">Task Assignments</h4>
                                <p className="text-sm text-gray-600">Get notified when you're assigned to a task</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-blue-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Push Notifications
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                              <div className="space-y-1">
                                <h4 className="font-bold text-gray-900">Desktop Notifications</h4>
                                <p className="text-sm text-gray-600">Show desktop notifications for important updates</p>
                              </div>
                              <Switch />
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                              <div className="space-y-1">
                                <h4 className="font-bold text-gray-900">Sound Alerts</h4>
                                <p className="text-sm text-gray-600">Play sound when receiving notifications</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}