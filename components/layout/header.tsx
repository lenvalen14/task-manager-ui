import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings, Search } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 h-16 shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search tasks, projects..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
          />
        </div>
        <span className="text-sm text-gray-500 hidden md:block">managemate.com</span>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          asChild
        >
          <Link href="/notifications">
            <Bell className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          asChild
        >
          <Link href="/settings/profile">
            <Settings className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
        <Avatar className="w-9 h-9 border-2 border-blue-500 shadow-sm">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Alison Hoper" />
          <AvatarFallback className="bg-blue-100 text-blue-600">AH</AvatarFallback>
        </Avatar>
        <span className="font-medium hidden sm:block text-gray-800">Alison Hoper</span>
      </div>
    </header>
  )
}
