"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { localeLabels, messages, type Locale, type Messages } from "@/lib/i18n";

type I18nContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  content: Messages;
  localeLabels: typeof localeLabels;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  initialLocale,
  hasManualLocale,
  children,
}: {
  initialLocale: Locale;
  hasManualLocale: boolean;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isManualLocale, setIsManualLocale] = useState(hasManualLocale);

  useEffect(() => {
    document.documentElement.lang = locale;

    if (isManualLocale) {
      document.cookie = `stikerz-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
      document.cookie = `stikerz-locale-manual=1; path=/; max-age=31536000; samesite=lax`;
    }
  }, [isManualLocale, locale]);

  useEffect(() => {
    if (isManualLocale) {
      return;
    }

    const browserLocale = navigator.language.toLowerCase();
    const normalizedBrowserLocale = browserLocale.startsWith("pt")
      ? "pt"
      : browserLocale.startsWith("es")
        ? "es"
        : browserLocale.startsWith("en")
          ? "en"
          : null;

    if (normalizedBrowserLocale && normalizedBrowserLocale !== locale) {
      setLocaleState(normalizedBrowserLocale);
    }
  }, [isManualLocale, locale]);

  const setLocale = (nextLocale: Locale) => {
    setIsManualLocale(true);
    setLocaleState(nextLocale);
  };

  const value: I18nContextValue = {
    locale,
    setLocale,
    content: messages[locale],
    localeLabels,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
