import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Heart, Star, X } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-2 border-black bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-bold text-black">Create Account</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded-sm flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="w-4 h-4 bg-pink-400 rounded-sm flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div className="w-4 h-4 bg-yellow-400 rounded-sm flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <button className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Motivational Banner */}
          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl p-4 border-2 border-black mb-6">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-black font-semibold">Let's bring your productivity to life!</span>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
          </div>
          
          <CardDescription className="text-gray-600 text-lg">Create an account to start managing your tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-black font-bold text-lg">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., John Doe"
                required
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-black font-bold text-lg">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@example.com"
                required
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-black font-bold text-lg">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                required
                className="border-2 border-black focus:border-pink-500 focus:ring-pink-500 rounded-xl bg-white text-black placeholder-gray-400 py-4 text-lg shadow-lg"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl border-2 border-black transform hover:scale-105"
            >
              + Create Account
            </Button>
            <div className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-pink-600 hover:text-pink-700 font-semibold underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
