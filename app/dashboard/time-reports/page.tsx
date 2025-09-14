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
    useStopTimeLogMutation,
    useGetDailySummaryQuery
} from "@/services/timeLogService"
import { useGetTasksQuery } from "@/services/taskService"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { TaskReportDialog } from "@/components/timelog/TimeLogDialog"
import { TaskHistoryList } from "@/components/timelog/HistoricalTimeLogDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductivityChart } from "@/components/timelog/ProductivityChart"

// --- Helper Functions ---

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// --- Main Page Component ---

export default function TimeReportsPage() {
    // State for Time Tracking
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(0)
    const [offset, setOffset] = useState(0)
    const [currentLogId, setCurrentLogId] = useState<number | null>(null)
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

    // State for Dialogs
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
    const [isDetailedDialogOpen, setIsDetailedDialogOpen] = useState(false)

    // RTK Query Hooks
    const [startTimeLog, { isLoading: starting }] = useStartTimeLogMutation()
    const [pauseTimeLog, { isLoading: pausing }] = usePauseTimeLogMutation()
    const [stopTimeLog, { isLoading: stopping }] = useStopTimeLogMutation()
    const { data: tasksData } = useGetTasksQuery()
    const { data: summaryResponse, isLoading: isSummaryLoading } = useGetDailySummaryQuery()

    // --- Effects ---

    // Restore timer state from localStorage on initial render
    useEffect(() => {
        const storedStart = localStorage.getItem("currentTimeLogStart")
        const storedLogId = localStorage.getItem("currentTimeLogId")
        const storedOffset = localStorage.getItem("currentTimeLogOffset")

        if (storedOffset) setOffset(Number(storedOffset))
        if (storedLogId) setCurrentLogId(Number(storedLogId))

        if (storedStart) {
            const startDate = new Date(storedStart)
            const elapsed = Math.floor((Date.now() - startDate.getTime()) / 1000)
            setTime(Number(storedOffset || 0) + elapsed)
            setIsRunning(true)
        }
    }, [])

    // Interval to update the timer every second when it's running
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isRunning) {
            interval = setInterval(() => {
                const storedStart = localStorage.getItem("currentTimeLogStart")
                if (storedStart) {
                    const startDate = new Date(storedStart)
                    const elapsed = Math.floor((Date.now() - startDate.getTime()) / 1000)
                    setTime(offset + elapsed)
                }
            }, 1000)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, offset])

    // Auto-select the first task if none is selected
    useEffect(() => {
        const taskList = Array.isArray(tasksData?.data) ? tasksData.data : []
        if (selectedTaskId === null && taskList.length > 0) {
            setSelectedTaskId(Number(taskList[0].id))
        }
    }, [tasksData, selectedTaskId])

    const handleStart = async () => {
        if (!selectedTaskId) return
        try {
            const res = await startTimeLog({ taskId: selectedTaskId }).unwrap()
            
            const newLogObject = res.data;

            if (newLogObject && typeof newLogObject.id === 'number') {
                const logId = newLogObject.id;

                setCurrentLogId(logId)
                localStorage.setItem("currentTimeLogId", String(logId))
                localStorage.setItem("currentTimeLogTaskId", String(selectedTaskId))
                localStorage.setItem("currentTimeLogStart", new Date().toISOString())
                localStorage.setItem("currentTimeLogOffset", String(offset))
                setIsRunning(true)

            } else {
                console.error("Failed to get a valid time log ID from the API response.", res)
                alert("Error: Could not start the timer. Invalid response from server.");
            }

        } catch (e) {
            console.error("Failed to start time log:", e)
        }
    }

    const handlePause = async () => {
        if (!currentLogId) return
        try {
            await pauseTimeLog({ timelogId: currentLogId }).unwrap()
            setIsRunning(false)
            setOffset(time)
            localStorage.setItem("currentTimeLogOffset", String(time))
            localStorage.removeItem("currentTimeLogStart")
        } catch (e) {
            console.error("Failed to pause time log:", e)
        }
    }

    const handleStop = async () => {
        if (!currentLogId) return
        try {
            await stopTimeLog({ timelogId: currentLogId }).unwrap()
            setIsRunning(false)
            setTime(0)
            setOffset(0)
            setCurrentLogId(null)
            localStorage.removeItem("currentTimeLogId")
            localStorage.removeItem("currentTimeLogStart")
            localStorage.removeItem("currentTimeLogOffset")
        } catch (e) {
            console.error("Failed to stop time log:", e)
        }
    }

    return (
        <>
            <div className="flex-1 min-h-screen p-8 overflow-auto bg-white w-full">
                {/* Decorative elements */}
                <div className="absolute top-4 right-8"><Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" /></div>
                <div className="absolute top-8 right-16"><Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse delay-300" /></div>
                <div className="absolute top-6 right-24"><Sparkle className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse delay-700" /></div>

                {/* Page Header */}
                <div className="flex items-center gap-6 mb-8">
                    <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all">
                        <Link href="/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Time & Reports</h1>
                        <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Track your productivity and performance ✨
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2">
                    {/* Time Tracking Card */}
                    <Card className="border-3 border-black rounded-xl shadow-xl hover:shadow-2xl transition-all bg-white overflow-hidden">
                        <CardHeader className="border-b-2 border-gray-200 bg-gray-50"><CardTitle className="text-2xl font-black text-gray-900">Time Tracking</CardTitle><CardDescription className="text-base font-bold text-gray-600">Log and manage your time spent on tasks</CardDescription></CardHeader>
                        <CardContent className="grid gap-6 p-6">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-black gap-4">
                                <span className="text-lg font-bold text-gray-900">Current Task:</span>
                                <div className="min-w-[240px]">
                                    <Select value={selectedTaskId !== null ? String(selectedTaskId) : undefined} onValueChange={(v) => setSelectedTaskId(Number(v))}>
                                        <SelectTrigger className="bg-white font-bold border-2 border-black"><SelectValue placeholder="Select a task" /></SelectTrigger>
                                        <SelectContent>{(Array.isArray(tasksData?.data) ? tasksData.data : []).map((t: any) => (<SelectItem key={t.id} value={String(t.id)}>{t.title ?? `Task #${t.id}`}</SelectItem>))}</SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-4 p-6 bg-green-50 rounded-xl border-2 border-black">
                                <Clock className={`w-10 h-10 text-green-600 ${isRunning ? "animate-pulse" : ""}`} />
                                <span className="text-5xl font-black text-gray-900 tabular-nums">{formatTime(time)}</span>
                            </div>
                            <div className="flex gap-3">
                                <Button className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105 ${!isRunning ? "bg-green-400 hover:bg-green-500 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`} onClick={handleStart} disabled={isRunning || starting}><Play className="w-4 h-4 mr-2" /> Start</Button>
                                <Button variant="outline" className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105 ${isRunning ? "bg-white hover:bg-gray-50 text-gray-900" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`} onClick={handlePause} disabled={!isRunning || pausing}><Pause className="w-4 h-4 mr-2" /> Pause</Button>
                                <Button variant="destructive" className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105 ${isRunning || time > 0 ? "bg-red-400 hover:bg-red-500 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`} onClick={handleStop} disabled={(!isRunning && time === 0) || stopping}><Square className="w-4 h-4 mr-2" /> Stop</Button>
                            </div>
                            <Button variant="secondary" className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105" onClick={() => setIsReportModalOpen(true)} disabled={!selectedTaskId}>View Time Logs</Button>
                        </CardContent>
                    </Card>

                    {/* Reports Card */}
                    <Card className="border-3 border-black rounded-xl shadow-xl hover:shadow-2xl transition-all bg-white overflow-hidden">
                        <CardHeader className="border-b-2 border-gray-200 bg-gray-50"><CardTitle className="text-2xl font-black text-gray-900">Performance Reports</CardTitle><CardDescription className="text-base font-bold text-gray-600">Analyze your productivity and task completion</CardDescription></CardHeader>
                        <CardContent className="grid gap-6 p-6">
                            <div className="p-4 bg-pink-50 rounded-xl border-2 border-black">
                                <div className="flex items-center justify-between mb-2"><span className="text-lg font-bold text-gray-900">Tasks Completed</span><span className="text-lg font-black text-pink-600 bg-pink-100 px-4 py-1 rounded-full">12 this week</span></div>
                                <div className="flex items-center justify-between"><span className="text-lg font-bold text-gray-900">Average Completion</span><span className="text-lg font-black text-pink-600 bg-pink-100 px-4 py-1 rounded-full">3.5 hours</span></div>
                            </div>
                            <Button variant="secondary" className="bg-blue-300 hover:bg-blue-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105" onClick={() => setIsDetailedDialogOpen(true)}><BarChart className="w-4 h-4 mr-2" /> Generate Detailed Report</Button>
                            <Button variant="secondary" className="bg-purple-300 hover:bg-purple-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105" onClick={() => setIsHistoryDialogOpen(true)}><CalendarDays className="w-4 h-4 mr-2" /> View Historical Data</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* --- All Dialogs --- */}
            <TaskReportDialog isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} taskId={selectedTaskId} />

            <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
                <DialogContent className="max-w-2xl border-3 border-black rounded-xl shadow-2xl"><DialogHeader><DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-2"><History className="w-6 h-6 text-orange-500" />Task History Report</DialogTitle></DialogHeader><div className="mt-4 max-h-[500px] overflow-y-auto"><TaskHistoryList /></div></DialogContent>
            </Dialog>

          <Dialog open={isDetailedDialogOpen} onOpenChange={setIsDetailedDialogOpen}>
              <DialogContent className="max-w-5xl border-2 border-black rounded-xl shadow-xl p-6">
                  <DialogHeader>
                      <DialogTitle className="text-2xl font-black text-gray-900">Báo cáo năng suất 30 ngày qua</DialogTitle>
                  </DialogHeader>
                  <div className="h-[450px] mt-4 p-4 bg-gray-50">
                      <ProductivityChart data={summaryResponse?.data} isLoading={isSummaryLoading} />
                  </div>
              </DialogContent>
          </Dialog>
        </>
    )
}