import { Icon, type IconName } from "./Icon";
import { Chip, Eyebrow, Glow, Tag, TextLink, tones, wrap, sectionY, type TagTone, type Tone } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

const crmRows: { tone: TagTone; label: string }[] = [
  { tone: "g", label: "Qualified" },
  { tone: "o", label: "Follow up" },
  { tone: "g", label: "Converted" },
  { tone: "b", label: "New" },
];
const taskRows: { tone: TagTone; label: string; done?: boolean }[] = [
  { tone: "o", label: "Today" },
  { tone: "g", label: "Done", done: true },
  { tone: "b", label: "Tomorrow" },
  { tone: "v", label: "Review" },
];
const soon: { icon: IconName; tone: Tone }[] = [
  { icon: "inbox", tone: "green" },
  { icon: "doc", tone: "red" },
  { icon: "card", tone: "teal" },
  { icon: "plug", tone: "blue" },
  { icon: "sliders", tone: "violet" },
  { icon: "trend", tone: "orange" },
];

const card =
  "reveal flex flex-col gap-3 rounded-3xl border border-line bg-white p-[26px] hover:-translate-y-1.5 hover:shadow-card";
const cardTitle = "mt-2 text-xl font-bold tracking-[-.01em]";
const cardText = "text-[14.5px] text-ink-2";
const shot = "mb-1 mt-2.5 overflow-hidden rounded-[14px] border border-line bg-paper p-3";
const row = "grid items-center gap-2.5 rounded-lg bg-white px-2.5 py-2";

export function Products() {
  return (
    <section className={cn(sectionY, "relative overflow-hidden")} id="products">
      <Glow />
      <div
        className={cn(
          wrap,
          "relative grid grid-cols-[minmax(0,1.05fr)_repeat(3,minmax(0,1fr))] items-stretch gap-5 max-lg:grid-cols-3 max-sm:grid-cols-1",
        )}
      >
        <div className="reveal flex flex-col items-start py-4 pr-6 max-lg:col-span-full max-lg:p-0 max-lg:pb-3">
          <Eyebrow>Our products</Eyebrow>
          <h2>A complete ecosystem for modern startups.</h2>
          <p className="mb-8 mt-5 text-[17px] text-ink-2 max-lg:max-w-[560px]">
            Different tools. One connected experience. Everything works together, so you can focus on what really matters: your customers.
          </p>
          <TextLink href="#" className="mt-auto">Explore all products</TextLink>
        </div>

        <article className={card} style={delay(0.08)}>
          <h3 className={cardTitle}>CP Atlas CRM</h3>
          <p className={cardText}>Manage leads, companies, contacts and payments.</p>
          <div className={shot} aria-hidden="true">
            <div className="grid gap-2">
              {crmRows.map((r, i) => (
                <div key={i} className={cn(row, "grid-cols-[22px_1fr_auto]")}>
                  <b className="size-[22px] rounded-full bg-gradient-to-br from-[#cfe9dc] to-[#9ed6b9]" />
                  <i className="h-1.5 rounded-[3px] bg-line" />
                  <Tag tone={r.tone}>{r.label}</Tag>
                </div>
              ))}
            </div>
          </div>
          <TextLink href="#" className="mt-auto pt-3.5">Learn more</TextLink>
        </article>

        <article className={card} style={delay(0.16)}>
          <h3 className={cardTitle}>Task Doc</h3>
          <p className={cardText}>Tasks, docs and team collaboration for everyday work.</p>
          <div className={shot} aria-hidden="true">
            <div className="grid gap-2">
              {taskRows.map((r, i) => (
                <div key={i} className={cn(row, "grid-cols-[16px_1fr_auto]")}>
                  <span className={cn("size-3.5 rounded-[5px] border-2 border-[#cfcab9]", r.done && "border-brand bg-brand")} />
                  <span className="h-1.5 rounded-[3px] bg-line" />
                  <Tag tone={r.tone}>{r.label}</Tag>
                </div>
              ))}
            </div>
          </div>
          <TextLink href="#" className="mt-auto pt-3.5">Learn more</TextLink>
        </article>

        <article className={card} style={delay(0.24)}>
          <h3 className={cardTitle}>More products</h3>
          <p className={cardText}>Forms, knowledge base, invoicing, automation and more, all connected.</p>
          <div className="mb-1 mt-2.5 grid grid-cols-3 gap-2.5" aria-hidden="true">
            {soon.map((s) => (
              <span
                key={s.icon}
                className={cn(
                  "grid aspect-square place-items-center rounded-[14px] border border-dashed border-[color-mix(in_srgb,var(--c)_35%,transparent)] bg-(--c-bg) text-(--c)",
                  tones[s.tone],
                )}
              >
                <Icon name={s.icon} className="size-[22px]" />
              </span>
            ))}
          </div>
          <TextLink muted className="mt-auto pt-3.5">Coming soon</TextLink>
        </article>
      </div>
    </section>
  );
}
