"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

const sideItems: { icon: IconName; label: string; on?: boolean }[] = [
  { icon: "chart", label: "Dashboard", on: true },
  { icon: "inbox", label: "Leads" },
  { icon: "target", label: "Opportunities" },
  { icon: "box", label: "Companies" },
  { icon: "user", label: "Contacts" },
  { icon: "task", label: "Tasks" },
  { icon: "doc", label: "Documents" },
  { icon: "card", label: "Payments" },
];

const stats = [
  { label: "Total Leads", value: 248, dec: 0, prefix: "", suffix: "", delta: "↑ 12% this month" },
  { label: "Active Deals", value: 42, dec: 0, prefix: "", suffix: "", delta: "↑ 8% this month" },
  { label: "Pipeline Value", value: 12.4, dec: 1, prefix: "₹", suffix: "L", delta: "↑ 18% this month" },
  { label: "Payments", value: 3.2, dec: 1, prefix: "₹", suffix: "L", delta: "↑ 26% this month" },
];

// stroke = ring colour, dot = legend dot colour class
const donut = [
  { stroke: "#8b6cf0", dot: "bg-[#8b6cf0]", label: "New", pct: 34, off: 0 },
  { stroke: "#1f9d6b", dot: "bg-[#1f9d6b]", label: "Qualified", pct: 28, off: -34 },
  { stroke: "#f5a25b", dot: "bg-[#f5a25b]", label: "Follow Up", pct: 22, off: -62 },
  { stroke: "#33c48a", dot: "bg-[#33c48a]", label: "Converted", pct: 16, off: -84 },
];
const bars = [28, 40, 36, 58, 72, 96];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function Counter({ value, dec, prefix, suffix, play, reduce }: {
  value: number; dec: number; prefix: string; suffix: string; play: boolean; reduce: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!play) return;
    if (reduce) { setN(value); return; }
    let raf = 0;
    let start: number | null = null;
    const dur = 1400;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / dur, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, reduce, value]);
  return <>{prefix}{dec ? n.toFixed(dec) : Math.round(n)}{suffix}</>;
}

/* Shared 3D screen styling. Tweak the rotate values to change the tilt. */
const screen3d =
  "relative rounded-[22px] border border-white/90 bg-white origin-[70%_50%] will-change-transform [transform-style:preserve-3d] " +
  "transition-[transform,box-shadow] duration-[800ms] ease-soft " +
  "[transform:rotateY(-16deg)_rotateX(5deg)_rotateZ(1.2deg)] group-hover/visual:[transform:rotateY(-9deg)_rotateX(3deg)_rotateZ(.6deg)] " +
  "shadow-[-2px_2px_0_#d9efe4,-5px_5px_0_#bfe4d2,-8px_8px_0_#a3d8bf,-11px_11px_0_#8bcbae,-22px_34px_44px_-10px_rgba(15,46,38,.35),-50px_70px_90px_-30px_rgba(15,46,38,.35)] " +
  "max-lg:[transform:rotateY(-7deg)_rotateX(3deg)] max-lg:shadow-[-2px_2px_0_#d9efe4,-5px_5px_0_#bfe4d2,-8px_8px_0_#a3d8bf,-18px_28px_40px_-12px_rgba(15,46,38,.35)]";

/* Cards that float in front of the screen (real 3D depth). Change translateZ to adjust the height. */
const liftBar =
  "[transform:translateZ(42px)] shadow-[-1px_2px_0_#14634a,-2px_4px_0_#0f5040,-3px_6px_0_#0c4031,-10px_16px_16px_-6px_rgba(15,46,38,.5)] group-hover/visual:[transform:translateZ(54px)]";
const liftTab =
  "relative z-10 transition-[transform,box-shadow] duration-[800ms] ease-soft [transform:translateZ(20px)] shadow-[0_10px_18px_-8px_rgba(15,46,38,.35),0_0_0_1px_rgba(31,157,107,.15)] group-hover/visual:[transform:translateZ(30px)]";
const liftSmall =
  "relative z-10 [transform:translateZ(28px)] shadow-[0_20px_32px_-12px_rgba(15,46,38,.35),0_0_0_1px_rgba(255,255,255,.7)] transition-[transform,box-shadow] duration-[800ms] ease-soft group-hover/visual:[transform:translateZ(40px)]";

const miniCard = "min-w-0 rounded-xl border border-line bg-white p-3";
const miniTitle = "mb-2 flex items-center justify-between text-[11px] font-semibold";

