"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

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
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`} id="nav">
      <div className="wrap nav__in">
        <a href="#top" className="brand" aria-label="CP Atlas home">
          <Icon name="logo" className="brand__mark" />
          <span>CP Atlas</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="nav__cta">
          <a href="#" className="btn btn--ghost btn--sm">Sign in</a>
          <a href="#demo" className="btn btn--dark btn--sm">
            Get a live demo <Icon name="arrow" />
          </a>
        </div>
        <button
          ref={toggleRef}
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="drawer"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <div className="drawer" id="drawer" hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#" className="btn btn--ghost">Sign in</a>
        <a href="#demo" className="btn btn--dark" onClick={() => setOpen(false)}>Get a live demo</a>
      </div>
    </header>
  );
}
