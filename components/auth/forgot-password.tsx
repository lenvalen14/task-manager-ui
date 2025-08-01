"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Key, Heart, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function ForgotPasswordPage() {
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
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-rose-600/30 shadow-lg">
              <Key className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-900 font-serif">Reset Password</CardTitle>
            <CardDescription className="text-orange-700/70 font-serif italic">
              Enter your email to receive reset instructions
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 relative">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-orange-800 font-medium font-serif">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your registered email"
                  className="pl-10 border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-300/50 rounded-lg bg-white/80 font-serif"
                />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800 font-serif">
                💌 We'll send you a secure link to reset your password. Check your inbox and spam folder.
              </p>
            </div>

            <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-rose-600/30 font-serif">
              Send Reset Link
              <Heart className="w-4 h-4 ml-2 fill-current" />
            </Button>

            <div className="text-center text-sm text-orange-700 font-serif">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-orange-600 hover:text-orange-800 font-medium hover:underline">
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-orange-700/60 font-serif italic text-sm">
          <p>✨ We'll help you get back in ✨</p>
        </div>
      </div>
    </div>
  )
}