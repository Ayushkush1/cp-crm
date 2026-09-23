"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Icon, type IconName } from "./Icon";
import { Hl, Tag, wrap, sectionY, type TagTone } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

/** Simple panda-face mark for Coding Pandas. */
function Panda({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden="true">
      <circle cx="8" cy="8" r="5" fill="#10201b" />
      <circle cx="24" cy="8" r="5" fill="#10201b" />
      <circle cx="16" cy="17.5" r="12" fill="#fff" stroke="#10201b" strokeWidth="1" />
      <ellipse cx="11" cy="16" rx="3.2" ry="4" transform="rotate(-18 11 16)" fill="#10201b" />
      <ellipse cx="21" cy="16" rx="3.2" ry="4" transform="rotate(18 21 16)" fill="#10201b" />
      <circle cx="11.6" cy="16" r="1.1" fill="#fff" />
      <circle cx="20.4" cy="16" r="1.1" fill="#fff" />
      <ellipse cx="16" cy="21" rx="2" ry="1.4" fill="#10201b" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Before: a messy spreadsheet                                          */
/* ------------------------------------------------------------------ */
// Same column grid on both sides so the rows line up when you drag.
const cols = "grid-cols-[28px_1.1fr_1fr_1fr_.8fr_1.1fr] max-sm:grid-cols-[22px_1.1fr_1fr_1fr_.8fr]";
const sheetHead = ["", "Lead", "Status", "Owner", "Amount", "Notes"];
const sheetRows = [
  ["Acme Co.", "call back??", "—", "#REF!", "2 wks ago"],
  ["Northwind", "sent quote?", "Ravi / Sam?", "₹48,000", "paid? check bank"],
  ["Globex", "", "who owns this", "#N/A", ""],
  ["Initech", "hot lead!!", "—", "₹1.2L", "dup of row 9"],
  ["Umbrella", "follow up", "Sam", "#REF!", "old number?"],
  ["Hooli", "??", "—", "₹75K", "lost? won?"],
  ["Stark Ltd", "quote sent", "Ravi", "₹2.4L", "or was it 2.1?"],
  ["Wayne Corp", "", "—", "#N/A", "email bounced"],
];

function cellTone(v: string) {
  if (v.startsWith("#")) return "bg-[#fde1e2] font-semibold text-[#c23b41]";
  if (v === "") return "bg-[#fff1b8]";
  if (v.includes("?")) return "text-[#b85a14]";
  return "text-ink-2";
}

function Spreadsheet() {
  return (
    <div className="absolute inset-0 bg-[#f6f7f6] text-[12px] max-sm:text-[10px]">
      <div className="flex h-[42px] items-center gap-2 border-b border-[#dfe3e0] bg-white px-4 text-[12px] text-ink-2 max-sm:text-[10px]">
        <span className="grid size-5 place-items-center rounded bg-[#1e8e57] text-[10px] font-bold text-white">X</span>
        leads_FINAL_v7 (copy) (2).xlsx
        <span className="ml-auto rounded bg-[#fde1e2] px-2 py-0.5 text-[10px] font-semibold text-[#c23b41]">3 errors</span>
      </div>
      <div className={cn("grid h-8 border-b border-[#dfe3e0] bg-[#eceeed] font-semibold text-ink-3", cols)}>
        {sheetHead.map((h, i) => (
          <span key={i} className={cn("flex items-center border-r border-[#dfe3e0] px-3 last:border-r-0", i === 5 && "max-sm:hidden")}>{h}</span>
        ))}
      </div>
      {sheetRows.map((r, ri) => (
        <div key={ri} className={cn("grid h-9 border-b border-[#e7eae8] bg-white", cols)}>
          <span className="flex items-center justify-center border-r border-[#dfe3e0] bg-[#eceeed] text-ink-3">{ri + 1}</span>
          {r.map((c, ci) => (
            <span
              key={ci}
              className={cn("flex items-center border-r border-[#e7eae8] px-3 last:border-r-0", cellTone(c), ci === 4 && "max-sm:hidden")}
            >
              <span className="truncate">{c}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* After: the same leads as a clear 4-stage board in CP Atlas           */
/* ------------------------------------------------------------------ */
const stages: {
  name: string;
  dot: string;
  tone: TagTone;
  cards: { lead: string; who: string; amt: string; next: string; paid?: boolean }[];
}[] = [
  { name: "New", dot: "bg-[#4b6fe0]", tone: "b", cards: [
    { lead: "Acme Co.", who: "R", amt: "₹32K", next: "Call today" },
    { lead: "Globex", who: "S", amt: "₹18K", next: "Send quote" },
    { lead: "Wayne Corp", who: "S", amt: "₹9K", next: "Reply to email" },
  ] },
  { name: "Follow up", dot: "bg-[#e2782a]", tone: "o", cards: [
    { lead: "Initech", who: "R", amt: "₹1.2L", next: "Demo on Fri" },
    { lead: "Umbrella", who: "S", amt: "₹54K", next: "Call back Mon" },
  ] },
  { name: "Quote sent", dot: "bg-[#7a55ea]", tone: "v", cards: [
    { lead: "Stark Ltd", who: "R", amt: "₹2.4L", next: "Follow up Mon" },
  ] },
  { name: "Won", dot: "bg-brand", tone: "g", cards: [
    { lead: "Northwind", who: "R", amt: "₹48K", next: "Paid via Razorpay", paid: true },
    { lead: "Hooli", who: "A", amt: "₹75K", next: "Paid via Stripe", paid: true },
  ] },
];
const navItems: { icon: IconName; label: string; on?: boolean }[] = [
  { icon: "chart", label: "Dashboard" },
  { icon: "inbox", label: "Leads", on: true },
  { icon: "task", label: "Tasks" },
  { icon: "doc", label: "Documents" },
  { icon: "card", label: "Payments" },
];

// Overall numbers for the sample leads above.
const atlasStats = [
  { label: "Total leads", value: "8", delta: "all in one place" },
  { label: "Open pipeline", value: "₹4.7L", delta: "↑ 18% this month" },
  { label: "Won this month", value: "₹1.2L", delta: "2 deals, paid" },
  { label: "Conversion", value: "25%", delta: "↑ 6% vs last month" },
];

function Pipeline() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#f3faf6,#efeaff)]">
      {/* sidebar: appears when you drag the divider right */}
      <div className="absolute inset-y-0 left-0 flex w-[128px] flex-col gap-0.5 overflow-hidden border-r border-white/70 bg-white/60 px-3 py-4 max-sm:w-11 max-sm:items-center max-sm:px-1.5 max-sm:py-3">
        <div className="mb-3.5 flex items-center gap-2 px-1.5 text-[13px] font-bold max-sm:mb-2 max-sm:px-0">
          <Icon name="logo" className="size-5 shrink-0 text-forest" />
          <span className="max-sm:hidden">CP Atlas</span>
        </div>
        {navItems.map((n) => (
          <span
            key={n.label}
            className={cn(
              "flex items-center gap-[9px] rounded-lg px-2.5 py-2 text-[11.5px] text-ink-2 max-sm:p-2",
              n.on && "bg-mint font-semibold text-forest shadow-soft",
            )}
          >
            <Icon name={n.icon} className="size-3.5 shrink-0" />
            <span className="truncate max-sm:hidden">{n.label}</span>
          </span>
        ))}
      </div>

      {/* main */}
      <div className="absolute inset-y-0 left-[128px] right-0 p-4 max-sm:left-11 max-sm:p-2.5">
        <div className="mb-3 flex items-center gap-2 max-sm:mb-2">
          <b className="text-[14px] max-sm:text-[11px]">Pipeline</b>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-mint px-2.5 py-0.5 text-[11px] font-semibold text-[#177a53] max-sm:text-[9px]">
            <Icon name="check" className="size-3 stroke-[3]" /> 0 errors · synced
          </span>
        </div>

        {/* overall stats, same 4-column grid as the board so they line up */}
        <div className="mb-3 grid grid-cols-4 gap-3 max-sm:mb-2 max-sm:grid-cols-2 max-sm:gap-2">
          {atlasStats.map((m, i) => (
            <div
              key={m.label}
              className={cn("min-w-0 rounded-xl bg-white p-2.5 shadow-soft ring-1 ring-line/60 max-sm:p-2", (i === 1 || i === 2) && "max-sm:hidden")}
            >
              <small className="block truncate text-[10px] text-ink-3 max-sm:text-[9px]">{m.label}</small>
              <b className="my-0.5 block text-[19px] font-bold leading-tight tracking-[-.02em] max-sm:text-[15px]">{m.value}</b>
              <em className="block truncate text-[9.5px] font-semibold not-italic text-brand max-sm:text-[8.5px]">{m.delta}</em>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-2 max-sm:gap-2">
          {stages.map((c, ci) => (
            <div key={c.name} className={cn("rounded-2xl bg-white/65 p-2.5 ring-1 ring-white max-sm:p-1.5", (ci === 1 || ci === 2) && "max-sm:hidden")}>
              <div className="mb-2 flex items-center gap-1.5 px-0.5 text-[11.5px] font-semibold text-ink-2 max-sm:text-[10px]">
                <i className={cn("size-2 rounded-full", c.dot)} />
                {c.name}
                <span className="ml-auto rounded-full bg-white px-1.5 text-[10px] text-ink-3">{c.cards.length}</span>
              </div>
              <div className="grid gap-2">
                {c.cards.map((k) => (
                  <div key={k.lead} className="grid gap-1.5 rounded-xl bg-white p-2.5 shadow-soft ring-1 ring-line/60 max-sm:p-2">
                    <div className="flex items-center gap-2">
                      <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-forest text-[9px] font-bold text-white">{k.who}</span>
                      <b className="truncate text-[12px] max-sm:text-[10px]">{k.lead}</b>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Tag tone={c.tone}>{k.amt}</Tag>
                    </div>
                    <small className={cn("flex items-center gap-1 text-[10.5px] max-sm:text-[9px]", k.paid ? "font-semibold text-[#177a53]" : "text-ink-3")}>
                      {k.paid && <Icon name="check" className="size-3 shrink-0 stroke-[3]" />}
                      <span className="truncate">{k.next}</span>
                    </small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Before / after slider                                                */
/* ------------------------------------------------------------------ */
// Where the divider settles (%): 40% sheet, 60% CP Atlas.
const REST_DESKTOP = 40;
const REST_MOBILE = 40;
const restFor = () => (window.matchMedia("(max-width: 700px)").matches ? REST_MOBILE : REST_DESKTOP);

function Compare() {
  const box = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const dragging = useRef(false);
  const [p, setP] = useState(REST_DESKTOP); // divider position in %

  const setFromX = useCallback((x: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP(Math.min(96, Math.max(4, ((x - r.left) / r.width) * 100)));
  }, []);

  // Intro: start on the messy side, then glide to the middle once the block scrolls into view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const rest = restFor();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setP(rest);
      return;
    }
    setP(rest);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const from = 92, to = rest, dur = 1800;
        let t0: number | null = null;
        setP(from);
        const tick = (t: number) => {
          if (dragging.current) return;
          if (t0 === null) t0 = t;
          const k = Math.min((t - t0) / dur, 1);
          setP(from + (to - from) * (1 - Math.pow(1 - k, 4)));
          if (k < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(() => (raf.current = requestAnimationFrame(tick)));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    cancelAnimationFrame(raf.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromX(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); setP((v) => Math.max(4, v - 5)); }
    if (e.key === "ArrowRight") { e.preventDefault(); setP((v) => Math.min(96, v + 5)); }
  };

  return (
    <>
    <div
      ref={box}
      role="slider"
      tabIndex={0}
      aria-label="Drag to compare spreadsheets with CP Atlas"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p)}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onKeyDown={onKey}
      className="relative aspect-[16/6.3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] border border-line bg-white shadow-deep max-md:aspect-[16/11] max-sm:aspect-[4/4] max-sm:rounded-3xl"
    >
      <Spreadsheet />

      {/* after layer, revealed to the right of the divider */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${p}%)` }}>
        <Pipeline />
      </div>

      {/* labels: inside the card, above the divider, so they never get covered while dragging */}
      <span className="pointer-events-none absolute bottom-4 left-4 z-30 rounded-full bg-ink/85 px-3.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur max-sm:bottom-3 max-sm:left-3 max-sm:text-[10px]">
        Before · spreadsheets &amp; generic CRMs
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 z-30 rounded-full bg-brand px-3.5 py-1.5 text-[12px] font-semibold text-white max-sm:bottom-3 max-sm:right-3 max-sm:text-[10px]">
        After · CP Atlas
      </span>

      {/* divider + knob */}
      <div className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(15,46,38,.15),0_0_24px_rgba(47,191,133,.55)]" style={{ left: `${p}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(180deg,#1d4f41,#0f2e26)] text-white shadow-[0_0_0_4px_rgba(255,255,255,.9),0_10px_24px_-6px_rgba(15,46,38,.6)] max-sm:size-10">
          <Icon name="left" className="-mr-1 size-4" />
          <Icon name="right" className="-ml-1 size-4" />
        </span>
      </div>
    </div>

      <p className="mt-4 text-center text-[13px] text-ink-3">Drag to see the same leads, before and after.</p>
    </>
  );
}

/* ------------------------------------------------------------------ */
export function BuiltBy() {
  return (
    <section className={cn(sectionY, "relative overflow-hidden pt-8")} aria-label="Why we built CP Atlas">
      {/* soft backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 size-[460px] rounded-full bg-[#d5efe2] opacity-50 blur-[80px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-10 size-[460px] rounded-full bg-[#e7e0ff] opacity-50 blur-[80px]" />

      <div className={cn(wrap, "relative")}>
        <div className="reveal text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[.14em] text-ink-3">Why we built it</span>
          <h2 className="mx-auto max-w-[980px] text-[clamp(30px,4.3vw,50px)] leading-[1.14]">
            We&apos;re{" "}
            <Hl tone="mint">
              <Panda className="size-[.8em]" />
              Coding Pandas
            </Hl>{" "}
            a full-stack software company that builds products for{" "}
            <Hl tone="forest">clients</Hl> and for <Hl tone="brand">itself.</Hl>
          </h2>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.65] text-ink-2">
            When spreadsheets stopped cutting it and generic CRMs didn&apos;t fit how service teams sell, we built CP Atlas. It runs our pipeline. Now it can run yours.
          </p>
        </div>

        <div className="reveal mt-12" style={delay(0.1)}>
          <Compare />
        </div>

        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center" style={delay(0.15)}>
          <div>
            <b className="block font-serif text-[34px] font-semibold leading-none tracking-[-.02em] text-brand">3+ years</b>
            <small className="mt-2 block text-[14px] text-ink-3">building in production</small>
          </div>
          <span aria-hidden="true" className="h-10 w-px bg-line max-sm:hidden" />
          <div>
            <b className="flex items-center justify-center gap-2 font-serif text-[26px] font-semibold leading-none">
              Our own pipeline
            </b>
            <small className="mt-2 block text-[14px] text-ink-3">runs on CP Atlas every day</small>
          </div>
          <span aria-hidden="true" className="h-10 w-px bg-line max-sm:hidden" />
          <div>
            <b className="flex items-center justify-center gap-2 font-serif text-[26px] font-semibold leading-none">
              <Icon name="arrow" className="size-5 stroke-[3] text-brand" />
              Now yours too
            </b>
            <small className="mt-2 block text-[14px] text-ink-3">we use it, so can you</small>
          </div>
        </div>
      </div>
    </section>
  );
}
