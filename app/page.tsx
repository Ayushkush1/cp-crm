import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Strip } from "@/components/Strip";
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
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Strip />
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
