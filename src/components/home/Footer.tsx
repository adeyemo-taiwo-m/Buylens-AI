"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  FOOTER_LINK_GROUPS,
  SOCIAL_LINKS,
  type FooterLinkGroup as FooterLinkGroupData,
  type SocialLink,
} from "./footer.data";

const EASE = [0.22, 1, 0.36, 1] as const;

function SocialIcon({ platform }: Pick<SocialLink, "platform">) {
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
        <path
          fill="white"
          d="M13.6 8.1h1.8V5.2c-.3-.04-1.3-.12-2.5-.12-2.45 0-4.13 1.5-4.13 4.24v2.36H6.1v3.25h2.67V22h3.28v-7.07h2.72l.43-3.25h-3.15V9.56c0-.94.26-1.46 1.55-1.46Z"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
        <rect
          x="6.8"
          y="6.8"
          width="10.4"
          height="10.4"
          rx="3.2"
          stroke="white"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="2.45" stroke="white" strokeWidth="1.7" />
        <circle cx="17.25" cy="6.8" r="1.05" fill="white" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
        <path
          fill="white"
          d="M6.3 9.35h2.55v8.7H6.3v-8.7Zm1.28-4.3a1.5 1.5 0 1 1 0 3.01 1.5 1.5 0 0 1 0-3.01ZM10.3 9.35h2.44v1.19h.04c.34-.65 1.17-1.34 2.42-1.34 2.59 0 3.07 1.7 3.07 3.91v4.94h-2.55v-4.38c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.68 1.14-1.68 2.32v4.46H10.3v-8.7Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
      <path
        fill="white"
        d="M7.15 6.3h2.55l2.44 3.29 2.86-3.29h1.78l-3.82 4.4 4.89 6.99H15.3l-2.91-4.16-3.6 4.16H7l4.57-5.27L7.15 6.3Zm2.15 1.4 6.35 8.58h1.18L10.48 7.7H9.3Z"
      />
    </svg>
  );
}

function FooterLogo() {
  return (
    <span className="footer-logo" aria-hidden="true">
      <Image
        src="/logo-icon.png"
        alt=""
        width={35}
        height={34}
        className="footer-logo-icon"
      />
      <span className="footer-wordmark">
        <span className="footer-wordmark-buy">Buy</span>
        <span className="footer-wordmark-lens">Lens</span>
        <span className="footer-wordmark-ai">AI</span>
      </span>
    </span>
  );
}

export function FooterBrand({
  reduced,
  visible,
}: {
  reduced: boolean;
  visible: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={
        visible || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
      className="footer-brand"
    >
      <Link
        href="/"
        aria-label="BuyLens AI home"
        className="footer-focus inline-flex rounded-md"
      >
        <FooterLogo />
      </Link>
      <p className="footer-tagline">
        Know what you&apos;re buying before you pay.
      </p>
    </motion.div>
  );
}

export function FooterLinkGroup({
  group,
  reduced,
  visible,
  index,
}: {
  group: FooterLinkGroupData;
  reduced: boolean;
  visible: boolean;
  index: number;
}) {
  return (
    <motion.nav
      aria-label={group.title}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={
        visible || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      transition={{
        duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : index * 0.09,
        ease: EASE,
      }}
    >
      <h2 className="footer-heading">{group.title}</h2>
      <ul className="footer-links">
        {group.links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="footer-link footer-focus">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

export function SocialLinks({
  reduced,
  visible,
  index,
}: {
  reduced: boolean;
  visible: boolean;
  index: number;
}) {
  return (
    <motion.nav
      aria-label="Socials"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={
        visible || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      transition={{
        duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : index * 0.09,
        ease: EASE,
      }}
      className="footer-socials"
    >
      <h2 className="footer-heading">Socials</h2>
      <ul aria-label="Social media" className="footer-social-list">
        {SOCIAL_LINKS.map((social) => (
          <li key={social.platform}>
            <a
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className={`footer-social-link footer-focus ${reduced ? "footer-motion-reduced" : ""}`}
            >
              <SocialIcon platform={social.platform} />
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

export function Footer() {
  const reduced = useReducedMotion() === true;
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { amount: 0.25, once: true });
  const visible = inView || reduced;

  return (
    <footer ref={footerRef} aria-label="Site footer" className="footer-shell">
      <div className="footer-art-layer" aria-hidden="true">
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src="/footer/footer-hills.svg"
            alt=""
            fill
            aria-hidden="true"
            sizes="100vw"
            quality={90}
            className="footer-art-image"
          />
        </motion.div>
      </div>

      <div className="footer-content">
        <FooterBrand reduced={reduced} visible={visible} />
        <div className="footer-groups">
          {FOOTER_LINK_GROUPS.map((group, index) => (
            <FooterLinkGroup
              key={group.title}
              group={group}
              reduced={reduced}
              visible={visible}
              index={index + 1}
            />
          ))}
          <SocialLinks reduced={reduced} visible={visible} index={3} />
        </div>
      </div>
    </footer>
  );
}
