"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Home,
  Video,
  Star,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  History,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export function DashboardLayout({
  children,
  activeTab = "dashboard",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "create", label: "Create Story", icon: Plus, href: "/create" },
    { id: "stories", label: "My Stories", icon: Video, href: "/stories" },
    { id: "favorites", label: "Favorites", icon: Star, href: "/favorites" },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    { id: "history", label: "History", icon: History, href: "/history" },
  ];

  const bottomMenuItems = [
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
    { id: "help", label: "Help & Support", icon: HelpCircle, href: "/help" },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const Sidebar = ({ mobile = false }) => (
    <motion.div
      initial={mobile ? { x: -320 } : { x: 0 }}
      animate={mobile ? { x: sidebarOpen ? 0 : -320 } : { x: 0 }}
      transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] as any }}
      className={`${
        mobile ? "fixed inset-y-0 left-0 z-50" : "relative"
      } w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen`}
    >
      {mobile && (
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="text-slate-600 dark:text-slate-400"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <Link href="/" className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              StoryCraft AI
            </span>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Create magical stories
            </div>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 pb-40">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              onClick={mobile ? () => setSidebarOpen(false) : undefined}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-purple-600 dark:text-purple-400" : ""
                }`}
              />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation - Fixed above profile */}
      <div className="fixed bottom-24 left-0 w-80 p-4 space-y-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 pb-6">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 text-purple-600 dark:text-purple-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              onClick={mobile ? () => setSidebarOpen(false) : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile - Fixed to bottom of screen */}
      <div className="fixed bottom-0 left-0 w-80 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              {user?.user_metadata?.full_name || "User"}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user?.email}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="flex-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex-1 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar mobile />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 dark:text-slate-400 mr-3"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1.5 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StoryCraft AI
              </span>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
