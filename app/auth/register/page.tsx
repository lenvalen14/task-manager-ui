import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">Join Us!</CardTitle>
          <CardDescription className="text-gray-600">Create an account to start managing your tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg bg-gray-50"
              />
            </div>
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
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg bg-gray-50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-md"
            >
              Sign Up
            </Button>
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
