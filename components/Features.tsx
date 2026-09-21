import { Icon, type IconName } from "./Icon";
import { Chip, SectionHead, TextLink, wrap, sectionY, type Tone } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

const features: { icon: IconName; tone: Tone; title: string; text: string }[] = [
  { icon: "target", tone: "green", title: "Lead & Opportunity Management", text: "Capture, track and convert leads into customers." },
  { icon: "card", tone: "blue", title: "Payment Tracking", text: "Track payments via Razorpay & Stripe in real time." },
  { icon: "inbox", tone: "orange", title: "Form Submissions", text: "Any form can be mapped to leads automatically." },
  { icon: "doc", tone: "teal", title: "Task & Document Management", text: "Keep your work, files and conversations organized." },
  { icon: "users", tone: "violet", title: "Team Management", text: "Add or remove members, roles and permissions." },
  { icon: "sliders", tone: "red", title: "Customizable Workspace", text: "Choose themes, colors, fonts and make it yours." },
  { icon: "chart", tone: "violet", title: "Analytics & Reports", text: "Get insights to make better decisions." },
  { icon: "plug", tone: "blue", title: "Integrations", text: "Connect your favorite tools and services." },
];

export function Features() {
  return (
    <section className={sectionY} id="features">
      <div className={wrap}>
        <SectionHead eyebrow="Key features" title="Everything you need, in one place." sub="Built for modern teams. Designed for real work.">
          <TextLink href="#">See all features</TextLink>
        </SectionHead>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {features.map((f, i) => (
            <article
              key={f.title}
              className={cn(
                "reveal flex flex-col gap-[18px] rounded-[20px] border border-line bg-white px-6 py-[26px] hover:-translate-y-[5px] hover:border-transparent hover:shadow-card",
              )}
              style={delay((i % 4) * 0.05)}
            >
              <Chip tone={f.tone}><Icon name={f.icon} /></Chip>
              <div>
                <h3 className="mb-2 text-[16.5px] font-bold leading-[1.3] tracking-[-.01em]">{f.title}</h3>
                <p className="text-[14.5px] text-ink-2">{f.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
