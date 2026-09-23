"use client";

import { useState, type FormEvent } from "react";
import { Btn } from "./ui";
import { cn } from "@/lib/cn";

type Status = { kind: "idle" } | { kind: "ok" | "err"; text: string };

export function DemoForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setStatus({ kind: "err", text: "Please enter a valid work email." });
      return;
    }
    // TODO: connect to the real demo-provisioning endpoint, e.g.
    // await fetch("/api/demo", { method: "POST", body: JSON.stringify({ email: v }) })
    setStatus({ kind: "ok", text: `You’re in! Check ${v} for your 24-hour demo access.` });
    setEmail("");
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex max-w-[520px] gap-2.5 rounded-full border border-line bg-white p-[7px] pl-3 shadow-card transition duration-200 focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgba(31,157,107,.15),var(--shadow-card)] max-sm:flex-col max-sm:rounded-3xl max-sm:p-2.5"
      >
        <label className="sr-only" htmlFor="email">Work email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          value={email}
          aria-invalid={status.kind === "err" || undefined}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3.5 outline-none max-sm:px-2.5 max-sm:py-3"
        />
        <Btn type="submit" arrow>Get demo</Btn>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-[22px] text-sm font-medium",
          status.kind === "ok" && "text-[#177a53]",
          status.kind === "err" && "text-[#e5484d]",
        )}
      >
        {status.kind !== "idle" ? status.text : ""}
      </p>
    </>
  );
}
