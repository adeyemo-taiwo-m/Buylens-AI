import type { LucideIcon } from "lucide-react";
import { CircleHelp, History, Home, Scale, Search, Settings } from "lucide-react";

export type DashboardTone = "success" | "caution";

export type DashboardAnalysis = {
  id: string;
  title: string;
  category: string;
  date: string;
  score: number;
  verdict: string;
  tone: DashboardTone;
  image: string;
  fallbackImage?: string;
};

export const DASHBOARD_USER = {
  firstName: "Taiwo",
  displayName: "Adeyemo",
  avatar: "",
};

export const DASHBOARD_COPY = {
  welcome: "Welcome back, ",
  subtext: "Make a more informed decision before your next purchase.",
  formTitle: "What are you thinking of buying?",
  formSubtext: "Get a clearer picture of the value, risks, and details to verify before you pay.",
  recentTitle: "Recent Analyses",
  recentSubtext: "Pick up where you left",
  bannerTitle: "Make decisions with clarity",
  bannerSubtext: "Evaluate products, spot risks, and verify key details before you pay.",
};

export const DASHBOARD_NAV: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Analyze Purchase", href: "/analyze", icon: Search },
  { label: "Analysis History", href: "/history", icon: History },
  { label: "Compare", href: "/compare", icon: Scale },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: CircleHelp },
];

export const DASHBOARD_ANALYSES: DashboardAnalysis[] = [
  {
    id: "inverter-5kva",
    title: "5kVA Hybrid Inverter + 5kWh Lithium Battery",
    category: "Solar & Power",
    date: "2026-10-11",
    score: 82,
    verdict: "Worth considering",
    tone: "success",
    image: "/analysis/inverter-battery.webp",
    fallbackImage: "/analysis/solar.png",
  },
  {
    id: "galaxy-a56",
    title: "Samsung Galaxy A56 5G 256GB",
    category: "Phones & Tablets",
    date: "2026-10-10",
    score: 52,
    verdict: "Proceed with Caution",
    tone: "caution",
    image: "/dashboard/samsung-a56.webp",
    fallbackImage: "/main-laptop.png",
  },
];
