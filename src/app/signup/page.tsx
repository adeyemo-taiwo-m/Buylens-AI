"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { DemoLoginButton } from "@/components/auth/DemoLoginButton";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

export default function SignUpPage() {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div className="flex min-h-screen flex-col justify-between bg-canvas text-ink">
      <Header />
      <main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-6 sm:py-16">
        <Card padding="lg" className="w-full max-w-md shadow-sm">
          <div className="mb-6 text-center"><h1 className="text-2xl font-bold tracking-tight text-ink">Create an account</h1><p className="mt-1 text-sm text-ink-muted">Start making objective, informed purchase decisions.</p></div>
          <div className="rounded-[16px] border border-primary-200 bg-primary-50 p-4 text-sm text-ink"><p className="font-semibold text-primary-800">Sign-up is coming soon</p><p className="mt-1 text-ink-muted">Use the demo account to explore BuyLens AI.</p><DemoLoginButton className="mt-4 h-11 w-full" /></div>
          <form onSubmit={(event) => { event.preventDefault(); setShowMessage(true); }} className="mt-6 space-y-4">
            <div><label htmlFor="signup-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">Full name</label><div className="relative"><User className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-faint" /><input id="signup-name" disabled className="dashboard-input cursor-not-allowed pl-9 opacity-60" placeholder="e.g. John Doe" /></div></div>
            <div><label htmlFor="signup-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">Email address</label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-faint" /><input id="signup-email" disabled className="dashboard-input cursor-not-allowed pl-9 opacity-60" placeholder="name@example.com" /></div></div>
            <div><label htmlFor="signup-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">Password</label><div className="relative"><Lock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-faint" /><input id="signup-password" disabled type="password" className="dashboard-input cursor-not-allowed pl-9 opacity-60" placeholder="••••••••" /></div></div>
            <button type="submit" className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"><span>Continue</span><ArrowRight className="h-4 w-4" /></button>
          </form>
          {showMessage && <p role="status" className="mt-4 rounded-[12px] border border-primary-200 bg-primary-50 px-3 py-2 text-xs text-primary-800">Sign-up is coming soon. Use the demo account to explore BuyLens AI.</p>}
          <div className="mt-6 text-center text-xs text-ink-muted">Already have access? <Link href="/login" className="font-semibold text-primary-600 underline">Sign in</Link></div>
        </Card>
      </main>
      <footer className="border-t border-line bg-white py-6 text-center text-xs text-ink-muted">BuyLens AI — Independent Purchase Decision Intelligence</footer>
    </div>
  );
}
