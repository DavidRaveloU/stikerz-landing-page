import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/components/i18n-provider";
import { Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stikerz - Convierte Videos en Stickers de WhatsApp",
  description:
    "Transforma tus videos favoritos de TikTok, Instagram y tu galería en stickers animados para WhatsApp. Edita, recorta y exporta en segundos.",
  keywords: [
    "stickers",
    "whatsapp",
    "videos",
    "tiktok",
    "instagram",
    "converter",
    "animated stickers",
  ],
  authors: [{ name: "Stikerz" }],
  openGraph: {
    title: "Stikerz - Convierte Videos en Stickers de WhatsApp",
    description:
      "Transforma tus videos favoritos en stickers animados para WhatsApp",
    type: "website",
  },
  icons: {
    icon: withBasePath("/logo.png"),
    shortcut: withBasePath("/logo.png"),
    apple: withBasePath("/logo.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0F",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For static export (GitHub Pages), we use a fixed locale
  // Since all content is in Spanish, we hardcode to Spanish
  const initialLocale: Locale = "es";
  const hasManualLocale = false;

  return (
    <html
      lang={initialLocale}
      className="bg-background"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased relative">
        <I18nProvider
          initialLocale={initialLocale}
          hasManualLocale={hasManualLocale}
        >
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}