'use client';

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  BookOpen,
  LogOut,
  GraduationCap,
  Users,
  Calendar,
  Settings,
  Sidebar as SidebarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRedirectLink } from "@/hooks/useRedirect";

const sidebarLinks = [
  { label: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
  { label: "My Courses", icon: <BookOpen className="w-5 h-5" />, href: "/my-courses" },
  { label: "Community", icon: <Users className="w-5 h-5" />, href: "/community" },
  { label: "Calendar", icon: <Calendar className="w-5 h-5" />, href: "/calendar" },
  { label: "Profile", icon: <User className="w-5 h-5" />, href: "/profile" },
  { label: "Settings", icon: <Settings className="w-5 h-5" />, href: "/settings" },
];

const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 72;

interface SidebarLayoutProps {
  children: ReactNode; // main content
  headerChild?: ReactNode; // optional header child
}

const SidebarLayout = ({ children, headerChild }: SidebarLayoutProps) => {
  const {redirect} = useRedirectLink()
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className="flex h-screen bg-gradient-to-br from-teal-50 to-white">
      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r shadow-lg transition-all duration-200 ${collapsed ? "w-18" : "w-60"}`}
        style={{ width: sidebarWidth }}
      >
        {/* Brand/Logo */}
        <div className="h-20 flex items-center justify-center border-b bg-gradient-to-r from-teal-600 to-teal-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-white" />
            {!collapsed && (
              <span className="text-2xl font-extrabold text-white tracking-wide">
                Learnify
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 py-6 space-y-1 ${collapsed ? "px-1" : "px-4"}`}>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-lg text-base font-medium transition-all px-3 py-2
                  ${isActive ? "bg-teal-100 text-teal-700 shadow-inner" : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"}
                  ${collapsed ? "justify-center" : ""}
                `}
                tabIndex={0}
              >
                <span
                  className={`flex items-center justify-center transition-colors ${
                    isActive
                      ? "text-teal-700"
                      : "text-teal-500 group-hover:text-teal-600"
                  }`}
                >
                  {link.icon}
                </span>
                {!collapsed && (
                  <span className="transition-opacity duration-200">{link.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile (bottom) */}
        <div
          className={`px-4 py-3 border-t bg-gradient-to-r from-teal-50 to-white flex items-center gap-3 ${
            collapsed ? "justify-center px-2" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-teal-200 flex items-center justify-center font-bold text-teal-700 text-lg">
              U
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 text-sm">Username</span>
                <span className="text-xs text-gray-500">Student</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-red-500 hover:bg-red-100"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </aside>

      {/* Right content area */}
      <div className="flex flex-col flex-1 relative ">
        {/* Header */}
        <header
          className="fixed top-0 right-0 h-20 flex items-center px-6 z-40 bg-white/80 backdrop-blur border-b transition-all duration-200"
          style={{
            left: `${sidebarWidth}px`,
            width: `calc(100vw - ${sidebarWidth}px)`,
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="mr-4 border border-teal-100 bg-teal-50 hover:bg-teal-100 cursor-pointer"
          >
            <SidebarIcon className="w-6 h-6 text-teal-600" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold text-teal-700 tracking-tight">
              {sidebarLinks.find((l) => l.href === pathname)?.label || "Dashboard"}
            </h1>
            {/* Optional header child */}
            {headerChild && (
              <div className="ml-6 flex items-center">{headerChild}</div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 pt-20 p-6 bg-gradient-to-br from-white to-teal-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;