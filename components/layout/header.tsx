"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, LogOut, Search, Settings } from "lucide-react"

import { useGetUnreadCountQuery } from "@/services/notificationService"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { logout } from "@/lib/slices/authSlice"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useGetUserByIdQuery } from "@/services/userService"

export function Header() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const router = useRouter()

  const { data: unreadCountData } = useGetUnreadCountQuery()
  const { data: userData } = useGetUserByIdQuery(user?.sub as number, {
    skip: !user?.sub,
  })
  const unreadCount = unreadCountData?.data.unread_count ?? 0

  const handleLogout = () => {
    dispatch(logout())
    router.push("/auth/login")
  }

  const avatarFallbackChar = user?.user_name ? user.user_name[0].toUpperCase() : "U"

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
      {/* === Bên Trái === */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-gray-900">Task Manager</span>
        </div>
      </div>

      {/* === Bên Phải === */}
      <div className="flex items-center gap-3">
        {/* Nút Thông báo */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          asChild
        >
          <Link href="/dashboard/notifications">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Thông báo</span>
            {unreadCount > 0 && (
              <span className="absolute right-0 top-0 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Link>
        </Button>

        {/* Menu Người dùng */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-9 items-center gap-2 rounded-md px-2 hover:bg-gray-100"
            >
              <Avatar className="h-7 w-7">
                {/* Nếu có avatar_url thì hiển thị ảnh */}
                <AvatarImage src={userData?.data.avatar_url || ""} alt={user?.user_name || "Người dùng"} />
                {/* Nếu không có hoặc lỗi load thì fallback ra chữ cái */}
                <AvatarFallback className="bg-gray-200 text-xs text-gray-700">
                  {avatarFallbackChar}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-gray-700 sm:block">
                {user?.user_name || "Khách"}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 border-gray-200 bg-white shadow-sm"
          >
            <DropdownMenuLabel className="text-sm text-gray-900">
              {user?.email || "Chưa có email"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50"
            >
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Cài đặt
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}