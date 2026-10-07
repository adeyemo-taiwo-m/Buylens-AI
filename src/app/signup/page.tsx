"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/history");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8FA] text-[#111318]">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Create an Account</h1>
            <p className="mt-1 text-sm text-zinc-600">
              Start making objective, informed purchase decisions.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="h-4 w-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm transition-all shadow-sm"
            >
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-500">
            Already have an account?{" "}
            <Link href="/login" className="text-zinc-900 font-semibold underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500">
        BuyLens AI — Independent Purchase Decision Intelligence
      </footer>
    </div>
  );
}
