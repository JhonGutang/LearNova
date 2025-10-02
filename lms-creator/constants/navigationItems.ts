import { User, Settings, Book, LayoutDashboard, LogOut } from "lucide-react";

export const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Profile", icon: User, href: "/profile" },
    { label: "Courses", icon: Book, href: "/courses" },
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Logout", icon: LogOut, href: "/logout" },
  ];

export const SIDEBAR_EXPANDED_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 72; 