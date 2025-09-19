"use client"

import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts"
import { TrendingUp, Clock, Calendar, Zap } from "lucide-react"

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
    const value = payload[0].value
    return (
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
        <div className="relative bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-violet-600" />
            <p className="font-bold text-gray-800 text-sm">{`${label}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full animate-pulse"></div>
            <p className="font-bold text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {`${value.toFixed(1)}h`}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">Thời gian làm việc</p>
        </div>
      </div>
    )
  }
  return null
}

const LoadingSpinner = () => (
  <div className="relative">
    <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
  </div>
)

export function ProductivityChart({ data, isLoading }: ProductivityChartProps) {
  // Trạng thái Loading
  if (isLoading) {
    return (
      <div className="h-[500px] relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5"></div>

        <div className="relative h-full flex flex-col items-center justify-center">
          <LoadingSpinner />
          <div className="mt-6 text-center">
            <p className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
              Đang tải dữ liệu
            </p>
            <p className="text-gray-500 mt-2 text-sm">Vui lòng chờ trong giây lát...</p>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-20 right-16 w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-10 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>
    )
  }

  if (!data || data.every(d => d.total_duration_hours === 0)) {
    return (
      <div className="h-[500px] relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-slate-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)]"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-violet-600" />
            </div>
          </div>

          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
            Chưa có dữ liệu
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            Bắt đầu ghi lại thời gian làm việc để xem biểu đồ năng suất của bạn tại đây
          </p>

          <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Zap className="w-4 h-4" />
            <span>Bắt đầu ngay</span>
          </div>
        </div>
      </div>
    )
  }

  const formattedData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date),
  }))

  const maxValue = Math.max(...data.map(d => d.total_duration_hours))
  const avgValue = data.reduce((sum, d) => sum + d.total_duration_hours, 0) / data.length

  return (
    <div className="h-[500px] relative overflow-hidden rounded-3xl">
      {/* Background with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-indigo-50/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.05),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.05),transparent_40%)]"></div>

      {/* Glassmorphism container */}
      <div className="relative h-full bg-white/40 backdrop-blur-sm border border-white/20 rounded-3xl p-6">

        {/* Header Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Năng suất làm việc
              </h3>
              <p className="text-sm text-gray-500">Theo dõi thời gian hàng ngày</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {maxValue.toFixed(1)}h
              </div>
              <div className="text-xs text-gray-500 font-medium">Cao nhất</div>
            </div>
            <div className="w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {avgValue.toFixed(1)}h
              </div>
              <div className="text-xs text-gray-500 font-medium">Trung bình</div>
            </div>
          </div>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                {/* Modern gradient */}
                <linearGradient id="modernGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>

                {/* Glow effect */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Shadow */}
                <filter id="modernShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#8b5cf6" floodOpacity="0.2" />
                </filter>
              </defs>

              <CartesianGrid
                strokeDasharray="2 6"
                stroke="url(#gridGradient)"
                vertical={false}
                strokeOpacity={0.3}
              />

              <defs>
                <linearGradient id="gridGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e5e7eb" stopOpacity={0} />
                  <stop offset="50%" stopColor="#d1d5db" stopOpacity={1} />
                  <stop offset="100%" stopColor="#e5e7eb" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="formattedDate"
                tick={{
                  fill: '#6b7280',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />

              <YAxis
                tickFormatter={(value) => `${value}h`}
                tick={{
                  fill: '#6b7280',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="total_duration_hours"
                stroke="url(#modernGradient)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#modernGradient)"
                filter="url(#modernShadow)"
                dot={{
                  r: 4,
                  stroke: '#6366f1',
                  fill: 'white',
                  strokeWidth: 3,
                  filter: 'url(#glow)'
                }}
                activeDot={{
                  r: 8,
                  stroke: '#8b5cf6',
                  fill: 'white',
                  strokeWidth: 4,
                  className: "drop-shadow-lg",
                  style: {
                    filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
                  }
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-8 right-8 w-2 h-2 bg-violet-400/60 rounded-full animate-pulse"></div>
      <div className="absolute bottom-12 left-8 w-1 h-1 bg-indigo-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  )
}