"use client";

import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  MessageSquare,
  LogOut,
  Settings,
  Star,
  Book,
  Clock,
  Users,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { useRedirectLink } from "@/hooks/useRedirect";
import { Student } from "@lms/shared-types";
import dynamic from "next/dynamic";

const LogoutModal = dynamic(() => import("@/features/auth/logout/Logout"), {
  ssr: false,
});

const sidebarLinks = [
  { label: "Dashboard", icon: <Home size={16} />, href: "/home" },
  { label: "Courses", icon: <BookOpen size={16} />, href: "/courses" },
  { label: "Community", icon: <MessageSquare size={16} />, href: "/community" },
];

const quickAccessLinks = [
  {
    label: "Enrolled Courses",
    icon: <Book size={15} className="min-w-[16px]" />,
    count: 5,
  },
  {
    label: "Favorite Courses",
    icon: <Star size={15} className="min-w-[16px]" />,
    count: 3,
  },
  {
    label: "Recent Courses",
    icon: <Clock size={15} className="min-w-[16px]" />,
    count: 2,
  },
  {
    label: "Top Topics",
    icon: <Users size={15} className="min-w-[16px]" />,
    count: 8,
  },
];

interface SidebarLayoutProps {
  children: ReactNode;
  headerChild?: ReactNode;
  student?: Student;
}

interface SidebarLinksProps {
  pathname: string;
  redirect: (href: string) => void;
  collapsed?: boolean;
}

function SidebarLinks({ pathname, redirect, collapsed }: SidebarLinksProps) {
  return (
    <ul className="w-full space-y-1">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href}>
            <button
              type="button"
              onClick={() => redirect(link.href)}
              className={`flex cursor-pointer items-center w-full rounded-md px-3.5 py-2 gap-2 transition-colors text-[14px] font-medium
                ${
                  isActive
                    ? "bg-[#e6f3fc] text-[#14a9e3]"
                    : "text-[#222] hover:bg-gray-100"
                }
                `}
              aria-current={isActive ? "page" : undefined}
              tabIndex={0}
            >
              <span
                className={
                  isActive
                    ? "text-[#14a9e3]"
                    : "text-gray-500 group-hover:text-[#14a9e3]"
                }
              >
                {link.icon}
              </span>
              {!collapsed && (
                <span className="whitespace-nowrap">{link.label}</span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function QuickAccess({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) return null;
  return (
    <div className="mt-3 mb-2">
      <div className="text-[11px] font-medium tracking-wide text-gray-500 uppercase mb-2 ml-1">
        QUICK ACCESS
      </div>
      <ul className="space-y-1">
        {quickAccessLinks.map((link) => (
          <li key={link.label}>
            <div className="flex items-center py-1 px-1 rounded group hover:bg-gray-50 transition-all">
              <span
                className="flex items-center text-gray-500 mr-2"
                style={{ minWidth: 18 }}
              >
                {link.icon}
              </span>
              <span className="text-[12.5px] font-normal text-gray-800 flex-1">
                {link.label}
              </span>
              <span className="text-[11.5px] text-gray-500 ml-auto bg-gray-100 w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {link.count}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SettingsSection: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => {
  if (collapsed) return null;
  return (
    <div className="border-t border-gray-100 mt-3 pt-2">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 w-full text-gray-600 hover:bg-gray-50 transition rounded-md text-[13.5px]"
        style={{ marginBottom: 1 }}
      >
        <Settings size={15} /> <span>Settings</span>
      </button>
    </div>
  );
};

const LogoutSection: React.FC<{
  setLogoutOpen: (v: boolean) => void;
  collapsed?: boolean;
}> = ({ setLogoutOpen, collapsed }) => {
  if (collapsed) return null;
  return (
    <div className="mt-1">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-2 px-4 py-2 w-full text-[#e04141] hover:bg-red-50 transition rounded-md text-[13.5px]"
        onClick={() => setLogoutOpen(true)}
      >
        <LogOut size={15} className="mr-1" />
        <span>Logout</span>
      </button>
    </div>
  );
};

const VersionSection: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => {
  if (collapsed) return null;
  return (
    <div className="text-center text-[10.5px] text-gray-400 mt-2 mb-1 select-none">
      Version 1.0.0
    </div>
  );
};

const SidebarLayout = ({
  children,
  headerChild,
  student,
}: SidebarLayoutProps) => {
  const { redirect } = useRedirectLink();
  const pathname = usePathname();
  const CURRENT_PAGE = sidebarLinks.find(
    (link) => link.href === pathname
  )?.label;
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white font-sans">
      <aside
        className={`hidden md:flex flex-col ${
          sidebarCollapsed
            ? "w-[64px] min-w-[64px] max-w-[64px]"
            : "w-[260px] min-w-[240px] max-w-[260px]"
        } bg-white border-r border-gray-100`}
        style={{
          boxShadow: "0 0.5px 0 #eee",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 40,
          height: "100vh",
          minHeight: "100vh",
          transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <div
              className={`h-16 flex items-center ${
                sidebarCollapsed ? "justify-center px-0" : "px-7"
              } mb-2 select-none sticky top-0 bg-white z-30`}
              style={{ minHeight: "62px" }}
            >
              <span
                className="text-[16.5px] font-extrabold text-[#14a9e3]"
                style={{ display: sidebarCollapsed ? "none" : undefined }}
              >
                LearNova
              </span>
              {sidebarCollapsed && (
                <span>
                  <Home size={26} className="text-[#14a9e3]" />
                </span>
              )}
            </div>
            <nav className="px-2 pt-0 pb-2 w-full">
              <SidebarLinks
                pathname={pathname}
                redirect={redirect}
                collapsed={sidebarCollapsed}
              />
            </nav>
            {!sidebarCollapsed && <hr className="my-2 border-gray-100" />}
            <div className="px-3">
              <QuickAccess collapsed={sidebarCollapsed} />
            </div>
          </div>
          <div className="w-full">
            <SettingsSection collapsed={sidebarCollapsed} />
            <LogoutSection
              setLogoutOpen={setLogoutOpen}
              collapsed={sidebarCollapsed}
            />
            <VersionSection collapsed={sidebarCollapsed} />
            <LogoutModal open={logoutOpen} onOpenChange={setLogoutOpen} />
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 min-h-[62px] sticky top-0 bg-white z-20">
          <div className="flex items-center">
            <button
              type="button"
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border hover:bg-gray-100 transition-all border-gray-200 cursor-pointer"
              onClick={() => setSidebarCollapsed((c) => !c)}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen size={20} />
              ) : (
                <PanelLeftClose size={20} />
              )}
            </button>
            <div className="text-[#14a9e3]">{CURRENT_PAGE}</div>
          </div>
          <div>{headerChild}</div>
        </div>
        <div className="flex-1 flex flex-col min-w-0">{children}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
