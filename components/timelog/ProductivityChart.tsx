"use client"

import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts"
import { BarChart2, Clock } from "lucide-react"

interface ChartDataPoint {
  date: string
  total_duration_hours: number
}

interface ProductivityChartProps {
  data: ChartDataPoint[] | undefined
  isLoading: boolean
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${day}/${month}`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border-2 border-black shadow-lg">
        <p className="font-bold text-gray-800 text-base">{`Ngày: ${label}`}</p>
        <div className="flex items-center gap-2 mt-1">
          <Clock className="w-4 h-4 text-purple-600" />
          <p className="font-semibold text-purple-800">{`${payload[0].value.toFixed(2)} giờ làm việc`}</p>
        </div>
      </div>
    )
  }
  return null
}

export function ProductivityChart({ data, isLoading }: ProductivityChartProps) {
  // Trạng thái Loading
  if (isLoading) {
    return (
      <div className="h-[450px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 font-semibold animate-pulse">Đang tải dữ liệu biểu đồ...</p>
      </div>
    )
  }

  if (!data || data.every(d => d.total_duration_hours === 0)) {
    return (
      <div className="h-[450px] flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-gray-500">
        <BarChart2 className="w-12 h-12 mb-2" />
        <p className="font-semibold">Không có dữ liệu để hiển thị</p>
        <p className="text-sm">Hãy bắt đầu ghi lại thời gian làm việc của bạn!</p>
      </div>
    )
  }
  
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date),
  }))

  return (
    <div className="h-[450px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>

            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.4"/>
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" vertical={false} />
          
          <XAxis 
            dataKey="formattedDate" 
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} 
            axisLine={{ stroke: '#111827', strokeWidth: 1.5 }} 
            tickLine={{ stroke: '#6b7280' }}
            dy={10}
          />
          <YAxis 
            tickFormatter={(value) => `${value}h`} 
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} 
            axisLine={{ stroke: '#111827', strokeWidth: 1.5 }} 
            tickLine={false}
            dx={-5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="total_duration_hours" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#chartGradient)"
            filter="url(#shadow)"
            dot={{ r: 5, stroke: '#4f46e5', fill: 'white', strokeWidth: 2 }}
            activeDot={{ 
              r: 8, 
              stroke: '#8b5cf6', 
              fill: '#c7d2fe', 
              strokeWidth: 2, 
              className: "animate-pulse"
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}