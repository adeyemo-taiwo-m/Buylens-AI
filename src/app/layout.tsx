import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
        className={`${inter.variable} ${geistMono.variable} min-h-full flex flex-col font-sans bg-white text-[#101828] selection:bg-[#0B1220] selection:text-[#8DB4F5]`}
      >
        <MotionProvider>
          <ToastProvider>{children}</ToastProvider>
        </MotionProvider>
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".motion-reveal,.motion-reveal-group{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </body>
    </html>
  );
}
