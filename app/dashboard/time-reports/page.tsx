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
import { useGetUserStatsQuery } from "@/services/statsService"

// --- Hàm tiện ích ---

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// --- Component Trang chính ---

export default function TimeReportsPage() {
    // Trạng thái theo dõi thời gian
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(0)
    const [offset, setOffset] = useState(0)
    const [currentLogId, setCurrentLogId] = useState<number | null>(null)
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

    // Trạng thái Dialog
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
    const [isDetailedDialogOpen, setIsDetailedDialogOpen] = useState(false)

    // RTK Query Hooks
    const [startTimeLog, { isLoading: starting }] = useStartTimeLogMutation()
    const [pauseTimeLog, { isLoading: pausing }] = usePauseTimeLogMutation()
    const [stopTimeLog, { isLoading: stopping }] = useStopTimeLogMutation()
    const { data: tasksData } = useGetTasksQuery()
    const { data: summaryResponse, isLoading: isSummaryLoading } = useGetDailySummaryQuery()

    const { data: statsResponse, isLoading: isLoadingStats } =
        useGetUserStatsQuery()
    const userStats = statsResponse?.data

    function timeToSeconds(timeString: string) {
        const [h, m, s] = timeString.split(":").map(Number);
        return h * 3600 + m * 60 + s;
    }

    function secondsToHMS(seconds: number) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }

    // --- Load trạng thái timer từ localStorage khi vào trang ---
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

    // --- Cập nhật timer mỗi giây khi đang chạy ---
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

    // --- Tự chọn task đầu tiên nếu chưa chọn ---
    useEffect(() => {
        const taskList = Array.isArray(tasksData?.data) ? tasksData.data : []
        if (selectedTaskId === null && taskList.length > 0) {
            setSelectedTaskId(Number(taskList[0].id))
        }
    }, [tasksData, selectedTaskId])

    // --- Xử lý bắt đầu timer ---
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
                console.error("API trả về ID time log không hợp lệ.", res)
                alert("Lỗi: Không thể bắt đầu bấm giờ. Phản hồi từ server không hợp lệ.");
            }

        } catch (e) {
            console.error("Không thể bắt đầu time log:", e)
        }
    }

    // --- Xử lý tạm dừng ---
    const handlePause = async () => {
        if (!currentLogId) return
        try {
            await pauseTimeLog({ timelogId: currentLogId }).unwrap()
            setIsRunning(false)
            setOffset(time)
            localStorage.setItem("currentTimeLogOffset", String(time))
            localStorage.removeItem("currentTimeLogStart")
        } catch (e) {
            console.error("Không thể tạm dừng time log:", e)
        }
    }

    // --- Xử lý dừng ---
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
            console.error("Không thể dừng time log:", e)
        }
    }

    return (
        <>
            <div className="flex-1 min-h-screen p-8 overflow-auto bg-white w-full">
                {/* Header trang */}
                <div className="flex items-center gap-6 mb-8">
                    <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all">
                        <Link href="/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Thời gian & Báo cáo</h1>
                        <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Theo dõi năng suất và hiệu suất làm việc ✨
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2">
                    {/* Card theo dõi thời gian */}
                    <Card className="border-3 border-black rounded-xl shadow-xl hover:shadow-2xl transition-all bg-white overflow-hidden">
                        <CardHeader className="border-b-2 border-gray-200 bg-gray-50">
                            <CardTitle className="text-2xl font-black text-gray-900">Theo dõi thời gian</CardTitle>
                            <CardDescription className="text-base font-bold text-gray-600">Ghi log và quản lý thời gian bạn dành cho công việc</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 p-6">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-black gap-4">
                                <span className="text-lg font-bold text-gray-900">Công việc hiện tại:</span>
                                <div className="min-w-[240px]">
                                    <Select value={selectedTaskId !== null ? String(selectedTaskId) : undefined} onValueChange={(v) => setSelectedTaskId(Number(v))}>
                                        <SelectTrigger className="bg-white font-bold border-2 border-black">
                                            <SelectValue placeholder="Chọn một công việc" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(Array.isArray(tasksData?.data) ? tasksData.data : []).map((t: any) => (
                                                <SelectItem key={t.id} value={String(t.id)}>{t.title ?? `Công việc #${t.id}`}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-4 p-6 bg-green-50 rounded-xl border-2 border-black">
                                <Clock className={`w-10 h-10 text-green-600 ${isRunning ? "animate-pulse" : ""}`} />
                                <span className="text-5xl font-black text-gray-900 tabular-nums">{formatTime(time)}</span>
                            </div>
                            <div className="flex gap-3">
                                <Button className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105 ${!isRunning ? "bg-green-400 hover:bg-green-500 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`} onClick={handleStart} disabled={isRunning || starting}><Play className="w-4 h-4 mr-2" /> Bắt đầu</Button>
                                <Button variant="outline" className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105 ${isRunning ? "bg-white hover:bg-gray-50 text-gray-900" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`} onClick={handlePause} disabled={!isRunning || pausing}><Pause className="w-4 h-4 mr-2" /> Tạm dừng</Button>
                                <Button variant="destructive" className={`flex-1 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105 ${isRunning || time > 0 ? "bg-red-400 hover:bg-red-500 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`} onClick={handleStop} disabled={(!isRunning && time === 0) || stopping}><Square className="w-4 h-4 mr-2" /> Dừng</Button>
                            </div>
                            <Button variant="secondary" className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105" onClick={() => setIsReportModalOpen(true)} disabled={!selectedTaskId}>Xem Time Logs</Button>
                        </CardContent>
                    </Card>

                    {/* Card báo cáo */}
                    <Card className="border-3 border-black rounded-xl shadow-xl hover:shadow-2xl transition-all bg-white overflow-hidden">
                        <CardHeader className="border-b-2 border-gray-200 bg-gray-50">
                            <CardTitle className="text-2xl font-black text-gray-900">Báo cáo hiệu suất</CardTitle>
                            <CardDescription className="text-base font-bold text-gray-600">Phân tích năng suất và tiến độ công việc</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 p-6">
                            <div className="p-4 bg-pink-50 rounded-xl border-2 border-black">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-lg font-bold text-gray-900">Công việc đã hoàn thành</span>
                                    <span className="text-lg font-black text-pink-600 bg-pink-100 px-4 py-1 rounded-full">
                                        {isLoadingStats ? "..." : `${userStats?.tasks_completed} / ${userStats?.tasks_total}`} Công việc
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">Thời gian trung bình</span>
                                    <span className="text-lg font-black text-pink-600 bg-pink-100 px-4 py-1 rounded-full">
                                        {isLoadingStats
                                            ? "..."
                                            : secondsToHMS(
                                                Math.floor(
                                                    timeToSeconds(userStats?.total_time_logged || "00:00:00") /
                                                    (userStats?.tasks_total || 1)
                                                )
                                            )}
                                    </span>
                                </div>
                            </div>
                            <Button variant="secondary" className="bg-blue-300 hover:bg-blue-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105" onClick={() => setIsDetailedDialogOpen(true)}><BarChart className="w-4 h-4 mr-2" /> Tạo báo cáo chi tiết</Button>
                            <Button variant="secondary" className="bg-purple-300 hover:bg-purple-400 text-gray-900 font-bold border-2 border-black rounded-xl shadow-md transition-all transform hover:scale-105" onClick={() => setIsHistoryDialogOpen(true)}><CalendarDays className="w-4 h-4 mr-2" /> Xem dữ liệu lịch sử</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* --- Tất cả Dialogs --- */}
            <TaskReportDialog isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} taskId={selectedTaskId} />

            <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
                <DialogContent className="max-w-2xl border-3 border-black rounded-xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-2">
                            <History className="w-6 h-6 text-orange-500" />
                            Báo cáo lịch sử công việc
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 max-h-[500px] overflow-y-auto">
                        <TaskHistoryList />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isDetailedDialogOpen} onOpenChange={setIsDetailedDialogOpen}>
                <DialogContent className="max-w-5xl border-2 border-black rounded-xl shadow-xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-gray-900">Báo cáo chi tiết hiệu suất</DialogTitle>
                    </DialogHeader>
                    <div className="bg-gray-50">
                        <ProductivityChart data={summaryResponse?.data} isLoading={isSummaryLoading} />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
