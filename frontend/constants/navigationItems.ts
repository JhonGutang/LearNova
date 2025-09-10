import { User, Settings, Book, LayoutDashboard } from "lucide-react";

export const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Profile", icon: User, href: "/profile" },
    { label: "Courses", icon: Book, href: "/courses" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

export const SIDEBAR_EXPANDED_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 72; 