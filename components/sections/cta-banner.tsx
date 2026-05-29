"use client";

import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

const EMAILJS_SERVICE_ID = "service_0em8v09";
const EMAILJS_TEMPLATE_ID = "template_loh81ri";
const EMAILJS_PUBLIC_KEY = "qE34GQkRg544usQjg";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
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

  // Init EmailJS on client
  useEffect(() => {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("EmailJS init warning:", err);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);
    setInputError(null);

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setInputError("Por favor, ingresa un correo válido.");
      inputRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);

      // EmailJS expects the public key as the fourth parameter (string),
      // or to be initialized via emailjs.init(). We already initialized above.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          email: trimmedEmail,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatusMessage("¡Listo! Recibimos tu solicitud de acceso anticipado.");
      setEmail("");
    } catch (error) {
      console.error("EmailJS send error:", error);
      setErrorMessage("No pudimos enviar tu solicitud. Intenta de nuevo en un momento.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
              >
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={content.cta.placeholder}
                  aria-label={content.cta.placeholder}
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_rgba(200,240,74,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Enviando..." : content.cta.button}
                </motion.button>
              </form>

              {inputError && (
                <div className="mx-auto mt-3 max-w-md text-sm text-destructive">
                  {inputError}
                </div>
              )}

              {(errorMessage || statusMessage) && (
                <div
                  className={`mx-auto mt-4 max-w-md rounded-xl border px-4 py-3 text-sm ${
                    errorMessage
                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                      : "border-primary/30 bg-primary/10 text-primary"
                  }`}
                >
                  {errorMessage || statusMessage}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
