"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Btn, SectionHead, wrap, sectionY } from "./ui";
import { cn } from "@/lib/cn";
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
  const toggleBtn = (active: boolean) =>
    cn("rounded-[10px] px-[18px] py-[9px] text-sm font-semibold transition duration-200", active ? "bg-forest text-white" : "text-ink-2");

  return (
    <section className={sectionY} id="pricing">
      <div className={wrap}>
        <SectionHead eyebrow="Pricing" title="Simple, transparent pricing." sub="Choose a plan that fits your stage. Upgrade or downgrade anytime.">
          <div className="flex items-center gap-1 rounded-[14px] border border-line bg-white p-[5px]" role="group" aria-label="Billing period">
            <button className={toggleBtn(!yearly)} aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
            <button className={toggleBtn(yearly)} aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly</button>
            <span className="ml-1 rounded-[10px] bg-mint px-3 py-2 text-[12.5px] font-bold text-[#177a53]">Save 20%</span>
          </div>
        </SectionHead>

        <div className="grid grid-cols-4 items-stretch gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {plans.map((p, i) => {
            const price = p.monthly === null ? null : yearly ? Math.round(p.monthly * (1 - YEARLY_DISCOUNT)) : p.monthly;
            return (
              <article
                key={p.name}
                style={delay(i * 0.07)}
                className={cn(
                  "reveal relative flex flex-col rounded-[22px] border border-line bg-white px-[26px] pb-[26px] pt-[30px] hover:-translate-y-1.5 hover:shadow-card",
                  p.hot && "-translate-y-2.5 border-forest bg-forest text-white shadow-deep hover:-translate-y-4 max-lg:translate-y-0 max-lg:hover:-translate-y-1.5",
                )}
              >
                {p.hot && (
                  <span className="absolute right-[22px] top-[26px] rounded-full bg-[#f7b955] px-[11px] py-[5px] text-[11.5px] font-bold text-[#4a2f00]">
                    Most popular
                  </span>
                )}
                <h3 className="font-serif text-[22px] font-semibold">{p.name}</h3>
                <p className={cn("mt-0.5 text-sm text-ink-3", p.hot && "text-white/65")}>{p.sub}</p>

                <div className="mb-[22px] mt-6 flex min-h-12 items-baseline gap-1.5">
                  {price === null ? (
                    <b className="self-center font-serif text-[26px] font-semibold leading-[1.3] tracking-[-.03em]">Custom pricing</b>
                  ) : (
                    <>
                      <b className="font-serif text-[42px] font-semibold leading-none tracking-[-.03em]">{inr(price)}</b>
                      <span className={cn("text-sm text-ink-3", p.hot && "text-white/65")}>
                        / month{yearly && price > 0 ? ", billed yearly" : ""}
                      </span>
                    </>
                  )}
                </div>

                <ul className={cn("mb-7 grid flex-1 gap-3 text-[14.5px] text-ink-2", p.hot && "text-white/85")}>
                  {p.features.map((f) => (
                    <li key={f} className="relative pl-7">
                      <Icon name="check" className={cn("absolute left-[2.5px] top-[5.5px] size-[13px] stroke-[3.2]", p.hot ? "text-brand-2" : "text-brand")} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Btn href="#demo" variant={p.hot ? "white" : "soft"} block>{p.cta}</Btn>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
