import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Eyebrow, Glow, Tag, TextLink, wrap, sectionY } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared bits                                                          */
/* ------------------------------------------------------------------ */
const bar = "block rounded bg-line";

/** Faint diagonal hatch, used behind the two showcase visuals. */
const hatch = "bg-[repeating-linear-gradient(135deg,rgba(16,32,27,.05)_0px,rgba(16,32,27,.05)_1px,transparent_1px,transparent_9px)]";

/** Thin rainbow-edge frame, like a card that has been given a hairline gradient border. */
function GradientFrame({ className, style, children }: { className?: string; style?: React.CSSProperties; children: ReactNode }) {
  return (
    <div style={style} className={cn("rounded-[28px] bg-[linear-gradient(135deg,#8b6cf0,#1f9d6b_45%,#f5a25b_85%)] p-[1.5px]", className)}>
      <div className="size-full rounded-[26.5px] bg-white">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Showcase visual 1 — Lead & Opportunity: a proper funnel, new to won  */
/* ------------------------------------------------------------------ */
const funnel = [
  { l: "New leads", n: 24, top: 100, bottom: 78, grad: ["#8b6cf0", "#6f4fe0"] },
  { l: "Qualified", n: 16, top: 78, bottom: 56, grad: ["#6f4fe0", "#4b6fe0"] },
  { l: "Quote sent", n: 9, top: 56, bottom: 34, grad: ["#4b6fe0", "#1f9d6b"] },
  { l: "Won", n: 5, top: 34, bottom: 22, grad: ["#1f9d6b", "#17b881"] },
];
function FunnelVisual() {
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-x-5 gap-y-0.5">
      {funnel.map((f, i) => {
        const drop = i > 0 ? Math.round(((funnel[i - 1].n - f.n) / funnel[i - 1].n) * 100) : null;
        return (
          <div key={f.l} className="contents">
            {drop !== null && (
              <div className="col-span-2 flex items-center gap-2 py-0.5 pl-1 text-[10.5px] font-medium text-ink-3">
                <span className="h-px flex-1 bg-line" />
                <span>−{drop}%</span>
              </div>
            )}
            <svg viewBox="0 0 220 46" className="h-[46px] w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`fg-${i}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor={f.grad[0]} />
                  <stop offset="1" stopColor={f.grad[1]} />
                </linearGradient>
              </defs>
              <polygon
                points={`${(100 - f.top) / 2} 2, ${100 - (100 - f.top) / 2} 2, ${100 - (100 - f.bottom) / 2} 44, ${(100 - f.bottom) / 2} 44`}
                fill={`url(#fg-${i})`}
                transform="scale(2.2,1)"
              />
            </svg>
            <div className="text-right">
              <b className="block text-[15px] font-bold leading-none tracking-[-.01em]">{f.n}</b>
              <small className="mt-0.5 block whitespace-nowrap text-[10.5px] text-ink-3">{f.l}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Showcase visual 2 — Analytics: this month vs last, with axis         */
/* ------------------------------------------------------------------ */
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
function AnalyticsVisual() {
  const line = "M0 118 C40 108 64 116 104 92 S168 78 208 68 S288 40 328 30 L390 16";
  const ghost = "M0 130 C40 126 64 128 104 118 S168 112 208 108 S288 96 328 92 L390 84";
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[11px] font-medium text-ink-3">
          <span className="flex items-center gap-1.5"><i className="h-[3px] w-3.5 rounded-full bg-brand" />This month</span>
          <span className="flex items-center gap-1.5"><i className="h-[3px] w-3.5 rounded-full border-t-2 border-dashed border-ink-3/50" />Last month</span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold text-[#177a53]">
          <Icon name="trend" className="size-3 stroke-[3]" />+30%
        </span>
      </div>
      <div className="relative">
        <svg viewBox="0 0 390 140" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="ana-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2fbf85" stopOpacity=".32" />
              <stop offset="1" stopColor="#2fbf85" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[16, 60, 104].map((y) => <line key={y} x1="0" x2="390" y1={y} y2={y} stroke="#e4e0d4" strokeDasharray="3 5" />)}
          <path d={`${line} L390 140 L0 140Z`} fill="url(#ana-fill)" />
          <path d={ghost} fill="none" stroke="#b9b5a8" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
          <path d={line} fill="none" stroke="#1f9d6b" strokeWidth="3" strokeLinecap="round" />
          <circle cx="328" cy="30" r="9" fill="#1f9d6b" opacity=".16" />
          <circle cx="328" cy="30" r="5.5" fill="#fff" stroke="#1f9d6b" strokeWidth="3" />
        </svg>
        <span className="absolute right-6 top-0 rounded-lg bg-forest px-2.5 py-1.5 text-[12px] font-bold text-white shadow-soft">₹3.2L</span>
      </div>
      <div className="mt-1.5 flex justify-between text-[10.5px] text-ink-3">
        {months.map((m) => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid visuals — the remaining six features                            */
/* ------------------------------------------------------------------ */

/** Payments: this month's total, split by provider */
function PaymentsVisual() {
  const collected = 78; // % of ring filled
  return (
    <div className="flex w-full items-center gap-4 px-4">
      <svg viewBox="0 0 64 64" className="size-14 shrink-0 -rotate-90">
        <circle cx="32" cy="32" r="27" fill="none" stroke="#e4e0d4" strokeWidth="7" />
        <circle
          cx="32" cy="32" r="27" fill="none" stroke="#1f9d6b" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${(collected / 100) * 169.6} 169.6`}
        />
      </svg>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1">
          <b className="text-[17px] font-bold leading-none tracking-[-.01em]">₹60.5K</b>
          <small className="text-[10.5px] text-ink-3">collected</small>
        </div>
        <div className="mt-2 grid gap-1">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="grid size-4 shrink-0 place-items-center rounded bg-[#3653b8] text-[7px] font-bold text-white">R</span>
            <span className="text-ink-2">Razorpay</span>
            <b className="ml-auto">₹48K</b>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="grid size-4 shrink-0 place-items-center rounded bg-[#5b3fc4] text-[7px] font-bold text-white">S</span>
            <span className="text-ink-2">Stripe</span>
            <b className="ml-auto text-[#b85a14]">₹12.5K</b>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Forms: a labelled field turns, via a live pulse, into a tagged lead */
function FormVisual() {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="grid flex-1 gap-1.5 rounded-xl bg-white p-2.5 shadow-soft ring-1 ring-line/60">
        <small className="text-[8px] font-semibold uppercase tracking-[.08em] text-ink-3">Contact form</small>
        <span className="flex h-4 items-center rounded bg-paper px-1.5 ring-1 ring-line"><i className={cn(bar, "h-1 w-8")} /></span>
        <span className="flex h-4 items-center rounded bg-paper px-1.5 ring-1 ring-line"><i className={cn(bar, "h-1 w-11")} /></span>
        <span className="grid h-4 place-items-center rounded-full bg-forest text-[8px] font-bold text-white">Send</span>
      </div>
      <span className="relative grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
        <Icon name="arrow" className="size-3 stroke-[3]" />
        <i className="absolute inset-0 animate-ping rounded-full bg-brand opacity-40" />
      </span>
      <div className="flex-1 rounded-xl bg-white p-2.5 shadow-soft ring-1 ring-line/60">
        <div className="flex items-center gap-1.5">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e2782a] text-[9px] font-bold text-white">N</span>
          <b className="truncate text-[11px]">New lead</b>
        </div>
        <div className="mt-1.5 flex items-center gap-1"><Tag tone="g">Auto-mapped</Tag></div>
      </div>
    </div>
  );
}

/** Task & Document: progress ring, file, and who's on it */
function TaskDocVisual() {
  const done = 66;
  return (
    <div className="flex w-full items-center gap-3.5 px-4">
      <svg viewBox="0 0 56 56" className="size-12 shrink-0 -rotate-90">
        <circle cx="28" cy="28" r="23" fill="none" stroke="#e4e0d4" strokeWidth="6" />
        <circle cx="28" cy="28" r="23" fill="none" stroke="#1f9d6b" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(done / 100) * 144.5} 144.5`} />
        <text x="28" y="30" textAnchor="middle" className="rotate-90 fill-ink text-[13px] font-bold" style={{ transformOrigin: "28px 28px" }}>2/3</text>
      </svg>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <b className="truncate text-[13px]">Client onboarding</b>
          <span className="ml-auto flex -space-x-1.5 shrink-0">
            {["#1f8a5f", "#e2782a"].map((c) => <i key={c} className="size-4 rounded-full ring-2 ring-white" style={{ background: c }} />)}
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-paper px-2 py-1 text-[10px]">
          <span className="rounded bg-[#fde1e2] px-1 py-0.5 text-[8px] font-bold text-[#c23b41]">PDF</span>
          <span className="truncate text-ink-2">proposal.pdf</span>
          <Tag tone="o">Due Fri</Tag>
        </div>
      </div>
    </div>
  );
}

/** Team: people, their role, and what they can touch */
const team: { n: string; r: string; c: string; icon: "user" | "target" | "chart" }[] = [
  { n: "Ravi Sharma", r: "Full access", c: "#1f8a5f", icon: "user" },
  { n: "Sam Iyer", r: "Sales only", c: "#e2782a", icon: "target" },
  { n: "Aman Roy", r: "View only", c: "#7a55ea", icon: "chart" },
  { n: "Kavya Reddy", r: "Owner", c: "#c23b41", icon: "user" },
];
function TeamVisual() {
  return (
    <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3.5 px-4">
      {team.map((m) => (
        <div key={m.n} className="flex min-w-0 items-center gap-2">
          <span
            className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white shadow-soft"
            style={{ background: `linear-gradient(150deg, ${m.c}, color-mix(in srgb, ${m.c} 60%, black))` }}
          >
            {m.n[0]}
          </span>
          <div className="min-w-0 flex-1">
            <b className="block truncate text-[12px] leading-tight">{m.n}</b>
            <small className="block truncate text-[10.5px] text-ink-3">{m.r}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Customizable workspace: pick a colour and font, see it applied live */
function WorkspaceVisual() {
  const active = "#1f9d6b";
  return (
    <div className="flex w-full items-center gap-4 px-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {["#1f9d6b", "#4b6fe0", "#7a55ea", "#e2782a", "#e04b52"].map((c) => (
            <span key={c} className={cn("size-4 rounded-full", c === active && "ring-2 ring-offset-2 ring-forest")} style={{ background: c }} />
          ))}
        </div>
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="rounded-md bg-white px-2 py-0.5 font-serif text-[11px] font-semibold shadow-soft ring-2 ring-brand">Aa</span>
          <span className="rounded-md bg-white px-2 py-0.5 font-sans text-[11px] font-semibold shadow-soft ring-1 ring-line">Aa</span>
          <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[10px] font-semibold shadow-soft ring-1 ring-line">Aa</span>
        </div>
      </div>
      <div className="w-[92px] shrink-0 overflow-hidden rounded-lg border border-line shadow-soft">
        <div className="flex items-center gap-1 px-2 py-1.5" style={{ background: active }}>
          <i className="size-2.5 rounded-sm bg-white/70" />
          <i className="h-1.5 w-8 rounded-full bg-white/70" />
        </div>
        <div className="grid gap-1 bg-white p-2">
          <i className="h-1 w-full rounded bg-line" />
          <i className="h-1 w-2/3 rounded bg-line" />
          <span className="mt-0.5 h-3.5 w-9 rounded-full" style={{ background: active }} />
        </div>
      </div>
    </div>
  );
}

/** Integrations: curved links from CP Atlas out to each connected tool */
const hub: { t: string; angle: number; c: string }[] = [
  { t: "Razorpay", angle: -160, c: "#3653b8" },
  { t: "Stripe", angle: 160, c: "#5b3fc4" },
  { t: "Webhooks", angle: -20, c: "#177a53" },
  { t: "API", angle: 20, c: "#b85a14" },
];
function HubVisual() {
  const cx = 130, cy = 70, r = 78;
  const pt = (deg: number, radius: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)] as const;
  };
  return (
    <div className="relative h-[128px] w-full" aria-hidden="true">
      <svg viewBox="0 0 260 140" className="absolute inset-0 size-full" preserveAspectRatio="none">
        {hub.map((h) => {
          const [x, y] = pt(h.angle, r);
          const [mx, my] = pt(h.angle, r * 0.52);
          return (
            <path
              key={h.t}
              d={`M${cx} ${cy} Q${mx} ${my} ${x} ${y}`}
              fill="none"
              stroke={h.c}
              strokeOpacity=".3"
              strokeWidth="1.5"
              strokeDasharray="1 5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest text-white shadow-card ring-4 ring-white">
        <Icon name="logo" className="size-6" />
      </span>
      {hub.map((h) => {
        const [x, y] = pt(h.angle, r);
        return (
          <span
            key={h.t}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-2.5 text-[10px] font-semibold shadow-soft ring-1 ring-line"
            style={{ left: `${(x / 260) * 100}%`, top: `${(y / 140) * 100}%` }}
          >
            <i className="size-3.5 rounded-full" style={{ background: h.c }} />
            {h.t}
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
type GridItem = { letter: string; accent: string; title: string; text: string; visual: ReactNode };
const gridItems: GridItem[] = [
  { letter: "B", accent: "#4b6fe0", title: "Payment Tracking", text: "Track payments via Razorpay & Stripe in real time.", visual: <PaymentsVisual /> },
  { letter: "C", accent: "#e2782a", title: "Form Submissions", text: "Any form can be mapped to leads automatically.", visual: <FormVisual /> },
  { letter: "D", accent: "#0f8f88", title: "Task & Document Management", text: "Keep your work, files and conversations organized.", visual: <TaskDocVisual /> },
  { letter: "E", accent: "#7a55ea", title: "Team Management", text: "Add or remove members, roles and permissions.", visual: <TeamVisual /> },
  { letter: "F", accent: "#e04b52", title: "Customizable Workspace", text: "Choose themes, colors, fonts and make it yours.", visual: <WorkspaceVisual /> },
  { letter: "G", accent: "#4b6fe0", title: "Integrations", text: "Connect your favorite tools and services.", visual: <HubVisual /> },
];

export function Features() {
  return (
    <section className={cn(sectionY, "relative overflow-hidden")} id="features">
      <Glow flip />
      <div className={cn(wrap, "relative")}>
        <div className="reveal mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>Key features</Eyebrow>
            <h2 className="max-w-[560px]">Everything you need, in one place.</h2>
            <p className="mt-3.5 max-w-[460px] text-lg text-ink-2">Built for modern teams. Designed for real work.</p>
          </div>
          <TextLink href="#">See all features</TextLink>
        </div>

        {/* ---------- Showcase A: Lead & Opportunity Management ---------- */}
        <div className="grid grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] items-center gap-14 max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-8">
          <div className="reveal">
            <span className="font-serif text-[15px] italic text-ink-3">01</span>
            <h3 className="mt-2 text-[28px] font-bold leading-[1.2] tracking-[-.01em] max-sm:text-2xl">Lead &amp; Opportunity Management</h3>
            <p className="mt-3 max-w-[420px] text-[16px] text-ink-2">Capture, track and convert leads into customers, without losing a single one along the way.</p>
            <ul className="mt-6 grid gap-3.5">
              {["Score every lead the moment it arrives", "Stages that match how your team actually sells", "Nothing slips through, follow-ups are tracked automatically"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-ink-2">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 stroke-[3] text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <GradientFrame className="reveal" style={delay(0.1)}>
            <div className={cn("rounded-[26.5px] p-7", hatch)}>
              <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-line/60">
                <FunnelVisual />
              </div>
            </div>
          </GradientFrame>
        </div>

        {/* ---------- Showcase B: Analytics & Reports (mirrored) ---------- */}
        <div className="mt-24 grid grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] items-center gap-14 max-lg:mt-16 max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-8">
          <GradientFrame className="reveal max-lg:order-2" style={delay(0.1)}>
            <div className={cn("rounded-[26.5px] p-7", hatch)}>
              <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-line/60">
                <AnalyticsVisual />
              </div>
            </div>
          </GradientFrame>
          <div className="reveal max-lg:order-1">
            <span className="font-serif text-[15px] italic text-ink-3">02</span>
            <h3 className="mt-2 text-[28px] font-bold leading-[1.2] tracking-[-.01em] max-sm:text-2xl">Analytics &amp; Reports</h3>
            <p className="mt-3 max-w-[420px] text-[16px] text-ink-2">See revenue, pipeline and team performance the moment they change, not at the end of the month.</p>
            <ul className="mt-6 grid gap-3.5">
              {["Live revenue and pipeline tracking", "Spot a slowdown before it costs you", "Export a clean report in one click"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-ink-2">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 stroke-[3] text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Everything else, in a quieter grid ---------- */}
        <div className="mt-24 max-lg:mt-16">
          <p className="reveal mb-8 text-[13px] font-semibold uppercase tracking-[.14em] text-ink-3">And everything else that comes with it</p>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {gridItems.map((f, i) => (
              <article
                key={f.title}
                style={delay((i % 3) * 0.07)}
                className="reveal group flex flex-col gap-5 rounded-[22px] border border-line bg-white p-6 hover:-translate-y-1 hover:border-transparent hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid size-8 shrink-0 place-items-center rounded-full font-serif text-[13px] font-semibold"
                    style={{ color: f.accent, boxShadow: `inset 0 0 0 1.5px ${f.accent}55` }}
                  >
                    {f.letter}
                  </span>
                  <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-.01em]">{f.title}</h3>
                </div>
                <div className="flex min-h-[112px] flex-1 items-center rounded-xl bg-paper p-3.5 ring-1 ring-line/60" aria-hidden="true">
                  {f.visual}
                </div>
                <p className="text-[14px] text-ink-2">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
