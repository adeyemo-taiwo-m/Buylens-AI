import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
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
  title: "BuyLens AI — Know What You're Buying Before You Pay",
  description:
    "BuyLens AI analyzes product information, highlights risks and missing details, and helps you make more informed purchase decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans bg-[#F7F8F5] text-[#101828] selection:bg-[#0B1220] selection:text-[#B8F34A]`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
