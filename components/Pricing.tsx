"use client";

import { useState } from "react";
import { delay } from "@/lib/utils";

type Plan = {
  name: string;
  sub: string;
  /** Monthly price in INR. null = custom pricing. PLACEHOLDER values, confirm with the client. */
  monthly: number | null;
  features: string[];
  cta: string;
  hot?: boolean;
};

const plans: Plan[] = [
  { name: "Starter", sub: "Get started with the basics.", monthly: 0, features: ["Up to 1,000 leads", "Basic CRM features", "1 workspace", "Email support"], cta: "Get started" },
  { name: "Growth", sub: "For growing teams.", monthly: 999, features: ["Unlimited leads", "Tasks & documents", "Payment tracking", "Up to 5 team members", "Priority support"], cta: "Start free trial", hot: true },
  { name: "Business", sub: "For scaling startups.", monthly: 2499, features: ["Advanced analytics", "Custom branding", "More integrations", "Role-based access", "Priority support"], cta: "Contact sales" },
  { name: "Enterprise", sub: "For large organizations.", monthly: null, features: ["Everything in Business", "Dedicated support", "SLA & onboarding", "Custom integrations", "Advanced security"], cta: "Contact sales" },
];

const YEARLY_DISCOUNT = 0.2;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="sec" id="pricing">
      <div className="wrap">
        <div className="sec__head reveal">
          <div>
            <span className="eyebrow">Pricing</span>
            <h2>Simple, transparent pricing.</h2>
            <p>Choose a plan that fits your stage. Upgrade or downgrade anytime.</p>
          </div>
          <div className="toggle" role="group" aria-label="Billing period">
            <button className={!yearly ? "is-on" : undefined} aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
            <button className={yearly ? "is-on" : undefined} aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly</button>
            <span className="save">Save 20%</span>
          </div>
        </div>

        <div className="plans">
          {plans.map((p, i) => {
            const price = p.monthly === null ? null : yearly ? Math.round(p.monthly * (1 - YEARLY_DISCOUNT)) : p.monthly;
            return (
              <article className={`plan reveal${p.hot ? " plan--hot" : ""}`} style={delay(i * 0.07)} key={p.name}>
                {p.hot && <span className="hot">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="plan__sub">{p.sub}</p>
                <div className="price">
                  {price === null ? (
                    <b className="price--custom">Custom pricing</b>
                  ) : (
                    <>
                      <b>{inr(price)}</b>
                      <span>/ month{yearly && price > 0 ? ", billed yearly" : ""}</span>
                    </>
                  )}
                </div>
                <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href="#demo" className={`btn ${p.hot ? "btn--white" : "btn--soft"} btn--block`}>{p.cta}</a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
