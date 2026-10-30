"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useSyncExternalStore } from "react";

const links = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/#contact" },
] as const;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

function isScrolled() {
  return window.scrollY > 48;
}

function isContactVisible() {
  const contact = document.getElementById("contact");
  return Boolean(contact && contact.getBoundingClientRect().top < window.innerHeight * 0.55);
}

function serverScrollSnapshot() {
  return false;
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, serverScrollSnapshot);
  const contactVisible = useSyncExternalStore(subscribeToScroll, isContactVisible, serverScrollSnapshot);
  const activeHref = pathname === "/" && contactVisible ? "/#contact" : pathname;
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLLIElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  const moveIndicator = useCallback((href: string) => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    const link = linkRefs.current.get(href);
    if (!list || !indicator) return;
    indicator.style.opacity = link ? "1" : "0";
    if (!link) return;
    const listBounds = list.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    indicator.style.width = `${linkBounds.width}px`;
    indicator.style.height = `${linkBounds.height}px`;
    indicator.style.transform = `translate3d(${linkBounds.left - listBounds.left}px, ${linkBounds.top - listBounds.top}px, 0)`;
    list.dataset.enhanced = "true";
  }, []);

  useLayoutEffect(() => {
    moveIndicator(activeHref);
    const frame = requestAnimationFrame(() => {
      if (indicatorRef.current) indicatorRef.current.dataset.ready = "true";
    });
    const observer = new ResizeObserver(() => moveIndicator(activeHref));
    if (listRef.current) observer.observe(listRef.current);
    linkRefs.current.forEach((link) => observer.observe(link));
    let mounted = true;
    document.fonts.ready.then(() => { if (mounted) moveIndicator(activeHref); });
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeHref, moveIndicator]);

  return (
    <header id="top" className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <nav aria-label="Main navigation" className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <ul className="nav-tabs" ref={listRef}>
          <li ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
          {links.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                ref={(element) => {
                  if (element) linkRefs.current.set(href, element);
                  else linkRefs.current.delete(href);
                }}
                onNavigate={() => moveIndicator(href)}
                className={activeHref === href ? "nav-featured" : undefined}
                aria-current={activeHref === href ? (href === "/#contact" ? "location" : "page") : undefined}
              >
                <span className="nav-label">{label}{label === "Work" && <span className="work-slash" aria-hidden="true">/</span>}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
