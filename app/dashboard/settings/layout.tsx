import { Inter } from "next/font/google"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personal Task Manager",
  description: "A personal task and project management web application.",
  generator: 'v0.dev'
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} flex h-screen bg-gray-50 text-gray-900 antialiased`}>
      {children}
    </div>
  )
}
