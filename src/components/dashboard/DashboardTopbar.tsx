"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CircleHelp, LogOut, Menu, Settings } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { DASHBOARD_USER } from "./dashboard.data";

export function DashboardTopbar({ onMenu, menuButtonRef }: { onMenu: () => void; menuButtonRef?: React.RefObject<HTMLButtonElement | null> }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-[72px] items-center justify-between bg-white px-5 lg:justify-end lg:px-10">
      <div className="flex items-center gap-3 lg:hidden">
        <button ref={menuButtonRef} type="button" onClick={onMenu} aria-label="Open navigation" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E3ECFC] text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"><Menu className="h-[18px] w-[18px]" /></button>
        <Link href="/dashboard" aria-label="BuyLens AI"><BrandLogo size="header" /></Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/help" aria-label="Help" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E3ECFC] text-[#2563EB] transition-colors hover:bg-[#D6E5FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"><CircleHelp className="h-[18px] w-[18px]" /></Link>
        <div className="relative">
          <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-10 items-center gap-2 rounded-[10px] border border-[#E9EDF5] bg-white px-3 text-sm font-medium text-[#0F1B33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E3ECFC] text-xs font-semibold text-[#2563EB]">A</span>
            <span className="hidden sm:inline">{DASHBOARD_USER.displayName}</span>
            <ChevronDown className="h-3 w-3 text-[#6B7280]" />
          </button>
          {open && <div role="menu" className="absolute right-0 top-[calc(100%+8px)] w-36 rounded-xl border border-[#E9EDF5] bg-white p-1.5 shadow-[0_12px_30px_rgba(15,27,51,0.12)]">
            <Link href="/settings" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#3F4A5B] hover:bg-[#F1F5FC]"><Settings className="h-4 w-4" />Settings</Link>
            <button type="button" role="menuitem" onClick={() => { setOpen(false); void fetch("/api/auth/logout", { method: "POST" }).finally(() => router.push("/login")); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#3F4A5B] hover:bg-[#F1F5FC]"><LogOut className="h-4 w-4" />Sign out</button>
          </div>}
        </div>
      </div>
    </header>
  );
}
