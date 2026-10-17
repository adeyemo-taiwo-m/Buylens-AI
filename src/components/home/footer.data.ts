export type FooterLink = {
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  title: "Explore" | "Legal";
  links: FooterLink[];
};

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Analyze a Purchase", href: "/analyze" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Sample Report", href: "#see-the-analysis" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      // TODO: Create the privacy route when the legal pages are ready.
      { label: "Privacy Policy", href: "/privacy" },
      // TODO: Create the terms route when the legal pages are ready.
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

export type SocialLink = {
  label: string;
  platform: "facebook" | "instagram" | "linkedin" | "x";
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  // TODO: Replace placeholder social URLs with BuyLens profiles.
  { label: "BuyLens on Facebook", platform: "facebook", href: "#" },
  { label: "BuyLens on Instagram", platform: "instagram", href: "#" },
  { label: "BuyLens on LinkedIn", platform: "linkedin", href: "#" },
  { label: "BuyLens on X", platform: "x", href: "#" },
];
