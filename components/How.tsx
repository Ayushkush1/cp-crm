import { Icon, type IconName } from "./Icon";
import { delay } from "@/lib/utils";

const steps: { icon: IconName; color: string; title: string; text: string }[] = [
  { icon: "inbox", color: "c-mint", title: "Capture", text: "Form submissions land in one place." },
  { icon: "user", color: "c-orange", title: "Qualify", text: "Turn submissions into leads." },
  { icon: "chart", color: "c-violet", title: "Close", text: "Track opportunities and payments." },
  { icon: "trend", color: "c-mint", title: "Grow", text: "Delight customers and scale faster." },
];

export function How() {
  return (
    <section className="how" id="how">
      <div className="wrap how__in">
        <div className="how__intro reveal">
          <span className="eyebrow eyebrow--light">How it works</span>
          <h2>From first lead to long-term growth.</h2>
          <p>A simple, connected workflow to take you from interest to revenue.</p>
          <a href="#demo" className="btn btn--white">See it in action <Icon name="arrow" /></a>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li className="reveal" style={delay(0.05 + i * 0.1)} key={s.title}>
              <span className={`ico ico--lg ${s.color}`}><Icon name={s.icon} /></span>
              <h3><em>{i + 1}.</em> {s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
