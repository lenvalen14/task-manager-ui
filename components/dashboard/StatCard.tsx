"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description: string
  Icon: LucideIcon
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  Icon,
  className = "",
}: StatCardProps) {
  return (
    <Card
      className={`group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border-3 border-black hover:scale-110 cursor-pointer transform hover:-rotate-1 ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-black text-gray-900 uppercase tracking-wide">
          {title}
        </CardTitle>
        <div className="p-3 rounded-xl bg-white border-2 border-black shadow-md group-hover:scale-110 transition-transform duration-200">
          <Icon className="h-6 w-6 text-gray-900" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-black text-gray-900 mb-2">{value}</div>
        <p className="text-sm text-gray-800 font-bold bg-white px-2 py-1 rounded-full border-2 border-black shadow-sm inline-block">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}