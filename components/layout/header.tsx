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

export function Header() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const router = useRouter()

  const { data: unreadCountData } = useGetUnreadCountQuery()
  const unreadCount = unreadCountData?.data.unread_count ?? 0

  console.log("Unread Count:", unreadCount)

  const handleLogout = () => {
    dispatch(logout())
    router.push("/auth/login")
  }

  const avatarFallbackChar = user?.user_name ? user.user_name[0].toUpperCase() : "U"

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
      {/* === Left Section === */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-gray-900">ManageMate</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 w-80 rounded-md border-gray-200 bg-gray-50 pl-10 focus:border-gray-300 focus:ring-0"
          />
        </div>
      </div>

      {/* === Right Section === */}
      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          asChild
        >
          <Link href="/dashboard/notifications">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
            {unreadCount > 0 && (
              <span className="absolute right-0 top-0 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Link>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-9 items-center gap-2 rounded-md px-2 hover:bg-gray-100"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-gray-200 text-xs text-gray-700">
                  {avatarFallbackChar}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-gray-700 sm:block">
                {user?.user_name || "Guest"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 border-gray-200 bg-white shadow-sm"
          >
            <DropdownMenuLabel className="text-sm text-gray-900">
              {user?.email || "No email"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50"
            >
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}