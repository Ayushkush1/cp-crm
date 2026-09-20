"use client";

import { useRef } from "react";
import { Icon } from "./Icon";
import { cssVar } from "@/lib/utils";

// PLACEHOLDER testimonials carried over from the design reference. Replace with real customer quotes.
const quotes = [
  { q: "CP Atlas has simplified our entire customer workflow. We went from chaos to clarity in days.", name: "Rahul Verma", role: "CTO, BuildBuddy", ini: "RV", h: 24 },
  { q: "The integration with payments and form submissions is a game changer.", name: "Sneha Kapoor", role: "Product Manager, LoopScale", ini: "SK", h: 200 },
  { q: "Clean UI, powerful features and super easy to get started. Highly recommended!", name: "Arjun Iyer", role: "Founder, DevLaunch", ini: "AI", h: 300 },
  { q: "We finally see every lead, task and payment in one view. Our team stopped living in spreadsheets.", name: "Priya Mehta", role: "Founder, TechNova", ini: "PM", h: 340 },
];

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    const card = el.querySelector<HTMLElement>(".tcard");
    const w = (card?.getBoundingClientRect().width ?? 300) + 20;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior });
    else el.scrollBy({ left: dir * w, behavior });
  };

  return (
    <section className="sec sec--tint" id="stories">
      <div className="wrap">
        <div className="sec__head reveal">
          <div>
            <span className="eyebrow">Trusted by founders</span>
            <h2>Loved by startup teams.</h2>
            <p>Real stories from real builders.</p>
          </div>
          <div className="arrows">
            <button className="round" aria-label="Previous testimonials" onClick={() => step(-1)}><Icon name="left" /></button>
            <button className="round" aria-label="Next testimonials" onClick={() => step(1)}><Icon name="right" /></button>
          </div>
        </div>
        <div
          className="track"
          ref={track}
          tabIndex={0}
          aria-label="Customer testimonials"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
          }}
        >
          {quotes.map((t) => (
            <figure className="tcard" key={t.name}>
              <blockquote>“{t.q}”</blockquote>
              <figcaption>
                <span className="av" style={cssVar("--h", t.h)}>{t.ini}</span>
                <div><b>{t.name}</b><small>{t.role}</small></div>
              </figcaption>
              <div className="stars" role="img" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" className="" />)}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
