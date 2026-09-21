import { Icon, type IconName } from "./Icon";
import { Btn, Chip, Eyebrow, wrap, type Tone } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

const steps: { icon: IconName; tone: Tone; title: string; text: string }[] = [
  { icon: "inbox", tone: "mint", title: "Capture", text: "Form submissions land in one place." },
  { icon: "user", tone: "orange", title: "Qualify", text: "Turn submissions into leads." },
  { icon: "chart", tone: "violet", title: "Close", text: "Track opportunities and payments." },
  { icon: "trend", tone: "mint", title: "Grow", text: "Delight customers and scale faster." },
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
          <Btn href="#demo" variant="white" arrow>See it in action</Btn>
        </div>

        <ol className="relative grid grid-cols-4 gap-5 before:absolute before:inset-x-[8%] before:top-[27px] before:border-t-2 before:border-dashed before:border-white/20 max-sm:grid-cols-2 max-sm:gap-y-9 max-sm:before:hidden">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal relative flex flex-col items-center gap-2.5 text-center" style={delay(0.05 + i * 0.1)}>
              <Chip tone={s.tone} large className="shadow-[0_0_0_8px_var(--color-forest)]">
                <Icon name={s.icon} className="size-6" />
              </Chip>
              <h3 className="mt-2 text-lg font-bold">
                <em className="not-italic text-brand-2">{i + 1}.</em> {s.title}
              </h3>
              <p className="max-w-[150px] text-sm text-white/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
