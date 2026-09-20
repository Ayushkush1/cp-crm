import type { CSSProperties } from "react";

/** Stagger delay for the scroll-reveal animation, e.g. style={delay(0.1)} */
export const delay = (seconds: number): CSSProperties =>
  ({ "--d": `${seconds}s` }) as CSSProperties;

/** Sets a CSS custom property inline, e.g. style={cssVar("--h", 24)} */
export const cssVar = (name: string, value: string | number): CSSProperties =>
  ({ [name]: value }) as CSSProperties;
