import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type IconName =
  | "arrow" | "check" | "users" | "card" | "chart" | "doc" | "task" | "box"
  | "plug" | "sliders" | "inbox" | "target" | "user" | "trend" | "play"
  | "menu" | "close" | "left" | "right" | "plus" | "star" | "logo" | "spark" | "mail";

const symbols: Record<IconName, { viewBox: string; body: ReactNode }> = {
  arrow: { viewBox: "0 0 24 24", body: <path d="M5 12h14M12 5l7 7-7 7" /> },
  check: { viewBox: "0 0 24 24", body: <path d="M20 6 9 17l-5-5" /> },
  users: {
    viewBox: "0 0 24 24",
    body: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>),
  },
  card: { viewBox: "0 0 24 24", body: (<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></>) },
  chart: { viewBox: "0 0 24 24", body: <path d="M12 20V10M18 20V4M6 20v-4" /> },
  doc: { viewBox: "0 0 24 24", body: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>) },
  task: { viewBox: "0 0 24 24", body: (<><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>) },
  box: { viewBox: "0 0 24 24", body: (<><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></>) },
  plug: { viewBox: "0 0 24 24", body: <path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z" /> },
  sliders: { viewBox: "0 0 24 24", body: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /> },
  inbox: { viewBox: "0 0 24 24", body: (<><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>) },
  target: { viewBox: "0 0 24 24", body: (<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>) },
  user: { viewBox: "0 0 24 24", body: (<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>) },
  trend: { viewBox: "0 0 24 24", body: (<><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>) },
  play: { viewBox: "0 0 24 24", body: <path d="M7 4v16l13-8z" fill="currentColor" stroke="none" /> },
  menu: { viewBox: "0 0 24 24", body: <path d="M3 6h18M3 12h18M3 18h18" /> },
  close: { viewBox: "0 0 24 24", body: <path d="M18 6 6 18M6 6l12 12" /> },
  left: { viewBox: "0 0 24 24", body: <path d="m15 18-6-6 6-6" /> },
  right: { viewBox: "0 0 24 24", body: <path d="m9 18 6-6-6-6" /> },
  plus: { viewBox: "0 0 24 24", body: <path d="M12 5v14M5 12h14" /> },
  star: { viewBox: "0 0 24 24", body: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" fill="currentColor" stroke="none" /> },
  spark: { viewBox: "0 0 24 24", body: <path d="M12 2c.8 5.4 1.6 6.6 7 10-5.4 3.4-6.2 4.6-7 10-.8-5.4-1.6-6.6-7-10 5.4-3.4 6.2-4.6 7-10z" fill="currentColor" stroke="none" /> },
  mail: { viewBox: "0 0 24 24", body: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>) },
  logo: { viewBox: "0 0 32 32", body: <path d="M16 4 3 28h5.2l2.6-5.3h10.4l2.6 5.3H29zM12.6 18.4 16 11.5l3.4 6.9z" fill="currentColor" stroke="none" fillRule="evenodd" /> },
};

/** Hidden SVG sprite. Render once in the layout. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {(Object.keys(symbols) as IconName[]).map((name) => (
          <symbol key={name} id={`i-${name}`} viewBox={symbols[name].viewBox}>
            {symbols[name].body}
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

/**
 * Stroke icon from the sprite. Default size is 18px.
 * Resize or restyle with Tailwind, e.g. <Icon name="check" className="size-4 stroke-[2.6] text-brand" />
 */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={cn("size-[18px] shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <use href={`#i-${name}`} />
    </svg>
  );
}
