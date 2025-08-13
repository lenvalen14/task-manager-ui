"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Sparkles, Heart, Star, X } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRegisterMutation } from "@/services/authService"
import { RegisterRequest, RegisterResponse } from "@/types/auth"

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

    console.log("📤 Dữ liệu form gửi đi:", formData)

    if (formData.username.trim().length < 4) {
      toast.error("Username must be at least 4 characters.")
      return
    }
    if (formData.password.trim().length < 8) {
      toast.error("Password must be at least 8 characters.")
      return
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email.")
      return
    }

    try {
      const response: RegisterResponse = await register(formData).unwrap()

      if (response.code === 201) {
        toast.success("Account created successfully!")
        router.push("/auth/login")
      } else {
        throw new Error(response.message || "Registration failed")
      }
    } catch (error: any) {
      // console.error("❌ Lỗi khi đăng ký:", error);

      // Nếu có lỗi chi tiết cho từng field
      if (error?.data?.data && typeof error.data.data === "object") {
        const fieldErrors = error.data.data;
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => {
              toast.error(`${field}: ${msg}`);
            });
          }
        });
      } else {
        // Nếu không có lỗi chi tiết, báo lỗi chung
        const message = error?.data?.message || error?.message || "Registration failed";
        toast.error(message);
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-2 border-black bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-bold text-black">Create Account</CardTitle>
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
              <span className="text-black font-semibold">Let's bring your productivity to life!</span>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
          </div>

          <CardDescription className="text-gray-600 text-lg">
            Create an account to start managing your tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Username */}
            <div className="grid gap-3">
              <Label htmlFor="username" className="text-black font-bold text-lg">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="user123"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>

            {/* First name */}
            <div className="grid gap-3">
              <Label htmlFor="first_name" className="text-black font-bold text-lg">
                First Name
              </Label>
              <Input
                id="first_name"
                type="text"
                placeholder="John"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>

            {/* Last name */}
            <div className="grid gap-3">
              <Label htmlFor="last_name" className="text-black font-bold text-lg">
                Last Name
              </Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Doe"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-black font-bold text-lg">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>

            {/* Phone */}
            <div className="grid gap-3">
              <Label htmlFor="phone" className="text-black font-bold text-lg">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0123456789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>

            {/* Password */}
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-black font-bold text-lg">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl border-2 border-black transform hover:scale-105"
            >
              {isLoading ? "Creating..." : "+ Create Account"}
            </Button>

            <div className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-pink-600 hover:text-pink-700 font-semibold underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
