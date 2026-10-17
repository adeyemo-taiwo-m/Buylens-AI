"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setDrawerOpen(false), [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus());
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F8FC] text-[#0F1B33]">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className={drawerOpen ? "fixed inset-0 z-40 bg-[#0F1B33]/40 lg:hidden" : "hidden"} aria-hidden="true" onClick={() => setDrawerOpen(false)} />
      <div ref={drawerRef}>
        <DashboardSidebar mobileOpen={drawerOpen} onNavigate={() => setDrawerOpen(false)} />
      </div>
      <DashboardTopbar onMenu={() => setDrawerOpen(true)} menuButtonRef={menuButtonRef} />
      <main id="main" className="dashboard-main min-h-screen px-5 pb-10 pt-[88px] lg:ml-[296px] lg:px-10 lg:pb-10 lg:pt-28">
        <div className="mx-auto w-full max-w-[1160px]">{children}</div>
      </main>
    </div>
  );
}
