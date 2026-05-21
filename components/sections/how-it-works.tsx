"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Edit3, Wand2, Send } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useI18n();
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });
  const stepIcons = [Download, Edit3, Wand2, Send];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Timeline progress
  const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  // Phone animations
  const phoneY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1.1, 0.9],
  );

  // Floating elements
  const float1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const float2 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Diagonal lines background */}
      <div className="absolute inset-0 opacity-[0.02]">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{ y: i % 2 === 0 ? float1 : float2 }}
            className="absolute h-px bg-primary origin-left"
            initial={{
              width: "200%",
              rotate: -15,
              left: "-50%",
              top: `${i * 12}%`,
            }}
          />
        ))}
      </div>

      {/* Floating decorative circles */}
      <motion.div
        style={{ y: float1 }}
        className="absolute top-20 right-20 w-32 h-32 rounded-full border border-primary/10"
      />
      <motion.div
        style={{ y: float2 }}
        className="absolute bottom-32 left-10 w-20 h-20 rounded-full bg-primary/5 blur-xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            {content.howItWorks.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            {content.howItWorks.titleLine1}
            <br />
            <span className="text-primary">
              {content.howItWorks.titleHighlight}
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps with animated timeline */}
          <div className="relative">
            {/* Animated progress line */}
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-border/30 hidden md:block">
              <motion.div
                style={{ scaleY: lineProgress }}
                className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-primary via-primary to-primary/30 origin-top"
              />
            </div>

            <div className="space-y-6">
              {content.howItWorks.steps.map((step, index) => {
                const StepIcon = stepIcons[index];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -80 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }
                    }
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative flex gap-5 group"
                  >
                    {/* Step circle with pulse */}
                    <div className="relative z-10 shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="w-10 h-10 rounded-full bg-primary border-2 border-primary flex items-center justify-center"
                      >
                        <StepIcon className="w-5 h-5 text-primary-foreground" />
                      </motion.div>
                      {/* Pulse ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.4, 0, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.4,
                        }}
                        className="absolute inset-0 rounded-full border border-primary"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-primary/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Phone mockup with intense parallax */}
          <motion.div
            style={{ y: phoneY, rotateZ: phoneRotate, scale: phoneScale }}
            className="relative hidden lg:flex justify-center perspective-1000"
          >
            <motion.div
              initial={{ opacity: 0, rotateY: -30 }}
              animate={
                isInView
                  ? { opacity: 1, rotateY: 0 }
                  : { opacity: 0, rotateY: -30 }
              }
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Phone frame */}
              <div className="relative w-65 h-135 bg-linear-to-b from-card to-background rounded-[3rem] border-4 border-border/50 shadow-2xl shadow-primary/5 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-background rounded-full z-10" />

                {/* Screen */}
                <div className="absolute inset-4 rounded-[2.5rem] bg-background overflow-hidden">
                  {/* App header */}
                  <div className="p-4 border-b border-border flex justify-center">
                    <span className="text-primary font-bold text-sm">
                      {content.howItWorks.phoneHeader}
                    </span>
                  </div>

                  {/* Video area */}
                  <div className="p-4">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(200,240,74,0)",
                          "0 0 20px 5px rgba(200,240,74,0.3)",
                          "0 0 0 0 rgba(200,240,74,0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="aspect-square rounded-xl bg-card border border-border flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center"
                      >
                        <Wand2 className="w-7 h-7 text-primary" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Progress bar animation */}
                  <div className="px-4">
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-full w-1/3 bg-primary rounded-full"
                      />
                    </div>
                  </div>

                  {/* Export button */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-full py-3 rounded-xl bg-primary text-center text-sm font-semibold text-primary-foreground"
                    >
                      {content.howItWorks.phoneCta}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating stickers around phone */}
              <motion.div
                animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-12 top-16 w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl backdrop-blur-sm"
              >
                😂
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10], rotate: [3, -3, 3] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-10 bottom-24 w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-xl backdrop-blur-sm"
              >
                🔥
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
