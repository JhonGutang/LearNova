'use client';

import React, { ReactNode, useState } from "react";
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
  { label: "Home", icon: <Home className="w-5 h-5" />, href: "/home" },
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
  const { redirect } = useRedirectLink();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r shadow-lg transition-all duration-200 ${collapsed ? "w-18" : "w-60"}`}
        style={{ width: sidebarWidth }}
      >
        {/* Brand/Logo and Collapse/Expand Button side by side */}
        <div className={`h-20 flex items-center px-4 ${collapsed ? "justify-center" : ""}`}>
          <div className={`flex items-center gap-2 ${collapsed ? "" : "w-full"}`}>
            {!collapsed && (
              <span className="text-2xl font-extrabold text-black tracking-wide text-left">
                LearNova
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`border border-gray-200 bg-gray-100 hover:bg-gray-200 cursor-pointer ml-2 ${collapsed ? "ml-0" : ""}`}
          >
            <SidebarIcon className="w-6 h-6 text-black" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 py-6 space-y-1 ${collapsed ? "px-1" : "px-4"}`}>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <button
                key={link.href}
                type="button"
                onClick={() => redirect(link.href)}
                className={`w-full group flex items-center gap-3 rounded-lg text-base font-medium transition-all px-3 py-2
                  ${isActive ? "bg-black/10 text-black shadow-inner" : "text-gray-800 hover:bg-black/5 hover:text-black"}
                  ${collapsed ? "justify-center" : ""}
                  focus:outline-none
                  cursor-pointer
                `}
                tabIndex={0}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`flex items-center justify-center transition-colors ${
                    isActive
                      ? "text-black"
                      : "text-gray-500 group-hover:text-black"
                  }`}
                >
                  {link.icon}
                </span>
                {!collapsed && (
                  <span className="transition-opacity duration-200">{link.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile (bottom) */}
        <div
          className={`px-4 py-3 border-t bg-gradient-to-r from-gray-100 to-white flex items-center gap-3 ${
            collapsed ? "justify-center px-2" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center font-bold text-black text-lg">
              U
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm">Username</span>
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
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold text-black tracking-tight">
              {sidebarLinks.find((l) => l.href === pathname)?.label || "Dashboard"}
            </h1>
            {/* Optional header child */}
            {headerChild && (
              <div className="ml-6 flex items-center">{headerChild}</div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 pt-20 p-6 bg-gradient-to-br from-white to-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;