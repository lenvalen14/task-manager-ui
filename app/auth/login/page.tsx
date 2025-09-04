"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart, Star, X, Eye, EyeOff } from "lucide-react"

import { useLoginMutation } from "@/services/authService"
import { loginRequest, loginSuccess, loginFailure } from "@/lib/slices/authSlice"
import { LoginRequest, LoginResponse } from "@/types/authType"

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginRequest>({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const username = formData.username.trim();
    const password = formData.password.trim();

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (emailRegex.test(username)) {
    //   toast.error("Username cannot be an email address.");
    //   return;
    // }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    dispatch(loginRequest())

    try {
      const response: LoginResponse = await login(formData).unwrap()

      console.log(response.data);

      if (response.code === 200 && response.data?.data) {
        const { user_id, email, username, access_token, refresh_token } = response.data.data

        dispatch(
          loginSuccess({
            user_id,
            email,
            username,
            access_token,
            refresh_token,
          })
        )

        toast.success("Đăng nhập thành công!")
        router.push("../../dashboard")
      } else {
        console.warn("Login thất bại:", response)
        throw new Error(response.message || "Đăng nhập thất bại")
      }
    } catch (error: any) {
      console.error("Lỗi khi login:", error)
      const message = error?.data?.message || error?.message || "Đăng nhập thất bại"
      dispatch(loginFailure(message))
      toast.error(message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-2 border-black bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-bold text-black">Welcome Back!</CardTitle>
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
              <span className="text-black font-semibold">Let's get you back to productivity!</span>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
          </div>

          <CardDescription className="text-gray-600 text-lg">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="username" className="text-black font-bold text-lg">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="user123"
                required
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-black font-bold text-lg">
                  Password
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg pr-12"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl border-2 border-black transform hover:scale-105"
            >
              {isLoading ? "Signing in..." : "+ Sign In"}
            </Button>

            <div className="mt-6 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-pink-600 hover:text-pink-700 font-semibold underline">
                Create account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
