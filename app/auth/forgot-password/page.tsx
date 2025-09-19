"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Sparkles, Heart, Star, X } from "lucide-react"
import { useRequestPasswordOtpMutation } from "@/services/passwordService"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const [requestOtp, { isLoading }] = useRequestPasswordOtpMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await requestOtp({ email }).unwrap()
      toast.success("Mã OTP đã được gửi")
      router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
       toast.error(err?.data?.message || "Gửi OTP thất bại. Vui lòng thử lại.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-2 border-black bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-800 bg-gray-100 rounded-full p-2">
                <Link href="/auth/login">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="sr-only">Quay lại Đăng nhập</span>
                </Link>
              </Button>
              <CardTitle className="text-3xl font-bold text-black">Đặt lại mật khẩu</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded-sm flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="w-4 h-4 bg-pink-400 rounded-sm flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div className="w-4 h-4 bg-yellow-400 rounded-sm flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <button className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl p-4 border-2 border-black mb-6">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-black font-semibold">Đừng lo, chúng tôi sẽ giúp bạn khôi phục lại!</span>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
          </div>

          <CardDescription className="text-gray-600 text-lg">Nhập email của bạn để đặt lại mật khẩu.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-black font-bold text-lg">
                Địa chỉ Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ban@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl border-2 border-black transform hover:scale-105"
            >
              {isLoading ? "Đang gửi..." : "+ Gửi liên kết đặt lại"}
            </Button>

            <div className="mt-6 text-center text-gray-600">
              Nhớ mật khẩu rồi?{" "}
              <Link href="/auth/login" className="text-pink-600 hover:text-pink-700 font-semibold underline">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
