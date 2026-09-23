import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/** Page container. Use: className={cn(wrap, "...")} */
export const wrap = "mx-auto w-full max-w-[1280px] px-3.5 max-xs:px-3";

/** Vertical rhythm for a normal page section. */
export const sectionY = "py-16 max-sm:py-14";

/* ---------- Accent tones: set --c (icon/text colour) and --c-bg (tint) for children ---------- */
export const tones = {
  green: "[--c:#1f8a5f] [--c-bg:#dcf3e7]",
  teal: "[--c:#0f8f88] [--c-bg:#d8f2ef]",
  mint: "[--c:#1f9d6b] [--c-bg:#d9f5e6]",
  orange: "[--c:#e2782a] [--c-bg:#fde8d6]",
  blue: "[--c:#4b6fe0] [--c-bg:#e2e9fd]",
  violet: "[--c:#7a55ea] [--c-bg:#ebe4fd]",
  red: "[--c:#e04b52] [--c-bg:#fde1e2]",
} as const;
export type Tone = keyof typeof tones;

/** Rounded icon tile tinted with a tone. */
export function Chip({
  tone,
  large,
  className,
  children,
}: {
  tone: Tone;
  large?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-[13px] bg-(--c-bg) text-(--c)",
        large && "size-[54px] rounded-2xl [&_svg]:size-6",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Buttons ----------
   "Slide-swap" pill: glossy body with a light rim, a soft glow and a round knob.
   On hover the knob slides across the pill while the label glides into its place. */
const variants = {
  dark: {
    body: "bg-[linear-gradient(180deg,#1d4f41_0%,#0f2e26_55%,#0a221c_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.22),inset_0_-3px_6px_rgba(0,0,0,.28),0_0_0_1.5px_rgba(255,255,255,.9),0_0_0_2.5px_rgba(16,32,27,.14),0_12px_24px_-8px_rgba(15,46,38,.6)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.28),inset_0_-3px_6px_rgba(0,0,0,.28),0_0_0_1.5px_rgba(255,255,255,.95),0_0_0_2.5px_rgba(16,32,27,.18),0_18px_30px_-10px_rgba(15,46,38,.7)]",
    glow: "bg-[radial-gradient(closest-side,rgba(47,191,133,.6),transparent)]",
    knob: "bg-[linear-gradient(180deg,#fff,#dcece3)] text-forest shadow-[0_3px_8px_rgba(0,0,0,.35),inset_0_-2px_3px_rgba(15,46,38,.15)]",
  },
  light: {
    body: "bg-[linear-gradient(180deg,#fff,#f3f1ea)] text-ink shadow-[inset_0_-2px_4px_rgba(16,32,27,.06),0_0_0_1.5px_rgba(16,32,27,.08),0_0_0_3px_rgba(255,255,255,.85),0_10px_22px_-10px_rgba(16,32,27,.3)] hover:shadow-[inset_0_-2px_4px_rgba(16,32,27,.06),0_0_0_1.5px_rgba(16,32,27,.1),0_0_0_3px_rgba(255,255,255,.95),0_16px_28px_-10px_rgba(16,32,27,.38)]",
    glow: "bg-[radial-gradient(closest-side,rgba(47,191,133,.28),transparent)]",
    knob: "bg-[linear-gradient(180deg,#1d4f41,#0f2e26)] text-white shadow-[0_3px_8px_rgba(15,46,38,.4),inset_0_1px_0_rgba(255,255,255,.2)]",
  },
  white: {
    body: "bg-white text-forest shadow-[0_0_0_3px_rgba(255,255,255,.25),0_12px_26px_-8px_rgba(0,0,0,.45)]",
    glow: "bg-[radial-gradient(closest-side,rgba(47,191,133,.3),transparent)]",
    knob: "bg-[linear-gradient(180deg,#1d4f41,#0f2e26)] text-white shadow-[0_3px_8px_rgba(15,46,38,.4)]",
  },
  ghost: {
    body: "border border-line bg-white/70 text-ink hover:bg-white",
    glow: "",
    knob: "bg-forest text-white",
  },
  soft: {
    body: "bg-paper-2 text-ink hover:bg-forest hover:text-white",
    glow: "",
    knob: "bg-forest text-white",
  },
} as const;

// --k = knob diameter. On hover the knob slides across (via `right`) and the label glides (via translate)
// by the same distance the padding difference makes, so nothing jumps.
const sizes = {
  sm: { box: "h-9 text-[13px] [--k:26px]", label: "pl-4 pr-[42px] group-hover:translate-x-[26px]", plain: "px-4", icon: "size-3" },
  md: { box: "h-11 text-sm [--k:32px]", label: "pl-5 pr-[50px] group-hover:translate-x-[30px]", plain: "px-5", icon: "size-[15px]" },
  lg: { box: "h-12 text-sm [--k:36px]", label: "pl-[22px] pr-14 group-hover:translate-x-[34px]", plain: "px-6", icon: "size-4" },
} as const;

type BtnProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  block?: boolean;
  /** Shows the round knob with an arrow. */
  arrow?: boolean;
  /** Shows the round knob with a custom icon (overrides arrow). */
  icon?: IconName;
  className?: string;
  children: ReactNode;
};

export function Btn({
  variant = "dark",
  size = "md",
  block,
  arrow,
  icon,
  className,
  children,
  ...props
}: BtnProps & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>) {
  const v = variants[variant];
  const z = sizes[size];
  const knobIcon = icon ?? (arrow ? "arrow" : undefined);
  const classes = cn(
    "group relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-semibold leading-none",
    "transition-[transform,box-shadow,background-color,color] duration-500 ease-butter active:scale-[.98]",
    v.body,
    z.box,
    block && "w-full",
    className,
  );
  const inner = knobIcon ? (
    <>
      {v.glow && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -z-10 inset-y-[-30%] right-0 w-[60%] transition-transform duration-[900ms] ease-butter will-change-transform group-hover:-translate-x-[66%]",
            v.glow,
          )}
        />
      )}
      <span className={cn("transition-transform duration-[900ms] ease-butter will-change-transform", z.label)}>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-1.5 top-1/2 grid size-(--k) -translate-y-1/2 place-items-center rounded-full",
          "transition-[right] duration-[900ms] ease-butter will-change-[right] group-hover:right-[calc(100%_-_var(--k)_-_6px)]",
          v.knob,
        )}
      >
        <Icon name={knobIcon} className={cn("-rotate-45 transition-transform duration-[900ms] ease-butter group-hover:rotate-0", z.icon, knobIcon === "play" && "rotate-0")} />
      </span>
    </>
  ) : (
    <span className={z.plain}>{children}</span>
  );
  if (props.href !== undefined) {
    return <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>{inner}</a>;
  }
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>{inner}</button>;
}

