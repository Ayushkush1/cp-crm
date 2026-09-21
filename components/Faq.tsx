"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Eyebrow, wrap, sectionY } from "./ui";
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
    <section className={cn(sectionY, "bg-gradient-to-b from-paper-2 to-paper")} id="faq">
      <div className={cn(wrap, "grid grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] items-start gap-16 max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-8")}>
        <div className="reveal">
          <Eyebrow>FAQ</Eyebrow>
          <h2>Questions, answered.</h2>
          <p className="mt-4 text-[17px] text-ink-2">
            Can&apos;t find what you need?{" "}
            <a href="mailto:hello@cpatlas.com" className="font-semibold underline underline-offset-[3px]">Talk to our team</a>.
          </p>
        </div>
        <div className="reveal grid gap-3" style={delay(0.08)}>
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={open === i}
              className="group rounded-2xl border border-line bg-white transition-shadow duration-200 open:shadow-soft"
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[16.5px] font-semibold [&::-webkit-details-marker]:hidden"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(open === i ? -1 : i);
                }}
              >
                {f.q}
                <Icon name="plus" className="text-ink-3 transition-transform duration-300 ease-soft group-open:rotate-45 group-open:text-brand" />
              </summary>
              <p className="max-w-[60ch] px-6 pb-[22px] text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
