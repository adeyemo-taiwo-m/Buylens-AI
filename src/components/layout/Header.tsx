"use client";

import { TopNavigation } from "./TopNavigation";

export { TopNavigation };

export function Header({ className }: { className?: string }) {
  return <TopNavigation className={className} />;
}
