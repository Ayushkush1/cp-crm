"use client";

import { useRef } from "react";
import { Icon } from "./Icon";
import { Avatar, Glow, SectionHead, wrap, sectionY } from "./ui";
import { cn } from "@/lib/cn";

// PLACEHOLDER testimonials carried over from the design reference. Replace with real customer quotes.
const quotes = [
  { q: "CP Atlas has simplified our entire customer workflow. We went from chaos to clarity in days.", name: "Rahul Verma", role: "CTO, BuildBuddy", ini: "RV", h: 24 },
  { q: "The integration with payments and form submissions is a game changer.", name: "Sneha Kapoor", role: "Product Manager, LoopScale", ini: "SK", h: 200 },
  { q: "Clean UI, powerful features and super easy to get started. Highly recommended!", name: "Arjun Iyer", role: "Founder, DevLaunch", ini: "AI", h: 300 },
  { q: "We finally see every lead, task and payment in one view. Our team stopped living in spreadsheets.", name: "Priya Mehta", role: "Founder, TechNova", ini: "PM", h: 340 },
];

const arrowBtn =
  "grid size-[46px] place-items-center rounded-full border border-line bg-white transition duration-200 hover:scale-[1.06] hover:bg-forest hover:text-white";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    const card = el.firstElementChild as HTMLElement | null;
    const w = (card?.getBoundingClientRect().width ?? 300) + 20;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior });
    else el.scrollBy({ left: dir * w, behavior });
  };

  return (
    <section className={cn(sectionY, "relative overflow-hidden")} id="stories">
      <Glow />
      <div className={cn(wrap, "relative")}>
        <SectionHead eyebrow="Trusted by founders" title="Loved by startup teams." sub="Real stories from real builders.">
          <div className="flex gap-2.5">
            <button className={arrowBtn} aria-label="Previous testimonials" onClick={() => step(-1)}><Icon name="left" /></button>
            <button className={arrowBtn} aria-label="Next testimonials" onClick={() => step(1)}><Icon name="right" /></button>
          </div>
        </SectionHead>

        <div
          ref={track}
          tabIndex={0}
          aria-label="Customer testimonials"
          className="-mx-0.5 -mt-1.5 grid auto-cols-[calc((100%-40px)/3)] grid-flow-col snap-x snap-mandatory gap-5 overflow-x-auto px-0.5 pb-6 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-lg:auto-cols-[calc((100%-20px)/2)] max-sm:auto-cols-[88%]"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
          }}
        >
          {quotes.map((t) => (
            <figure key={t.name} className="flex snap-start flex-col gap-6 rounded-[22px] border border-line bg-white p-[30px] shadow-soft">
              <blockquote className="flex-1 font-serif text-xl leading-[1.4] tracking-[-.01em]">“{t.q}”</blockquote>
              <figcaption className="flex items-center gap-3.5">
                <Avatar initials={t.ini} hue={t.h} />
                <div>
                  <b className="block text-[15px]">{t.name}</b>
                  <small className="text-[13px] text-ink-3">{t.role}</small>
                </div>
              </figcaption>
              <div className="flex gap-[3px] text-[#f5a623]" role="img" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" className="size-4" />)}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
