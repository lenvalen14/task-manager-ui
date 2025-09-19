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
  let unitLabel = "Giờ (Hours)"
  const report = reportData?.data
  if (report) {
    switch (displayUnit) {
      case 'minutes':
        displayValue = Number(report.total_minutes ?? 0)
        unitLabel = "Phút (Minutes)"
        break
      case 'seconds':
        displayValue = Number(report.total_seconds ?? 0)
        unitLabel = "Giây (Seconds)"
        break
      case 'hours':
      default:
        displayValue = Number(report.total_hours ?? 0)
        unitLabel = "Giờ (Hours)"
        break
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Báo cáo thời gian Task</DialogTitle>
          <DialogDescription>
            Tóm tắt tổng thời gian đã làm việc trên task này.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {isLoading && <p className="text-center py-8">Đang tải báo cáo...</p>}
          {isError && <p className="text-center text-red-500 py-8">Không thể tải báo cáo.</p>}

          {report && !isLoading && (
            <>
              <div className="text-center bg-gray-50 p-6 rounded-lg">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{unitLabel}</p>
                <p className="text-6xl font-bold text-blue-600 my-2">
                  {(displayValue ?? 0).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <span className="font-medium text-gray-700">Đơn vị hiển thị:</span>
                <Select
                  value={displayUnit}
                  onValueChange={(value: DisplayUnit) => setDisplayUnit(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn đơn vị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours">Giờ (h)</SelectItem>
                    <SelectItem value="minutes">Phút (m)</SelectItem>
                    <SelectItem value="seconds">Giây (s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-2 font-medium">
                    <Hourglass size={14} /> Thời gian định dạng:
                  </span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {report.formatted_time}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-2 font-medium">
                    <History size={14} /> Work Sessions:
                  </span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {report.logs_count}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
