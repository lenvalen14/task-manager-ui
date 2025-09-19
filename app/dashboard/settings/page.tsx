"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Camera,
  User,
  Bell,
  Key,
  Settings2Icon,
  Star,
  Heart,
  Sparkle,
} from "lucide-react";
import Link from "next/link";
import TabDetails from "@/components/settings/TabDetails";
import TabPassword from "@/components/settings/TabPassword";
import TabNotifications from "@/components/settings/TabNotifications";
import TabSystem from "@/components/settings/TabSystem";
import { useGetUserByIdQuery } from "@/services/userService";
import UploadAvatarDialog from "@/components/settings/UploadAvatarDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState("my-details");
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const userId = useSelector((state: RootState) => state.user.sub);

  const { data, isLoading, isError, refetch } = useGetUserByIdQuery(
    userId as number,
    {
      skip: !userId,
    }
  );

  const tabs = [
    { value: "my-details", label: "Thông tin cá nhân", icon: User, color: "bg-blue-300" },
    { value: "password", label: "Đổi mật khẩu", icon: Key, color: "bg-green-300" },
    { value: "notifications", label: "Thông báo", icon: Bell, color: "bg-yellow-300" },
    { value: "system", label: "Hệ thống", icon: Settings2Icon, color: "bg-yellow-300" },
  ];

  if (isLoading) return <div className="p-6">Đang tải...</div>;
  if (isError || !data) return <div className="p-6 text-red-500">Không thể tải dữ liệu người dùng.</div>;

  const user = data.data;

  return (
    <div className="flex-1 min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b-4 border-pink-200 shadow-lg">
        <div className="relative px-8 pt-6 pb-8">
          <div className="absolute top-4 right-8">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-8 right-16">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse delay-300" />
          </div>
          <div className="absolute top-6 right-24">
            <Sparkle className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse delay-700" />
          </div>

          <div className="flex items-center gap-8">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-full transition-all duration-200">
              <Link href="/dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>

            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white shadow-lg border-4 border-black transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <User className="w-8 h-8" />
              </div>

              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">
                  Cài đặt tài khoản
                </h1>
                <p className="text-lg font-bold text-gray-700 bg-yellow-200 px-4 py-2 rounded-xl border-2 border-black shadow-md inline-block transform -rotate-1">
                  Quản lý cài đặt và tuỳ chọn tài khoản ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="px-8 pt-12 pb-8">
          {/* Profile Info */}
          <div className="relative mb-6">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-black shadow-lg bg-white">
                  <AvatarImage
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={user.username}
                  />
                  <AvatarFallback className="bg-pink-100 text-pink-700 text-4xl font-black">
                    {user.first_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  onClick={() => setOpenUploadDialog(true)}
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-pink-400 hover:bg-pink-500 border-2 border-black p-0 shadow-lg transform hover:scale-110 transition-transform duration-200"
                >
                  <Camera className="w-4 h-4" />
                </Button>

                <UploadAvatarDialog
                  open={openUploadDialog}
                  onOpenChange={setOpenUploadDialog}
                  userId={user.id}
                  onSuccess={() => refetch()}
                />
              </div>
              <div className="pb-4">
                <h2 className="text-2xl font-black text-gray-900">
                  {user.username}
                </h2>
                <p className="font-bold text-gray-700 bg-blue-200 px-3 py-1 rounded-xl border-2 border-black shadow-sm inline-block mt-2">
                  Chưa gán vai trò
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-2xl h-16 bg-transparent gap-2 justify-start p-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`px-6 py-3 font-bold text-gray-900 border-2 border-black rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 data-[state=active]:${tab.color} data-[state=inactive]:bg-white`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="my-details">
              <TabDetails userId={user.id} />
            </TabsContent>
            <TabsContent value="password">
              <TabPassword />
            </TabsContent>
            <TabsContent value="notifications">
              <TabNotifications />
            </TabsContent>
            <TabsContent value="system">
              <TabSystem />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
