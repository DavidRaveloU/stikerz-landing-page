"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Gallery } from "@/components/sections/gallery";
import { VideoDemo } from "@/components/sections/video-demo";
import { CTABanner } from "@/components/sections/cta-banner";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function StikerZLanding() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Smooth scroll progress indicator */}
      <ScrollProgress />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="snap-section">
        <Hero />
      </section>

      {/* Features Section */}
      <section id="features" className="snap-section">
        <Features />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="snap-section">
        <HowItWorks />
      </section>

      {/* Gallery Section */}
      <section className="snap-section">
        <Gallery />
      </section>

      {/* Video Demo Section */}
      <section id="demo" className="snap-section">
        <VideoDemo />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="snap-section">
        <FAQ />
      </section>

      {/* CTA Banner */}
      <section>
        <CTABanner />
      </section>

      {/* Footer */}
      <section>
        <Footer />
      </section>
    </main>
  );
}

// Scroll Progress Indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-100">
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  );
}
