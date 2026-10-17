import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/components/auth/LoginForm";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/server/demo-auth";

export const metadata: Metadata = { title: "Sign in | BuyLens AI" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-canvas text-ink">
      <Header />
      <main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-6 sm:py-16"><LoginForm email={DEMO_EMAIL} password={DEMO_PASSWORD} /></main>
      <footer className="border-t border-line bg-white py-6 text-center text-xs text-ink-muted">BuyLens AI — Independent Purchase Decision Intelligence</footer>
    </div>
  );
}
