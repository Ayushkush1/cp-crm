import { Icon, type IconName } from "./Icon";
import { Chip, tones, type Tone } from "./ui";
import { cn } from "@/lib/cn";

const items: { icon: IconName; tone: Tone; title: string; sub: string }[] = [
  { icon: "target", tone: "green", title: "Leads & CRM", sub: "Capture, track, convert" },
  { icon: "task", tone: "teal", title: "Tasks & Documents", sub: "Get work done together" },
  { icon: "card", tone: "mint", title: "Payment Tracking", sub: "Razorpay & Stripe" },
  { icon: "users", tone: "orange", title: "Team Collaboration", sub: "Built for growing teams" },
  { icon: "plug", tone: "blue", title: "Forms & Integrations", sub: "Connect your tools" },
  { icon: "chart", tone: "violet", title: "Analytics & Reports", sub: "Make better decisions" },
];

export function Strip() {
  return (
    <section className="relative -mt-2 pb-5" aria-label="Capabilities">
      <div
        className={cn(
          "mx-auto grid w-[calc(100%-28px)] max-w-[1252px] grid-cols-6 rounded-[26px] border border-line p-2",
          "bg-gradient-to-b from-white to-[#fcfbf7]",
          "shadow-[inset_0_1px_0_#fff,0_1px_2px_rgba(16,32,27,.04),0_24px_48px_-24px_rgba(15,46,38,.22)]",
          "max-lg:grid-cols-3 max-sm:grid-cols-2 max-xs:w-[calc(100%-24px)] max-xs:grid-cols-1",
        )}
      >
        {items.map((i, idx) => (
          <div
            key={i.title}
            className={cn(
              "group/item relative flex flex-col items-center gap-4 rounded-[19px] px-4 pb-7 pt-6 text-center",
              "transition duration-300 ease-soft hover:-translate-y-[3px] hover:bg-white",
              "hover:shadow-[0_1px_2px_rgba(16,32,27,.05),0_18px_32px_-14px_color-mix(in_srgb,var(--c)_40%,transparent)]",
              "[&:has(+*:hover)>.divider]:opacity-0 max-sm:px-3 max-sm:pb-6 max-sm:pt-5",
              tones[i.tone],
            )}
          >
            {idx < items.length - 1 && (
              <span
                aria-hidden="true"
                className="divider absolute -right-px bottom-[24%] top-[24%] w-px bg-gradient-to-b from-transparent via-line to-transparent transition-opacity duration-200 group-hover/item:opacity-0 max-lg:hidden"
              />
            )}
            <Chip
              tone={i.tone}
              className={cn(
                "rounded-[14px] bg-[linear-gradient(150deg,#fff_-20%,var(--c-bg)_70%)]",
                "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--c)_16%,transparent),0_8px_16px_-8px_color-mix(in_srgb,var(--c)_55%,transparent)]",
                "transition-transform duration-[350ms] ease-soft group-hover/item:-rotate-[4deg] group-hover/item:scale-[1.08]",
              )}
            >
              <Icon name={i.icon} className="size-[21px] stroke-[1.9]" />
            </Chip>
            <div>
              <b className="block text-[15px] font-semibold leading-[1.3] tracking-[-.01em] text-ink">{i.title}</b>
              <small className="mt-[3px] block text-[13px] leading-[1.4] text-ink-3">{i.sub}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
