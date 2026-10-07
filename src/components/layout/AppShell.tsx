"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ScanSearch,
  History,
  Settings,
  Plus,
  Scale,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/app", icon: Home },
    { label: "Analyze", href: "/app/analyze", icon: ScanSearch },
    { label: "History", href: "/app/history", icon: History },
    { label: "Compare", href: "/compare", icon: Scale },
    { label: "Settings", href: "/app/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F8F5] text-[#101828]">
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between border-r border-[#E4E7EC] bg-white p-5 sticky top-0 h-screen shrink-0">
        <div className="space-y-6">
          {/* Brand Logo */}
          <Link href="/app" className="flex items-center gap-2.5 px-2">
            <div className="h-8 w-8 rounded-[8px] bg-[#0B1220] flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#101828]">
                BuyLens <span className="text-[#667085] font-normal">AI</span>
              </span>
            </div>
          </Link>

          {/* New Analysis Primary Button */}
          <Link
            href="/app/analyze"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-[10px] bg-[#0B1220] hover:bg-[#111A2B] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="h-4 w-4 text-[#B8F34A]" />
            <span>Analyze a Purchase</span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-[8px] text-xs font-semibold transition-colors duration-150",
                    isActive
                      ? "bg-[#0B1220] text-white"
                      : "text-[#667085] hover:bg-[#F2F4F0] hover:text-[#101828]"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-[#B8F34A]" : "text-[#667085]")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile in Sidebar Footer */}
        <div className="pt-4 border-t border-[#E4E7EC] flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-[#F2F4F0] border border-[#E4E7EC] flex items-center justify-center text-[#101828] font-bold text-xs">
              U
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-[#101828] truncate">Buyer Account</p>
              <p className="text-[10px] text-[#667085] truncate">buyer@buylens.ai</p>
            </div>
          </div>
          <Link
            href="/login"
            className="text-[#667085] hover:text-[#DC2626] p-1.5 rounded"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E4E7EC] sticky top-0 z-40">
        <Link href="/app" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-[6px] bg-[#0B1220] flex items-center justify-center text-white font-bold text-xs">
            B
          </div>
          <span className="text-sm font-bold text-[#101828]">BuyLens AI</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/app/analyze"
            className="p-1.5 rounded-[8px] bg-[#0B1220] text-white"
            title="New analysis"
          >
            <Plus className="h-4 w-4 text-[#B8F34A]" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#667085] hover:text-[#101828]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E4E7EC] p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-xs font-semibold text-[#101828] hover:bg-[#F2F4F0]"
            >
              <item.icon className="h-4 w-4 text-[#667085]" />
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E4E7EC]">
            <Link
              href="/login"
              className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-xs font-semibold text-[#DC2626]"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top utility bar */}
        <header className="hidden md:flex h-14 border-b border-[#E4E7EC] bg-white/70 backdrop-blur-md px-8 items-center justify-between sticky top-0 z-30">
          <div className="text-xs text-[#667085]">
            BuyLens AI Decision Intelligence Platform
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF3] text-[#15803D] border border-[#ABEFC6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              Nigerian Market Database Active
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>

      {/* Mobile Bottom Navigation per PRD Section 44 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E4E7EC] px-3 py-2 flex items-center justify-around">
        <Link
          href="/app"
          className={cn(
            "flex flex-col items-center gap-1 text-[10px] font-medium",
            pathname === "/app" ? "text-[#0B1220] font-bold" : "text-[#667085]"
          )}
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>

        <Link
          href="/app/analyze"
          className="flex flex-col items-center gap-1 text-[10px] font-medium text-[#0B1220]"
        >
          <div className="h-7 w-7 rounded-full bg-[#0B1220] text-[#B8F34A] flex items-center justify-center -mt-2 shadow-xs">
            <Plus className="h-4 w-4" />
          </div>
          <span>Analyze</span>
        </Link>

        <Link
          href="/app/history"
          className={cn(
            "flex flex-col items-center gap-1 text-[10px] font-medium",
            pathname.startsWith("/app/history") ? "text-[#0B1220] font-bold" : "text-[#667085]"
          )}
        >
          <History className="h-4 w-4" />
          <span>History</span>
        </Link>

        <Link
          href="/app/settings"
          className={cn(
            "flex flex-col items-center gap-1 text-[10px] font-medium",
            pathname.startsWith("/app/settings") ? "text-[#0B1220] font-bold" : "text-[#667085]"
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
