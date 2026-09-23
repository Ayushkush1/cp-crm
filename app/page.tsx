import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { BuiltBy } from "@/components/BuiltBy";
import { Products } from "@/components/Products";
import { How } from "@/components/How";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <a className="fixed left-4 top-[-60px] z-[100] rounded-lg bg-forest px-4 py-2.5 text-white transition-[top] duration-200 focus:top-3" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <BuiltBy />
        <Products />
        <How />
        <Features />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
