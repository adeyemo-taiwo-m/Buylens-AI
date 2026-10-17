"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function DemoAuthGate({ children, skip = false }: { children: React.ReactNode; skip?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => { if (skip) setReady(true); }, [skip]);

  useEffect(() => {
    if (skip) return;
    let cancelled = false;
    fetch("/api/auth/session", { cache: "no-store" }).then((response) => response.json()).then((body) => {
      if (cancelled) return;
      if (!body.authenticated) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }
      try {
        const ownerKey = "buylens_reports_owner";
        if (window.localStorage.getItem(ownerKey) !== body.visitorId) {
          window.localStorage.removeItem("buylens_reports");
          window.localStorage.setItem(ownerKey, body.visitorId);
        }
      } catch { /* local storage is an optional resilience layer */ }
      setReady(true);
    }).catch(() => { if (!cancelled) router.replace(`/login?next=${encodeURIComponent(pathname)}`); });
    return () => { cancelled = true; };
  }, [pathname, router, skip]);

  if (!ready) return <div className="min-h-screen bg-canvas" aria-label="Checking demo session" role="status" />;
  return children;
}
