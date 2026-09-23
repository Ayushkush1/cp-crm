"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Eyebrow, Glow, wrap, sectionY } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

const faqs = [
  { q: "How does the 24-hour demo work?", a: "Enter your work email and we spin up a fully loaded demo workspace with sample leads, tasks and payments. You get full access for 24 hours. No credit card needed." },
  { q: "Can I connect Razorpay or Stripe?", a: "Yes. Payments from both providers are tracked in real time and linked back to the right lead, company and deal." },
  { q: "How do form submissions become leads?", a: "Map any form to your CRM fields once. Every new submission then lands as a lead automatically, ready to qualify and assign." },
  { q: "Can my whole team use it?", a: "Add or remove team members at any time and control what each person can see and do with role-based permissions." },
  { q: "Can I upgrade or downgrade later?", a: "Any time. Plans change instantly and you only pay for what you use going forward." },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className={cn(sectionY, "relative overflow-hidden")} id="faq">
      <Glow />
      <div className={cn(wrap, "relative grid grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] items-start gap-16 max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-8")}>
        <div className="reveal">
          <Eyebrow>FAQ</Eyebrow>
          <h2>Questions, answered.</h2>
          <p className="mt-4 text-[17px] text-ink-2">
            Can&apos;t find what you need?{" "}
            <a href="mailto:hello@cpatlas.com" className="font-semibold underline underline-offset-[3px]">Talk to our team</a>.
          </p>
        </div>
        <div className="reveal grid gap-3" style={delay(0.08)}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 ease-soft",
                  isOpen && "shadow-soft",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[16.5px] font-semibold"
                >
                  {f.q}
                  <Icon
                    name="plus"
                    className={cn(
                      "shrink-0 text-ink-3 transition-transform duration-[380ms] ease-soft",
                      isOpen && "rotate-45 text-brand",
                    )}
                  />
                </button>
                {/* Animates height via grid-template-rows (0fr -> 1fr), so it works without measuring pixel heights in JS. */}
                <div
                  className="grid transition-[grid-template-rows] duration-[380ms] ease-soft"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={cn(
                        "max-w-[60ch] px-6 pb-[22px] text-ink-2 transition-opacity duration-300 ease-soft",
                        isOpen ? "opacity-100 delay-100" : "opacity-0",
                      )}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
