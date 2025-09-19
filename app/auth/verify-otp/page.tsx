"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, Heart, Star, X, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useVerifyPasswordOtpMutation } from "@/services/passwordService"
import { toast } from "sonner"

export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [verifyOtp, { isLoading }] = useVerifyPasswordOtpMutation()

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text").trim()
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split("")
      setOtp(digits)
      digits.forEach((d, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = d
        }
      })
      inputRefs.current[5]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join("")
    if (code.length < 6) {
      toast.error("Vui lòng nhập đủ 6 số")
      return
    }

    try {
      await verifyOtp({ email, otp: Number(code) }).unwrap()
      toast.success("Xác thực OTP thành công")
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      const detail =
        err?.data?.non_field_errors?.[0] ||
        err?.data?.message ||
        "OTP không hợp lệ. Vui lòng thử lại."
      toast.error(detail)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-2 border-black bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-800 bg-gray-100 rounded-full p-2">
                <Link href="/auth/forgot-password">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="sr-only">Quay lại</span>
                </Link>
              </Button>
              <CardTitle className="text-3xl font-bold text-black">Xác thực OTP</CardTitle>
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
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="text-black font-semibold">Nhập mã gồm 6 chữ số đã gửi tới {email}</span>
            </div>
          </div>

          <CardDescription className="text-gray-600 text-lg">
            Vui lòng nhập OTP để tiếp tục.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label className="text-black font-bold text-lg text-center">Mã OTP</Label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { if (el) inputRefs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(e.target.value, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center border-2 border-black rounded-xl text-lg font-bold text-black bg-white shadow focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                  />
                ))}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl border-2 border-black transform hover:scale-105"
            >
              {isLoading ? "Đang xác thực..." : "Xác thực OTP"}
            </Button>
            <div className="mt-6 text-center text-gray-600 text-sm">
              Chưa nhận được mã?{" "}
              <Link href="/auth/forgot-password" className="text-pink-600 hover:text-pink-700 font-semibold underline">
                Gửi lại OTP
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
