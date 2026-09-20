import { Icon, type IconName } from "./Icon";

const items: { icon: IconName; color: string; title: string; sub: string }[] = [
  { icon: "target", color: "c-green", title: "Leads & CRM", sub: "Capture, track, convert" },
  { icon: "task", color: "c-teal", title: "Tasks & Documents", sub: "Get work done together" },
  { icon: "card", color: "c-mint", title: "Payment Tracking", sub: "Razorpay & Stripe" },
  { icon: "users", color: "c-orange", title: "Team Collaboration", sub: "Built for growing teams" },
  { icon: "plug", color: "c-blue", title: "Forms & Integrations", sub: "Connect your tools" },
  { icon: "chart", color: "c-violet", title: "Analytics & Reports", sub: "Make better decisions" },
];

export function Strip() {
  return (
    <section className="strip" aria-label="Capabilities">
      <div className="wrap strip__in">
        {items.map((i) => (
          <div className={`strip__i ${i.color}`} key={i.title}>
            <span className="ico"><Icon name={i.icon} /></span>
            <div><b>{i.title}</b><small>{i.sub}</small></div>
          </div>
        ))}
      </div>
    </section>
  );
}
