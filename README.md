# CP Atlas landing page

Next.js (App Router) + TypeScript + Tailwind CSS v4. Design tokens (colours, fonts, shadows, breakpoints) live in the `@theme` block of `app/globals.css`; everything else is utility classes in the components. Shared pieces (buttons, chips, tags, section header) are in `components/ui.tsx`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

- Sections live in `components/`. Interactive ones are client components (Nav, HeroDashboard, Testimonials, Pricing, Faq, DemoForm).
- **Placeholder content to replace:** plan prices in `components/Pricing.tsx`, testimonials in `components/Testimonials.tsx`, "500+ teams" in `components/Hero.tsx`.
- **Demo form:** `components/DemoForm.tsx` has a TODO where the real API call goes.
- Breakpoints are desktop-first: `max-lg:` (1100px), `max-nav:` (1000px, mobile menu), `max-md:` (860px), `max-sm:` (700px), `max-xs:` (420px).
- `legacy-static/` holds the original plain HTML/CSS/JS version and the pre-Tailwind stylesheet, kept for reference.
