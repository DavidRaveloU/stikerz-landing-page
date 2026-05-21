"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/components/i18n-provider";
import { withBasePath } from "@/lib/base-path";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useI18n();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Floating stickers animation
  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #444444 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating sticker elements with emojis inside */}
      <motion.div
        style={{ y: floatY1, rotate: rotate1 }}
        className="absolute top-20 left-[10%] w-20 h-20 md:w-32 md:h-32 rounded-2xl bg-primary/20 border border-primary/30 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.img
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          src={withBasePath("/emojis/laugh.svg")}
          alt="laugh"
          className="w-3/4 h-3/4 object-contain"
        />
      </motion.div>
      <motion.div
        style={{ y: floatY2, rotate: rotate2 }}
        className="absolute top-40 right-[15%] w-16 h-16 md:w-24 md:h-24 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.img
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          src={withBasePath("/emojis/fire.svg")}
          alt="fire"
          className="w-3/4 h-3/4 object-contain"
        />
      </motion.div>
      <motion.div
        style={{ y: floatY3 }}
        className="absolute bottom-40 left-[20%] w-12 h-12 md:w-20 md:h-20 rounded-lg bg-primary/15 border border-primary/25 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.img
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 1, repeat: Infinity }}
          src={withBasePath("/emojis/sparkles.svg")}
          alt="sparkles"
          className="w-3/4 h-3/4 object-contain"
        />
      </motion.div>
      <motion.div
        style={{ y: floatY1, rotate: rotate2 }}
        className="absolute bottom-60 right-[10%] w-14 h-14 md:w-28 md:h-28 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.img
          animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          src={withBasePath("/emojis/confetti.svg")}
          alt="confetti"
          className="w-3/4 h-3/4 object-contain"
        />
      </motion.div>
      {/* Additional floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-[60%] left-[5%] w-10 h-10 md:w-16 md:h-16 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-sm flex items-center justify-center"
      >
        <img
          src={withBasePath("/emojis/collision.svg")}
          alt="chat"
          className="w-3/4 h-3/4 object-contain"
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[30%] right-[5%] w-12 h-12 md:w-20 md:h-20 rounded-xl bg-primary/15 border border-primary/25 backdrop-blur-sm flex items-center justify-center"
      >
        <img
          src={withBasePath("/emojis/phone.svg")}
          alt="phone"
          className="w-3/4 h-3/4 object-contain"
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-primary/10 blur-[120px]"
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {content.hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance"
        >
          {content.hero.titleLine1}
          <br />
          <span className="text-primary">{content.hero.titleHighlight}</span>
          <br />
          {content.hero.titleLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
        >
          {content.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Disabled Google Play button */}
          <motion.button
            disabled
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-card border border-border text-muted-foreground rounded-xl font-semibold text-lg cursor-not-allowed opacity-70"
          >
            {/* Google Play icon */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-80">
                {content.hero.googlePlaySoon}
              </div>
              <div>{content.hero.googlePlay}</div>
            </div>
            {/* Coming soon badge */}
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
              {content.hero.comingSoon}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
