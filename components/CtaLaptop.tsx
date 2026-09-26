"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";
import { cssVar } from "@/lib/utils";

/* The CTA laptop is a tiny live app:
   - "Build. Organize. Grow." each play a scene (hover a word to jump to it)
   - the URL bar shows the visitor's workspace name as they type their email (DemoForm fires "cta:email")
   - a successful submit ("cta:ready") plays a provisioning sequence, then "You're in."
   - the laptop tilts toward the cursor, with a glare that follows it */

export const CTA_EMAIL = "cta:email";
export const CTA_READY = "cta:ready";

const FREE_MAIL = ["gmail", "yahoo", "outlook", "hotmail", "icloud", "proton", "protonmail", "live", "aol", "rediffmail"];
/** "ayush@acme.io" -> "acme", "ayush@gmail.com" -> "ayush". */
export function workspaceName(email: string) {
  const [local = "", domain = ""] = email.trim().toLowerCase().split("@");
  const company = domain.split(".")[0];
  const base = company && !FREE_MAIL.includes(company) ? company : local;
  return base.replace(/[^a-z0-9-]/g, "").slice(0, 16);
}

const words = ["Build.", "Organize.", "Grow."] as const;
const SCENE_MS = 3600;

export function CtaLaptop() {
  const root = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phase, setPhase] = useState<"idle" | "building" | "ready">("idle");

  // Workspace name + submit events from the form.
  useEffect(() => {
    const onEmail = (e: Event) => setName(workspaceName((e as CustomEvent<string>).detail));
    const onReady = (e: Event) => {
      setName(workspaceName((e as CustomEvent<string>).detail));
      setPhase("building");
    };
    window.addEventListener(CTA_EMAIL, onEmail);
    window.addEventListener(CTA_READY, onReady);
    return () => {
      window.removeEventListener(CTA_EMAIL, onEmail);
      window.removeEventListener(CTA_READY, onReady);
    };
  }, []);

  useEffect(() => {
    if (phase === "idle") return;
    const t = setTimeout(() => setPhase(phase === "building" ? "ready" : "idle"), phase === "building" ? 2000 : 7000);
    return () => clearTimeout(t);
  }, [phase]);

  // Only cycle scenes while on screen, not hovered, and motion is allowed.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || hovering || phase !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setScene((s) => (s + 1) % words.length), SCENE_MS);
    return () => clearTimeout(t);
  }, [scene, visible, hovering, phase]);

  // Cursor tilt + glare, tracked across the whole CTA section.
  useEffect(() => {
    const el = root.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 1.2)));
        const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 1.2)));
        el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${50 + x * 45}%`);
        el.style.setProperty("--gy", `${50 + y * 45}%`);
      });
    };
    const leave = () => {
      ["--rx", "--ry"].forEach((p) => el.style.setProperty(p, "0deg"));
      ["--gx", "--gy"].forEach((p) => el.style.setProperty(p, "30%"));
    };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  const ws = name || "yourteam";

  return (
    <div
      ref={root}
      className="absolute bottom-22 left-1/2 w-[min(520px,100%)] -translate-x-1/2 [perspective:1400px]"
    >
      <div className="transition-transform duration-500 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d]">
        {/* screen */}
        <div
          className={cn(
            "relative flex aspect-[14/8] flex-col overflow-hidden rounded-t-2xl border-[7px] border-[#17201d] text-white",
            "bg-[linear-gradient(135deg,var(--color-forest),#1b5a4a)] shadow-[0_40px_80px_-30px_rgba(15,46,38,.55)]",
            "before:absolute before:-top-1 before:left-1/2 before:z-[2] before:-ml-[2.5px] before:size-[5px] before:rounded-full before:bg-[#2b3531]",
          )}
        >
          {/* URL bar */}
          <div className="flex items-center gap-[3%] border-b border-white/10 px-[4%] py-[1.6%]">
            <span className="flex gap-1">
              {["#ff6b5f", "#ffbd44", "#2fbf85"].map((c) => <i key={c} className="size-[6px] rounded-full opacity-80" style={{ background: c }} />)}
            </span>
            <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-white/[.08] px-2.5 py-[3px] text-[clamp(8px,1vw,10.5px)] text-white/60">
              <Icon name="logo" className="size-2.5 shrink-0 text-brand-2" />
              <span key={ws} className="cta-type truncate font-semibold text-white">{ws}</span>
              <span className="shrink-0">.cpatlas.app</span>
              {name && phase === "idle" && <i className="cta-caret h-2.5 w-px bg-brand-2" />}
            </span>
            <span className="w-[26px]" />
          </div>

          {/* body: words on the left drive the scene on the right */}
          <div className="grid flex-1 grid-cols-[.8fr_1.2fr] items-center gap-[4%] px-[6%] py-[4%]">
            <div className="grid gap-[.1em]" onMouseLeave={() => setHovering(false)}>
              {words.map((w, i) => (
                <button
                  key={w}
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => {
                    setHovering(true);
                    setScene(i);
                  }}
                  className={cn(
                    "relative w-fit cursor-pointer text-left font-serif text-[clamp(20px,2.7vw,32px)] font-semibold leading-[1.08] transition-colors duration-500",
                    scene === i ? "text-white" : "text-white/25 hover:text-white/50",
                  )}
                >
                  {w}
                  {scene === i && (
                    <span className="absolute -bottom-0.5 left-0 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                      <span
                        key={`${scene}-${hovering}`}
                        className={cn("block h-full origin-left rounded-full bg-brand-2", !hovering && "cta-progress")}
                        style={cssVar("--dur", `${SCENE_MS}ms`)}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="relative h-full min-h-0 rounded-xl bg-white/[.06] p-[5%] ring-1 ring-white/10">
              <div key={scene} className="cta-scene size-full">
                {scene === 0 && <BuildScene />}
                {scene === 1 && <OrganizeScene />}
                {scene === 2 && <GrowScene active={visible} />}
              </div>
            </div>
          </div>

          {phase !== "idle" && <Provision phase={phase} name={ws} />}

          {/* glare follows the cursor */}
          <div
            className="pointer-events-none absolute inset-0 z-[3] transition-[background] duration-300"
            style={{ background: "radial-gradient(circle at var(--gx,30%) var(--gy,30%), rgba(255,255,255,.16), transparent 45%)" }}
          />
          <div className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(115deg,rgba(255,255,255,.12),transparent_38%)]" />
        </div>
        {/* base */}
        <div className="relative -mx-[5%] h-3.5 rounded-b-[18px] bg-gradient-to-b from-[#e4e1d7] to-[#bdb9ac] shadow-[0_18px_30px_-12px_rgba(15,46,38,.35)] before:absolute before:left-1/2 before:top-0 before:h-[5px] before:w-[18%] before:-translate-x-1/2 before:rounded-b-lg before:bg-[#a8a496]" />
      </div>
    </div>
  );
}

const at = (s: number) => cssVar("--o", `${s}s`);

/** Build: empty slots, then widgets snap into them. */
function BuildScene() {
  const tiles = [
    <div key="f" className="grid gap-[3px]"><i className="h-[5px] rounded-sm bg-line" /><i className="h-[5px] rounded-sm bg-line" /><i className="mt-auto h-[7px] w-3/5 rounded-full bg-brand" /></div>,
    <div key="c" className="flex -space-x-1.5">{[210, 28, 150].map((h) => <i key={h} className="size-4 rounded-full ring-2 ring-white" style={{ background: `hsl(${h} 45% 45%)` }} />)}</div>,
    <div key="d"><small className="block text-[7px] font-semibold uppercase tracking-wider text-ink-3">Deal</small><b className="font-serif text-[15px] leading-none text-ink">₹48K</b></div>,
    <div key="t" className="grid gap-[3px]">{[1, 1, 0].map((d, i) => <span key={i} className="flex items-center gap-1"><i className={cn("size-[7px] rounded-[2px]", d ? "bg-brand" : "ring-1 ring-line")} /><i className="h-[4px] flex-1 rounded-sm bg-line" /></span>)}</div>,
  ];
  return (
    <div className="grid size-full grid-cols-2 grid-rows-2 gap-[6%]">
      {tiles.map((t, i) => (
        <div key={i} className="relative rounded-lg border border-dashed border-white/20">
          <div className="cta-snap absolute inset-0 flex flex-col justify-center rounded-lg bg-white p-[10%] shadow-[0_8px_18px_-8px_rgba(0,0,0,.6)]" style={at(0.25 + i * 0.28)}>
            {t}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Organize: a hot deal moves New -> Qualified -> Won. */
function OrganizeScene() {
  const cols = ["New", "Qualified", "Won"];
  return (
    <div className="relative grid size-full grid-cols-3 gap-[6px]">
      {cols.map((c, ci) => (
        <div key={c} className="flex flex-col gap-[5px] rounded-md bg-white/[.05] p-[5px]">
          <small className="text-[7.5px] font-semibold text-white/60">{c}</small>
          {[0, 1].map((r) => (
            <span key={r} className="flex h-[18%] items-center gap-1 rounded bg-white/85 px-1">
              <i className="size-2 shrink-0 rounded-full" style={{ background: `hsl(${ci * 90 + r * 40 + 180} 40% 50%)` }} />
              <i className="h-[3px] flex-1 rounded bg-ink/30" />
            </span>
          ))}
        </div>
      ))}
      {/* the moving card starts over the New column's third slot */}
      <span className="cta-move absolute left-[5px] top-[64%] flex h-[17%] w-[calc((100%-12px)/3-10px)] items-center justify-between gap-1 rounded bg-white px-1.5 shadow-[0_8px_16px_-6px_rgba(0,0,0,.6)] ring-2 ring-brand-2">
        <b className="text-[8.5px] text-ink">₹48K</b>
        <span className="relative h-[11px] w-[26px] text-[6.5px] font-bold">
          <em className="cta-tag-hot absolute inset-0 grid place-items-center rounded-full bg-[#fde8d6] not-italic text-[#b85a14]">Hot</em>
          <em className="cta-tag-won absolute inset-0 grid place-items-center rounded-full bg-[#dcf3e7] not-italic text-[#177a53]">Won</em>
        </span>
      </span>
    </div>
  );
}

/** Grow: the revenue line draws while the total counts up. */
const growPath = "M0 34 L12 30 L24 31 L36 24 L48 25 L60 17 L72 14 L84 8 L100 3";
function GrowScene({ active }: { active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(12.4);
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(12.4 * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return (
    <div className="flex size-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <small className="block text-[7.5px] font-semibold uppercase tracking-wider text-white/50">Revenue</small>
          <b className="font-serif text-[clamp(14px,1.8vw,20px)] font-semibold leading-none tabular-nums">₹{n.toFixed(1)}L</b>
        </div>
        <span className="cta-snap rounded-full bg-brand-2 px-1.5 py-0.5 text-[8px] font-bold text-forest" style={at(1.3)}>+30%</span>
      </div>
      <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="mt-auto h-[62%] w-full overflow-visible">
        <defs>
          <linearGradient id="cta-grow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#2fbf85" stopOpacity=".45" />
            <stop offset="1" stopColor="#2fbf85" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${growPath} L100 36 L0 36 Z`} fill="url(#cta-grow)" className="cta-area" />
        <path d={growPath} pathLength={1} fill="none" stroke="#2fbf85" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" className="cta-draw" />
        <circle cx="100" cy="3" r="2.2" fill="#fff" className="cta-snap" style={at(1.4) as CSSProperties} />
      </svg>
    </div>
  );
}

