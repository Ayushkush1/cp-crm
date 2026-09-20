import { Icon, type IconName } from "./Icon";
import { delay } from "@/lib/utils";

const crmRows = [
  { tone: "g", label: "Qualified" },
  { tone: "o", label: "Follow up" },
  { tone: "g", label: "Converted" },
  { tone: "b", label: "New" },
];
const taskRows = [
  { tone: "o", label: "Today", done: false },
  { tone: "g", label: "Done", done: true },
  { tone: "b", label: "Tomorrow", done: false },
  { tone: "v", label: "Review", done: false },
];
const soon: { icon: IconName; color: string }[] = [
  { icon: "inbox", color: "c-green" },
  { icon: "doc", color: "c-red" },
  { icon: "card", color: "c-teal" },
  { icon: "plug", color: "c-blue" },
  { icon: "sliders", color: "c-violet" },
  { icon: "trend", color: "c-orange" },
];

export function Products() {
  return (
    <section className="sec" id="products">
      <div className="wrap products">
        <div className="products__intro reveal">
          <span className="eyebrow">Our products</span>
          <h2>A complete ecosystem for modern startups.</h2>
          <p>Different tools. One connected experience. Everything works together, so you can focus on what really matters: your customers.</p>
          <a href="#" className="link">Explore all products <Icon name="arrow" /></a>
        </div>

        <article className="pcard reveal" style={delay(0.08)}>
          <span className="ico ico--lg c-green"><Icon name="users" /></span>
          <h3>CP Atlas CRM</h3>
          <p>Manage leads, opportunities, companies, contacts and payments.</p>
          <div className="pcard__shot" aria-hidden="true">
            <div className="mini-table">
              {crmRows.map((r, i) => (
                <div className="mt-r" key={i}><b /><i /><em className={r.tone}>{r.label}</em></div>
              ))}
            </div>
          </div>
          <a href="#" className="link">Learn more <Icon name="arrow" /></a>
        </article>

        <article className="pcard reveal" style={delay(0.16)}>
          <span className="ico ico--lg c-mint"><Icon name="task" /></span>
          <h3>Task Talk</h3>
          <p>Tasks, docs and team collaboration for everyday work.</p>
          <div className="pcard__shot" aria-hidden="true">
            <div className="mini-tasks">
              {taskRows.map((r, i) => (
                <div key={i}><u className={r.done ? "done" : undefined} /><span /><em className={r.tone}>{r.label}</em></div>
              ))}
            </div>
          </div>
          <a href="#" className="link">Learn more <Icon name="arrow" /></a>
        </article>

        <article className="pcard pcard--soon reveal" style={delay(0.24)}>
          <span className="ico ico--lg c-violet"><Icon name="box" /></span>
          <h3>More products</h3>
          <p>Forms, knowledge base, invoicing, automation and more, all connected.</p>
          <div className="soon-grid" aria-hidden="true">
            {soon.map((s) => (
              <span key={s.icon} className={s.color}><Icon name={s.icon} /></span>
            ))}
          </div>
          <span className="link link--muted">Coming soon <Icon name="arrow" /></span>
        </article>
      </div>
    </section>
  );
}
