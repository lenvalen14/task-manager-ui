"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, BarChart, CalendarDays, Play, Pause, Square, Star, Heart, Sparkle } from "lucide-react"
import Link from "next/link"
import { useStartTimeLogMutation, usePauseTimeLogMutation, useStopTimeLogMutation } from "@/services/timeLogService"
import { useGetTasksQuery } from "@/services/taskService"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function TimeReportsPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [currentLogId, setCurrentLogId] = useState<number | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

  const [startTimeLog, { isLoading: starting }] = useStartTimeLogMutation()
  const [pauseTimeLog, { isLoading: pausing }] = usePauseTimeLogMutation()
  const [stopTimeLog, { isLoading: stopping }] = useStopTimeLogMutation()
  const { data: tasksData } = useGetTasksQuery()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  useEffect(() => {
    const list = Array.isArray(tasksData?.data) ? tasksData!.data : []
    if (selectedTaskId === null && list.length > 0) {
      setSelectedTaskId(Number(list[0].id))
    }
  }, [tasksData, selectedTaskId])

  const handleStart = async () => {
    try {
      if (!selectedTaskId) return
      const res = await startTimeLog({ taskId: selectedTaskId }).unwrap()
      const createdAny: any = res as any
      const created = createdAny?.data ?? createdAny?.result ?? createdAny
      const newId = Number(created?.id)
      if (Number.isFinite(newId)) {
        setCurrentLogId(newId)
        try { localStorage.setItem("currentTimeLogId", String(newId)) } catch {}
      }
      setIsRunning(true)
    } catch (e) {
      console.error(e)
    }
  }
  const handlePause = async () => {
    try {
      const stored = localStorage.getItem("currentTimeLogId")
      const id = currentLogId ?? (stored !== null ? Number(stored) : NaN)
      if (!Number.isFinite(id)) return
      const res = await pauseTimeLog({ timelogId: Number(id) }).unwrap()
      setIsRunning(false)
      // keep duration in UI state if desired
    } catch (e) {
      console.error(e)
    }
  }
  const handleStop = async () => {
    try {
      const stored = localStorage.getItem("currentTimeLogId")
      const id = currentLogId ?? (stored !== null ? Number(stored) : NaN)
      if (!Number.isFinite(id)) return
      const res = await stopTimeLog({ timelogId: Number(id) }).unwrap()
      setIsRunning(false)
      setTime(0)
      setCurrentLogId(null)
      try { localStorage.removeItem("currentTimeLogId") } catch {}
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
          <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all duration-200">
            <Link href="/dashboard">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Back to Dashboard</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Time & Reports</h1>
            <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
              Track your productivity and performance ✨
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Time Tracking */}
          <Card className="border-3 border-black rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 bg-white overflow-hidden">
            <CardHeader className="border-b-2 border-gray-200 bg-gray-50">
              <CardTitle className="text-2xl font-black text-gray-900">Time Tracking</CardTitle>
              <CardDescription className="text-base font-bold text-gray-600">
                Log and manage your time spent on tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-black gap-4">
                <span className="text-lg font-bold text-gray-900">Current Task:</span>
                <div className="min-w-[240px]">
                  <Select
                    value={selectedTaskId !== null ? String(selectedTaskId) : undefined}
                    onValueChange={(v) => setSelectedTaskId(Number(v))}
                  >
                    <SelectTrigger className="bg-white font-bold border-2 border-black">
                      <SelectValue placeholder="Select a task" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Array.isArray(tasksData?.data) ? tasksData!.data : []).map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>{t.title ?? `Task #${t.id}`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 p-6 bg-green-50 rounded-xl border-2 border-black">
                <Clock className={`w-10 h-10 text-green-600 ${isRunning ? 'animate-pulse' : ''}`} />
                <span className="text-5xl font-black text-gray-900 tabular-nums">{formatTime(time)}</span>
              </div>
              <div className="flex gap-3">
                <Button
                  className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${!isRunning
                      ? 'bg-green-400 hover:bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  onClick={handleStart}
                  disabled={isRunning || starting}
                >
                  <Play className="w-4 h-4 mr-2" /> Start
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${isRunning
                      ? 'bg-white hover:bg-gray-50 text-gray-900'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  onClick={handlePause}
                  disabled={!isRunning || pausing}
                >
                  <Pause className="w-4 h-4 mr-2" /> Pause
                </Button>
                <Button
                  variant="destructive"
                  className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${isRunning || time > 0
                      ? 'bg-red-400 hover:bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
                asChild
              >
                <Link href="#">View Time Logs</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Reports */}
          <Card className="border-3 border-black rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 bg-white overflow-hidden">
            <CardHeader className="border-b-2 border-gray-200 bg-gray-50">
              <CardTitle className="text-2xl font-black text-gray-900">Performance Reports</CardTitle>
              <CardDescription className="text-base font-bold text-gray-600">
                Analyze your productivity and task completion
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              <div className="p-4 bg-pink-50 rounded-xl border-2 border-black">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">Tasks Completed</span>
                  <span className="text-lg font-black text-pink-600 bg-pink-100 px-4 py-1 rounded-full">
                    12 this week
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Average Completion</span>
                  <span className="text-lg font-black text-pink-600 bg-pink-100 px-4 py-1 rounded-full">
                    3.5 hours
                  </span>
                </div>
              </div>
              <Button
                variant="secondary"
                className="bg-blue-300 hover:bg-blue-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <BarChart className="w-4 h-4 mr-2" />
                Generate Detailed Report
              </Button>
              <Button
                variant="secondary"
                className="bg-purple-300 hover:bg-purple-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                View Historical Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
