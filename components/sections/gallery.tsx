"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Image, Scissors, Layers, Send, Palette } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useI18n();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const screenshotIcons = [Image, Scissors, Layers, Send, Palette];
  const screenshotColors = [
    "from-blue-500/20 to-blue-600/20",
    "from-purple-500/20 to-purple-600/20",
    "from-green-500/20 to-green-600/20",
    "from-orange-500/20 to-orange-600/20",
    "from-pink-500/20 to-pink-600/20",
  ];

  // Horizontal scroll effect based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const xReverse = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          style={{ x }}
          className="absolute top-20 left-0 w-150 h-150 rounded-full bg-primary/5 blur-[150px]"
        />
        <motion.div
          style={{ x: xReverse }}
          className="absolute bottom-20 right-0 w-125 h-125 rounded-full bg-primary/5 blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            {content.gallery.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            {content.gallery.titleLine1}
            <br />
            <span className="text-primary">
              {content.gallery.titleHighlight}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {content.gallery.description}
          </p>
        </motion.div>

        {/* Horizontal scrolling gallery */}
        <div className="relative">
          <motion.div style={{ x }} className="flex gap-6 justify-center">
            {content.gallery.screenshots.map((screenshot, index) => {
              const ScreenshotIcon = screenshotIcons[index];

              return (
                <motion.div
                  key={screenshot}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                  className="relative shrink-0 group"
                >
                  <div className="relative w-50 md:w-60 h-105 md:h-125 bg-card rounded-[2.5rem] border-2 border-border/50 shadow-xl overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_60px_rgba(200,240,74,0.15)]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-background rounded-b-xl z-10" />

                    <div className="absolute inset-2 rounded-[2rem] bg-background overflow-hidden">
                      <div className="h-full flex flex-col">
                        <div className="p-3 border-b border-border flex items-center justify-center">
                          <div className="text-xs font-bold text-primary">
                            Stikerz
                          </div>
                        </div>

                        <div className="flex-1 p-3">
                          <div
                            className={`h-full rounded-xl bg-linear-to-br ${screenshotColors[index]} flex items-center justify-center relative overflow-hidden`}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: index * 0.5,
                              }}
                              className="w-16 h-16 rounded-xl bg-primary/30 flex items-center justify-center backdrop-blur-sm"
                            >
                              <ScreenshotIcon className="w-7 h-7 text-primary" />
                            </motion.div>

                            <motion.div
                              animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: index * 0.2,
                              }}
                              className="absolute top-4 right-4 w-6 h-6 rounded-md bg-primary/20 border border-primary/30"
                            />
                            <motion.div
                              animate={{ y: [5, -5, 5], x: [3, -3, 3] }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                              className="absolute bottom-8 left-4 w-5 h-5 rounded-md bg-primary/15 border border-primary/25"
                            />

                            <div className="absolute bottom-3 left-3 right-3 space-y-2">
                              <div className="h-1.5 rounded-full bg-foreground/10 w-full" />
                              <div className="h-1.5 rounded-full bg-foreground/10 w-2/3" />
                            </div>
                          </div>
                        </div>

                        <div className="p-3 border-t border-border">
                          <div className="flex justify-around">
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className={`w-6 h-6 rounded-lg ${i === 2 ? "bg-primary/30" : "bg-card"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-4"
                  >
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      {screenshot}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
