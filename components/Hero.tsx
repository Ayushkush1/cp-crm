import { Icon } from "./Icon";
import { HeroDashboard } from "./HeroDashboard";
import { cssVar, delay } from "@/lib/utils";

const ticks = ["No credit card required", "Full access for 24 hours", "Setup in minutes"];
const avatars = [
  { l: "R", h: 158 },
  { l: "S", h: 24 },
  { l: "A", h: 262 },
  { l: "P", h: 340 },
  { l: "M", h: 200 },
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true"><i /><i /></div>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 className="reveal" style={delay(0.06)}>
            Everything your startup needs to <em>scale, together.</em>
          </h1>
          <p className="lead reveal" style={delay(0.12)}>
            Manage leads, tasks, documents, payments and your team, all in one connected ecosystem.
          </p>
          <div className="hero__btns reveal" style={delay(0.18)}>
            <a href="#demo" className="btn btn--dark btn--lg">Get a 24-hour demo <Icon name="arrow" /></a>
            <a href="#how" className="btn btn--light btn--lg">
              <span className="playdot"><Icon name="play" /></span> See how it works
            </a>
          </div>
          <div className="proof reveal" style={delay(0.3)}>
            <div className="avatars" aria-hidden="true">
              {avatars.map((a) => (
                <b key={a.l} style={cssVar("--h", a.h)}>{a.l}</b>
              ))}
            </div>
            <span>Loved by <strong>500+</strong> startup teams</span>
          </div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}
