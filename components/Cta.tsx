import { Icon } from "./Icon";
import { DemoForm } from "./DemoForm";
import { CtaLaptop } from "./CtaLaptop";
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
          <CtaLaptop />
          <div className="absolute right-1.5 top-0 text-right font-serif text-[15px] italic leading-[1.2] text-ink-2 max-md:hidden">
            Same tools.<br />Bigger possibilities.
          </div>
        </div>
      </div>
    </section>
  );
}
