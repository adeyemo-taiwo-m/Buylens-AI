import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginPreviewPanel, LoginSampleStrip } from "@/components/auth/LoginPreview";
import { DEMO_EMAIL, DEMO_PASSWORD, getDemoSession } from "@/lib/server/demo-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Sign in | BuyLens AI" };

export default async function LoginPage() {
  if (await getDemoSession()) redirect("/analyze");

  return (
    <div className="min-h-dvh overflow-x-hidden bg-canvas text-ink lg:grid lg:h-dvh lg:grid-cols-[55%_45%]">
      <div className="box-border hidden h-dvh min-h-0 bg-surface p-4 lg:block lg:p-5 xl:p-6">
        <LoginPreviewPanel />
      </div>
      <section className="relative flex min-h-dvh flex-col bg-surface lg:h-dvh lg:min-h-0 lg:overflow-y-auto">
        <div className="flex items-center justify-between px-4 pt-5 sm:px-6 lg:justify-end lg:px-12 lg:pt-8 xl:px-16">
          <Link href="/" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 lg:hidden" aria-label="BuyLens AI home">
            <BrandLogo size="header" priority />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-[13px] font-medium text-ink-muted transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>

        <main className="flex flex-1 flex-col justify-start px-4 pb-8 pt-6 sm:px-6 lg:justify-center lg:px-12 lg:py-10 xl:px-16">
          <div className="mx-auto w-full max-w-[440px]">
            <LoginSampleStrip />
            <LoginForm email={DEMO_EMAIL} password={DEMO_PASSWORD} />
          </div>
        </main>

        <footer className="border-t border-line bg-surface px-4 py-5 text-center text-[13px] text-ink-muted sm:px-6 lg:px-10">BuyLens AI — Independent Purchase Decision Intelligence</footer>
      </section>
    </div>
  );
}
