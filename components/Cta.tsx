import { Icon } from "./Icon";
import { DemoForm } from "./DemoForm";
import { delay } from "@/lib/utils";

const ticks = ["No credit card required", "Full access for 24 hours", "Setup in minutes"];

export function Cta() {
  return (
    <section className="cta" id="demo">
      <div className="wrap cta__in">
        <div className="cta__copy reveal">
          <span className="eyebrow eyebrow--dark">Ready to get started?</span>
          <h2>See CP Atlas in action.</h2>
          <p>Get a 24-hour live demo workspace and explore every feature. No credit card required.</p>
          <DemoForm />
          <ul className="ticks">
            {ticks.map((t) => (
              <li key={t}><Icon name="check" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="cta__art reveal" style={delay(0.1)} aria-hidden="true">
          <div className="laptop">
            <div className="laptop__screen">
              <b>Build.<br />Organize.<br />Grow.</b>
            </div>
            <div className="laptop__base" />
          </div>
          <div className="note note--cta">Same tools.<br />Bigger possibilities.</div>
        </div>
      </div>
    </section>
  );
}
