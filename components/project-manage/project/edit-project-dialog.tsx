"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Star, Sparkle, Heart } from "lucide-react"
import { useUpdateProjectMutation } from "@/services/projectService"
import { Project } from "@/types/projectType"

type EditProjectDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    project: Project
    onSuccess?: () => void
}

export function EditProjectDialog({ open, onOpenChange, project, onSuccess }: EditProjectDialogProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [updateProject, { isLoading }] = useUpdateProjectMutation()

    // Reset lại state mỗi khi dialog mở hoặc project thay đổi
    useEffect(() => {
        if (open && project) {
            setName(project.name || "")
            setDescription(project.description || "")
        }
    }, [open, project])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateProject({ id: project.id, body: { name, description } }).unwrap()
            if (onSuccess) onSuccess()
            onOpenChange(false)
        } catch (error) {
            console.error("Cập nhật dự án thất bại:", error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-6 rounded-xl shadow-xl bg-white">
                {/* Icon trang trí */}
                <div className="absolute top-4 right-8">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
                </div>
                <div className="absolute top-8 right-16">
                    <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse delay-300" />
                </div>
                <div className="absolute top-6 right-24">
                    <Sparkle className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse delay-700" />
                </div>

                <DialogHeader className="mb-6">
                    <DialogTitle className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                        Chỉnh sửa dự án
                    </DialogTitle>
                    <DialogDescription className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                        Cập nhật thông tin dự án ✨
                    </DialogDescription>
                </DialogHeader>

                <form className="grid gap-6 py-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="projectName" className="text-base font-bold text-gray-900">
                            Tên dự án
                        </Label>
                        <Input
                            id="projectName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên dự án"
                            required
                            className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium placeholder:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="projectDescription" className="text-base font-bold text-gray-900">
                            Mô tả
                        </Label>
                        <Textarea
                            id="projectDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả dự án"
                            rows={4}
                            className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium placeholder:text-gray-500 min-h-[120px]"
                        />
                    </div>

                    <DialogFooter className="mt-8 gap-3 bottom-0 bg-white pt-4 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 border-2 border-black rounded-xl px-6 py-3 bg-white hover:bg-gray-50 font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-pink-400 hover:bg-pink-500 text-white rounded-xl px-6 py-3 font-bold border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        >
                            <Edit className="w-5 h-5 mr-2" />
                            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
