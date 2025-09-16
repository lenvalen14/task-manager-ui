"use client"

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { HeaderSection } from "@/components/section/header"
import { FooterSection } from "@/components/section/footer"
import {
    ShieldCheck,
    FolderKanban,
    CheckSquare,
    UserCircle,
    Clock,
    BarChart3,
} from "lucide-react"

const features = [
    {
        title: "Authentication & Authorization",
        description:
            "Đăng ký, đăng nhập an toàn, mã hóa dữ liệu và phân quyền truy cập rõ ràng.",
        icon: ShieldCheck,
        colors: "from-yellow-200 to-orange-300 text-yellow-800",
    },
    {
        title: "Project Management",
        description:
            "Tạo, chỉnh sửa, xóa dự án, theo dõi tiến độ và gán thành viên dễ dàng.",
        icon: FolderKanban,
        colors: "from-blue-200 to-blue-300 text-blue-800",
    },
    {
        title: "Task Management",
        description:
            "Thêm, cập nhật, phân công và theo dõi trạng thái công việc trực quan.",
        icon: CheckSquare,
        colors: "from-green-200 to-emerald-300 text-green-800",
    },
    {
        title: "User Profile",
        description:
            "Cập nhật thông tin cá nhân: tên, email, avatar, liên lạc để tăng tính chuyên nghiệp.",
        icon: UserCircle,
        colors: "from-purple-200 to-indigo-300 text-purple-800",
    },
    {
        title: "Time Logs",
        description:
            "Ghi nhận và báo cáo chi tiết thời gian làm việc, hỗ trợ đánh giá hiệu suất.",
        icon: Clock,
        colors: "from-pink-200 to-rose-300 text-pink-800",
    },
    {
        title: "Dashboard",
        description:
            "Giao diện tổng quan trực quan giúp theo dõi dự án, công việc và năng suất.",
        icon: BarChart3,
        colors: "from-teal-200 to-cyan-300 text-teal-800",
    },
]

export default function FeaturesPage() {
    return (
        <>
            <HeaderSection />
            <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 relative overflow-hidden border-b-2 border-black">
                {/* Decorative circles */}
                <div className="absolute top-16 left-12 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-16 right-16 w-28 h-28 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-30 animate-pulse delay-300"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-12">
                    {/* Title */}
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl font-bold text-black">
                            Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Features
                            </span>
                        </h1>
                        <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
                            Các chức năng chính của hệ thống quản lý dự án và công việc cá nhân.
                        </p>
                    </div>

                    <Separator className="border-2 border-black" />

                    {/* Features Grid */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <Card
                                    key={index}
                                    className="border-2 border-black shadow-xl hover:shadow-2xl rounded-2xl transform hover:scale-105 transition-all duration-300"
                                >
                                    <CardHeader className="flex flex-col items-start gap-4">
                                        <div
                                            className={`w-12 h-12 bg-gradient-to-br ${feature.colors} flex items-center justify-center rounded-xl border-2 border-black shadow-md`}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-black text-xl">
                                                {feature.title}
                                            </CardTitle>
                                            <CardDescription className="text-gray-700">
                                                {feature.description}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent />
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
