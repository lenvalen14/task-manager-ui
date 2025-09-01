"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"
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
      toast.error("Please enter all 6 digits")
      return
    }

    try {
      await verifyOtp({ email, otp: Number(code) }).unwrap()
      toast.success("OTP verified successfully")
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      const detail =
        err?.data?.non_field_errors?.[0] ||
        err?.data?.message ||
        "Invalid OTP. Please try again."
      toast.error(detail)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-2 border-black bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4 text-center">
          <ShieldCheck className="mx-auto mb-2 w-12 h-12 text-green-600" />
          <CardTitle className="text-2xl font-bold text-black mb-2">Verify OTP</CardTitle>
          <div className="text-gray-700 text-base">
            Enter the 6-digit code sent to <span className="font-semibold">{email}</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label className="text-black font-bold text-base text-center mb-2">OTP Code</Label>
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
                    className="w-12 h-14 text-center border-2 border-black rounded-xl text-lg font-bold text-black bg-white shadow focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                ))}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl border-2 border-black transform hover:scale-105"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
            <div className="mt-4 text-center text-gray-600 text-sm">
              Didn’t receive the code?{" "}
              <Link href={`/auth/forgot-password`} className="text-orange-600 hover:text-orange-700 font-semibold underline">
                Resend OTP
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
