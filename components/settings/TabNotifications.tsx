"use client"

import { Switch } from "@/components/ui/switch"

export default function TabNotifications() {
    const sections = [
        {
            title: "Email Notifications",
            color: "bg-yellow-200",
            items: [
                { label: "Project Updates", desc: "Get notified about project changes and updates" },
                { label: "Task Comments", desc: "Receive notifications when someone comments on your tasks" },
                { label: "Task Assignments", desc: "Get notified when you're assigned to a task" },
            ],
        },
        {
            title: "Push Notifications",
            color: "bg-blue-200",
            items: [
                { label: "Desktop Notifications", desc: "Show desktop notifications for important updates" },
                { label: "Sound Alerts", desc: "Play sound when receiving notifications" },
            ],
        },
    ]

    return (
        <div className="space-y-6 max-w-4xl">
            {sections.map((section, i) => (
                <div key={i} className="bg-white rounded-xl border-2 border-black p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                    <h3 className={`text-xl font-black text-gray-900 mb-6 ${section.color} px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1`}>
                        {section.title}
                    </h3>

                    <div className="space-y-4">
                        {section.items.map((item, j) => (
                            <div key={j} className="flex items-center justify-between p-4 border-2 border-grey rounded-xl bg-gray-50">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-gray-900">{item.label}</h4>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                                <Switch />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
