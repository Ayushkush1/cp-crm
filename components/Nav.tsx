"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Brand } from "./Brand";
import { Btn } from "./ui";
import { cn } from "@/lib/cn";

const links = [
  { href: "#products", label: "Products" },
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1000) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      id="nav"
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3.5 transition-[padding] duration-500 ease-butter max-xs:px-3",
        scrolled ? "pt-3" : "pt-1",
      )}
    >
      {/* This wrapper is the bar. On scroll it narrows, rounds off and floats with a soft glass look. */}
      <div
        className={cn(
          "mx-auto w-full transition-[max-width,border-radius,background-color,box-shadow,border-color] duration-500 ease-butter",
          scrolled
            ? "max-w-[1280px] rounded-[32px] border border-white/70 bg-white/75 shadow-[0_18px_40px_-16px_rgba(15,46,38,.28),0_2px_6px_rgba(15,46,38,.06)] backdrop-blur-xl backdrop-saturate-[1.6]"
            : "max-w-[1280px] rounded-none border border-transparent bg-transparent",
          open && !scrolled && "max-nav:rounded-[32px] max-nav:bg-paper",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-6 px-3.5 transition-[height,padding] duration-500 ease-butter",
            scrolled ? "h-[60px] pl-6 pr-2.5 max-nav:pl-5" : "h-[72px]",
          )}
        >
          <Brand />
          <nav className="flex gap-1.5 max-nav:hidden" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium text-ink-2 transition duration-200 hover:bg-ink/5 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-2.5 max-nav:hidden">
            <Btn href="#" variant="ghost" size="sm">Sign in</Btn>
            <Btn href="#demo" size="sm" arrow>Live demo</Btn>
          </div>
          <button
            ref={toggleRef}
            className="hidden size-11 place-items-center rounded-full border border-line bg-white max-nav:grid"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="drawer"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} className="size-[22px]" />
          </button>
        </div>

        <div id="drawer" hidden={!open} className="flex flex-col gap-1.5 px-6 pb-6 pt-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3 font-medium">
              {l.label}
            </a>
          ))}
          <Btn href="#" variant="ghost" className="mt-2">Sign in</Btn>
          <Btn href="#demo" className="mt-2" onClick={() => setOpen(false)}>Live demo</Btn>
        </div>
      </div>
    </header>
  );
}
