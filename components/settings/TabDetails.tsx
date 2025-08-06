"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TabDetails() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                <h3 className="text-xl font-black text-gray-900 mb-6 bg-blue-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                    Personal Information
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="font-bold text-gray-700">First Name</Label>
                        <Input placeholder="Enter your first name" className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-gray-700">Last Name</Label>
                        <Input placeholder="Enter your last name" className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-gray-700">Email</Label>
                        <Input type="email" placeholder="Enter your email" className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-gray-700">Phone Number</Label>
                        <Input type="tel" placeholder="Enter your phone number" className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
            </div>
            {/* <div className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                          <h3 className="text-xl font-black text-gray-900 mb-6 bg-green-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                            Location
                          </h3>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">Country</Label>
                              <Input
                                placeholder="Enter your country"
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-bold text-gray-700">City</Label>
                              <Input
                                placeholder="Enter your city"
                                className="border-2 border-grey rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div> */}
        </div>
    )
}
