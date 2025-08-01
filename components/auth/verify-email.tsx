"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, RefreshCw, Star, Sparkles, Heart, Key } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = React.useState(false)

  const handleResendEmail = () => {
    setIsResending(true)
    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
    }, 2000)
  }

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
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-600/30 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-900 font-serif">Check Your Email</CardTitle>
            <CardDescription className="text-orange-700/70 font-serif italic">
              We've sent a verification link to your email address
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 relative text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-sm text-blue-800 font-serif leading-relaxed">
                📧 Please check your email inbox (and spam folder) for a verification link. 
                Click the link to activate your account and complete the registration process.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-orange-700 font-serif">
                Didn't receive the email?
              </p>
              
              <Button 
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-blue-600/30 font-serif"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </div>

            <div className="pt-4 border-t border-orange-200">
              <p className="text-sm text-orange-700 font-serif mb-4">
                Already verified your email?
              </p>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full border-2 border-orange-300/60 hover:border-orange-400 hover:bg-orange-50 bg-white/80 text-orange-800 hover:text-orange-900 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 font-serif">
                  Continue to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-orange-700/60 font-serif italic text-sm">
          <p>✨ Almost there! Just one more step ✨</p>
        </div>
      </div>
    </div>
  )
}