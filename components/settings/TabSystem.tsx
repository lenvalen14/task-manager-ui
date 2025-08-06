"use client"

import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TabSystem() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <h3 className="text-xl font-black text-gray-900 mb-6 bg-purple-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                    General Settings
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                        <div className="space-y-1">
                            <h4 className="font-bold text-gray-900">Dark Mode</h4>
                            <p className="text-sm text-gray-600">Enable dark theme across the application</p>
                        </div>
                        <Switch id="dark-mode" />
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                        <div className="space-y-1">
                            <h4 className="font-bold text-gray-900">Enable Notifications</h4>
                            <p className="text-sm text-gray-600">Allow system-wide notifications</p>
                        </div>
                        <Switch id="notifications" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <h3 className="text-xl font-black text-gray-900 mb-6 bg-blue-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                    Language Preferences
                </h3>

                <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                    <div className="space-y-1">
                        <h4 className="font-bold text-gray-900">Interface Language</h4>
                        <p className="text-sm text-gray-600">Select your preferred language for the app</p>
                    </div>
                    <Select defaultValue="en">
                        <SelectTrigger className="w-[150px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg bg-white">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg shadow-lg">
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
