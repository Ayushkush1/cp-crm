import { Icon, type IconName } from "./Icon";
import { Avatar, Eyebrow, Glow, Tag, TextLink, tones, wrap, sectionY, type TagTone, type Tone } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

/* Bento layout: the CRM is the flagship (big, dark), Task Doc shows it's linked to the CRM,
   and the hub card shows everything else plugging into the same core. */

type Lead = { initials: string; hue: number; value: string; tag: TagTone; label: string };
const pipeline: { stage: string; count: number; leads: Lead[] }[] = [
  {
    stage: "New",
    count: 12,
    leads: [
      { initials: "RK", hue: 210, value: "₹22K", tag: "b", label: "New" },
      { initials: "SM", hue: 28, value: "₹9K", tag: "b", label: "New" },
      { initials: "KT", hue: 190, value: "₹14K", tag: "b", label: "New" },
    ],
  },
  {
    stage: "Qualified",
    count: 8,
    leads: [
      { initials: "AS", hue: 150, value: "₹48K", tag: "o", label: "Hot" },
      { initials: "PN", hue: 280, value: "₹31K", tag: "v", label: "Demo" },
      { initials: "RB", hue: 45, value: "₹26K", tag: "v", label: "Demo" },
    ],
  },
  {
    stage: "Won",
    count: 5,
    leads: [
      { initials: "DV", hue: 170, value: "₹64K", tag: "g", label: "Paid" },
      { initials: "MJ", hue: 340, value: "₹18K", tag: "g", label: "Paid" },
      { initials: "NA", hue: 120, value: "₹40K", tag: "g", label: "Paid" },
    ],
  },
];
const crmStats = [
  { label: "Pipeline", value: "₹12.4L" },
  { label: "Win rate", value: "38%" },
  { label: "Collected", value: "₹3.1L" },
];

const tasks = [
  { text: "Send proposal", done: true },
  { text: "Kick-off call", done: true },
  { text: "Share onboarding doc", done: false },
];

/* Hub satellites sit on an ellipse around the core, at 60° steps. */
const satellites: { icon: IconName; tone: Tone; label: string }[] = [
  { icon: "inbox", tone: "green", label: "Forms" },
  { icon: "card", tone: "teal", label: "Invoicing" },
  { icon: "doc", tone: "red", label: "Knowledge base" },
  { icon: "plug", tone: "blue", label: "Integrations" },
  { icon: "sliders", tone: "violet", label: "Automation" },
  { icon: "trend", tone: "orange", label: "Analytics" },
];
const orbit = satellites.map((s, i) => {
  const a = (i * 60 * Math.PI) / 180;
  return { ...s, x: 50 + 40 * Math.cos(a), y: 46 + 32 * Math.sin(a) };
});

const card = "reveal group/card relative flex flex-col overflow-hidden rounded-[28px] p-7 max-xs:p-5 hover:-translate-y-1 hover:shadow-card";
const pill = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold";

