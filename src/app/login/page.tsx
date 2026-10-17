import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/components/auth/LoginForm";
import { DEMO_EMAIL, DEMO_PASSWORD, getDemoSession } from "@/lib/server/demo-auth";

export const metadata: Metadata = { title: "Sign in | BuyLens AI" };

export default async function LoginPage() {
  if (await getDemoSession()) redirect("/analyze");

  return (
    <div className="flex min-h-screen flex-col justify-between bg-canvas text-ink">
      <Header />
      <main className="flex flex-1 items-start justify-center px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="w-full max-w-[440px]">
          <Link href="/" className="mb-4 inline-flex items-center gap-2 rounded-full px-2 py-1 text-[13px] font-medium text-ink-muted transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <LoginForm email={DEMO_EMAIL} password={DEMO_PASSWORD} />
        </div>
      </main>
      <footer className="border-t border-line bg-white py-6 text-center text-[13px] text-ink-muted">BuyLens AI — Independent Purchase Decision Intelligence</footer>
    </div>
  );
}
