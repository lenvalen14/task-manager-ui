"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useResetPasswordMutation } from "@/services/passwordService"
import { useSelector } from "react-redux"
import { selectUser } from "@/lib/slices/authSlice"
import { useToast } from "@/components/ui/use-toast"

export default function TabPassword() {
  const user = useSelector(selectUser)
  const { toast } = useToast()

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  })

  const [changePassword, { isLoading }] = useResetPasswordMutation()

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.new_password !== form.confirm_password) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới và mật khẩu xác nhận không khớp!",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await changePassword({
        email: user?.email || "",
        old_password: form.old_password,
        new_password: form.new_password,
        confirm_password: form.confirm_password,
      }).unwrap()
      toast({
        title: "Thành công 🎉",
        description: "Đổi mật khẩu thành công!",
      })
      setForm({ old_password: "", new_password: "", confirm_password: "" })
    } catch (err: any) {
      console.error("Lỗi đổi mật khẩu:", err)
      toast({
        title: "Lỗi",
        description: err?.data?.message || "Không thể đổi mật khẩu",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <h3 className="text-xl font-black text-gray-900 mb-6 bg-green-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
          Đổi mật khẩu
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Mật khẩu hiện tại</Label>
            <Input
              type="password"
              value={form.old_password}
              onChange={(e) => handleChange("old_password", e.target.value)}
              placeholder="Nhập mật khẩu hiện tại"
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Mật khẩu mới</Label>
            <Input
              type="password"
              value={form.new_password}
              onChange={(e) => handleChange("new_password", e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Xác nhận mật khẩu mới</Label>
            <Input
              type="password"
              value={form.confirm_password}
              onChange={(e) => handleChange("confirm_password", e.target.value)}
              placeholder="Xác nhận mật khẩu mới"
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-xl border-2 border-black shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? "Đang đổi..." : "Đổi mật khẩu"}
        </Button>
      </form>
    </div>
  )
}
