"use client";

import { useState } from "react";
import { Icon } from "./Icon";
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
    <section className="sec sec--tint" id="faq">
      <div className="wrap faq">
        <div className="faq__head reveal">
          <span className="eyebrow">FAQ</span>
          <h2>Questions, answered.</h2>
          <p>Can&apos;t find what you need? <a href="mailto:hello@cpatlas.com" className="link-inline">Talk to our team</a>.</p>
        </div>
        <div className="faq__list reveal" style={delay(0.08)}>
          {faqs.map((f, i) => (
            <details key={f.q} open={open === i}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(open === i ? -1 : i);
                }}
              >
                {f.q}
                <Icon name="plus" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
