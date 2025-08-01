"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Star, Sparkles, Heart, Key } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 opacity-20">
          <Star className="w-8 h-8 text-orange-400 fill-current animate-pulse" />
        </div>
        <div className="absolute top-40 right-32 opacity-15">
          <Sparkles className="w-6 h-6 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute bottom-32 left-40 opacity-25">
          <Heart className="w-5 h-5 text-rose-400 fill-current animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-20 right-20 opacity-20">
          <Key className="w-7 h-7 text-teal-400 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        <Card className="w-full bg-white/90 backdrop-blur-sm border-2 border-orange-200/60 shadow-xl rounded-lg overflow-hidden">
          {/* Vintage paper texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-50/20 to-amber-50/30 pointer-events-none" />
          
          <CardHeader className="text-center pb-6 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-orange-600/30 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-900 font-serif">Welcome Back</CardTitle>
            <CardDescription className="text-orange-700/70 font-serif italic">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 relative">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-orange-800 font-medium font-serif">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-300/50 rounded-lg bg-white/80 font-serif"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-orange-800 font-medium font-serif">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-300/50 rounded-lg bg-white/80 font-serif"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-orange-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-orange-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-orange-700 font-serif">
                <input type="checkbox" className="rounded border-orange-300 text-orange-500" />
                <span>Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-orange-600 hover:text-orange-800 font-serif italic hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-orange-600/30 font-serif">
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center text-sm text-orange-700 font-serif">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-orange-600 hover:text-orange-800 font-medium hover:underline">
                Create one here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-orange-700/60 font-serif italic text-sm">
          <p>✨ Welcome to your creative workspace ✨</p>
        </div>
      </div>
    </div>
  )
}