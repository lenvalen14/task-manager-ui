"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useResetPasswordMutation } from "@/services/passwordService"
import { useSelector } from "react-redux"
import { selectUser } from "@/lib/slices/authSlice"

export default function TabPassword() {
  const user = useSelector(selectUser)

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
      alert("New password and confirm password do not match!")
      return
    }

    try {
      const res = await changePassword({
        email: user?.email || "",
        old_password: form.old_password,
        new_password: form.new_password,
        confirm_password: form.confirm_password,
      }).unwrap()

      console.log("Change password success:", res)
      alert("Password changed successfully!")
      setForm({ old_password: "", new_password: "", confirm_password: "" })
    } catch (err: any) {
      console.error("Change password error:", err)
      alert(err?.data?.message || "Failed to change password")
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Change Password */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <h3 className="text-xl font-black text-gray-900 mb-6 bg-green-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
          Change Password
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Current Password</Label>
            <Input
              type="password"
              value={form.old_password}
              onChange={(e) => handleChange("old_password", e.target.value)}
              placeholder="Enter current password"
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-gray-700">New Password</Label>
            <Input
              type="password"
              value={form.new_password}
              onChange={(e) => handleChange("new_password", e.target.value)}
              placeholder="Enter new password"
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Confirm New Password</Label>
            <Input
              type="password"
              value={form.confirm_password}
              onChange={(e) => handleChange("confirm_password", e.target.value)}
              placeholder="Confirm new password"
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-xl border-2 border-black shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? "Changing..." : "Change Password"}
        </Button>
      </form>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
        <h3 className="text-xl font-black text-gray-900 mb-6 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
          Two-Factor Authentication
        </h3>

        <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
          <div className="space-y-1">
            <h4 className="font-bold text-gray-900">Enable 2FA</h4>
            <p className="text-sm text-gray-600">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  )
}