/* ---------- Small text pieces ---------- */
export function Eyebrow({ tone = "default", children }: { tone?: "default" | "light" | "dark"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "mb-[18px] inline-block text-xs font-semibold uppercase tracking-[.14em]",
        tone === "light" ? "text-white/60" : tone === "dark" ? "text-ink/60" : "text-ink-3",
      )}
    >
      {children}
    </span>
  );
}

const linkClasses = "group inline-flex items-center gap-2 text-[15px] font-semibold transition-[gap,color] duration-200 hover:gap-3";
export function TextLink({ href, muted, className, children }: { href?: string; muted?: boolean; className?: string; children: ReactNode }) {
  const inner = (<>{children}<Icon name="arrow" /></>);
  if (muted || !href) return <span className={cn(linkClasses, "text-ink-2", className)}>{inner}</span>;
  return <a href={href} className={cn(linkClasses, "hover:text-brand", className)}>{inner}</a>;
}

/** Small status pill used in the product previews. */
const tagTones = {
  g: "bg-[#dcf3e7] text-[#177a53]",
  o: "bg-[#fde8d6] text-[#b85a14]",
  b: "bg-[#e2e9fd] text-[#3653b8]",
  v: "bg-[#ebe4fd] text-[#5b3fc4]",
} as const;
export type TagTone = keyof typeof tagTones;
export function Tag({ tone, children }: { tone: TagTone; children: ReactNode }) {
  return <em className={cn("shrink-0 whitespace-nowrap rounded-full px-2 py-[3px] text-[10px] font-semibold not-italic", tagTones[tone])}>{children}</em>;
}

/** Inline highlight pill for headlines (scales with the font size). Use inside h1/h2. */
const hlTones = {
  mint: "bg-mint text-forest",
  forest: "bg-forest text-white",
  brand: "bg-brand text-white",
} as const;
export function Hl({ tone, className, children }: { tone: keyof typeof hlTones; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "mx-[.06em] inline-flex items-center gap-[.25em] whitespace-nowrap rounded-full px-[.3em] align-middle font-medium italic",
        hlTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Soft green + lilac glows, the same backdrop the hero and "Why we built it" use. Put inside a `relative overflow-hidden` section and give the content `relative`. */
export function Glow({ flip }: { flip?: boolean }) {
  return (
    <>
      <div aria-hidden="true" className={cn("pointer-events-none absolute size-[460px] rounded-full bg-[#d5efe2] opacity-50 blur-[80px]", flip ? "-right-40 top-20" : "-left-40 top-24")} />
      <div aria-hidden="true" className={cn("pointer-events-none absolute size-[460px] rounded-full bg-[#e7e0ff] opacity-50 blur-[80px]", flip ? "-left-40 bottom-10" : "-right-40 bottom-10")} />
    </>
  );
}

/** Section title block: eyebrow + h2 + subtitle on the left, optional control on the right. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        <p className="mt-3.5 text-lg text-ink-2">{sub}</p>
      </div>
      {children}
    </div>
  );
}

/** Coloured round avatar with initials. Pass hue 0-360. */
export function Avatar({ initials, hue, className }: { initials: string; hue: number; className?: string }) {
  return (
    <span
      className={cn("grid size-[46px] place-items-center rounded-full text-sm font-semibold text-white", className)}
      style={{ background: `hsl(${hue} 45% 42%)` }}
    >
      {initials}
    </span>
  );
}
