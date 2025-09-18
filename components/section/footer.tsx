"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function FooterSection() {
  const footerLinks = {
    product: [
      { name: "Features", href: "#", label: "feature" },
      { name: "Home", href: "#", label: "home" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-white border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center border-2 border-black">
                <span className="text-white text-sm font-bold">TM</span>
              </div>
              <span className="text-xl font-bold text-black">Task Manager</span>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Streamline your workflow and boost productivity with our intuitive task management platform.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 text-sm">hello@taskmanager.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-bold text-black mb-3 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-700 hover:text-black transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-300">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2024 Task Manager. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-black transition-colors border border-black"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
