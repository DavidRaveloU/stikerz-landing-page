"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <motion.button
        onClick={onToggle}
        className="w-full text-left p-6 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(200,240,74,0.05)]"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-semibold group-hover:text-primary transition-colors">
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
          >
            {isOpen ? (
              <Minus className="w-4 h-4 text-primary" />
            ) : (
              <Plus className="w-4 h-4 text-primary" />
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { content } = useI18n();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const backgroundXReverse = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ x: backgroundX }}
        className="absolute top-0 left-0 w-125 h-125 rounded-full bg-primary/5 blur-[150px]"
      />
      <motion.div
        style={{ x: backgroundXReverse }}
        className="absolute bottom-0 right-0 w-150 h-150 rounded-full bg-primary/5 blur-[150px]"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            {content.faq.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            {content.faq.titleLine1}
            <br />
            <span className="text-primary">{content.faq.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {content.faq.items.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
