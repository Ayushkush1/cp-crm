"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";

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
      <form className="demo" onSubmit={onSubmit} noValidate>
        <label className="sr" htmlFor="email">Work email</label>
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
        />
        <button className="btn btn--dark" type="submit">Get my demo <Icon name="arrow" /></button>
      </form>
      <p className={`form-msg${status.kind !== "idle" ? ` ${status.kind}` : ""}`} role="status" aria-live="polite">
        {status.kind !== "idle" ? status.text : ""}
      </p>
    </>
  );
}
