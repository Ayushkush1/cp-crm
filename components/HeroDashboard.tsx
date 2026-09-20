"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { cssVar, delay } from "@/lib/utils";

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

const donut = [
  { cls: "d1", len: 34, off: 0 },
  { cls: "d2", len: 28, off: -34 },
  { cls: "d3", len: 22, off: -62 },
  { cls: "d4", len: 16, off: -84 },
];
const legend = [
  { cls: "l1", label: "New", pct: "34%" },
  { cls: "l2", label: "Qualified", pct: "28%" },
  { cls: "l3", label: "Follow Up", pct: "22%" },
  { cls: "l4", label: "Converted", pct: "16%" },
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
    <div className="hero__visual reveal" style={delay(0.15)}>
      <div className="note note--top" aria-hidden="true">
        Turn leads<br />into revenue
        <svg viewBox="0 0 60 40">
          <path d="M4 6c20 0 34 8 44 28M48 34l-9-4M48 34l2-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className={`dash${play ? " play" : ""}`}
        role="img"
        aria-label="CP Atlas dashboard preview showing total leads, active deals, pipeline value, payments, a leads by status chart and a revenue trend chart"
      >
        <div className="dash__bar"><i /><i /><i /></div>
        <div className="dash__body">
          <aside className="dash__side">
            <div className="dash__brand"><Icon name="logo" className="" />CP Atlas</div>
            {sideItems.map((s) => (
              <span key={s.label} className={s.on ? "is-on" : undefined}>
                <Icon name={s.icon} className="" />{s.label}
              </span>
            ))}
          </aside>
          <div className="dash__main">
            <div className="dash__head">
              <div><b>Dashboard</b><small>Here&apos;s what&apos;s happening with your business today.</small></div>
              <span className="dash__search">Search anything…</span>
            </div>
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <small>{s.label}</small>
                  <b><Counter {...s} play={play} reduce={reduce} /></b>
                  <em>{s.delta}</em>
                </div>
              ))}
            </div>
            <div className="charts">
              <div className="card-mini">
                <small>Leads by Status</small>
                <div className="donutwrap">
                  <svg viewBox="0 0 120 120" className="donut">
                    <circle cx="60" cy="60" r="46" className="d0" />
                    {donut.map((d) => (
                      <circle
                        key={d.cls}
                        cx="60" cy="60" r="46"
                        className={d.cls}
                        pathLength={100}
                        strokeDasharray={play ? `${d.len} ${100 - d.len}` : "0 100"}
                        strokeDashoffset={play ? d.off : 0}
                      />
                    ))}
                    <text x="60" y="60" textAnchor="middle" className="dn">248</text>
                    <text x="60" y="74" textAnchor="middle" className="dl">Total</text>
                  </svg>
                  <ul className="legend">
                    {legend.map((l) => (
                      <li key={l.label}><i className={l.cls} />{l.label}<span>{l.pct}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card-mini">
                <small>Revenue Trend <span className="badge">₹3.2L <em>+30%</em></span></small>
                <div className="bars">
                  {bars.map((h, i) => (
                    <span key={i} style={cssVar("--h", `${h}%`)} />
                  ))}
                </div>
                <div className="axis">{months.map((m) => <i key={m}>{m}</i>)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toast" aria-hidden="true">
        <span className="toast__ic"><Icon name="check" className="" /></span>
        <div><b>Payment received</b><small>₹48,000 · Razorpay</small></div>
      </div>
    </div>
  );
}