export function HeroDashboard() {
  const [play, setPlay] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    const t = setTimeout(() => setPlay(true), r ? 0 : 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="reveal group/visual relative mt-[34px] [perspective-origin:20%_40%] [perspective:1500px]"
      style={delay(0.15)}
    >
      <div
        aria-hidden="true"
        className="absolute -top-[55px] right-1.5 z-[5] text-left font-serif text-sm italic leading-[1.2] text-ink-2 max-sm:hidden"
      >
        Turn leads<br />into revenue
        <svg viewBox="0 0 60 40" className="ml-[-6px] mt-1 h-8 w-[50px] [transform:scaleX(-1)_rotate(20deg)]">
          <path d="M4 6c20 0 34 8 44 28M48 34l-9-4M48 34l2-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className={screen3d}
        role="img"
        aria-label="CP Atlas dashboard preview showing total leads, active deals, pipeline value, payments, a leads by status chart and a revenue trend chart"
      >
        {/* window bar */}
        <div className="flex gap-1.5 rounded-t-[21px] border-b border-line bg-[#fbfaf6] px-4 py-3">
          <i className="size-[9px] rounded-full bg-[#f3b3a6]" />
          <i className="size-[9px] rounded-full bg-[#f1d79a]" />
          <i className="size-[9px] rounded-full bg-[#b6dfc6]" />
        </div>

        <div className="grid grid-cols-[128px_1fr] [transform-style:preserve-3d] max-sm:grid-cols-1">
          <aside className="flex flex-col gap-0.5 rounded-bl-[21px] [transform-style:preserve-3d] border-r border-line bg-[#fbfaf6] px-3 py-4 text-[11.5px] text-ink-2 max-sm:hidden">
            <div className="mb-3.5 flex items-center gap-2 px-1.5 text-[13px] font-bold text-ink">
              <Icon name="logo" className="size-5 text-forest" />CP Atlas
            </div>
            {sideItems.map((s) => (
              <span
                key={s.label}
                className={cn("flex items-center gap-[9px] rounded-lg px-2.5 py-2", s.on && cn("bg-mint font-semibold text-forest", liftTab))}
              >
                <Icon name={s.icon} className="size-3.5" />{s.label}
              </span>
            ))}
          </aside>

          <div className="min-w-0 px-3.5 py-4 [transform-style:preserve-3d]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <b className="block text-base">Dashboard</b>
                <small className="text-[10.5px] text-ink-3">Here&apos;s what&apos;s happening with your business today.</small>
              </div>
              <span className="whitespace-nowrap rounded-lg border border-line px-3 py-1.5 text-[11px] text-ink-3">Search anything…</span>
            </div>

            <div className="my-3.5 grid grid-cols-4 gap-2 [transform-style:preserve-3d] max-sm:grid-cols-2">
              {stats.map((s) => (
                <div className={cn("min-w-0 rounded-xl border border-line bg-white p-2.5", s.label === "Pipeline Value" && liftSmall)} key={s.label}>
                  <small className="block whitespace-nowrap text-[9.5px] text-ink-3">{s.label}</small>
                  <b className="my-0.5 block whitespace-nowrap text-lg font-bold tracking-[-.02em]">
                    <Counter {...s} play={play} reduce={reduce} />
                  </b>
                  <em className="whitespace-nowrap text-[8.5px] font-semibold not-italic text-brand">{s.delta}</em>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 [transform-style:preserve-3d] max-sm:grid-cols-1">
              <div className={miniCard}>
                <small className={miniTitle}>Leads by Status</small>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 120 120" className="w-[84px] shrink-0 -rotate-90">
                    <circle cx="60" cy="60" r="46" fill="none" stroke="#f0eee6" strokeWidth="14" />
                    {donut.map((d) => (
                      <circle
                        key={d.label}
                        cx="60" cy="60" r="46"
                        fill="none"
                        stroke={d.stroke}
                        strokeWidth="14"
                        pathLength={100}
                        strokeDasharray={play ? `${d.pct} ${100 - d.pct}` : "0 100"}
                        strokeDashoffset={play ? d.off : 0}
                        className="transition-[stroke-dasharray] delay-300 duration-[1200ms] ease-soft"
                      />
                    ))}
                    <text x="60" y="60" textAnchor="middle" className="fill-ink text-[22px] font-bold [transform-origin:60px_60px] [transform:rotate(90deg)]">248</text>
                    <text x="60" y="74" textAnchor="middle" className="fill-ink-3 text-[9px] [transform-origin:60px_60px] [transform:rotate(90deg)]">Total</text>
                  </svg>
                  <ul className="grid min-w-0 flex-1 gap-1.5 text-[9.5px] text-ink-2">
                    {donut.map((d) => (
                      <li key={d.label} className="flex items-center gap-1.5">
                        <i className={cn("size-[7px] rounded-full", d.dot)} />{d.label}
                        <span className="ml-auto font-semibold">{d.pct}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={cn(miniCard, "[transform-style:preserve-3d]")}>
                <small className={miniTitle}>
                  Revenue Trend
                  <span className="text-right text-xs font-bold leading-[1.1]">
                    ₹3.2L <em className="block text-[9.5px] font-semibold not-italic text-brand">+30%</em>
                  </span>
                </small>
                <div className="flex h-[92px] items-end gap-2 pt-1 pl-1 [transform-style:preserve-3d]">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      className={cn("flex-1 rounded-b-[2px] rounded-t-[5px] bg-gradient-to-b from-brand-2 to-forest-2 transition-[height,transform] duration-1000 ease-soft", liftBar)}
                      style={{ height: play ? `${h}%` : 0, transitionDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </div>
                <div className="mt-2.5 flex justify-between gap-2 text-[9px] text-ink-3">
                  {months.map((m) => <i key={m} className="flex-1 text-center not-italic">{m}</i>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* glossy reflection */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit] bg-[linear-gradient(112deg,rgba(255,255,255,.55)_0%,rgba(255,255,255,.14)_22%,transparent_42%),linear-gradient(0deg,rgba(15,46,38,.06),transparent_30%)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute -bottom-[26px] -left-7 z-10 flex animate-float items-center gap-3 rounded-[14px] border border-line bg-white py-3 pl-3 pr-[18px] shadow-card max-sm:-bottom-[30px] max-sm:left-3"
      >
        <span className="grid size-[34px] place-items-center rounded-[10px] bg-mint text-brand">
          <Icon name="check" className="stroke-[2.6]" />
        </span>
        <div>
          <b className="block text-[13px] leading-[1.2]">Payment received</b>
          <small className="text-[11.5px] text-ink-3">₹48,000 · Razorpay</small>
        </div>
      </div>
    </div>
  );
}
