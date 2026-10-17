"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV } from "./dashboard.data";

type DashboardSidebarProps = { mobileOpen?: boolean; onNavigate?: () => void };

export function DashboardSidebar({ mobileOpen = false, onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion() === true;

  return (
    <aside
      className={cn(
        "dashboard-sidebar fixed inset-y-0 left-0 z-50 flex w-[296px] -translate-x-full flex-col bg-white px-[30px] pb-[18px] pt-[42px] transition-transform duration-300 lg:translate-x-0",
        mobileOpen && "translate-x-0"
      )}
      aria-label="Sidebar"
    >
      <Link href="/dashboard" className="inline-flex w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2" onClick={onNavigate}>
        <BrandLogo size="dashboard" priority />
      </Link>

      <nav aria-label="Main" className="mt-[70px]">
        <div className="space-y-4">
          {DASHBOARD_NAV.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return <SidebarLink key={item.href} item={item} Icon={Icon} active={active} onNavigate={onNavigate} />;
          })}
        </div>
        <div className="my-4 h-px bg-[#D9DEE8]" />
        <div className="space-y-4">
          {DASHBOARD_NAV.slice(4).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return <SidebarLink key={item.href} item={item} Icon={Icon} active={active} onNavigate={onNavigate} />;
          })}
        </div>
      </nav>

      <div className="mt-auto">
        <div className="dashboard-promo relative rounded-[24px] bg-[#EBF2FE] px-7 pb-5 pt-[91px]">
          <motion.div
            aria-hidden="true"
            animate={reduced ? { y: 0 } : { y: [0, -3, 0] }}
            transition={reduced ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-[49px] left-1/2 h-[133px] w-[150px] -translate-x-1/2"
          >
            <div className="absolute bottom-0 left-[22px] h-[83px] w-[46px] rounded-[9px] bg-[#8DB9F6] shadow-[8px_8px_0_#C9DFFF]" />
            <div className="absolute bottom-0 left-[72px] h-[108px] w-[42px] rounded-[8px] bg-[#5B95EF] shadow-[8px_8px_0_#C9DFFF]" />
            <div className="absolute right-[2px] top-[5px] h-[57px] w-[57px] rounded-full border-[7px] border-[#2563EB] bg-white/80" />
            <div className="absolute right-[15px] top-[14px] h-[18px] w-[10px] rotate-45 rounded-bl-[4px] border-b-[4px] border-r-[4px] border-[#2563EB]" />
          </motion.div>
          <h2 className="text-[24px] font-semibold leading-[1.3] text-[#333333]">Verify before paying</h2>
          <p className="mt-2 text-sm leading-[1.4] text-[#606A79]">Get a clear picture before you pay</p>
          <CtaButton href="/analyze" variant="soft" trailingIcon={<ArrowRight className="h-[18px] w-[18px]" />} className="mt-[18px] h-[47px] w-full px-3 text-[15px]">
            Analyze a purchase
          </CtaButton>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ item, Icon, active, onNavigate }: { item: (typeof DASHBOARD_NAV)[number]; Icon: typeof DASHBOARD_NAV[number]["icon"]; active: boolean; onNavigate?: () => void }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "flex h-10 items-center gap-3 rounded-lg px-5 text-[15px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2",
        active ? "bg-[#E6EFFD] text-[#2563EB]" : "text-[#6B7280]"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.9} />
      <span>{item.label}</span>
    </Link>
  );
}
