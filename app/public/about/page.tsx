"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { HeaderSection } from "@/components/section/header"
import { Sparkles, Users, Target } from "lucide-react"
import { FooterSection } from "@/components/section/footer"

export default function AboutPage() {
    return (
        <>
            <HeaderSection />
            <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 relative overflow-hidden border-b-2 border-black">
                {/* Decorative circles */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute top-1/3 right-10 w-12 h-12 bg-purple-200 rounded-full opacity-30 animate-pulse delay-500"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-12">
                    {/* Title */}
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl font-bold text-black">
                            About{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Us
                            </span>
                        </h1>
                        <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
                            Personal Task Manager là ứng dụng web giúp bạn quản lý công việc và dự án một cách hiệu quả.
                            Chúng tôi xây dựng sản phẩm này với mục tiêu hỗ trợ mọi người làm việc thông minh hơn, giảm
                            căng thẳng và đạt được nhiều thành tựu hơn.
                        </p>
                    </div>

                    <Separator className="border-2 border-black" />

                    {/* Mission & Vision */}
                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="border-2 border-black shadow-xl hover:shadow-2xl rounded-2xl transform hover:scale-105 transition-all duration-300">
                            <CardHeader className="flex flex-row items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center rounded-xl border-2 border-black shadow-md">
                                    <Target className="w-6 h-6 text-yellow-800" />
                                </div>
                                <div>
                                    <CardTitle className="text-black text-xl">Sứ mệnh</CardTitle>
                                    <CardDescription className="text-gray-700">
                                        Giúp bạn sắp xếp công việc gọn gàng, dễ theo dõi và luôn kiểm soát được tiến độ.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="text-gray-800 leading-relaxed">
                                Với hệ thống quản lý dự án và task rõ ràng, bạn có thể dễ dàng cộng tác với đồng đội hoặc
                                tự quản lý công việc cá nhân.
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-black shadow-xl hover:shadow-2xl rounded-2xl transform hover:scale-105 transition-all duration-300">
                            <CardHeader className="flex flex-row items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center rounded-xl border-2 border-black shadow-md">
                                    <Users className="w-6 h-6 text-green-800" />
                                </div>
                                <div>
                                    <CardTitle className="text-black text-xl">Tầm nhìn</CardTitle>
                                    <CardDescription className="text-gray-700">
                                        Xây dựng nền tảng quản lý công việc đơn giản nhưng mạnh mẽ, phù hợp với mọi đối tượng.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="text-gray-800 leading-relaxed">
                                Chúng tôi mong muốn trở thành công cụ quen thuộc, đồng hành cùng bạn trong hành trình làm
                                việc và phát triển bản thân.
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Button */}
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold 
                                       hover:from-blue-700 hover:to-purple-700 border-2 border-black shadow-xl 
                                       transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Liên hệ với chúng tôi
                        </Button>
                    </div>
                </div>
            </section>
            <FooterSection />
        </>
    )
}
