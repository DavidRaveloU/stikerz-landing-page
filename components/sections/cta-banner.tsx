"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { content } = useI18n();
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.35,
  });

  // Generate particles only on client to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles: Particle[] = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-28 flex items-center overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            className="absolute w-1 h-1 bg-primary/50 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 48, scale: 0.96 }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        <div className="relative rounded-3xl overflow-hidden p-1 bg-linear-to-r from-primary/50 via-primary to-primary/50">
          <div className="relative rounded-[1.4rem] bg-background p-12 md:p-16">
            {/* Glow */}
            <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent rounded-[1.4rem]" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>{content.cta.badge}</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
                {content.cta.titleLine1}
                <br />
                <span className="text-primary">
                  {content.cta.titleHighlight}
                </span>
              </h2>

              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
                {content.cta.description}
              </p>

              {/* Email signup form */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={content.cta.placeholder}
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_rgba(200,240,74,0.4)]"
                >
                  {content.cta.button}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
