"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon, type IconName } from "./Icon";
import { Avatar, Chip, Eyebrow, Hl, Tag, wrap, type TagTone } from "./ui";
import { cn } from "@/lib/cn";
import { cssVar, delay } from "@/lib/utils";

/* Motion: see the "AI section" block in globals.css. Each scene remounts when its tab
   opens, so its animations replay; --o staggers the pieces inside a scene. */
const at = (seconds: number) => cssVar("--o", `${seconds}s`);

/** Types `text` out once `live` turns on. A hidden copy reserves the final size so nothing jumps. */
function Typewriter({ text, live, delay: wait = 0, speed = 24 }: { text: string; live: boolean; delay?: number; speed?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    let i = 0;
    let tick: number | undefined;
    const start = window.setTimeout(() => {
      tick = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) window.clearInterval(tick);
      }, speed);
    }, wait);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(tick);
    };
  }, [live, text, wait, speed]);
  return (
    <span className="grid whitespace-pre-line">
      <span className="invisible col-start-1 row-start-1">{text}</span>
      <span className="col-start-1 row-start-1">
        {text.slice(0, n)}
        {n < text.length && <i className="cta-caret ml-px inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-brand" />}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 1 — AI Workflows: a sentence becomes a running automation.      */
/* ------------------------------------------------------------------ */
const flow = [
  { k: "When", t: "Pricing form is submitted", c: "#e2782a" },
  { k: "AI", t: "Read the message & score the lead", c: "#1f9d6b", tag: "Score 92" },
  { k: "If", t: "Score is above 80", c: "#4b6fe0" },
  { k: "Then", t: "Send a personal follow-up, assign to Riya", c: "#7a55ea" },
];
function WorkflowScene({ live }: { live: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-soft ring-1 ring-line">
        <Chip tone="mint" className="size-8 rounded-[10px]"><Icon name="spark" className="size-4" /></Chip>
        <div className="min-w-0 pt-1 text-[14px] leading-snug text-ink">
          <Typewriter live={live} text="When someone fills the pricing form, score them and send a follow-up." />
        </div>
      </div>

      <ol className="relative grid gap-2.5 pl-7">
        <span className="ai-down absolute bottom-5 left-[9px] top-5 w-0.5 rounded-full bg-[linear-gradient(#e2782a,#1f9d6b,#7a55ea)]" style={at(1.9)} />
        {flow.map((s, i) => (
          <li key={s.k} className="cta-snap relative" style={at(2 + i * 0.25)}>
            <i className="absolute -left-[25px] top-1/2 size-3 -translate-y-1/2 rounded-full ring-[3px] ring-paper" style={{ background: s.c }} />
            <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3.5 py-2.5 shadow-soft ring-1 ring-line">
              <span className="min-w-0">
                <small className="block text-[9.5px] font-bold uppercase tracking-[.14em]" style={{ color: s.c }}>{s.k}</small>
                <b className="block truncate text-[13px] font-semibold text-ink">{s.t}</b>
              </span>
              {s.tag && <Tag tone="g">{s.tag}</Tag>}
            </div>
          </li>
        ))}
      </ol>

      <div className="ai-rise flex flex-wrap items-center gap-3" style={at(3.2)}>
        <span className="flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-[12px] font-bold text-[#177a53]">
          <i className="ai-ping size-2 rounded-full bg-brand" />Workflow is live
        </span>
        <span className="font-serif text-[13px] italic text-ink-3">built from one sentence</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 2 — Document summaries: a contract is read, the key points lift out. */
/* ------------------------------------------------------------------ */
const docLines: { w: number; mark?: number }[] = [
  { w: 88 }, { w: 74 }, { w: 92, mark: 0.6 }, { w: 58 }, { w: 0 },
  { w: 90 }, { w: 80, mark: 1.0 }, { w: 84 }, { w: 46 }, { w: 0 },
  { w: 86 }, { w: 70, mark: 1.4 }, { w: 64 },
];
const summary = [
  "12-month contract worth ₹4.8L",
  "Payment due 45 days after invoice",
  "Auto-renews on 12 Mar 2027",
];
function DocScene() {
  return (
    <div className="grid grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] items-center gap-4 max-sm:grid-cols-[minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-soft ring-1 ring-line">
        <div className="mb-3.5 flex items-center gap-2.5">
          <Chip tone="orange" className="size-8 rounded-[10px]"><Icon name="doc" className="size-4" /></Chip>
          <span className="min-w-0">
            <b className="block truncate text-[12px] font-semibold text-ink">Northwind_MSA.pdf</b>
            <small className="text-[10.5px] text-ink-3">12 pages</small>
          </span>
        </div>
        <div className="grid gap-2">
          {docLines.map((l, i) =>
            l.w ? (
              <span key={i} className={cn("relative h-1.5 rounded-full bg-paper-2", i > 8 && "max-sm:hidden")} style={{ width: `${l.w}%` }}>
                {l.mark && <i className="ai-grow absolute -inset-y-[3px] -inset-x-1 rounded bg-[#bfe9d5]/80" style={at(l.mark)} />}
              </span>
            ) : (
              <span key={i} className={cn("h-1", i > 8 && "max-sm:hidden")} />
            ),
          )}
        </div>
        {/* the AI reading pass */}
        <i className="ai-scan pointer-events-none absolute inset-x-0 h-12 border-b-2 border-brand/70 bg-gradient-to-b from-transparent to-brand/15" />
      </div>

      <div className="rounded-xl bg-forest p-4 text-white shadow-card">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.12em] text-brand-2">
            <Icon name="spark" className="size-3.5" />AI summary
          </span>
          <span className="font-serif text-[12px] italic text-white/50">read in 4 sec</span>
        </div>
        <ul className="grid gap-2.5">
          {summary.map((t, i) => (
            <li key={t} className="ai-rise flex items-start gap-2.5 text-[13px] text-white/85" style={at(1 + i * 0.35)}>
              <Icon name="check" className="mt-0.5 size-3.5 shrink-0 stroke-[3] text-brand-2" />{t}
            </li>
          ))}
        </ul>
        <p className="ai-rise mt-3.5 rounded-lg bg-[#fde8d6] px-3 py-2 text-[12px] font-semibold text-[#b85a14]" style={at(2.2)}>
          1 clause to review: 2% late-payment fee
        </p>
        <span className="ai-rise mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-semibold text-white/80" style={at(2.5)}>
          <Icon name="plus" className="size-3 stroke-[3]" />Saved to the Northwind deal
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 3 — AI email assist: the draft writes itself from the lead's history. */
/* ------------------------------------------------------------------ */
const draft = `Hi Aarav,

Thanks for taking another look at the Studio plan. Since your team is growing, I've added 5 extra seats to your quote, free for the first month.

Would a quick call on Thursday work?

Best,
Riya`;
const tones = ["Friendly", "Shorter", "More formal"];
function EmailScene({ live }: { live: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-line">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5 text-[12.5px]">
        <span className="w-12 shrink-0 text-ink-3">To</span>
        <Avatar initials="AM" hue={28} className="size-6 text-[9.5px]" />
        <b className="min-w-0 flex-1 truncate font-semibold text-ink">Aarav Mehta</b>
        <Tag tone="o">Warm lead</Tag>
      </div>
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5 text-[12.5px]">
        <span className="w-12 shrink-0 text-ink-3">Subject</span>
        <b className="truncate font-semibold text-ink">5 extra seats on your Studio plan</b>
      </div>
      <p className="flex items-center gap-2 bg-mint/70 px-4 py-2 text-[11.5px] text-forest">
        <Icon name="spark" className="size-3.5 shrink-0 text-brand" />
        <span className="truncate">Written from: viewed pricing 3 times, asked about team seats</span>
      </p>
      <div className="px-4 py-3.5 text-[13px] leading-relaxed text-ink-2">
        <Typewriter live={live} text={draft} delay={300} speed={14} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {tones.map((t, i) => (
            <span key={t} className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", i ? "bg-white text-ink-2 ring-1 ring-line" : "bg-forest text-white")}>{t}</span>
          ))}
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-[12px] font-bold text-white">
          Send<Icon name="arrow" className="size-3.5 -rotate-45" />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 4 — Leads & opportunities: AI ranks who to call and catches a deal going cold. */
/* ------------------------------------------------------------------ */
const leads: { i: string; hue: number; n: string; co: string; s: number; tag: string; tone: TagTone }[] = [
  { i: "AM", hue: 28, n: "Aarav Mehta", co: "Aarav Studio", s: 92, tag: "Likely to close", tone: "g" },
  { i: "PS", hue: 265, n: "Priya Shah", co: "Hooli Labs", s: 81, tag: "Warm", tone: "b" },
  { i: "DK", hue: 200, n: "Dev Kapoor", co: "Stark Ltd", s: 68, tag: "New, found by AI", tone: "v" },
  { i: "NW", hue: 150, n: "Northwind", co: "₹2.2L deal", s: 34, tag: "Going cold", tone: "o" },
];
const scoreColor = (s: number) => (s > 75 ? "#1f9d6b" : s > 50 ? "#4b6fe0" : "#e2782a");
function LeadsScene() {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[13px] font-semibold text-ink">Who to call today</b>
        <span className="flex items-center gap-1 rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold text-[#177a53]">
          <Icon name="trend" className="size-3 stroke-[3]" />Pipeline ₹12.6L
        </span>
      </div>
      <ul className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-line">
        {leads.map((l, k) => (
          <li key={l.n} className="ai-rise flex items-center gap-3 border-b border-line px-3.5 py-2.5 last:border-b-0" style={at(0.15 + k * 0.12)}>
            <Avatar initials={l.i} hue={l.hue} className="size-8 shrink-0 text-[11px]" />
            <span className="min-w-0 flex-1">
              <b className="block truncate text-[13px] font-semibold text-ink">{l.n}</b>
              <small className="block truncate text-[11px] text-ink-3">{l.co}</small>
            </span>
            <span className="flex w-24 items-center gap-2 max-xs:hidden">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-2">
                <i className="ai-grow block h-full rounded-full" style={{ width: `${l.s}%`, background: scoreColor(l.s), ...at(0.4 + k * 0.12) }} />
              </span>
              <b className="w-5 text-right font-serif text-[13px] font-semibold text-ink">{l.s}</b>
            </span>
            <Tag tone={l.tone}>{l.tag}</Tag>
          </li>
        ))}
      </ul>
      <div className="ai-rise flex items-center gap-3 rounded-xl bg-forest p-3.5 text-white shadow-card max-xs:flex-col max-xs:items-start" style={at(1.1)}>
        <span className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-brand text-white"><Icon name="spark" className="size-4" /></span>
        <p className="min-w-0 flex-1 text-[12.5px] leading-snug text-white/80">
          <b className="text-white">Northwind hasn&apos;t replied in 6 days.</b> A check-in today keeps the ₹2.2L deal warm.
        </p>
        <span className="shrink-0 rounded-full bg-brand-2 px-3 py-1.5 text-[11.5px] font-bold text-forest">Draft check-in</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs                                                                 */
/* ------------------------------------------------------------------ */
type Cap = { id: string; icon: IconName; title: string; text: string; scene: (live: boolean) => React.JSX.Element };
const caps: Cap[] = [
  { id: "workflows", icon: "sliders", title: "AI Workflows", text: "Describe what should happen in plain words. AI builds the workflow and keeps it running.", scene: (live) => <WorkflowScene live={live} /> },
  { id: "docs", icon: "doc", title: "Document Summaries", text: "Drop in a contract, proposal or call notes. Get the key points, dates and amounts in seconds.", scene: () => <DocScene /> },
  { id: "email", icon: "mail", title: "AI Email Assist", text: "Not sure what to say? AI drafts the email from the lead's history. You review and hit send.", scene: (live) => <EmailScene live={live} /> },
  { id: "leads", icon: "target", title: "Leads & Opportunities", text: "AI finds new leads, ranks who's ready to buy and flags deals before they go cold.", scene: () => <LeadsScene /> },
];

const outcomes = ["Find new leads", "Convert them faster", "Track every opportunity", "Grow without extra hires"];

const day: { at: string; t: string; note: string; tone: TagTone }[] = [
  { at: "9:30", t: "Call Aarav Mehta", note: "Talking points ready", tone: "g" },
  { at: "11:00", t: "Send Northwind proposal", note: "Draft written", tone: "b" },
  { at: "2:00", t: "Follow up 3 warm leads", note: "Emails queued", tone: "v" },
  { at: "4:30", t: "Review the pipeline", note: "2 deals need you", tone: "o" },
];

/** How long each tab stays open while auto-playing. */
const STEP = 8;

export function AiCrm() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // stops for good once someone picks a tab
  const [hold, setHold] = useState(false); // hover / focus pauses the timer
  const [seen, setSeen] = useState(false); // scenes only start once the stage is on screen
  const [onScreen, setOnScreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      setOnScreen(e.isIntersecting);
      if (e.isIntersecting) setSeen(true);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + caps.length) % caps.length;
    pick(next);
    tabRefs.current[next]?.focus();
  };

  const cap = caps[active];
  const paused = hold || !onScreen;

  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-forest py-24 text-white max-sm:py-16 before:pointer-events-none before:absolute before:-left-[240px] before:-top-[280px] before:size-[720px] before:rounded-full before:bg-[radial-gradient(circle,rgba(47,191,133,.2),transparent_65%)] after:pointer-events-none after:absolute after:-bottom-[300px] after:-right-[220px] after:size-[680px] after:rounded-full after:bg-[radial-gradient(circle,rgba(139,108,240,.16),transparent_65%)]"
    >
      <div className={cn(wrap, "relative")}>
        {/* ---------- Header ---------- */}
        <div className="reveal mb-14 grid grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] items-end gap-10 max-md:grid-cols-[minmax(0,1fr)] max-md:gap-7">
          <div>
            <Eyebrow tone="light">AI built in</Eyebrow>
            <h2 className="max-w-[640px]">
              A CRM with an AI <Hl tone="brand"><Icon name="spark" className="size-[.7em]" />co-pilot</Hl> for every deal.
            </h2>
            <p className="mt-4 max-w-[520px] text-lg text-white/70">
              Build AI workflows, summarise documents, draft the right email and spot your next deal, all from the CRM your team already works in.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 max-xs:grid-cols-1">
            {outcomes.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[15px] text-white/85">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/25 text-brand-2"><Icon name="check" className="size-3 stroke-[3.5]" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Capabilities: tabs + live stage ---------- */}
        <div
          className="grid grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] items-start gap-8 max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-6"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
        >
          <div role="tablist" aria-label="AI capabilities" aria-orientation="vertical" onKeyDown={onKey} className="reveal grid gap-2.5 max-lg:grid-cols-2 max-xs:grid-cols-1">
            {caps.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  id={`ai-tab-${c.id}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls="ai-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(i)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-5 text-left transition-[background-color,border-color] duration-300 max-lg:p-4",
                    on ? "border-white/20 bg-white/[.07]" : "border-white/[.07] hover:border-white/15 hover:bg-white/[.03]",
                  )}
                >
                  <span className="flex items-center gap-3.5">
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-300", on ? "bg-brand text-white" : "bg-white/[.08] text-brand-2")}>
                      <Icon name={c.icon} className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <small className="block font-serif text-[13px] italic text-white/45">0{i + 1}</small>
                      <b className={cn("block text-[16px] font-bold leading-tight", on ? "text-white" : "text-white/75")}>{c.title}</b>
                    </span>
                  </span>
                  <span className={cn("grid transition-[grid-template-rows] duration-500 ease-butter max-lg:hidden", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <span className="overflow-hidden">
                      <span className="block pt-3 text-[14.5px] leading-relaxed text-white/65">{c.text}</span>
                    </span>
                  </span>
                  {on && auto && (
                    <i
                      key={active}
                      aria-hidden="true"
                      className="ai-timer absolute inset-x-0 bottom-0 h-0.5 bg-brand-2"
                      style={{ ...cssVar("--dur", `${STEP}s`), animationPlayState: paused || !seen ? "paused" : "running" }}
                      onAnimationEnd={() => setActive((a) => (a + 1) % caps.length)}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div ref={stageRef} className="reveal" style={delay(0.1)}>
            <p className="mb-4 text-[15px] text-white/70 lg:hidden">{cap.text}</p>
            <div
              id="ai-panel"
              role="tabpanel"
              aria-labelledby={`ai-tab-${cap.id}`}
              className="overflow-hidden rounded-[24px] bg-paper text-ink shadow-[0_0_0_1px_rgba(255,255,255,.1),0_0_0_8px_rgba(255,255,255,.04),0_40px_80px_-30px_rgba(0,0,0,.65)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-3">
                <span className="flex items-center gap-2 text-[13px] font-bold text-ink">
                  <span className="grid size-6 place-items-center rounded-md bg-forest text-brand-2"><Icon name="spark" className="size-3.5" /></span>
                  Atlas AI
                  <span className="font-normal text-ink-3">/ {cap.title}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-3">
                  <i className="ai-ping size-1.5 rounded-full bg-brand" />Working
                </span>
              </div>
              <div key={seen ? cap.id : "idle"} className={cn("min-h-[440px] p-6 max-sm:min-h-0 max-sm:p-4", !seen && "invisible")} aria-hidden="true">
                {cap.scene(seen)}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Your day, planned by AI ---------- */}
        <div className="reveal mt-16 grid grid-cols-[minmax(0,.75fr)_minmax(0,1.6fr)] items-center gap-10 rounded-[26px] border border-white/10 bg-white/[.04] p-8 max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-7 max-sm:p-5">
          <div>
            <span className="font-serif text-[15px] italic text-brand-2">Every morning</span>
            <h3 className="mt-2 font-serif text-[28px] font-semibold leading-[1.15] tracking-[-.02em] max-sm:text-2xl">Your whole day, planned before you log in.</h3>
            <p className="mt-3 text-[15px] text-white/65">AI lines up your calls, follow-ups and the deals that need you, so the busywork is handled and nothing slips.</p>
          </div>
          <ol className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-xs:grid-cols-1">
            {day.map((d, i) => (
              <li
                key={d.t}
                className="reveal flex flex-col gap-2 rounded-2xl bg-white p-4 text-ink transition-transform duration-500 ease-butter hover:-translate-y-1"
                style={delay(0.1 + i * 0.08)}
              >
                <span className="flex items-center justify-between">
                  <span className="font-serif text-[15px] italic text-ink-3">{d.at}</span>
                  <Icon name="task" className="size-4 text-brand" />
                </span>
                <b className="text-[14px] font-semibold leading-snug">{d.t}</b>
                <span className="mt-auto"><Tag tone={d.tone}>{d.note}</Tag></span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
