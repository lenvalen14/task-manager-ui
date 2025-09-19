"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { toast } from "sonner"
import { useChangePasswordMutation } from "@/services/passwordService"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [resetPassword, { isLoading }] = useChangePasswordMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp")
      return
    }
    try {
      await resetPassword({
        email,
        new_password: password,
        confirm_password: confirmPassword,
      }).unwrap()
      toast.success("Cập nhật mật khẩu thành công")
      router.push("/auth/login")
    } catch (err: any) {
      toast.error(err?.data?.message || "Cập nhật mật khẩu thất bại")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-2 border-black bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-gray-600 hover:text-gray-800 bg-gray-100 rounded-full p-2"
              >
                <Link href="/auth/login">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="sr-only">Quay lại đăng nhập</span>
                </Link>
              </Button>
              <CardTitle className="text-3xl font-bold text-black">Tạo mật khẩu mới</CardTitle>
            </div>

            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-md border border-black">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>

          <CardDescription className="text-gray-600 text-lg">
            Nhập và xác nhận mật khẩu mới của bạn
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-black font-bold text-lg">
                Mật khẩu mới
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                required
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl 
                           bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="confirmPassword" className="text-black font-bold text-lg">
                Xác nhận mật khẩu
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                required
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl 
                           bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 
                         text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl border-2 border-black 
                         transform hover:scale-105"
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
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
