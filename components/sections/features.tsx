"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Video,
  Scissors,
  Crop,
  Sparkles,
  Share2,
  Zap,
  Palette,
  Layers,
} from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useI18n();
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });
  const featureIcons = [
    Video,
    Scissors,
    Crop,
    Sparkles,
    Palette,
    Layers,
    Zap,
    Share2,
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for floating elements
  const floatY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const floatX1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Animated background shapes */}
      <motion.div
        style={{ y: floatY1, x: floatX1, rotate: floatRotate }}
        className="absolute -top-20 -left-20 w-80 h-80 border border-primary/10 rounded-full"
      />
      <motion.div
        style={{ y: floatY2, rotate: floatRotate }}
        className="absolute -bottom-40 -right-20 w-96 h-96 border border-primary/5 rounded-full"
      />

      {/* Grid lines that move */}
      <motion.div
        style={{ y: floatY1 }}
        className="absolute inset-0 opacity-[0.03]"
      >
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-primary" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary" />
      </motion.div>

      {/* Glow orbs */}
      <motion.div
        style={{ y: floatY2 }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px]"
      />
      <motion.div
        style={{ y: floatY1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        {/* Section header with reveal */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4"
          >
            {content.features.badge}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            {content.features.titleLine1}
            <br />
            <span className="text-primary">
              {content.features.titleHighlight}
            </span>
          </h2>
        </motion.div>

        {/* Features grid with staggered reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.features.items.map((feature, index) => {
            const FeatureIcon = featureIcons[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 60, scale: 0.9 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="group relative"
              >
                <div className="relative h-full p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-[0_0_40px_rgba(200,240,74,0.08)]">
                  {/* Icon */}
                  <div className="relative mb-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    >
                      <FeatureIcon className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>

                  <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl">
                    <motion.div
                      initial={{ x: 20, y: -20 }}
                      whileHover={{ x: 0, y: 0 }}
                      className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-primary/20 to-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
