import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Inter } from "next/font/google"
import { Metadata } from "next"
import { NotificationProvider } from "@/lib/contexts/NotificationContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personal Task Manager",
  description: "A personal task and project management web application.",
    generator: 'v0.dev'
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <div className="flex h-screen bg-gray-50 text-gray-900 antialiased">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </NotificationProvider>
  );
}


