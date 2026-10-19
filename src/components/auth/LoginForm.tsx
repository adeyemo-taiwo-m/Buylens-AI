"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Copy, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CtaButton } from "@/components/ui/CtaButton";
import { DemoLoginButton } from "@/components/auth/DemoLoginButton";
import { useToast } from "@/components/ui/Toast";

type CopyTarget = "email" | "password";
type FieldErrors = { email?: string; password?: string };

export function LoginForm({ email, password }: { email: string; password: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const reduced = useReducedMotion() === true;
  const enter = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.35, delay: reduced ? 0 : delay },
  });
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<CopyTarget | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleCopy = async (value: string, target: CopyTarget) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const didCopy = document.execCommand("copy");
        textarea.remove();
        if (!didCopy) throw new Error("Copy failed");
      }
      setCopied(target);
      window.setTimeout(() => setCopied((current) => current === target ? null : current), 1500);
      toast("Copied", "success");
    } catch {
      toast("Unable to copy. Please select and copy manually.", "error");
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const nextFieldErrors: FieldErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.trim())) nextFieldErrors.email = "Enter a valid email address.";
    if (!formPassword) nextFieldErrors.password = "Enter your password.";
    setFieldErrors(nextFieldErrors);
    setError(null);
    if (Object.keys(nextFieldErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formEmail.trim(), password: formPassword }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Invalid email or password.");
      router.push("/analyze");
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : "Invalid email or password.";
      setError(message);
      toast(message, "error");
      setLoading(false);
    }
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setError(null);
  };

  return (
    <Card variant="ghost" padding="none" className="w-full max-w-[440px] p-6 sm:p-8">
      <motion.div {...enter(0)} className="text-center">
        <h1 className="text-[28px] font-medium leading-tight tracking-tight text-ink">Choose how to <span className="text-primary-600">continue</span></h1>
        <p className="mt-2 text-sm text-ink-muted">Try the demo or sign in to access your saved purchase reports.</p>
      </motion.div>

      <motion.div {...enter(0.06)} className="mt-6 rounded-[16px] border border-primary-200 bg-primary-50 p-5">
        <p className="text-base font-semibold text-primary-800">Try the demo</p>
        <p className="mt-2 text-sm text-ink-muted">Explore BuyLens AI with a shared account, or use the credentials below.</p>
        <dl className="mt-4 space-y-2">
          <CredentialRow label="Email" value={email} copied={copied === "email"} onCopy={() => void handleCopy(email, "email")} />
          <CredentialRow label="Password" value={password} copied={copied === "password"} onCopy={() => void handleCopy(password, "password")} />
        </dl>
        <DemoLoginButton fullWidth className="mt-5 h-12 w-full" />
      </motion.div>

      <motion.div {...enter(0.12)} className="my-5 flex items-center gap-3 text-[13px] text-ink-muted" aria-hidden="true">
        <span className="h-px flex-1 bg-line" />
        <span>or sign in</span>
        <span className="h-px flex-1 bg-line" />
      </motion.div>

      <form onSubmit={handleLogin} noValidate>
        <div className="space-y-3">
          <motion.div {...enter(0.18)}>
            <label htmlFor="login-email" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-muted">Email address</label>
            <div className="relative">
              <Mail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-faint" />
              <input id="login-email" name="email" type="email" required autoComplete="off" value={formEmail} onChange={(event) => { setFormEmail(event.target.value); clearFieldError("email"); }} placeholder="you@example.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "login-email-error" : undefined} className={`auth-login-input dashboard-input dashboard-input-with-icon pl-11${fieldErrors.email ? " auth-input-error" : ""}`} />
            </div>
            {fieldErrors.email && <p id="login-email-error" className="mt-2 text-[13px] text-status-danger-text" role="alert">{fieldErrors.email}</p>}
          </motion.div>

          <motion.div {...enter(0.24)}>
            <label htmlFor="login-password" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-muted">Password</label>
            <div className="relative">
              <Lock aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-faint" />
              <input id="login-password" name="password" type={showPassword ? "text" : "password"} required autoComplete="current-password" value={formPassword} onChange={(event) => { setFormPassword(event.target.value); clearFieldError("password"); }} placeholder="Enter your password" aria-invalid={Boolean(fieldErrors.password)} aria-describedby={fieldErrors.password ? "login-password-error" : undefined} className={`auth-login-input auth-password-input dashboard-input dashboard-input-with-icon pl-11 pr-11${fieldErrors.password ? " auth-input-error" : ""}`} />
              <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1">
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" aria-hidden="true" /> : <Eye className="h-[18px] w-[18px]" aria-hidden="true" />}
              </button>
            </div>
            {fieldErrors.password && <p id="login-password-error" className="mt-2 text-[13px] text-status-danger-text" role="alert">{fieldErrors.password}</p>}
          </motion.div>
        </div>

        {error && <motion.p {...enter(0.27)} className="mt-5 rounded-[12px] border border-status-danger-border bg-status-danger-bg px-3 py-2.5 text-[13px] text-status-danger-text" role="alert">{error}</motion.p>}
        <motion.div {...enter(0.3)}>
          <CtaButton type="submit" variant="outline" loading={loading} trailingIcon={<ArrowRight className="h-4 w-4" />} className="mt-5 h-12 w-full">Sign in</CtaButton>
        </motion.div>
      </form>

      <motion.div {...enter(0.36)} className="mt-4 text-center text-[13px] text-ink-muted">
        Need an account? <button type="button" onClick={() => toast("Sign-up is coming soon. Use the demo account to explore BuyLens AI.", "info")} className="font-semibold text-primary-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1">Sign-up is coming soon</button>
      </motion.div>
    </Card>
  );
}

function CredentialRow({ label, value, copied, onCopy }: { label: string; value: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="flex min-w-0 items-center gap-3 text-[13px]">
      <dt className="w-[72px] shrink-0 text-ink-muted">{label}</dt>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <dd className="min-w-0 flex-1 break-all text-sm font-semibold text-ink">{value}</dd>
        <button type="button" onClick={onCopy} aria-label={`Copy demo ${label.toLowerCase()}`} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-primary-100 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1">
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
