"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { withBasePath } from "@/lib/base-path";

export function Header() {
  const { locale, setLocale, content, localeLabels } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const navLinks = [
    { label: content.header.features, href: "#features" },
    { label: content.header.howItWorks, href: "#how-it-works" },
    { label: content.header.demo, href: "#demo" },
    { label: content.header.faq, href: "#faq" },
  ];

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLocaleChange = (nextLocale: typeof locale) => {
    setLocale(nextLocale);
    setIsLanguageMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background blur effect */}
        <motion.div
          style={{
            opacity: headerOpacity,
            backdropFilter: `blur(${headerBlur}px)`,
          }}
          className="absolute inset-0 bg-background/80 border-b border-border/50"
        />

        <nav className="relative max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="overflow-hidden flex items-center justify-center">
              <Image
                src={withBasePath("/logo.svg")}
                alt="Stikerz logo"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA - Disabled */}
          {/* <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-card border border-border text-muted-foreground rounded-xl font-medium text-sm cursor-not-allowed opacity-70"
          >
            <span className="text-xs px-1.5 py-0.5 bg-primary/20 text-primary rounded">
              {content.header.playSoon}
            </span>
            {content.header.googlePlay}
          </motion.span>
 */}
          {/* Language selector */}
          <div ref={languageMenuRef} className="relative hidden md:block">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLanguageMenuOpen((current) => !current)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground"
              aria-haspopup="menu"
              aria-expanded={isLanguageMenuOpen}
            >
              <span>{localeLabels[locale]}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.button>

            <AnimatePresence>
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-[calc(100%+0.5rem)] w-44 rounded-2xl border border-border bg-background/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl"
                  role="menu"
                >
                  {(
                    Object.keys(localeLabels) as Array<
                      keyof typeof localeLabels
                    >
                  ).map((supportedLocale) => (
                    <motion.button
                      key={supportedLocale}
                      type="button"
                      whileHover={{ x: 2 }}
                      onClick={() => handleLocaleChange(supportedLocale)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                        locale === supportedLocale
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-card"
                      }`}
                      role="menuitem"
                    >
                      <span>{localeLabels[supportedLocale]}</span>
                      {locale === supportedLocale ? (
                        <span className="text-xs font-semibold text-primary">
                          ✓
                        </span>
                      ) : null}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-card border border-border"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 md:hidden"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <motion.nav
          initial={false}
          animate={{
            y: isMobileMenuOpen ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
          className="relative pt-24 px-6"
        >
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={false}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-2xl font-semibold text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2">
            {(
              Object.keys(localeLabels) as Array<keyof typeof localeLabels>
            ).map((supportedLocale) => (
              <motion.button
                key={supportedLocale}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLocaleChange(supportedLocale)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                  locale === supportedLocale
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground"
                }`}
              >
                {localeLabels[supportedLocale]}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-8 w-full py-4 bg-card border border-border text-muted-foreground rounded-xl font-semibold text-lg cursor-not-allowed opacity-70"
          >
            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
              {content.header.playSoon}
            </span>
            {content.header.googlePlay}
          </motion.div>
        </motion.nav>
      </motion.div>
    </>
  );
}
