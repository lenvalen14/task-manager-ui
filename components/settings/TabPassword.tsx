"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function TabPassword() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <h3 className="text-xl font-black text-gray-900 mb-6 bg-green-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                    Change Password
                </h3>

                <div className="space-y-4">
                    {["Current", "New", "Confirm New"].map((label, i) => (
                        <div key={i} className="space-y-2">
                            <Label className="font-bold text-gray-700">{label} Password</Label>
                            <Input type="password" placeholder={`Enter ${label.toLowerCase()} password`} className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <h3 className="text-xl font-black text-gray-900 mb-6 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                    Two-Factor Authentication
                </h3>

                <div className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                    <div className="space-y-1">
                        <h4 className="font-bold text-gray-900">Enable 2FA</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                </div>
            </div>
        </div>
    )
}
