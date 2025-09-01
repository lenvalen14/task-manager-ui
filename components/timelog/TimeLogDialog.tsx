"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetTaskTimeReportQuery } from "@/services/timeLogService"
import { Hourglass, History } from "lucide-react"

type DisplayUnit = 'hours' | 'minutes' | 'seconds'

interface TaskReportDialogProps {
  isOpen: boolean
  onClose: () => void
  taskId: number | null
}

export function TaskReportDialog({ isOpen, onClose, taskId }: TaskReportDialogProps) {
    const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('hours')

    const {
    data: reportData,
    isLoading,
    isError,
    } = useGetTaskTimeReportQuery(
    { taskId: taskId! },
    { skip: !taskId }
    )

    let displayValue = 0
    let unitLabel = "Hours"
    const report = reportData?.data
    if (report) {
    switch (displayUnit) {
    case 'minutes':
    displayValue = Number(report.total_minutes ?? 0)
    unitLabel = "Total Minutes"
    break
    case 'seconds':
    displayValue = Number(report.total_seconds ?? 0)
    unitLabel = "Total Seconds"
    break
    case 'hours':
    default:
    displayValue = Number(report.total_hours ?? 0)
    unitLabel = "Total Hours"
    break
    }
    }

    return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Task Time Report</DialogTitle>
            <DialogDescription>
            A summary of the total time spent on this task.
            </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
            {isLoading && <p className="text-center py-8">Loading report...</p>}
            {isError && <p className="text-center text-red-500 py-8">Failed to load report.</p>}

            {report && !isLoading && (
            <>
                <div className="text-center bg-gray-50 p-6 rounded-lg">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{unitLabel}</p>
                <p className="text-6xl font-bold text-blue-600 my-2">
                    {(displayValue ?? 0).toFixed(2)}
                </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                <span className="font-medium text-gray-700">Display unit:</span>
                <Select
                    value={displayUnit}
                    onValueChange={(value: DisplayUnit) => setDisplayUnit(value)}
                >
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="hours">Hours (h)</SelectItem>
                    <SelectItem value="minutes">Minutes (m)</SelectItem>
                    <SelectItem value="seconds">Seconds (s)</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                
                <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center gap-2 font-medium"><Hourglass size={14} /> Formatted Time:</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{report.formatted_time}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center gap-2 font-medium"><History size={14} /> Work Sessions:</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{report.logs_count}</span>
                    </div>
                </div>
            </>
            )}
        </div>
        </DialogContent>
    </Dialog>
    )
}
