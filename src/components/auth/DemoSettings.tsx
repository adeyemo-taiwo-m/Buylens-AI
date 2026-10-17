"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DemoAuthGate } from "@/components/auth/DemoAuthGate";

export function DemoSettings() {
  const [email, setEmail] = useState("demo account");
  useEffect(() => { void fetch("/api/auth/session", { cache: "no-store" }).then((response) => response.json()).then((body) => { if (body.authenticated) setEmail("Shared BuyLens demo account"); }); }, []);
  return <DemoAuthGate><div className="space-y-6"><div><h1 className="text-[30px] font-semibold text-ink sm:text-[40px]">Settings</h1><p className="mt-2 text-base text-ink-muted">Manage your BuyLens workspace preferences.</p></div><Card padding="lg" className="max-w-[760px]"><div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600"><ShieldCheck className="h-5 w-5" /></span><div><h2 className="text-lg font-semibold text-ink">Demo mode</h2><p className="mt-1 text-sm text-ink-muted">{email} uses a shared login with private, visitor-scoped reports.</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><DisabledSetting label="Change email" /><DisabledSetting label="Change password" /><DisabledSetting label="Delete account" /></div><p className="mt-5 flex items-center gap-2 text-xs text-ink-muted"><LockKeyhole className="h-3.5 w-3.5" />Not available in demo mode</p></Card></div></DemoAuthGate>;
}

function DisabledSetting({ label }: { label: string }) { return <button type="button" disabled className="flex h-12 items-center justify-between rounded-[12px] border border-line bg-surface-subtle px-4 text-left text-sm font-medium text-ink-faint"><span>{label}</span><span className="text-[11px]">Demo only</span></button>; }
