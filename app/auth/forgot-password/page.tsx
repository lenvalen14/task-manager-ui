import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl border border-gray-200">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-800">
              <Link href="/auth/login">
                <ArrowLeft className="w-5 h-5" />
                <span className="sr-only">Back to Login</span>
              </Link>
            </Button>
            <CardTitle className="text-3xl font-bold text-gray-900">Forgot Password</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Enter your email to reset your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@example.com"
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg bg-gray-50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-md"
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
