"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { useToast } from "@/components/ui/Toast";

type DemoLoginButtonProps = {
  className?: string;
  children?: ReactNode;
  compact?: boolean;
};

export function DemoLoginButton({ className, children = "Try the demo", compact = false }: DemoLoginButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const login = async () => {
    if (loading) return;
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/auth/demo", { method: "POST" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Demo login is temporarily unavailable.");
      router.push("/analyze");
    } catch (error) {
      const nextMessage = error instanceof Error ? error.message : "Demo login is temporarily unavailable.";
      setMessage(nextMessage);
      toast(nextMessage, "error");
      setLoading(false);
    }
  };

  return (
    <span className="inline-flex flex-col items-center gap-1.5">
      <CtaButton type="button" onClick={() => void login()} loading={loading} variant="primary" trailingIcon={<ArrowRight className="h-4 w-4" />} className={className ?? (compact ? "h-9 px-4 text-sm" : "h-12")}>{children}</CtaButton>
      {message && <span role="alert" className="max-w-[280px] text-center text-xs text-status-danger-text">{message}</span>}
    </span>
  );
}
