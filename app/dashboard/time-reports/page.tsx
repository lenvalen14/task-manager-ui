"use client"

import { useState, useEffect } from "react"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft, Clock, BarChart, CalendarDays,
  Play, Pause, Square, Star, Heart, Sparkle, History
} from "lucide-react"
import Link from "next/link"
import {
  useStartTimeLogMutation,
  usePauseTimeLogMutation,
  useStopTimeLogMutation
} from "@/services/timeLogService"
import { useGetTasksQuery } from "@/services/taskService"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { TaskReportDialog } from "@/components/timelog/TimeLogDialog"
import { TaskHistoryList } from "@/components/timelog/HistoricalTimeLogDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#82ca9d", "#8884d8", "#ffc658", "#ff7f7f", "#8dd1e1"]


// Fake data demo
const productivityData = {
  day: [
    { label: "Mon", value: 5 },
    { label: "Tue", value: 8 },
    { label: "Wed", value: 6 },
    { label: "Thu", value: 10 },
    { label: "Fri", value: 7 },
    { label: "Sat", value: 4 },
    { label: "Sun", value: 9 },
  ],
  week: [
    { label: "Week 1", value: 42 },
    { label: "Week 2", value: 38 },
    { label: "Week 3", value: 55 },
    { label: "Week 4", value: 47 },
  ],
  month: [
    { label: "Jan", value: 180 },
    { label: "Feb", value: 150 },
    { label: "Mar", value: 200 },
    { label: "Apr", value: 170 },
  ],
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function TimeReportsPage() {
  const [isRunning, setIsRunning] = useState(false) // đang chạy hay không
  const [time, setTime] = useState(0) // tổng số giây đã đếm
  const [offset, setOffset] = useState(0) // số giây đã tích lũy trước khi resume
  const [currentLogId, setCurrentLogId] = useState<number | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [isDetailedDialogOpen, setIsDetailedDialogOpen] = useState(false)
  const [filter, setFilter] = useState<"day" | "week" | "month">("day")

  const [startTimeLog, { isLoading: starting }] = useStartTimeLogMutation()
  const [pauseTimeLog, { isLoading: pausing }] = usePauseTimeLogMutation()
  const [stopTimeLog, { isLoading: stopping }] = useStopTimeLogMutation()
  const { data: tasksData } = useGetTasksQuery()

  // khi render lại → check localStorage để khôi phục state
  useEffect(() => {
    const storedStart = localStorage.getItem("currentTimeLogStart")
    const storedLogId = localStorage.getItem("currentTimeLogId")
    const storedOffset = localStorage.getItem("currentTimeLogOffset")

    if (storedOffset) setOffset(Number(storedOffset))

    if (storedStart) {
      const startDate = new Date(storedStart)
      const elapsed = Math.floor((Date.now() - startDate.getTime()) / 1000)
      setTime(elapsed)
      setIsRunning(true)
    }

    if (storedLogId) {
      setCurrentLogId(Number(storedLogId))
    }
  }, [])

  // interval cập nhật time
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => {
        const storedStart = localStorage.getItem("currentTimeLogStart")
        const storedOffset = localStorage.getItem("currentTimeLogOffset")
        if (storedStart) {
          const startDate = new Date(storedStart)
          const elapsed = Math.floor((Date.now() - startDate.getTime()) / 1000)
          const base = storedOffset ? Number(storedOffset) : 0
          setTime(base + elapsed)
        }
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  // tự chọn task đầu tiên nếu chưa chọn
  useEffect(() => {
    const list = Array.isArray(tasksData?.data) ? tasksData!.data : []
    if (selectedTaskId === null && list.length > 0) {
      setSelectedTaskId(Number(list[0].id))
    }
  }, [tasksData, selectedTaskId])

  const handleStart = async () => {
    if (!selectedTaskId) return
    try {
      // Nếu chưa có log → gọi API tạo mới
      if (!currentLogId) {
        const res = await startTimeLog({ taskId: selectedTaskId }).unwrap()
        const createdAny: any = res as any
        const created = createdAny?.data ?? createdAny?.result ?? createdAny
        const newId = Number(created?.id)
        if (Number.isFinite(newId)) {
          setCurrentLogId(newId)
          localStorage.setItem("currentTimeLogId", String(newId))
        }
      }

      // Ghi nhận startTime mới
      const now = new Date().toISOString()
      localStorage.setItem("currentTimeLogStart", now)
      localStorage.setItem("currentTimeLogOffset", String(offset))

      setIsRunning(true)
    } catch (e) {
      console.error(e)
    }
  }

  //  Pause = lưu offset + dừng interval
  const handlePause = async () => {
    const stored = localStorage.getItem("currentTimeLogId")
    const id = currentLogId ?? (stored !== null ? Number(stored) : NaN)
    if (!Number.isFinite(id)) return
    try {
      await pauseTimeLog({ timelogId: Number(id) }).unwrap()
      setIsRunning(false)

      // Lưu offset = time hiện tại
      setOffset(time)
      localStorage.setItem("currentTimeLogOffset", String(time))

      // Xóa dấu start
      localStorage.removeItem("currentTimeLogStart")
    } catch (e) {
      console.error(e)
    }
  }

  // ⏹ Stop = reset hết
  const handleStop = async () => {
    const stored = localStorage.getItem("currentTimeLogId")
    const id = currentLogId ?? (stored !== null ? Number(stored) : NaN)
    if (!Number.isFinite(id)) return
    try {
      await stopTimeLog({ timelogId: Number(id) }).unwrap()
      setIsRunning(false)
      setTime(0)
      setOffset(0)
      setCurrentLogId(null)

      // Dọn localStorage
      localStorage.removeItem("currentTimeLogId")
      localStorage.removeItem("currentTimeLogStart")
      localStorage.removeItem("currentTimeLogOffset")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="flex-1 min-h-screen p-8 overflow-auto bg-white w-full">
        {/* Decorative elements */}
        <div className="absolute top-4 right-8">
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
        </div>
        <div className="absolute top-8 right-16">
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse delay-300" />
        </div>
        <div className="absolute top-6 right-24">
          <Sparkle className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse delay-700" />
        </div>

        <div className="flex items-center gap-6 mb-8">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all duration-200"
          >
            <Link href="/dashboard">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              Time & Reports
            </h1>
            <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
              Track your productivity and performance ✨
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2">
          {/* Time Tracking Card */}
          <Card className="border-3 border-black rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 bg-white overflow-hidden">
            <CardHeader className="border-b-2 border-gray-200 bg-gray-50">
              <CardTitle className="text-2xl font-black text-gray-900">
                Time Tracking
              </CardTitle>
              <CardDescription className="text-base font-bold text-gray-600">
                Log and manage your time spent on tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-black gap-4">
                <span className="text-lg font-bold text-gray-900">
                  Current Task:
                </span>
                <div className="min-w-[240px]">
                  <Select
                    value={selectedTaskId !== null ? String(selectedTaskId) : undefined}
                    onValueChange={(v) => setSelectedTaskId(Number(v))}
                  >
                    <SelectTrigger className="bg-white font-bold border-2 border-black">
                      <SelectValue placeholder="Select a task" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Array.isArray(tasksData?.data) ? tasksData!.data : []).map((t: any) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.title ?? `Task #${t.id}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 p-6 bg-green-50 rounded-xl border-2 border-black">
                <Clock className={`w-10 h-10 text-green-600 ${isRunning ? "animate-pulse" : ""}`} />
                <span className="text-5xl font-black text-gray-900 tabular-nums">
                  {formatTime(time)}
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${!isRunning
                    ? "bg-green-400 hover:bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  onClick={handleStart}
                  disabled={isRunning || starting}
                >
                  <Play className="w-4 h-4 mr-2" /> Start
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${isRunning
                    ? "bg-white hover:bg-gray-50 text-gray-900"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  onClick={handlePause}
                  disabled={!isRunning || pausing}
                >
                  <Pause className="w-4 h-4 mr-2" /> Pause
                </Button>
                <Button
                  variant="destructive"
                  className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${isRunning || time > 0
                    ? "bg-red-400 hover:bg-red-500 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  onClick={handleStop}
                  disabled={(!isRunning && time === 0) || stopping}
                >
                  <Square className="w-4 h-4 mr-2" /> Stop
                </Button>
              </div>
              <Button
                variant="secondary"
                className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsReportModalOpen(true)}
                disabled={!selectedTaskId}
              >
                View Time Logs
              </Button>
            </CardContent>
          </Card>

          {/* Reports Card */}
          <Card className="border-3 border-black rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 bg-white overflow-hidden">
            <CardHeader className="border-b-2 border-gray-200 bg-gray-50">
              <CardTitle className="text-2xl font-black text-gray-900">
                Performance Reports
              </CardTitle>
              <CardDescription className="text-base font-bold text-gray-600">
                Analyze your productivity and task completion
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <div className="p-4 bg-pink-50 rounded-xl border-2 border-black">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    Tasks Completed
                  </span>
                  <span className="text-lg font-black text-pink-600 bg-pink-100 px-4 py-1 rounded-full">
                    12 this week
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Average Completion
                  </span>
                  <span className="text-lg font-black text-pink-600 bg-pink-100 px-4 py-1 rounded-full">
                    3.5 hours
                  </span>
                </div>
              </div>
              <Button
                variant="secondary"
                className="bg-blue-300 hover:bg-blue-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsDetailedDialogOpen(true)}
              >
                <BarChart className="w-4 h-4 mr-2" />
                Generate Detailed Report
              </Button>

              <Button
                variant="secondary"
                className="bg-purple-300 hover:bg-purple-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsHistoryDialogOpen(true)}
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                View Historical Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <TaskReportDialog
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        taskId={selectedTaskId}
      />

      {/* Task History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-2xl border-3 border-black rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <History className="w-6 h-6 text-orange-500" />
              Task History Report
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[500px] overflow-y-auto">
            <TaskHistoryList />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailedDialogOpen} onOpenChange={setIsDetailedDialogOpen}>
        <DialogContent className="max-w-3xl border-2 border-black rounded-xl shadow-xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl font-black text-gray-900">
              Productivity Report
            </DialogTitle>
            <Select value={filter} onValueChange={(val) => setFilter(val as any)}>
              <SelectTrigger className="w-[150px] border-2 border-black rounded-lg">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">By Day</SelectItem>
                <SelectItem value="week">By Week</SelectItem>
                <SelectItem value="month">By Month</SelectItem>
              </SelectContent>
            </Select>
          </DialogHeader>

          {/* Biểu đồ đường */}
          <div className="h-[300px] mt-4 border-2 border-black rounded-lg p-2 bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData[filter]}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>

    </>
  )
}