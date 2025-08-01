"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Shield, Star, Sparkles, Heart, Key } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-purple-600/30 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-900 font-serif">Create New Password</CardTitle>
            <CardDescription className="text-orange-700/70 font-serif italic">
              Choose a strong password for your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 relative">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-orange-800 font-medium font-serif">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-orange-800 font-medium font-serif">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="pl-10 pr-10 border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-300/50 rounded-lg bg-white/80 font-serif"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-orange-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-orange-500" />
                  )}
                </Button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-2 font-serif">Password Requirements:</h4>
              <ul className="text-xs text-blue-700 space-y-1 font-serif">
                <li>• At least 8 characters long</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Include at least one number</li>
                <li>• Include at least one special character</li>
              </ul>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-purple-600/30 font-serif">
              Update Password
              <Shield className="w-4 h-4 ml-2" />
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
          <p>🔒 Your account security is our priority</p>
        </div>
      </div>
    </div>
  )
}