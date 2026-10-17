"use client";

import Link from "next/link";
import Image from "next/image";
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
        "dashboard-sidebar fixed inset-y-0 left-0 z-50 flex w-[296px] -translate-x-full flex-col bg-white pb-5 pl-[31px] pr-[29px] pt-[43px] transition-transform duration-300 lg:translate-x-0",
        mobileOpen && "translate-x-0"
      )}
      aria-label="Sidebar"
    >
      <Link href="/dashboard" className="ml-0 inline-flex w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2" onClick={onNavigate}>
        <BrandLogo size="dashboard" priority />
      </Link>

      <nav aria-label="Main" className="mt-[82px]">
        <div className="space-y-4">
          {DASHBOARD_NAV.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return <SidebarLink key={item.href} item={item} Icon={Icon} active={active} onNavigate={onNavigate} />;
          })}
        </div>
        <div className="mb-[17px] mt-[15px] h-px bg-[#D9DEE8]" />
        <div className="space-y-4">
          {DASHBOARD_NAV.slice(4).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return <SidebarLink key={item.href} item={item} Icon={Icon} active={active} onNavigate={onNavigate} />;
          })}
        </div>
      </nav>

      <div className="mt-auto">
        <div className="dashboard-promo relative rounded-[24px]">
          <motion.div
            aria-hidden="true"
            animate={reduced ? { y: 0 } : { y: [0, -3, 0] }}
            transition={reduced ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-[85px] left-1/2 h-[154px] w-[154px] -translate-x-1/2"
          >
            <Image src="/dashboard/verify-illustration.webp" alt="" fill sizes="180px" className="object-contain" />
          </motion.div>
          <h2 className="text-[24px] font-semibold leading-[1.333] text-[#333333]">Verify before paying</h2>
          <p className="mt-2 text-[11px] leading-[1.5] text-[#868B97]">Get a clear picture before you pay</p>
          <CtaButton href="/analyze" variant="soft" trailingIcon={<ArrowRight className="h-[18px] w-[18px]" />} className="mt-[18px] h-12 w-full whitespace-nowrap border border-[#D3E5F7] bg-[#DBE8FC] px-0 text-[15px]">
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
        "flex h-10 items-center gap-[9px] rounded-lg pl-[21px] pr-5 text-[15px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2",
        active ? "bg-[#EEF4FD] text-[#2563EB]" : "text-[#8B8F98]"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.9} />
      <span>{item.label}</span>
    </Link>
  );
}
