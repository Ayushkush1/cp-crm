import { Brand } from "./Brand";
import { wrap } from "./ui";
import { cn } from "@/lib/cn";

const cols = [
  { title: "Products", links: [["CRM", "#products"], ["Task Doc", "#products"], ["Coming Soon", "#products"]] },
  { title: "Resources", links: [["Documentation", "#faq"], ["Blog", "#faq"], ["Help Center", "#faq"]] },
  { title: "Company", links: [["About", "#"], ["Careers", "#"], ["Contact", "#"]] },
];

export function Footer() {
  return (
    <footer className="bg-forest pb-7 pt-16 text-white mx-1 mb-1 rounded-t-[60px] rounded-b-[20px]">
      <div className={cn(wrap, "grid grid-cols-[1.6fr_repeat(3,1fr)] gap-8 max-md:grid-cols-2")}>
        <div className="max-md:col-span-full">
          <Brand light />
          <p className="mt-3.5 max-w-[260px] text-[14.5px] text-white/60">A connected ecosystem for modern startups.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="flex flex-col gap-2.5">
            <h4 className="mb-1.5 text-[13px] font-bold uppercase tracking-[.06em] text-white/50">{c.title}</h4>
            {c.links.map(([label, href]) => (
              <a key={label} href={href} className="text-[14.5px] text-white/80 transition-colors duration-200 hover:text-brand-2">
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className={cn(wrap, "mt-12 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[13.5px] text-white/55 max-sm:flex-col")}>
        <span>© {new Date().getFullYear()} CP Atlas. All rights reserved.</span>
        <span className="flex gap-5">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a key={l} href="#" className="hover:text-white">{l}</a>
          ))}
        </span>
      </div>
    </footer>
  );
}
