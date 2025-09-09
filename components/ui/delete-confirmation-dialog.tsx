"use client"

import { useState, useEffect } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Trash2 } from "lucide-react"

interface DeleteConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    itemName: string
    isDeleting?: boolean
}

export function DeleteConfirmationDialog({
    open,
    onOpenChange,
    onConfirm,
    itemName,
    isDeleting = false,
}: DeleteConfirmationDialogProps) {
    const [confirmationText, setConfirmationText] = useState("")

    // Reset input khi dialog được mở lại
    useEffect(() => {
        if (open) {
            setConfirmationText("")
        }
    }, [open])

    const isConfirmationTextMatching = confirmationText === itemName

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="rounded-2xl border-2 border-black shadow-lg p-6 sm:p-8 max-w-lg bg-white overflow-hidden">
                <AlertDialogHeader>
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-red-100 border-2 border-black transform -rotate-3">
                            <Trash2 className="w-6 h-6 text-red-600" />
                        </div>
                        {/* Title & Description */}
                        <div className="flex-1">
                            <AlertDialogTitle className="font-black text-2xl text-gray-900">
                                Xác nhận hành động xóa
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600 mt-1 text-base">
                                Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn dữ liệu.
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>

                {/* Type-to-confirm Section */}
                <div className="my-6 space-y-2">
                    <p className="text-sm text-gray-700 font-medium">
                        Để xác nhận, vui lòng nhập{" "}
                        <strong className="text-red-600 font-bold">{itemName}</strong> vào ô bên dưới:
                    </p>
                    <Input
                        type="text"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        placeholder="Nhập tên để xác nhận..."
                        className="border-2 border-black rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-500 transition"
                        disabled={isDeleting}
                    />
                </div>

                <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <AlertDialogCancel asChild>
                        <Button
                            variant="outline"
                            className="font-bold border-2 border-black shadow-md"
                            disabled={isDeleting}
                        >
                            Hủy
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            className="font-black shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                            onClick={onConfirm}
                            disabled={!isConfirmationTextMatching || isDeleting}
                        >
                            {isDeleting ? "Đang xóa..." : `Tôi đã hiểu, xóa mục này`}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}