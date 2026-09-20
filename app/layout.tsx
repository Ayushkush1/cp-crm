import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Sprite } from "@/components/Icon";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CP Atlas — The all-in-one workspace for modern startups",
  description:
    "CP Atlas connects your leads, tasks, documents, payments and team in one ecosystem. Get a free 24-hour live demo workspace. No credit card required.",
  openGraph: {
    title: "CP Atlas — Everything your startup needs to scale, together.",
    description:
      "Leads, tasks, documents, payments and team collaboration in one connected ecosystem.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2e26",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds the "js" class before hydration
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Sprite />
        {children}
      </body>
    </html>
  );
}
