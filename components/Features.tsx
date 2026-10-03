import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";
import { Eyebrow, Glow, TextLink, wrap, sectionY } from "./ui";
import { cn } from "@/lib/cn";
import { cssVar, delay } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared bits                                                          */
/* The rest of the page shows product screens; this section draws each   */
/* feature as a physical object instead, so it reads differently.        */
/* ------------------------------------------------------------------ */

/** Faint diagonal hatch, used behind the two showcase visuals. */
const hatch = "bg-[repeating-linear-gradient(135deg,rgba(16,32,27,.05)_0px,rgba(16,32,27,.05)_1px,transparent_1px,transparent_9px)]";

/** Thin rainbow-edge frame, like a card that has been given a hairline gradient border. */
function GradientFrame({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div style={style} className={cn("rounded-[28px] bg-[linear-gradient(135deg,#8b6cf0,#1f9d6b_45%,#f5a25b_85%)] p-[1.5px]", className)}>
      <div className="size-full rounded-[26.5px] bg-white">{children}</div>
    </div>
  );
}

/** Round to one decimal so server and client render identical SVG coordinates. */
const r1 = (n: number) => Math.round(n * 10) / 10;

/* ------------------------------------------------------------------ */
/* Showcase visual 1 — Lead & Opportunity: a glass funnel. Leads drop in, */
/* some are filtered out at each stage, the rest land in the "won" tray.  */
/* ------------------------------------------------------------------ */
const stages = [
  { y: 60, x: 380, n: "24", l: "New leads" },
  { y: 118, x: 340, n: "16", l: "Qualified" },
  { y: 180, x: 298, n: "9", l: "Quote sent" },
  { y: 324, x: 292, n: "5", l: "Won · ₹2.4L" },
];
/** Short falls (dy) stop at a stage and fade out; the 312px ones reach the tray. */
const drops = [
  { x: 150, c: "#7a55ea", dx: 18, dy: 110 },
  { x: 205, c: "#4b6fe0", dx: 25, dy: 312 },
  { x: 300, c: "#e2782a", dx: -20, dy: 172 },
  { x: 250, c: "#7a55ea", dx: -12, dy: 110 },
  { x: 175, c: "#1f9d6b", dx: 55, dy: 312 },
  { x: 330, c: "#4b6fe0", dx: -40, dy: 110 },
  { x: 270, c: "#e2782a", dx: -40, dy: 312 },
];
function FunnelVisual() {
  return (
    <svg viewBox="0 0 560 350" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ft-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".8" />
          <stop offset="1" stopColor="#dff5ea" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <ellipse cx="230" cy="60" rx="150" ry="16" fill="#efece3" />
      {drops.map((d, i) => (
        <circle
          key={i}
          data-ft="drop"
          cx={d.x}
          cy="8"
          r="6.5"
          fill={d.c}
          style={{ ...cssVar("--dx", `${d.dx}px`), ...cssVar("--dy", `${d.dy}px`), animationDelay: `${i * 0.5}s` }}
        />
      ))}
      <path d="M80 60 L210 250 L210 288 L250 288 L250 250 L380 60 Z" fill="url(#ft-glass)" stroke="#0f2e26" strokeOpacity=".22" strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="230" cy="60" rx="150" ry="16" fill="none" stroke="#0f2e26" strokeOpacity=".35" strokeWidth="1.5" />
      <ellipse cx="230" cy="118" rx="110" ry="9" fill="none" stroke="#1f9d6b" strokeOpacity=".45" strokeDasharray="3 5" />
      <ellipse cx="230" cy="180" rx="68" ry="6" fill="none" stroke="#1f9d6b" strokeOpacity=".45" strokeDasharray="3 5" />
      {/* the "won" tray and what has collected in it */}
      <path d="M168 304 H292 L284 342 H176 Z" fill="#fff" stroke="#0f2e26" strokeOpacity=".2" strokeWidth="1.5" strokeLinejoin="round" />
      {[[215, 330], [230, 330], [245, 330], [222.5, 318], [237.5, 318]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6.5" fill="#1f9d6b" stroke="#fff" strokeWidth="1.5" />
      ))}
      {stages.map((s) => (
        <g key={s.l}>
          <line x1={s.x + 10} x2="452" y1={s.y} y2={s.y} stroke="#cfcabb" strokeWidth="1.5" strokeDasharray="1 4" strokeLinecap="round" />
          <circle cx="452" cy={s.y} r="3" fill="#0f2e26" />
          <text x="464" y={s.y + 6} className="fill-ink font-serif text-[24px] font-semibold">{s.n}</text>
          <text x="464" y={s.y + 22} className="fill-ink-3 text-[11px] font-medium">{s.l}</text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Showcase visual 2 — Analytics: an analogue gauge, needle sweeps to    */
/* this month's revenue, with a marker where last month finished.        */
/* ------------------------------------------------------------------ */
/** Point on the dial; deg runs 0 (left, ₹0) to 180 (right, ₹4L). */
const dial = (r: number, deg: number) => {
  const t = ((180 + deg) * Math.PI) / 180;
  return [r1(260 + r * Math.cos(t)), r1(260 + r * Math.sin(t))] as const;
};
const NOW = 144; // ₹3.2L of ₹4L
const LAST = 111; // ₹2.46L
function GaugeVisual() {
  const [ex, ey] = dial(176, NOW);
  const [li, lj] = dial(158, LAST);
  const [lo, lp] = dial(192, LAST);
  const [tx, ty] = dial(214, LAST);
  return (
    <div className="w-full">
      <svg viewBox="0 0 520 335" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ft-dial" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#bfe9d5" />
            <stop offset="1" stopColor="#1f9d6b" />
          </linearGradient>
        </defs>
        <path d="M84 260 A176 176 0 0 1 436 260" fill="none" stroke="#efece3" strokeWidth="16" strokeLinecap="round" />
        <path data-ft="arc" d={`M84 260 A176 176 0 0 1 ${ex} ${ey}`} pathLength={1} strokeDasharray="1" fill="none" stroke="url(#ft-dial)" strokeWidth="16" strokeLinecap="round" />
        {Array.from({ length: 41 }, (_, i) => {
          const major = i % 10 === 0;
          const [x1, y1] = dial(major ? 192 : 196, i * 4.5);
          const [x2, y2] = dial(206, i * 4.5);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={major ? "#0f2e26" : "#7b8781"} strokeOpacity={major ? 1 : 0.45} strokeWidth={major ? 2 : 1} strokeLinecap="round" />;
        })}
        {["₹0", "1L", "2L", "3L", "4L"].map((t, i) => {
          const [x, y] = dial(142, i * 45);
          return <text key={t} x={x} y={y + 4} textAnchor="middle" className="fill-ink-3 font-serif text-[13px] italic">{t}</text>;
        })}
        <line x1={li} y1={lj} x2={lo} y2={lp} stroke="#7b8781" strokeWidth="2" strokeDasharray="2 3" />
        <text x={tx} y={ty} className="fill-ink-3 font-serif text-[12px] italic">last month</text>
        <g data-ft="needle" style={{ transformOrigin: "260px 260px", transform: `rotate(${NOW}deg)` }}>
          <path d="M260 253 L112 260 L260 267 Z" fill="#0f2e26" />
        </g>
        <circle cx="260" cy="260" r="15" fill="#0f2e26" />
        <circle cx="260" cy="260" r="5" fill="#fff" />
        <text x="260" y="324" textAnchor="middle" className="fill-ink font-serif text-[40px] font-semibold">₹3.2L</text>
      </svg>
      <div className="mt-2 flex items-center justify-between gap-3 text-[12px] text-ink-3">
        <span>Revenue collected · June</span>
        <span className="flex items-center gap-1 rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold text-[#177a53]">
          <Icon name="trend" className="size-3 stroke-[3]" />+30% vs May
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid visuals — one object per feature                                */
/* ------------------------------------------------------------------ */

/** Payments: a receipt printing out of a slot. */
const receipt = [
  { n: "Aarav Studio", via: "Razorpay", amt: "48,000", paid: true },
  { n: "Northwind", via: "Stripe", amt: "12,500", paid: true },
  { n: "Hooli Labs", via: "UPI", amt: "7,200", paid: true },
  { n: "Stark Ltd", via: "Razorpay", amt: "22,000", paid: false },
];
function ReceiptVisual() {
  return (
    <div className="flex h-full min-h-[360px] flex-col items-center pt-2">
      <div className="relative z-10 h-6 w-[90%] rounded-full bg-forest shadow-soft">
        <i className="absolute inset-x-5 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-black/60" />
      </div>
      <div className="-mt-3 w-[78%] [clip-path:inset(12px_-24px_-60px_-24px)]">
        <div className="transition-transform duration-500 ease-soft group-hover:translate-y-2">
          <div data-ft="print" className="drop-shadow-[0_10px_14px_rgba(16,32,27,.10)]">
            <div className="bg-white px-4 pb-3 pt-6 font-mono text-[10.5px] leading-normal text-ink-2">
              <p className="text-center text-[11px] font-bold tracking-[.2em] text-ink">CP ATLAS</p>
              <p className="text-center text-[9.5px] text-ink-3">Payments · June 2026</p>
              <hr className="my-2.5 border-dashed border-line" />
              <ul className="grid gap-2">
                {receipt.map((r) => (
                  <li key={r.n} className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <b className="block truncate font-semibold text-ink">{r.n}</b>
                      <span className={r.paid ? "text-ink-3" : "text-[#b85a14]"}>{r.via} · {r.paid ? "paid" : "due Fri"}</span>
                    </span>
                    <span className="shrink-0 font-semibold text-ink">₹{r.amt}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-2.5 border-dashed border-line" />
              <div className="flex justify-between text-[12px] font-bold text-ink"><span>TOTAL</span><span>₹89,700</span></div>
              <div className="mt-3 h-7 bg-[repeating-linear-gradient(90deg,#10201b_0_2px,transparent_2px_4px,#10201b_4px_5px,transparent_5px_8px,#10201b_8px_11px,transparent_11px_13px)]" />
              <p className="mt-1 text-center text-[9px] tracking-[.3em] text-ink-3">INV-2041</p>
            </div>
            {/* torn edge */}
            <div className="h-2.5 bg-[linear-gradient(135deg,#fff_6px,transparent_0),linear-gradient(-135deg,#fff_6px,transparent_0)] bg-size-[12px_12px] bg-repeat-x" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Forms: submissions from anywhere flow into one sealed envelope, a lead inside. */
const sources = [
  { t: "Website form", c: "#4b6fe0" },
  { t: "Typeform", c: "#7a55ea" },
  { t: "Landing page", c: "#e2782a" },
];
function EnvelopeVisual() {
  return (
    <div className="flex items-end pt-11">
      <div className="flex h-[112px] w-[124px] shrink-0 flex-col justify-between max-xs:w-[106px]">
        {sources.map((s, i) => (
          <span
            key={s.t}
            className="flex h-7 items-center gap-2 rounded-md border border-line bg-paper pl-2 pr-2.5 text-[11px] font-semibold text-ink-2 shadow-soft max-xs:text-[10px]"
            style={{ rotate: `${(1 - i) * 2}deg` }}
          >
            <i className="size-2 shrink-0 rounded-full" style={{ background: s.c }} />
            {s.t}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 100 112" preserveAspectRatio="none" className="h-[112px] min-w-8 flex-1">
        {[14, 56, 98].map((y, i) => (
          <path key={y} className="hub-spoke" d={`M2 ${y} C50 ${y} 50 62 100 62`} fill="none" stroke={sources[i].c} strokeOpacity=".6" strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="relative h-[112px] w-[172px] shrink-0 max-xs:w-[150px]">
        <div className="absolute inset-0 rounded-lg bg-[#e6e0d0]" />
        <div className="absolute inset-x-3 -top-9 bottom-4 rounded-md bg-white p-3 shadow-soft transition-transform duration-500 ease-soft group-hover:-translate-y-3">
          <div className="flex items-center justify-between gap-2">
            <b className="font-serif text-[14px] font-semibold text-ink">New lead</b>
            <span className="text-[9px] font-bold uppercase tracking-[.12em] text-brand">Auto</span>
          </div>
          <p className="mt-0.5 truncate text-[11px] leading-snug text-ink-2">Aarav Mehta<br />₹50K budget</p>
        </div>
        <svg viewBox="0 0 172 112" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <path d="M0 34 L86 80 L172 34 V104 Q172 112 164 112 H8 Q0 112 0 104 Z" fill="#f1ece0" />
          <path d="M1 111 L68 70 M171 111 L104 70" stroke="#e0d9c6" strokeWidth="1.5" />
        </svg>
        <span className="absolute left-1/2 top-[80px] grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-soft ring-[3px] ring-[#f1ece0]">
          <Icon name="check" className="size-3.5 stroke-[3]" />
        </span>
      </div>
    </div>
  );
}

/** AI & Automations: a gear train. A new lead turns the AI gear, which turns out the follow-up. */
const PITCH = 24.1; // arc length per tooth, shared so the gears mesh
type Gear = { cx: number; cy: number; teeth: number; fill: string };
const gearTrain: Gear[] = [
  { cx: 150, cy: 82, teeth: 12, fill: "#1f9d6b" }, // AI, the driver
  { cx: 82, cy: 108, teeth: 7, fill: "#e6e0d0" }, // trigger
  { cx: 222, cy: 118, teeth: 9, fill: "#0f2e26" }, // action
];
const gearR = (g: Gear) => (g.teeth * PITCH) / (2 * Math.PI);
function gearPath(g: Gear) {
  const r = gearR(g), step = (2 * Math.PI) / g.teeth;
  const pt = (rad: number, a: number) => `${r1(g.cx + rad * Math.cos(a))} ${r1(g.cy + rad * Math.sin(a))}`;
  let d = "";
  for (let i = 0; i < g.teeth; i++) {
    const a = i * step;
    d += `${i ? "L" : "M"}${pt(r - 4, a - step * 0.27)} L${pt(r + 4, a - step * 0.13)} L${pt(r + 4, a + step * 0.13)} L${pt(r - 4, a + step * 0.27)} `;
  }
  return d + "Z";
}
/** Rotate each driven gear so a gap sits where the driver's tooth meets it (degrees). */
function gearPhase(g: Gear, i: number) {
  if (i === 0) return 0;
  const c = gearTrain[0];
  const toDriver = Math.atan2(c.cy - g.cy, c.cx - g.cx);
  const fromDriver = Math.atan2(g.cy - c.cy, g.cx - c.cx);
  const p = (fromDriver / ((2 * Math.PI) / c.teeth)) % 1; // driver's tooth phase at the contact
  const step = (2 * Math.PI) / g.teeth;
  return r1(((toDriver - p * step - step / 2) * 180) / Math.PI);
}
function GearsVisual() {
  const base = 9; // seconds per turn of the driver; driven gears scale by tooth count
  return (
    <svg viewBox="0 0 300 172" className="mx-auto w-full max-w-[330px]">
      {gearTrain.map((g, i) => (
        <g
          key={i}
          data-ft="spin"
          style={{ transformOrigin: `${g.cx}px ${g.cy}px`, animationDuration: `${r1((base * g.teeth) / 12)}s`, animationDirection: i ? "reverse" : "normal" }}
        >
          <path d={gearPath(g)} transform={`rotate(${gearPhase(g, i)} ${g.cx} ${g.cy})`} fill={g.fill} strokeLinejoin="round" />
          {i > 0 && <circle cx={g.cx} cy={g.cy} r="5" fill="#fff" />}
        </g>
      ))}
      {/* the AI spark sits still on the driver's hub */}
      <circle cx="150" cy="82" r="20" fill="#fff" />
      <path d="M150 69 C151.6 78 153 80.4 162 82 C153 83.6 151.6 86 150 95 C148.4 86 147 83.6 138 82 C147 80.4 148.4 78 150 69Z" fill="#1f9d6b" />
      <g>
        <rect x="14" y="22" width="76" height="22" rx="11" fill="#f7f5ef" stroke="#e4e0d4" />
        <circle cx="27" cy="33" r="3" fill="#e2782a" />
        <text x="35" y="37" className="fill-ink-2 text-[10.5px] font-semibold">New lead</text>
      </g>
      <g>
        <rect x="188" y="24" width="104" height="22" rx="11" fill="#f7f5ef" stroke="#e4e0d4" />
        <circle cx="201" cy="35" r="3" fill="#1f9d6b" />
        <text x="209" y="39" className="fill-ink-2 text-[10.5px] font-semibold">Follow-up sent</text>
      </g>
      <text x="100" y="160" textAnchor="middle" className="fill-ink-3 font-serif text-[11px] italic">scored 92 · drafted · assigned</text>
    </svg>
  );
}

/** Team: a keyring, one key per person, labelled with what that key opens. */
const keys = [
  { a: 58, c: "#0f2e26", i: "K", role: "Owner" },
  { a: 20, c: "#1f9d6b", i: "R", role: "Admin" },
  { a: -20, c: "#e2782a", i: "S", role: "Sales" },
  { a: -58, c: "#7a55ea", i: "A", role: "Viewer" },
];
function KeyringVisual() {
  return (
    <svg viewBox="0 0 300 162" className="mx-auto w-full max-w-[320px]">
      {keys.map((k, n) => {
        const t = (k.a * Math.PI) / 180;
        const lx = r1(150 - 100 * Math.sin(t));
        const ly = r1(49 + 100 * Math.cos(t));
        return (
          <g key={k.role}>
            <g className="origin-[150px_49px] group-hover:animate-[ft-swing_1.4s_ease-in-out]" style={{ animationDelay: `${n * 70}ms` }}>
              <g transform={`rotate(${k.a} 150 49)`}>
                <circle cx="150" cy="64" r="14" fill={k.c} />
                <circle cx="150" cy="54" r="3.5" fill="#fff" />
                <rect x="146.5" y="76" width="7" height="50" rx="2" fill={k.c} />
                <path d="M153.5 106 h6 v5 h-3 v4 h3 v6 h-6 z" fill={k.c} />
                <text x="150" y="68.5" textAnchor="middle" transform={`rotate(${-k.a} 150 64.5)`} className="fill-white text-[11px] font-bold">{k.i}</text>
              </g>
            </g>
            <text x={lx} y={ly + 4} textAnchor="middle" className="fill-ink-2 text-[10.5px] font-semibold">{k.role}</text>
          </g>
        );
      })}
      <circle cx="150" cy="36" r="13" fill="none" stroke="#a9a596" strokeWidth="3.5" />
      <path d="M163 34 L180 28" stroke="#a9a596" strokeWidth="1.5" />
      <g transform="rotate(-10 205 26)">
        <rect x="178" y="16" width="56" height="20" rx="4" fill="#efece3" stroke="#e4e0d4" />
        <circle cx="185" cy="26" r="2" fill="#fff" stroke="#c9c4b5" />
        <text x="211" y="30" textAnchor="middle" className="fill-ink-2 font-serif text-[10.5px] italic">4 seats</text>
      </g>
    </svg>
  );
}

/** Customizable workspace: a colour swatch fan (opens wider on hover) and a type specimen. */
const swatches = [
  { c: "#e04b52", n: "Rose" },
  { c: "#e2782a", n: "Clay" },
  { c: "#7a55ea", n: "Plum" },
  { c: "#4b6fe0", n: "Ocean" },
  { c: "#0f8f88", n: "Teal" },
  { c: "#1f9d6b", n: "Forest" },
];
function SwatchVisual() {
  return (
    <div className="flex items-end justify-center gap-6">
      <div className="relative h-[220px] w-[236px] shrink-0">
        {swatches.map((s, k) => (
          <div
            key={s.n}
            style={{ ...cssVar("--i", swatches.length - 1 - k), background: s.c }}
            className="absolute bottom-3 left-3 flex h-9 w-[200px] origin-[16px_50%] items-center justify-end gap-1.5 rounded-lg pr-3 font-mono text-[10px] font-semibold text-white shadow-soft transition-[rotate] duration-500 ease-soft [rotate:calc(var(--i)*-13deg)] group-hover:[rotate:calc(var(--i)*-17deg)]"
          >
            {s.n}
            <span className="opacity-60">{s.c.toUpperCase()}</span>
          </div>
        ))}
        <span className="absolute bottom-[30px] left-[28px] size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-white ring-2 ring-ink/20" />
      </div>
      <div className="mb-3 w-[132px] shrink-0 rounded-xl border border-line bg-paper p-3.5 shadow-soft max-sm:hidden">
        <span className="block font-serif text-[46px] font-semibold leading-none tracking-[-.03em] text-ink">Aa</span>
        <span className="mt-2 block font-mono text-[9.5px] uppercase tracking-[.12em] text-ink-3">Fraunces</span>
        <span className="block font-mono text-[9.5px] uppercase tracking-[.12em] text-ink-3">Inter</span>
        <div className="mt-3 grid grid-cols-2 rounded-full bg-white p-0.5 text-center text-[9.5px] font-semibold ring-1 ring-line">
          <span className="rounded-full py-0.5 text-ink-3">Light</span>
          <span className="rounded-full bg-forest py-0.5 text-white">Dark</span>
        </div>
      </div>
    </div>
  );
}

/** Integrations: a power strip. Three tools plugged in; the API plug goes in on hover. */
const plugs = [
  { t: "Razorpay", x: 60, lx: 52, on: true },
  { t: "Stripe", x: 120, lx: 118, on: true },
  { t: "Webhooks", x: 180, lx: 186, on: true },
  { t: "API", x: 240, lx: 252, on: false },
];
function PowerVisual() {
  return (
    <svg viewBox="0 0 300 172" className="mx-auto w-full max-w-[340px]">
      {plugs.map((p) => {
        const cable = `M${p.x} 104 C${p.x} 72 ${p.lx} 70 ${p.lx} 30`;
        return (
          <g key={p.t} className={cn(!p.on && "-translate-y-4 transition-[translate] duration-500 ease-soft group-hover:translate-y-0")}>
            <path d={cable} fill="none" stroke="#e8e4d8" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
            {p.on && <path d={cable} className="hub-spoke" fill="none" stroke="#2fbf85" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />}
            <rect x={p.x - 7} y="124" width="3" height="12" rx="1" fill="#b9b5a8" />
            <rect x={p.x + 4} y="124" width="3" height="12" rx="1" fill="#b9b5a8" />
            <rect x={p.x - 13} y="102" width="26" height="28" rx="6" fill="#f7f5ef" />
            <rect x={p.x - 13} y="102" width="26" height="7" rx="3" fill="#e4e0d4" />
          </g>
        );
      })}
      <rect x="16" y="130" width="268" height="32" rx="12" fill="#16443a" stroke="#fff" strokeOpacity=".08" />
      {plugs.map((p) => (
        <g key={p.t}>
          <rect x={p.x - 15} y="137" width="30" height="18" rx="5" fill="#0b2620" />
          <circle cx={p.x + 22} cy="146" r="2.5" fill="#3d5c54" />
          <g className={cn(!p.on && "opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100")}>
            <circle cx={p.x + 22} cy="146" r="6" fill="#2fbf85" opacity=".25" />
            <circle cx={p.x + 22} cy="146" r="2.5" fill="#2fbf85" />
          </g>
          <rect x={p.lx - 30} y="12" width="60" height="22" rx="11" fill="#16443a" stroke="#fff" strokeOpacity=".14" />
          <text x={p.lx} y="27" textAnchor="middle" className="fill-white text-[10.5px] font-semibold">{p.t}</text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Bento grid. `row` puts the text beside the visual down to that        */
/* breakpoint; below it the card stacks like the others.                 */
/* ------------------------------------------------------------------ */
const rowLayout = {
  lg: { card: "flex-row items-center max-lg:flex-col max-lg:items-stretch", text: "w-[34%] shrink-0 max-lg:w-auto" },
  sm: { card: "flex-row items-center max-sm:flex-col max-sm:items-stretch", text: "w-[34%] shrink-0 max-sm:w-auto" },
};
type GridItem = { letter: string; accent: string; title: string; text: string; visual: ReactNode; className?: string; row?: keyof typeof rowLayout; dark?: boolean };
const gridItems: GridItem[] = [
  { letter: "B", accent: "#4b6fe0", title: "Payment Tracking", text: "Track payments via Razorpay & Stripe in real time.", visual: <ReceiptVisual />, className: "row-span-2 max-sm:row-span-1" },
  { letter: "C", accent: "#e2782a", title: "Form Submissions", text: "Any form can be mapped to leads automatically.", visual: <EnvelopeVisual />, className: "col-span-2 max-lg:col-span-1", row: "lg" },
  { letter: "D", accent: "#0f8f88", title: "AI & Automations", text: "AI scores leads, drafts follow-ups and handles the busywork for you.", visual: <GearsVisual /> },
  { letter: "E", accent: "#7a55ea", title: "Team Management", text: "Add or remove members, roles and permissions.", visual: <KeyringVisual /> },
  { letter: "F", accent: "#e04b52", title: "Customizable Workspace", text: "Choose themes, colors, fonts and make it yours.", visual: <SwatchVisual />, className: "col-span-2 max-lg:order-last max-sm:col-span-1", row: "sm" },
  { letter: "G", accent: "#2fbf85", title: "Integrations", text: "Connect your favorite tools and services.", visual: <PowerVisual />, dark: true },
];

const checklist = (items: string[]) => (
  <ul className="mt-6 grid gap-3.5">
    {items.map((t) => (
      <li key={t} className="flex items-start gap-3 text-[15px] text-ink-2">
        <Icon name="check" className="mt-0.5 size-4 shrink-0 stroke-[3] text-brand" />
        {t}
      </li>
    ))}
  </ul>
);

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
            {checklist(["Score every lead the moment it arrives", "Stages that match how your team actually sells", "Nothing slips through, follow-ups are tracked automatically"])}
          </div>
          <GradientFrame className="reveal" style={delay(0.1)}>
            <div className={cn("rounded-[26.5px] px-7 py-8 max-sm:px-4", hatch)}>
              <FunnelVisual />
            </div>
          </GradientFrame>
        </div>

        {/* ---------- Showcase B: Analytics & Reports (mirrored) ---------- */}
        <div className="mt-24 grid grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] items-center gap-14 max-lg:mt-16 max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-8">
          <GradientFrame className="reveal max-lg:order-2" style={delay(0.1)}>
            <div className={cn("rounded-[26.5px] px-9 py-8 max-sm:px-4", hatch)}>
              <GaugeVisual />
            </div>
          </GradientFrame>
          <div className="reveal max-lg:order-1">
            <span className="font-serif text-[15px] italic text-ink-3">02</span>
            <h3 className="mt-2 text-[28px] font-bold leading-[1.2] tracking-[-.01em] max-sm:text-2xl">Analytics &amp; Reports</h3>
            <p className="mt-3 max-w-[420px] text-[16px] text-ink-2">See revenue, pipeline and team performance the moment they change, not at the end of the month.</p>
            {checklist(["Live revenue and pipeline tracking", "Spot a slowdown before it costs you", "Export a clean report in one click"])}
          </div>
        </div>

        {/* ---------- Everything else, as a bento of objects ---------- */}
        <div className="mt-24 max-lg:mt-16">
          <p className="reveal mb-8 text-[13px] font-semibold uppercase tracking-[.14em] text-ink-3">And everything else that comes with it</p>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {gridItems.map((f, i) => (
              <article
                key={f.title}
                style={delay((i % 3) * 0.07)}
                className={cn(
                  "reveal group flex gap-6 overflow-hidden rounded-[22px] border p-6 hover:-translate-y-1 hover:shadow-card",
                  f.dark ? "border-forest bg-forest" : "border-line bg-white hover:border-transparent",
                  f.row ? rowLayout[f.row].card : "flex-col",
                  f.className,
                )}
              >
                <div className={cn("flex flex-col gap-3", f.row && rowLayout[f.row].text)}>
                  <div className="flex items-center gap-3">
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full font-serif text-[13px] font-semibold"
                      style={{ color: f.accent, boxShadow: `inset 0 0 0 1.5px ${f.accent}55` }}
                    >
                      {f.letter}
                    </span>
                    <h3 className={cn("text-[16px] font-bold leading-[1.3] tracking-[-.01em]", f.dark && "text-white")}>{f.title}</h3>
                  </div>
                  <p className={cn("text-[14px]", f.dark ? "text-white/65" : "text-ink-2")}>{f.text}</p>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center" aria-hidden="true">
                  {f.visual}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
