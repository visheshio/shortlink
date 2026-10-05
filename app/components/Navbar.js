"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "History", href: "/history" },
  { label: "About", href: "/about" },
  { label: "Login", href: "/login" },
];

/**
 * The mark: two rings of a link clamp.
 * On load the right ring slides in and closes the link (sl-clamp).
 * On hover the rings release apart by 3px.
 */
function ClampMark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="1"
        y="8"
        width="13"
        height="8"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
        className="sl-clamp-ring transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[3px]"
      />
      <rect
        x="10"
        y="8"
        width="13"
        height="8"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
        className="sl-clamp sl-clamp-ring text-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px]"
      />
    </svg>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-shell/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-[var(--nav-h)] max-w-7xl items-stretch justify-between gap-6 px-5 sm:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group sl-rise flex shrink-0 items-center gap-2.5 rounded-[3px] text-shell-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
        >
          <ClampMark className="h-6 w-6" />
          <span className="flex flex-col leading-none">
            <span className="text-[16px] font-semibold uppercase tracking-[0.2em]">
              Shortlink
            </span>
            <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.28em] text-shell-muted">
              URL shortener
            </span>
          </span>
        </Link>
        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex h-full items-stretch">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.href}
                className="group sl-rise relative flex items-center"
                style={{ animationDelay: `${120 + index * 70}ms` }}
              >
                <Link
                  href={item.href}
                  className="flex items-center px-4 text-[14px] font-medium uppercase tracking-[0.14em] text-shell-muted transition-colors duration-200 hover:text-shell-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brass"
                >
                  {item.label}
                </Link>
                {/* This item's tick on the ruler, rising from the baseline */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-1/2 h-[13px] w-px -translate-x-1/2 bg-transparent transition-colors duration-300 ease-out group-hover:bg-brass"
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/"
            className="sl-rise hidden items-center gap-2 rounded-[3px] bg-brass px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#16181c] transition-colors duration-200 hover:bg-brass-lit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass sm:inline-flex"
            style={{ animationDelay: "330ms" }}
          >
            Shorten a link
            <svg
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="h-2.5 w-2.5"
            >
              <path
                d="M2.5 9.5 9.5 2.5M4.5 2.5h5v5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="sl-burger -mr-1 inline-flex h-10 w-10 items-center justify-center rounded-[3px] text-shell-ink transition-colors duration-200 hover:bg-rule-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brass md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div id="mobile-menu" className="sl-rise border-t border-rule bg-shell md:hidden">
          <nav aria-label="Mobile" className="px-5 py-3 sm:px-8">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="border-b border-rule-soft last:border-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-[13px] font-medium uppercase tracking-[0.14em] text-shell-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brass"
                  >
                    {item.label}
                    <span aria-hidden="true" className="h-3 w-px bg-rule" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mt-5 flex items-center justify-center rounded-[3px] bg-brass px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#16181c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass sm:hidden"
            >
              Shorten a link
            </Link>
          </nav>
        </div>
      )}

      {/* The ruler: a continuous hairline scale across the whole bar */}
      <div
        aria-hidden="true"
        className="sl-ruler pointer-events-none absolute inset-x-0 bottom-0 h-[5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--rule) 0 1px, transparent 1px 9px)",
        }}
      />
    </header>
  );
};

export default Navbar;