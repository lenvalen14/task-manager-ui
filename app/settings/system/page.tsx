import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SystemSettingsPage() {
  return (
    <>
      <Header />
      <div className="flex-1 p-6 overflow-auto flex flex-col items-center justify-center bg-gray-50">
        <Card className="w-full max-w-2xl shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" asChild className="text-gray-600 hover:text-gray-800">
                <Link href="/dashboard">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="sr-only">Back to Dashboard</span>
                </Link>
              </Button>
              <div>
                <CardTitle className="text-2xl text-gray-900">System Settings</CardTitle>
                <CardDescription className="text-gray-600">Configure application preferences.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
                <Label htmlFor="dark-mode" className="text-gray-700 font-medium">
                  Dark Mode
                </Label>
                <Switch id="dark-mode" className="data-[state=checked]:bg-blue-600" />
              </div>
              <div className="grid gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
                <Label htmlFor="language" className="text-gray-700 font-medium">
                  Language
                </Label>
                <Select defaultValue="en">
                  <SelectTrigger
                    id="language"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg bg-white"
                  >
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-lg">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
                <Label htmlFor="notifications" className="text-gray-700 font-medium">
                  Enable Notifications
                </Label>
                <Switch id="notifications" defaultChecked className="data-[state=checked]:bg-blue-600" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-md">
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
