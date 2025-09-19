"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export function FooterSection() {
  const productLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Tính năng", href: "/features" },
    { name: "Bảng giá", href: "/pricing" },
    { name: "Demo", href: "/demo" },
  ];

  const supportLinks = [
    { name: "Trung tâm hỗ trợ", href: "/support" },
    { name: "Câu hỏi thường gặp", href: "/faq" },
    { name: "Điều khoản dịch vụ", href: "/terms" },
    { name: "Chính sách bảo mật", href: "/privacy" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-br from-white to-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center border border-black/10">
                <span className="text-white text-sm font-bold">TM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Task Manager
              </span>
            </div>
            <p className="text-gray-600 mb-5 leading-relaxed text-sm">
              Nâng cao năng suất và quản lý công việc hiệu quả với nền tảng
              trực quan, đơn giản và mạnh mẽ.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                <span>hello@taskmanager.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-violet-600 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-violet-600 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Kết nối</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-violet-600 hover:shadow-md transition-all border border-gray-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Task Manager. Mọi quyền được bảo lưu.
          </div>
          <div className="flex space-x-5 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-violet-600">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-violet-600">
              Điều khoản
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
