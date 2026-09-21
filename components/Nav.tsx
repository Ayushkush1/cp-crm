"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Brand } from "./Brand";
import { Btn, wrap } from "./ui";
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
        "fixed inset-x-0 top-0 z-50 transition duration-300",
        scrolled && "bg-paper/80 shadow-[0_1px_0_var(--color-line)] backdrop-blur-[14px] backdrop-saturate-[1.4]",
        open && "max-nav:bg-paper",
      )}
    >
      <div className={cn(wrap, "flex h-[72px] items-center justify-between gap-6")}>
        <Brand />
        <nav className="flex gap-1.5 max-nav:hidden" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-[10px] px-3.5 py-2 text-[15px] font-medium text-ink-2 transition duration-200 hover:bg-ink/5 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-2.5 max-nav:hidden">
          <Btn href="#" variant="ghost" size="sm">Sign in</Btn>
          <Btn href="#demo" size="sm" arrow>Get a live demo</Btn>
        </div>
        <button
          ref={toggleRef}
          className="hidden size-11 place-items-center rounded-xl border border-line bg-white max-nav:grid"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="drawer"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} className="size-[22px]" />
        </button>
      </div>
      <div id="drawer" hidden={!open} className="flex flex-col gap-1.5 border-b border-line bg-paper px-6 pb-6 pt-3">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3 font-medium">
            {l.label}
          </a>
        ))}
        <Btn href="#" variant="ghost" className="mt-2">Sign in</Btn>
        <Btn href="#demo" className="mt-2" onClick={() => setOpen(false)}>Get a live demo</Btn>
      </div>
    </header>
  );
}
