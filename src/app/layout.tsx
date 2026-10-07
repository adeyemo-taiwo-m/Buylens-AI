import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuyLens AI — Purchase Decision Support",
  description:
    "Know what you're buying before you pay. AI-powered decision reports to help you evaluate prices, risks, and specifications before high-value purchases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)] selection:bg-zinc-800 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
