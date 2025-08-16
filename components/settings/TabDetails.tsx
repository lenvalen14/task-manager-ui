"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/services/userService"
import { UserUpdateRequest } from "@/types/userType"

type TabDetailsProps = {
  userId: number
};

export default function TabDetails({ userId }: TabDetailsProps) {
  const { data, isLoading } = useGetUserByIdQuery(userId)
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const [formData, setFormData] = useState<UserUpdateRequest>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  })

  const [originalData, setOriginalData] = useState<UserUpdateRequest | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Load dữ liệu từ API vào form
  useEffect(() => {
    if (data?.data) {
      const user = data.data
      const initData: UserUpdateRequest = {
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      }
      setFormData(initData)
      setOriginalData(initData)
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData)
    }
    setIsEditing(false)
  }

  const handleSubmit = async () => {
    try {
      await updateUser({ id: userId, body: formData }).unwrap()
      setOriginalData(formData)
      setIsEditing(false)
    } catch (err) {
      console.error("Update failed:", err)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900 bg-blue-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
            Personal Information
          </h3>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={handleCancel}>Hủy</Button>
              <Button onClick={handleSubmit} disabled={isUpdating}>
                {isUpdating ? "Đang lưu..." : "Xác nhận"}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">First Name</Label>
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Last Name</Label>
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