export function Products() {
  return (
    <section className={cn(sectionY, "relative overflow-hidden")} id="products">
      <Glow />
      <div className={cn(wrap, "relative")}>
        {/* Split header: headline left, supporting copy right */}
        <div className="reveal mb-12 grid grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] items-end gap-10 max-md:grid-cols-1 max-md:gap-5">
          <div>
            <Eyebrow>Our products</Eyebrow>
            <h2 className="max-w-[560px]">A complete ecosystem for modern startups.</h2>
          </div>
          <div className="max-w-[440px] justify-self-end max-md:justify-self-start">
            <p className="mb-5 text-[17px] text-ink-2">
              Different tools. One connected experience. Everything works together, so you can focus on what really matters: your customers.
            </p>
            <TextLink href="#">Explore all products</TextLink>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {/* ---------- Flagship: CRM ---------- */}
          <article
            className={cn(card, "col-span-7 row-span-2 bg-forest text-white max-lg:col-span-full max-md:col-span-1")}
            style={delay(0.06)}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(47,191,133,.28),transparent_65%)]" />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={cn(pill, "bg-white/10 text-brand-2 ring-1 ring-white/10")}>
                  <i className="size-1.5 rounded-full bg-brand-2" /> Flagship
                </span>
                <h3 className="mt-4 text-[26px] font-bold tracking-[-.015em]">CP Atlas CRM</h3>
                <p className="mt-1.5 truncate text-[15px] text-white/65">Leads, contacts, deals and payments.</p>
              </div>
              <a href="#" className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-[gap,color] duration-200 hover:gap-3 hover:text-brand-2">
                Learn more <Icon name="arrow" />
              </a>
            </div>

            {/* Pipeline board preview */}
            <div aria-hidden="true" className="relative mt-7 flex flex-1 flex-col rounded-[20px] bg-white/[.05] p-3 ring-1 ring-white/10">
              <div className="grid flex-1 grid-cols-3 gap-3 max-xs:gap-2">
                {pipeline.map((col) => (
                  <div key={col.stage} className="flex flex-col gap-2 rounded-2xl bg-white/[.04] p-2.5 max-xs:p-1.5">
                    <div className="flex items-center justify-between px-1 pb-1 text-[12px] font-semibold text-white/80">
                      {col.stage}
                      <span className="rounded-full bg-white/10 px-1.5 text-[10.5px] text-white/60">{col.count}</span>
                    </div>
                    {col.leads.map((l, i) => (
                      <div
                        key={l.initials}
                        className={cn(
                          "rounded-xl bg-white p-2.5 text-ink shadow-[0_6px_16px_-8px_rgba(0,0,0,.5)] transition-transform duration-500 ease-butter",
                          i > 1 && "max-sm:hidden",
                          l.label === "Hot" && "ring-2 ring-brand-2 ring-offset-2 ring-offset-forest group-hover/card:-translate-y-0.5",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar initials={l.initials} hue={l.hue} className="size-6 shrink-0 text-[9px]" />
                          <div className="grid flex-1 gap-1">
                            <i className="h-1.5 w-4/5 rounded bg-ink/70" />
                            <i className="h-1 w-1/2 rounded bg-line" />
                          </div>
                        </div>
                        <div className="mt-2.5 flex items-center justify-between gap-1 max-sm:flex-col max-sm:items-start">
                          <b className="text-[13px] font-bold tracking-[-.01em]">{l.value}</b>
                          <Tag tone={l.tag}>{l.label}</Tag>
                        </div>
                      </div>
                    ))}
                    <span className="grid h-7 place-items-center rounded-lg border border-dashed border-white/15 text-white/35">
                      <Icon name="plus" className="size-3.5" />
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/[.06] py-3">
                {crmStats.map((s) => (
                  <div key={s.label} className="px-4 max-xs:px-2">
                    <small className="block text-[11px] font-medium uppercase tracking-[.1em] text-white/50">{s.label}</small>
                    <b className="font-serif text-[22px] font-semibold tracking-[-.02em] max-xs:text-lg">{s.value}</b>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* ---------- Task Doc: linked to a CRM deal ---------- */}
          <article className={cn(card, "col-span-5 border border-line bg-white max-lg:col-span-1")} style={delay(0.14)}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold tracking-[-.01em]">Task Doc</h3>
              <TextLink href="#" className="shrink-0 text-sm">Learn more</TextLink>
            </div>
            <p className="mt-1.5 truncate text-[14.5px] text-ink-2">Tasks, docs and teamwork, together.</p>

            <div aria-hidden="true" className="mt-5 flex-1 rounded-[18px] border border-line bg-paper p-4">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                <b className="font-serif text-[17px] font-semibold tracking-[-.01em]">Onboarding: Aarav Studio</b>
                <span className={cn(pill, "shrink-0 bg-white text-ink-2 ring-1 ring-line")}>
                  <Icon name="plug" className="size-3 text-brand" /> Linked · ₹48K deal
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                  <span className="block h-full w-2/3 rounded-full bg-brand" />
                </span>
                <small className="text-[11px] font-semibold text-ink-3">2 / 3</small>
              </div>
              <ul className="mt-3 grid gap-1.5">
                {tasks.map((t) => (
                  <li key={t.text} className="flex items-center gap-2.5 rounded-lg bg-white px-2.5 py-2 text-[13px]">
                    <span
                      className={cn(
                        "grid size-4 shrink-0 place-items-center rounded-[5px] border-2",
                        t.done ? "border-brand bg-brand text-white" : "border-[#cfcab9]",
                      )}
                    >
                      {t.done && <Icon name="check" className="size-2.5 stroke-[4]" />}
                    </span>
                    <span className={cn("flex-1", t.done ? "text-ink-3 line-through decoration-ink-3/50" : "font-medium")}>{t.text}</span>
                    {!t.done && <Tag tone="o">Today</Tag>}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* ---------- Ecosystem hub: what's coming ---------- */}
          <article className={cn(card, "col-span-5 border border-line bg-paper-2/70 max-lg:col-span-1")} style={delay(0.22)}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold tracking-[-.01em]">More products</h3>
              <span className={cn(pill, "shrink-0 bg-white text-ink-2 ring-1 ring-line")}>
                <i className="size-1.5 animate-pulse rounded-full bg-[#e2782a]" /> Coming soon
              </span>
            </div>
            <p className="mt-1.5 truncate text-[14.5px] text-ink-2">Forms, invoicing, automation and more.</p>

            <div aria-hidden="true" className="relative mt-4 min-h-[230px] flex-1">
              {/* spokes: dashes flow inward toward the core */}
              <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <ellipse cx="50" cy="46" rx="40" ry="32" fill="none" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                {orbit.map((o) => (
                  <line
                    key={o.label}
                    x1={o.x}
                    y1={o.y}
                    x2="50"
                    y2="46"
                    className="hub-spoke"
                    stroke="var(--color-brand)"
                    strokeOpacity=".45"
                    strokeWidth="1.25"
                    strokeDasharray="2 5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              <span className="absolute left-1/2 top-[46%] grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[20px] bg-forest text-white shadow-[0_0_0_8px_rgba(31,157,107,.1),0_14px_30px_-10px_rgba(15,46,38,.6)]">
                <span className="absolute inset-0 animate-ping rounded-[20px] bg-brand/20 [animation-duration:2.8s]" />
                <Icon name="logo" className="relative size-8" />
              </span>

              {orbit.map((o, i) => (
                <span
                  key={o.label}
                  className={cn("absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1", tones[o.tone])}
                  style={{ left: `${o.x}%`, top: `${o.y}%` }}
                >
                  <span
                    className="grid size-10 place-items-center rounded-xl border border-dashed border-[color-mix(in_srgb,var(--c)_40%,transparent)] bg-(--c-bg) text-(--c) transition-transform duration-500 ease-butter group-hover/card:scale-110"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <Icon name={o.icon} className="size-[18px]" />
                  </span>
                  <small className="whitespace-nowrap text-[10.5px] font-medium text-ink-3">{o.label}</small>
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
