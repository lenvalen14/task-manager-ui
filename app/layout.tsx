import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { ReduxProvider } from "@/components/providers/redux-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personal Task Manager",
  description: "A personal task and project management web application.",
  generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Toaster />
          <SonnerToaster
            position="top-center"
            richColors
            closeButton
            expand={true}
          />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
