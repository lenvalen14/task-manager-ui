"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, Search, LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/lib/slices/authSlice"
import { RootState } from "@/lib/store"
import { useRouter } from "next/navigation"  

export function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  const router = useRouter() 
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 h-16 shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <span className="font-medium text-lg text-gray-900">
            ManageMate
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-80 h-9 border-gray-200 focus:border-gray-300 focus:ring-0 bg-gray-50"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          asChild
        >
          <Link href="/dashboard/notifications">
            <Bell className="w-4 h-4" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 h-9 px-2">
              <Avatar className="w-7 h-7">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt={user.user_name || "User"} />
                <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                  {user.user_name ? user.user_name[0].toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:block text-gray-700">
                {user.user_name || "Guest"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-white border border-gray-200 shadow-sm"
          >
            <DropdownMenuLabel className="text-gray-900 text-sm">
              {user.email || "No email"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-gray-700 hover:bg-gray-50 text-sm">
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-gray-700 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer text-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
