"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { HeaderSection } from "@/components/section/header"
import { FooterSection } from "@/components/section/footer"
import { CheckCircle2, Star, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
    {
        name: "Free",
        price: "0₫ / tháng",
        description: "Phù hợp cho cá nhân hoặc sinh viên muốn quản lý công việc cơ bản.",
        features: ["Tạo và quản lý task cá nhân", "Giao diện trực quan", "Quản lý dự án cơ bản"],
        icon: Star,
        colors: "from-green-200 to-emerald-300 text-green-800",
        button: "Bắt đầu ngay",
    },
    {
        name: "Pro",
        price: "99.000₫ / tháng",
        description: "Dành cho nhóm nhỏ cần cộng tác và quản lý dự án nâng cao.",
        features: [
            "Tất cả trong Free",
            "Cộng tác nhóm & phân quyền",
            "Báo cáo tiến độ",
            "Theo dõi thời gian (Time Logs)",
        ],
        icon: Crown,
        colors: "from-blue-200 to-blue-300 text-blue-800",
        button: "Nâng cấp Pro",
    },
    {
        name: "Enterprise",
        price: "Liên hệ",
        description: "Giải pháp toàn diện cho doanh nghiệp lớn với nhu cầu đặc thù.",
        features: [
            "Tất cả trong Pro",
            "Tùy chỉnh theo nhu cầu",
            "Hỗ trợ triển khai & đào tạo",
            "Ưu tiên hỗ trợ kỹ thuật 24/7",
        ],
        icon: Crown,
        colors: "from-yellow-200 to-orange-300 text-yellow-800",
        button: "Liên hệ tư vấn",
    },
]

export default function PricingPage() {
    return (
        <>
            <HeaderSection />
            <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 relative overflow-hidden border-b-2 border-black">
                {/* Decorative circles */}
                <div className="absolute top-20 left-16 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-pulse delay-500"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-12">
                    {/* Title */}
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl font-bold text-black">
                            Pricing{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Plans
                            </span>
                        </h1>
                        <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
                            Chọn gói phù hợp nhất với nhu cầu của bạn – từ cá nhân đến doanh nghiệp.
                        </p>
                    </div>

                    <Separator className="border-2 border-black" />

                    {/* Pricing Grid */}
                    <div className="grid gap-8 md:grid-cols-3">
                        {plans.map((plan, index) => {
                            const Icon = plan.icon
                            return (
                                <Card
                                    key={index}
                                    className="border-2 border-black shadow-xl hover:shadow-2xl rounded-2xl transform hover:scale-105 transition-all duration-300 flex flex-col"
                                >
                                    <CardHeader className="flex flex-col items-center text-center space-y-4">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-br ${plan.colors} flex items-center justify-center rounded-xl border-2 border-black shadow-md`}
                                        >
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <CardTitle className="text-black text-2xl">{plan.name}</CardTitle>
                                        <p className="text-3xl font-bold text-gray-900">{plan.price}</p>
                                        <CardDescription className="text-gray-700">{plan.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="flex-1">
                                        <ul className="space-y-3 text-gray-800">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>

                                    <CardFooter className="flex justify-center">
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold 
                                                       hover:from-blue-700 hover:to-purple-700 border-2 border-black shadow-md 
                                                       transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                                        >
                                            {plan.button}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
            <FooterSection />
        </>
    )
}
