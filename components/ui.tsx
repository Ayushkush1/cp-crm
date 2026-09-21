import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/** Page container. Use: className={cn(wrap, "...")} */
export const wrap = "mx-auto w-full max-w-[1280px] px-3.5 max-xs:px-3";

/** Vertical rhythm for a normal page section. */
export const sectionY = "py-28 max-sm:py-20";

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

/* ---------- Buttons ---------- */
const variants = {
  dark: "bg-forest text-white shadow-[0_8px_20px_-8px_rgba(15,46,38,.6)] hover:-translate-y-0.5 hover:bg-forest-2 hover:shadow-[0_14px_28px_-10px_rgba(15,46,38,.7)]",
  light: "border border-line bg-white shadow-soft hover:-translate-y-0.5 hover:shadow-card",
  ghost: "border border-line bg-white/60 hover:bg-white",
  white: "bg-white text-forest hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(0,0,0,.35)]",
  soft: "bg-paper-2 text-ink hover:bg-forest hover:text-white",
} as const;

const sizes = {
  sm: "gap-2.5 rounded-[10px] px-4 py-[11px] text-sm",
  md: "gap-2.5 rounded-xl px-[22px] py-3.5 text-[15px]",
  lg: "gap-2 rounded-xl px-5 py-[13px] text-[15px]",
} as const;

type BtnProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  block?: boolean;
  /** Show a trailing arrow that nudges right on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function Btn({
  variant = "dark",
  size = "md",
  block,
  arrow,
  className,
  children,
  ...props
}: BtnProps & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(
    "group inline-flex items-center justify-center whitespace-nowrap font-semibold leading-none transition duration-200 ease-soft",
    variants[variant],
    sizes[size],
    block && "w-full",
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && <Icon name="arrow" className="transition-transform duration-200 ease-soft group-hover:translate-x-[3px]" />}
    </>
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
  return <em className={cn("rounded-full px-2 py-[3px] text-[10px] font-semibold not-italic", tagTones[tone])}>{children}</em>;
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
