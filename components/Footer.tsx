import { Icon } from "./Icon";

const cols = [
  { title: "Products", links: [["CRM", "#products"], ["Task Talk", "#products"], ["Coming Soon", "#products"]] },
  { title: "Resources", links: [["Documentation", "#faq"], ["Blog", "#faq"], ["Help Center", "#faq"]] },
  { title: "Company", links: [["About", "#"], ["Careers", "#"], ["Contact", "#"]] },
];

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <div className="foot__brand">
          <a href="#top" className="brand brand--light">
            <Icon name="logo" className="brand__mark" />
            <span>CP Atlas</span>
          </a>
          <p>A connected ecosystem for modern startups.</p>
        </div>
        {cols.map((c) => (
          <div className="foot__col" key={c.title}>
            <h4>{c.title}</h4>
            {c.links.map(([label, href]) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="wrap foot__bot">
        <span>© {new Date().getFullYear()} CP Atlas. All rights reserved.</span>
        <span className="foot__legal"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></span>
      </div>
    </footer>
  );
}
