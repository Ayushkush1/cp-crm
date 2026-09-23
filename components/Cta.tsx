import { Icon } from "./Icon";
import { DemoForm } from "./DemoForm";
import { Eyebrow, wrap } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

const ticks = ["No credit card required", "Full access for 24 hours", "Setup in minutes"];

export function Cta() {
  return (
    <section id="demo" className="overflow-hidden bg-[linear-gradient(120deg,#e9f5ee,#efeaff_70%)] pt-14">
      <div className={cn(wrap, "grid grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] items-end gap-10 max-md:grid-cols-[minmax(0,1fr)]")}>
        <div className="reveal pb-24 max-md:pb-6">
          <Eyebrow tone="dark">Ready to get started?</Eyebrow>
          <h2>See CP Atlas in action.</h2>
          <p className="mb-[30px] mt-4 max-w-[460px] text-lg text-ink-2">
            Get a 24-hour live demo workspace and explore every feature. No credit card required.
          </p>
          <DemoForm />
          <ul className="mt-2.5 flex flex-wrap gap-x-[22px] gap-y-2.5 text-sm text-ink-2">
            {ticks.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Icon name="check" className="size-4 stroke-[2.6] text-brand" />{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal relative min-h-[460px] self-end max-md:min-h-[320px]" style={delay(0.1)} aria-hidden="true">
          <div className="absolute bottom-22 left-1/2 w-[min(520px,100%)] -translate-x-1/2">
            {/* screen */}
            <div
              className={cn(
                "relative flex aspect-[14/8] flex-col justify-center overflow-hidden rounded-t-2xl border-[7px] border-[#17201d] px-[8%] pb-[10%] pt-[8%] text-white",
                "bg-[linear-gradient(135deg,var(--color-forest),#1b5a4a)] shadow-[0_40px_80px_-30px_rgba(15,46,38,.55)]",
                // camera dot + glass reflection
                "before:absolute before:-top-1 before:left-1/2 before:z-[2] before:-ml-[2.5px] before:size-[5px] before:rounded-full before:bg-[#2b3531]",
                "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(115deg,rgba(255,255,255,.22),transparent_38%)]",
              )}
            >
              <b className="block font-serif text-[clamp(34px,4.4vw,45px)] font-semibold leading-[1.02]">
                Build.<br />Organize.<br />Grow.
              </b>
            </div>
            {/* base */}
            <div className="relative -mx-[5%] h-3.5 rounded-b-[18px] bg-gradient-to-b from-[#e4e1d7] to-[#bdb9ac] shadow-[0_18px_30px_-12px_rgba(15,46,38,.35)] before:absolute before:left-1/2 before:top-0 before:h-[5px] before:w-[18%] before:-translate-x-1/2 before:rounded-b-lg before:bg-[#a8a496]" />
          </div>
          <div className="absolute right-1.5 top-0 text-right font-serif text-[15px] italic leading-[1.2] text-ink-2 max-md:hidden">
            Same tools.<br />Bigger possibilities.
          </div>
        </div>
      </div>
    </section>
  );
}
