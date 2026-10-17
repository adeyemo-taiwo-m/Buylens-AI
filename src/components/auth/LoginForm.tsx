"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CtaButton } from "@/components/ui/CtaButton";
import { DemoLoginButton } from "@/components/auth/DemoLoginButton";
import { useToast } from "@/components/ui/Toast";

export function LoginForm({ email, password }: { email: string; password: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [formEmail, setFormEmail] = useState(email);
  const [formPassword, setFormPassword] = useState(password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formEmail, password: formPassword }) });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Unable to sign in.");
      router.push("/analyze");
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : "Unable to sign in.";
      setError(message);
      toast(message, "error");
      setLoading(false);
    }
  };

  return (
    <Card padding="lg" className="w-full max-w-md shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-muted">Access your saved purchase reports and checklists.</p>
      </div>
      <div className="rounded-[16px] border border-primary-200 bg-primary-50 p-4 text-sm text-ink">
        <p className="font-semibold text-primary-800">Shared demo account</p>
        <p className="mt-2 text-ink-muted">Use these credentials or try one-click login.</p>
        <dl className="mt-3 grid grid-cols-[70px_1fr] gap-x-3 gap-y-1 text-xs">
          <dt className="font-medium text-ink-muted">Email</dt><dd className="break-all font-medium text-ink">{email}</dd>
          <dt className="font-medium text-ink-muted">Password</dt><dd className="break-all font-medium text-ink">{password}</dd>
        </dl>
        <DemoLoginButton className="mt-4 h-11 w-full" />
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-ink-faint"><span className="h-px flex-1 bg-line" />or enter manually<span className="h-px flex-1 bg-line" /></div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div><label htmlFor="login-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">Email address</label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-faint" /><input id="login-email" type="email" required value={formEmail} onChange={(event) => setFormEmail(event.target.value)} className="dashboard-input pl-9" /></div></div>
        <div><label htmlFor="login-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">Password</label><div className="relative"><Lock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-faint" /><input id="login-password" type="password" required value={formPassword} onChange={(event) => setFormPassword(event.target.value)} className="dashboard-input pl-9" /></div></div>
        {error && <p role="alert" className="rounded-[12px] border border-status-danger-border bg-status-danger-bg px-3 py-2 text-xs text-status-danger-text">{error}</p>}
        <CtaButton type="submit" loading={loading} trailingIcon={<ArrowRight className="h-4 w-4" />} className="w-full">Sign in</CtaButton>
      </form>
      <div className="mt-6 text-center text-xs text-ink-muted">Need an account? <Link href="/signup" className="font-semibold text-primary-600 underline">Sign-up is coming soon</Link></div>
    </Card>
  );
}
