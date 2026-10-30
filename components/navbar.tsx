"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const links = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Play", href: "/play" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "/#contact" },
] as const;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isScrolled() {
  return window.scrollY > 48;
}

function serverScrollSnapshot() {
  return false;
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, serverScrollSnapshot);

  return (
    <header id="top" className="site-header">
      <nav aria-label="Main navigation" className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <ul>{links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className={pathname === href ? "nav-featured" : undefined} aria-current={pathname === href ? "page" : undefined}>
              {label}{label === "Work" && <span className="work-slash" aria-hidden="true">/</span>}
            </Link>
          </li>
        ))}</ul>
      </nav>
    </header>
  );
}
