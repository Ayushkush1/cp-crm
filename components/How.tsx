import { Icon } from "./Icon";
import { Btn, Eyebrow, wrap } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

/* Each step shows a tiny picture of what actually happens, instead of a generic icon. */
const art =
  "relative h-[76px] w-[112px] rounded-2xl bg-white p-3 text-ink shadow-[0_0_0_8px_var(--color-forest),0_18px_32px_-12px_rgba(0,0,0,.55)] " +
  "transition-transform duration-500 ease-butter group-hover:-translate-y-1.5";

/** 1. Capture: a form waiting for a submission. */
function CaptureArt() {
  return (
    <div className={art}>
      <div className="grid h-full content-between">
        <span className="flex h-[14px] items-center rounded-md bg-paper px-1.5 ring-1 ring-line"><i className="h-1 w-10 rounded bg-line" /></span>
        <span className="flex h-[14px] items-center rounded-md bg-paper px-1.5 ring-1 ring-line"><i className="h-1 w-14 rounded bg-line" /></span>
        <span className="grid h-4 place-items-center rounded-full bg-brand text-[8px] font-bold text-white">Submit</span>
      </div>
    </div>
  );
}

/** 2. Qualify: a lead with its status tags. */
function QualifyArt() {
  return (
    <div className={art}>
      <div className="flex items-center gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e2782a] text-[9px] font-bold text-white">A</span>
        <div className="grid gap-1">
          <i className="h-1.5 w-12 rounded bg-ink/70" />
          <i className="h-1 w-8 rounded bg-line" />
        </div>
      </div>
      <div className="mt-2.5 flex gap-1 text-[8.5px] font-semibold">
        <span className="rounded-full bg-[#fde8d6] px-1.5 py-0.5 text-[#b85a14]">Hot</span>
        <span className="rounded-full bg-[#dcf3e7] px-1.5 py-0.5 text-[#177a53]">Qualified</span>
      </div>
      <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-brand text-white ring-2 ring-forest">
        <Icon name="check" className="size-3 stroke-[3.5]" />
      </span>
    </div>
  );
}

/** 3. Close: a deal that just got paid. */
function CloseArt() {
  return (
    <div className={art}>
      <div className="flex h-full flex-col justify-between">
        <small className="text-[9px] font-semibold uppercase tracking-[.1em] text-ink-3">Deal</small>
        <b className="font-serif text-[24px] font-semibold leading-none tracking-[-.02em]">₹48K</b>
      </div>
      <span className="absolute -right-3 -top-2.5 rotate-[8deg] rounded border-2 border-brand bg-white px-1.5 py-px text-[10px] font-extrabold tracking-[.12em] text-brand">
        PAID
      </span>
    </div>
  );
}

/** 4. Grow: revenue climbing. */
const growBars = [28, 40, 36, 58, 78, 100];
function GrowArt() {
  return (
    <div className={art}>
      <div className="flex h-full items-end gap-1">
        {growBars.map((h, i) => (
          <span key={i} className="flex-1 rounded-t-[3px] bg-gradient-to-b from-brand-2 to-forest-2" style={{ height: `${h}%` }} />
        ))}
      </div>
      <span className="absolute -right-3 -top-2 rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white ring-2 ring-forest">+30%</span>
    </div>
  );
}

const steps: { Art: () => React.JSX.Element; title: string; text: string }[] = [
  { Art: CaptureArt, title: "Capture", text: "Form submissions land in one place." },
  { Art: QualifyArt, title: "Qualify", text: "Turn submissions into leads." },
  { Art: CloseArt, title: "Close", text: "Track opportunities and payments." },
  { Art: GrowArt, title: "Grow", text: "Delight customers and scale faster." },
];

export function How() {
  return (
    <section
      id="how"
      className="relative overflow-hidden bg-forest text-white before:pointer-events-none before:absolute before:-right-[200px] before:-top-[320px] before:size-[700px] before:rounded-full before:bg-[radial-gradient(circle,rgba(47,191,133,.22),transparent_65%)]"
    >
      <div
        className={cn(
          wrap,
          "relative grid grid-cols-[minmax(0,.85fr)_minmax(0,1.6fr)] items-center gap-14 py-[88px] max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-12",
        )}
      >
        <div className="reveal">
          <Eyebrow tone="light">How it works</Eyebrow>
          <h2 className="text-[clamp(32px,4vw,46px)]">From first lead to long-term growth.</h2>
          <p className="mb-[30px] mt-[18px] max-w-[340px] text-[17px] text-white/70">
            A simple, connected workflow to take you from interest to revenue.
          </p>
          <Btn href="#demo" variant="white" arrow>See it live</Btn>
        </div>

        <ol className="relative grid grid-cols-4 gap-5 before:absolute before:inset-x-[8%] before:top-[37px] before:border-t-2 before:border-dashed before:border-white/20 max-sm:grid-cols-2 max-sm:gap-y-10 max-sm:before:hidden">
          {steps.map(({ Art, title, text }, i) => (
            <li key={title} className="group reveal relative flex flex-col items-center gap-2.5 text-center" style={delay(0.05 + i * 0.1)}>
              <Art />
              <h3 className="mt-3.5 text-lg font-bold">
                <em className="not-italic text-brand-2">{i + 1}.</em> {title}
              </h3>
              <p className="max-w-[150px] text-sm text-white/70">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