/** Plays after a successful submit: set-up checklist, then "You're in." with a burst. */
const steps = ["Pipelines", "Forms", "Sample data"];
const burst = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  const d = 70 + (i % 3) * 28;
  return { x: Math.cos(a) * d, y: Math.sin(a) * d, c: ["#2fbf85", "#dff5ea", "#ffbd44", "#b9a4ff", "#ff8a7a"][i % 5], r: (i * 47) % 360 };
});
function Provision({ phase, name }: { phase: "building" | "ready"; name: string }) {
  return (
    <div className="cta-scene absolute inset-0 z-[2] grid place-items-center bg-forest/95 backdrop-blur-sm">
      {phase === "building" ? (
        <div className="w-[62%]">
          <p className="text-[clamp(10px,1.3vw,13px)] text-white/70">
            Creating <b className="text-white">{name}</b> workspace…
          </p>
          <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/10">
            <span className="cta-progress block h-full origin-left rounded-full bg-brand-2" style={cssVar("--dur", "1.8s")} />
          </span>
          <ul className="mt-3 grid gap-1.5">
            {steps.map((s, i) => (
              <li key={s} className="cta-snap flex items-center gap-2 text-[clamp(9px,1.1vw,11.5px)] text-white/80" style={at(0.3 + i * 0.45)}>
                <span className="grid size-3.5 place-items-center rounded-full bg-brand-2 text-forest">
                  <Icon name="check" className="size-2 stroke-[4]" />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="relative text-center">
          {burst.map((b, i) => (
            <i
              key={i}
              className="cta-burst absolute left-1/2 top-1/2 h-2 w-1 rounded-[1px]"
              style={{ background: b.c, "--x": `${b.x}px`, "--y": `${b.y}px`, "--r": `${b.r}deg` } as CSSProperties}
            />
          ))}
          <b className="cta-snap block font-serif text-[clamp(28px,3.6vw,40px)] font-semibold leading-none">You’re in.</b>
          <p className="cta-snap mt-2 text-[clamp(9px,1.1vw,12px)] text-white/65" style={at(0.2)}>
            <b className="text-brand-2">{name}.cpatlas.app</b> is ready. Check your inbox.
          </p>
        </div>
      )}
    </div>
  );
}
