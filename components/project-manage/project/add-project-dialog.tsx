"use client"
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
import { Plus, Star, Sparkle, Heart } from "lucide-react"

type AddProjectDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProjectDialog({ open, onOpenChange }: AddProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-xl shadow-xl bg-white">
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

        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-black text-gray-900 tracking-tight mb-2">
            Create New Project
          </DialogTitle>
          <DialogDescription className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
            Let's bring your project to life ✨
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-base font-bold text-gray-900">
              Project Name
            </Label>
            <Input
              id="projectName"
              placeholder="e.g., Marketing Campaign Q3"
              required
              className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription" className="text-base font-bold text-gray-900">
              Description
            </Label>
            <Textarea
              id="projectDescription"
              placeholder="Brief description of the project goals and scope."
              rows={4}
              className="border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium placeholder:text-gray-500 min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectIcon" className="text-base font-bold text-gray-900">
              Project Icon
            </Label>
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-pink-400 flex items-center justify-center text-white text-xl font-bold shadow-lg border-3 border-black transform rotate-3 hover:rotate-0 transition-transform duration-300">
                PE
              </div>
              <Input
                id="projectIcon"
                placeholder="Upload an icon or use initials"
                type="url"
                className="flex-1 border-2 border-black rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium placeholder:text-gray-500"
              />
            </div>
          </div>
        </form>

        <DialogFooter className="mt-8 gap-3 bottom-0 bg-white pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-2 border-black rounded-xl px-6 py-3 bg-white hover:bg-gray-50 font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-pink-400 hover:bg-pink-500 text-white rounded-xl px-6 py-3 font-bold border-2 border-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}