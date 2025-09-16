"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeaderSection } from "@/components/section/header"
import { Mail, Phone, User } from "lucide-react"
import { FooterSection } from "@/components/section/footer"

const admins = [
    {
        name: "Nguyễn Văn A",
        role: "Project Manager",
        email: "adminA@example.com",
        phone: "+84 912 345 678",
        avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
        name: "Phạm Thị B",
        role: "Tech Lead",
        email: "adminB@example.com",
        phone: "+84 987 654 321",
        avatar: "https://i.pravatar.cc/150?img=5",
    },
]

export default function ContactPage() {
    return (
        <>
            <HeaderSection />
            <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 relative overflow-hidden border-b-2 border-black">
                {/* Decorative shapes */}
                <div className="absolute top-16 left-16 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-24 right-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-12">
                    {/* Title */}
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl font-bold text-black">
                            Liên hệ{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Admin
                            </span>
                        </h1>
                        <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
                            Nếu bạn có bất kỳ thắc mắc nào về hệ thống, vui lòng liên hệ trực tiếp với đội ngũ admin của chúng tôi.
                        </p>
                    </div>

                    {/* Admin cards */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {admins.map((admin, index) => (
                            <Card
                                key={index}
                                className="border-2 border-black shadow-xl hover:shadow-2xl rounded-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <img
                                        src={admin.avatar}
                                        alt={admin.name}
                                        className="w-16 h-16 rounded-full border-2 border-black shadow-md"
                                    />
                                    <div>
                                        <CardTitle className="text-black text-xl">{admin.name}</CardTitle>
                                        <CardDescription className="text-gray-700">{admin.role}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3 text-gray-800">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                        <span>{admin.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-green-600" />
                                        <span>{admin.phone}</span>
                                    </div>
                                    {/* <Button
                                        variant="default"
                                        className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold border-2 border-black shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                    >
                                        Gửi Email
                                    </Button> */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <FooterSection />
        </>
    )
}
