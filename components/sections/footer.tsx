"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  const { content } = useI18n();
  const footerLinks = [
    { label: content.footer.links.features, href: "#features" },
    { label: content.footer.links.howItWorks, href: "#how-it-works" },
    { label: content.footer.links.demo, href: "#demo" },
    { label: content.footer.links.faq, href: "#faq" },
  ];

  return (
    <footer className="relative py-8 md:py-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-card/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          {/* Brand */}
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg font-black text-primary-foreground">
                S
              </span>
            </div>
            <span className="text-xl font-bold">
              Stiker<span className="text-primary">z</span>
            </span>
          </motion.a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-2">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/50 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            {new Date().getFullYear()} Stikerz. {content.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {content.footer.links.privacy}
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {content.footer.links.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
