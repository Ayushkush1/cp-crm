# CP Atlas landing page

Next.js (App Router) + TypeScript. Plain CSS in `app/globals.css`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

- Sections live in `components/`. Interactive ones are client components (Nav, HeroDashboard, Testimonials, Pricing, Faq, DemoForm).
- **Placeholder content to replace:** plan prices in `components/Pricing.tsx`, testimonials in `components/Testimonials.tsx`, "500+ teams" in `components/Hero.tsx`.
- **Demo form:** `components/DemoForm.tsx` has a TODO where the real API call goes.
- `legacy-static/` is the original plain HTML/CSS/JS version, kept for reference.
