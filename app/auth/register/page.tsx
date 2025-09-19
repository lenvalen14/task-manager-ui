"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Sparkles, Heart, Star, X } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRegisterMutation } from "@/services/authService"
import { RegisterRequest, RegisterResponse } from "@/types/authType"

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [register, { isLoading }] = useRegisterMutation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (emailRegex.test(formData.username.trim())) {
      toast.error("Tên đăng nhập không được là email.")
      return
    }
    if (formData.password.trim().length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự.")
      return
    }
    if (!formData.email.includes("@")) {
      toast.error("Vui lòng nhập email hợp lệ.")
      return
    }

    try {
      const response: RegisterResponse = await register(formData).unwrap()

      if (response.code === 201) {
        toast.success("Tạo tài khoản thành công!")
        router.push("/auth/login")
      } else {
        throw new Error(response.message || "Đăng ký thất bại")
      }
    } catch (error: any) {
      if (error?.data?.data && typeof error.data.data === "object") {
        const fieldErrors = error.data.data
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => {
              toast.error(`${field}: ${msg}`)
            })
          }
        })
      } else {
        const message = error?.data?.message || error?.message || "Đăng ký thất bại"
        toast.error(message)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl border-2 border-black bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-bold text-black">Đăng ký tài khoản</CardTitle>
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

          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl p-3 border-2 border-black mb-4">
            <div className="flex items-center justify-center space-x-2 text-center">
              <span className="text-black font-semibold">Bắt đầu hành trình quản lý công việc của bạn!</span>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
          </div>

          <CardDescription className="text-gray-600 text-lg">
            Điền thông tin để tạo tài khoản mới.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-black font-bold">
                Tên đăng nhập
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="user123"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black rounded-xl py-3 text-base shadow-lg"
              />
            </div>

            {/* First + Last name trong cùng 1 hàng */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name" className="text-black font-bold">
                  Họ
                </Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Nguyen"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  required
                  disabled={isLoading}
                  className="border-2 border-black rounded-xl py-3 text-base shadow-lg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name" className="text-black font-bold">
                  Tên
                </Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="An"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  required
                  disabled={isLoading}
                  className="border-2 border-black rounded-xl py-3 text-base shadow-lg"
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-black font-bold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black rounded-xl py-3 text-base shadow-lg"
              />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-black font-bold">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0123456789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black rounded-xl py-3 text-base shadow-lg"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-black font-bold">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Tạo mật khẩu mạnh"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black rounded-xl py-3 text-base shadow-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-xl border-2 border-black transform hover:scale-105"
            >
              {isLoading ? "Đang tạo..." : "+ Đăng ký"}
            </Button>

            <div className="mt-4 text-center text-gray-600">
              Đã có tài khoản?{" "}
              <Link href="/auth/login" className="text-pink-600 hover:text-pink-700 font-semibold underline">
                Đăng nhập
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
