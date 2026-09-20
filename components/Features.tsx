import { Icon, type IconName } from "./Icon";
import { delay } from "@/lib/utils";

const features: { icon: IconName; color: string; title: string; text: string }[] = [
  { icon: "target", color: "c-green", title: "Lead & Opportunity Management", text: "Capture, track and convert leads into customers." },
  { icon: "card", color: "c-blue", title: "Payment Tracking", text: "Track payments via Razorpay & Stripe in real time." },
  { icon: "inbox", color: "c-orange", title: "Form Submissions", text: "Any form can be mapped to leads automatically." },
  { icon: "doc", color: "c-teal", title: "Task & Document Management", text: "Keep your work, files and conversations organized." },
  { icon: "users", color: "c-violet", title: "Team Management", text: "Add or remove members, roles and permissions." },
  { icon: "sliders", color: "c-red", title: "Customizable Workspace", text: "Choose themes, colors, fonts and make it yours." },
  { icon: "chart", color: "c-violet", title: "Analytics & Reports", text: "Get insights to make better decisions." },
  { icon: "plug", color: "c-blue", title: "Integrations", text: "Connect your favorite tools and services." },
];

export function Features() {
  return (
    <section className="sec" id="features">
      <div className="wrap">
        <div className="sec__head reveal">
          <div>
            <span className="eyebrow">Key features</span>
            <h2>Everything you need, in one place.</h2>
            <p>Built for modern teams. Designed for real work.</p>
          </div>
          <a href="#" className="link">See all features <Icon name="arrow" /></a>
        </div>
        <div className="fgrid">
          {features.map((f, i) => (
            <article className="fcard reveal" style={delay((i % 4) * 0.05)} key={f.title}>
              <span className={`ico ${f.color}`}><Icon name={f.icon} /></span>
              <div><h3>{f.title}</h3><p>{f.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
