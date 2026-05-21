export const supportedLocales = ["en", "es", "pt"] as const;

export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

export const messages = {
  en: {
    header: {
      features: "Features",
      howItWorks: "How it works",
      demo: "Demo",
      faq: "FAQ",
      language: "Language",
      playSoon: "Soon",
      googlePlay: "Google Play",
    },
    hero: {
      badge: "New version available",
      titleLine1: "Convert videos from",
      titleHighlight: "your social networks",
      titleLine2: "into stickers",
      description:
        "Import from TikTok, Instagram or your gallery. Edit, generate and export animated stickers to WhatsApp in seconds.",
      googlePlaySoon: "Soon on",
      googlePlay: "Google Play",
      comingSoon: "Soon",
    },
    features: {
      badge: "Features",
      titleLine1: "Everything you need for",
      titleHighlight: "perfect stickers",
      items: [
        {
          title: "Import from any source",
          description:
            "TikTok, Instagram, Reels or your gallery. Any video works.",
        },
        {
          title: "Trim with precision",
          description:
            "Select the exact moment you want to turn into a sticker.",
        },
        {
          title: "Adjust the format",
          description: "Perfect aspect ratio so your sticker looks incredible.",
        },
        {
          title: "Automatic optimization",
          description: "Optimized WebP for WhatsApp without losing quality.",
        },
        {
          title: "Filters and effects",
          description: "Add your personal touch with exclusive filters.",
        },
        {
          title: "Organize into packs",
          description: "Create sticker collections for every occasion.",
        },
        {
          title: "Instant export",
          description: "One tap and your sticker is ready for WhatsApp.",
        },
        {
          title: "Share with friends",
          description: "Send your packs to anyone with ease.",
        },
      ],
    },
    howItWorks: {
      badge: "How it works",
      titleLine1: "From video to sticker in",
      titleHighlight: "4 simple steps",
      steps: [
        {
          title: "Import",
          description: "Select a video from TikTok, Instagram or your gallery.",
        },
        {
          title: "Edit",
          description: "Trim, adjust the aspect ratio and apply effects.",
        },
        {
          title: "Generate",
          description: "Convert to optimized WebP with a single tap.",
        },
        {
          title: "Export",
          description: "Send directly to WhatsApp and surprise everyone.",
        },
      ],
      phoneHeader: "Stikerz",
      phoneCta: "Export to WhatsApp",
    },
    gallery: {
      badge: "Gallery",
      titleLine1: "Discover the",
      titleHighlight: "Stikerz experience",
      description:
        "An intuitive interface designed to create incredible stickers",
      screenshots: [
        "Video selection",
        "Trim editor",
        "Sticker library",
        "Quick export",
        "Organized packs",
      ],
    },
    demo: {
      badge: "Demo",
      titleLine1: "See how it works",
      titleHighlight: "in action",
      caption: "Create your first sticker in under 30 seconds",
    },
    faq: {
      badge: "FAQ",
      titleLine1: "Frequently asked",
      titleHighlight: "questions",
      items: [
        {
          question: "Are the stickers animated?",
          answer:
            "Yes. We create animated WebP stickers that keep the motion from the original video. You can also create static stickers if you prefer.",
        },
        {
          question: "How long does conversion take?",
          answer:
            "Conversion is very fast. In less than 10 seconds your sticker will be ready to export to WhatsApp.",
        },
        {
          question: "Is there a limit to how many stickers I can create?",
          answer:
            "There is no limit. Create as many stickers as you want and organize them into custom packs.",
        },
        {
          question: "Is the app free?",
          answer:
            "Stikerz is free to download and use. We offer optional premium features for users who want more advanced editing tools.",
        },
        {
          question: "Does it work with WhatsApp Business?",
          answer:
            "Absolutely. Your stickers work perfectly in both WhatsApp Messenger and WhatsApp Business.",
        },
      ],
    },
    cta: {
      badge: "Coming soon",
      titleLine1: "Be the first to",
      titleHighlight: "create incredible stickers",
      description:
        "Sign up to receive a notification when Stikerz is available on Google Play",
      placeholder: "your@email.com",
      button: "Notify me",
    },
    footer: {
      links: {
        features: "Features",
        howItWorks: "How it works",
        demo: "Demo",
        faq: "FAQ",
        privacy: "Privacy",
        terms: "Terms",
      },
      copyright: "All rights reserved.",
    },
  },
  es: {
    header: {
      features: "Características",
      howItWorks: "Cómo funciona",
      demo: "Demo",
      faq: "FAQ",
      language: "Idioma",
      playSoon: "Pronto",
      googlePlay: "Google Play",
    },
    hero: {
      badge: "Nueva versión disponible",
      titleLine1: "Convierte los videos de",
      titleHighlight: "tus redes sociales",
      titleLine2: "en stickers",
      description:
        "Importa desde TikTok, Instagram o tu galería. Edita, genera y exporta stickers animados a WhatsApp en segundos.",
      googlePlaySoon: "Pronto en",
      googlePlay: "Google Play",
      comingSoon: "Pronto",
    },
    features: {
      badge: "Características",
      titleLine1: "Todo lo que necesitas para",
      titleHighlight: "stickers perfectos",
      items: [
        {
          title: "Importa de cualquier fuente",
          description:
            "TikTok, Instagram, Reels o tu galería. Cualquier video es válido.",
        },
        {
          title: "Recorta con precisión",
          description:
            "Selecciona el momento exacto que quieres convertir en sticker.",
        },
        {
          title: "Ajusta el formato",
          description:
            "Aspect ratio perfecto para que tu sticker se vea increíble.",
        },
        {
          title: "Optimización automática",
          description: "WebP optimizado para WhatsApp sin perder calidad.",
        },
        {
          title: "Filtros y efectos",
          description: "Añade tu toque personal con filtros exclusivos.",
        },
        {
          title: "Organiza en packs",
          description: "Crea colecciones de stickers para cada ocasión.",
        },
        {
          title: "Exportación instantánea",
          description: "Un tap y tu sticker está listo en WhatsApp.",
        },
        {
          title: "Comparte con amigos",
          description: "Envía tus packs a quien quieras fácilmente.",
        },
      ],
    },
    howItWorks: {
      badge: "Cómo funciona",
      titleLine1: "De video a sticker en",
      titleHighlight: "4 simples pasos",
      steps: [
        {
          title: "Importa",
          description: "Selecciona un video de TikTok, Instagram o tu galería.",
        },
        {
          title: "Edita",
          description: "Recorta, ajusta el aspect ratio y aplica efectos.",
        },
        {
          title: "Genera",
          description: "Convierte a WebP optimizado con un solo tap.",
        },
        {
          title: "Exporta",
          description: "Envía directamente a WhatsApp y sorprende a todos.",
        },
      ],
      phoneHeader: "Stikerz",
      phoneCta: "Exportar a WhatsApp",
    },
    gallery: {
      badge: "Galería",
      titleLine1: "Descubre la experiencia",
      titleHighlight: "Stikerz",
      description:
        "Una interfaz intuitiva diseñada para crear stickers increíbles",
      screenshots: [
        "Selección de video",
        "Editor de recorte",
        "Biblioteca de stickers",
        "Exportación rápida",
        "Packs organizados",
      ],
    },
    demo: {
      badge: "Demo",
      titleLine1: "Mira cómo funciona",
      titleHighlight: "en acción",
      caption: "Crea tu primer sticker en menos de 30 segundos",
    },
    faq: {
      badge: "FAQ",
      titleLine1: "Preguntas",
      titleHighlight: "frecuentes",
      items: [
        {
          question: "¿Los stickers son animados?",
          answer:
            "Sí. Creamos stickers WebP animados que mantienen el movimiento del video original. También puedes crear stickers estáticos si lo prefieres.",
        },
        {
          question: "¿Cuánto dura el proceso de conversión?",
          answer:
            "La conversión es muy rápida. En menos de 10 segundos tendrás tu sticker listo para exportar a WhatsApp.",
        },
        {
          question: "¿Hay límite de stickers que puedo crear?",
          answer:
            "No hay límite. Crea todos los stickers que quieras y organízalos en packs personalizados.",
        },
        {
          question: "¿La app es gratuita?",
          answer:
            "Stikerz es gratis para descargar y usar. Ofrecemos características premium opcionales para usuarios que quieran más herramientas de edición avanzada.",
        },
        {
          question: "¿Funciona con WhatsApp Business?",
          answer:
            "Absolutamente. Tus stickers funcionan perfectamente tanto en WhatsApp Messenger como en WhatsApp Business.",
        },
      ],
    },
    cta: {
      badge: "Pronto",
      titleLine1: "Sé el primero en",
      titleHighlight: "crear stickers increíbles",
      description:
        "Regístrate para recibir una notificación cuando Stikerz esté disponible en Google Play",
      placeholder: "tu@email.com",
      button: "Notificarme",
    },
    footer: {
      links: {
        features: "Características",
        howItWorks: "Cómo funciona",
        demo: "Demo",
        faq: "FAQ",
        privacy: "Privacidad",
        terms: "Términos",
      },
      copyright: "Todos los derechos reservados.",
    },
  },
  pt: {
    header: {
      features: "Recursos",
      howItWorks: "Como funciona",
      demo: "Demo",
      faq: "FAQ",
      language: "Idioma",
      playSoon: "Em breve",
      googlePlay: "Google Play",
    },
    hero: {
      badge: "Nova versão disponível",
      titleLine1: "Transforme vídeos de",
      titleHighlight: "suas redes sociais",
      titleLine2: "em stickers",
      description:
        "Importe do TikTok, Instagram ou da sua galeria. Edite, gere e exporte stickers animados para o WhatsApp em segundos.",
      googlePlaySoon: "Em breve na",
      googlePlay: "Google Play",
      comingSoon: "Em breve",
    },
    features: {
      badge: "Recursos",
      titleLine1: "Tudo o que você precisa para",
      titleHighlight: "stickers perfeitos",
      items: [
        {
          title: "Importe de qualquer fonte",
          description:
            "TikTok, Instagram, Reels ou sua galeria. Qualquer vídeo funciona.",
        },
        {
          title: "Corte com precisão",
          description:
            "Selecione o momento exato que quer transformar em sticker.",
        },
        {
          title: "Ajuste o formato",
          description: "Proporção perfeita para seu sticker ficar incrível.",
        },
        {
          title: "Otimização automática",
          description: "WebP otimizado para o WhatsApp sem perder qualidade.",
        },
        {
          title: "Filtros e efeitos",
          description: "Adicione seu toque pessoal com filtros exclusivos.",
        },
        {
          title: "Organize em packs",
          description: "Crie coleções de stickers para cada ocasião.",
        },
        {
          title: "Exportação instantânea",
          description: "Um toque e seu sticker está pronto no WhatsApp.",
        },
        {
          title: "Compartilhe com amigos",
          description: "Envie seus packs para qualquer pessoa com facilidade.",
        },
      ],
    },
    howItWorks: {
      badge: "Como funciona",
      titleLine1: "De vídeo a sticker em",
      titleHighlight: "4 passos simples",
      steps: [
        {
          title: "Importe",
          description:
            "Escolha um vídeo do TikTok, Instagram ou da sua galeria.",
        },
        {
          title: "Edite",
          description: "Corte, ajuste a proporção e aplique efeitos.",
        },
        {
          title: "Gere",
          description: "Converta para WebP otimizado com um único toque.",
        },
        {
          title: "Exporte",
          description: "Envie direto para o WhatsApp e surpreenda todo mundo.",
        },
      ],
      phoneHeader: "Stikerz",
      phoneCta: "Exportar para o WhatsApp",
    },
    gallery: {
      badge: "Galeria",
      titleLine1: "Descubra a experiência",
      titleHighlight: "Stikerz",
      description:
        "Uma interface intuitiva criada para produzir stickers incríveis",
      screenshots: [
        "Seleção de vídeo",
        "Editor de corte",
        "Biblioteca de stickers",
        "Exportação rápida",
        "Packs organizados",
      ],
    },
    demo: {
      badge: "Demo",
      titleLine1: "Veja como funciona",
      titleHighlight: "na prática",
      caption: "Crie seu primeiro sticker em menos de 30 segundos",
    },
    faq: {
      badge: "FAQ",
      titleLine1: "Perguntas",
      titleHighlight: "frequentes",
      items: [
        {
          question: "Os stickers são animados?",
          answer:
            "Sim. Criamos stickers WebP animados que mantêm o movimento do vídeo original. Você também pode criar stickers estáticos se preferir.",
        },
        {
          question: "Quanto tempo leva a conversão?",
          answer:
            "A conversão é muito rápida. Em menos de 10 segundos seu sticker estará pronto para exportar para o WhatsApp.",
        },
        {
          question: "Existe limite de stickers que posso criar?",
          answer:
            "Não existe limite. Crie quantos stickers quiser e organize tudo em packs personalizados.",
        },
        {
          question: "O app é gratuito?",
          answer:
            "O Stikerz é gratuito para baixar e usar. Oferecemos recursos premium opcionais para quem quer ferramentas de edição mais avançadas.",
        },
        {
          question: "Funciona com WhatsApp Business?",
          answer:
            "Com certeza. Seus stickers funcionam perfeitamente no WhatsApp Messenger e no WhatsApp Business.",
        },
      ],
    },
    cta: {
      badge: "Em breve",
      titleLine1: "Seja o primeiro a",
      titleHighlight: "criar stickers incríveis",
      description:
        "Cadastre-se para receber uma notificação quando o Stikerz estiver disponível no Google Play",
      placeholder: "seu@email.com",
      button: "Me avise",
    },
    footer: {
      links: {
        features: "Recursos",
        howItWorks: "Como funciona",
        demo: "Demo",
        faq: "FAQ",
        privacy: "Privacidade",
        terms: "Termos",
      },
      copyright: "Todos os direitos reservados.",
    },
  },
} as const;

export type Messages = (typeof messages)[Locale];

export function isLocale(value: string | undefined | null): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function normalizeLocale(
  value: string | undefined | null,
): Locale | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();

  if (normalized.startsWith("pt")) {
    return "pt";
  }

  if (normalized.startsWith("es")) {
    return "es";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  return isLocale(normalized) ? normalized : null;
}

export function getLocaleFromAcceptLanguage(value: string | null): Locale {
  const normalized = value?.toLowerCase() ?? "";

  if (normalized.includes("pt")) {
    return "pt";
  }

  if (normalized.includes("es")) {
    return "es";
  }

  return "en";
}

export function getInitialLocale(options: {
  cookieLocale?: string | null;
  hasManualLocale?: boolean;
  acceptLanguage?: string | null;
}): Locale {
  if (options.hasManualLocale) {
    return (
      normalizeLocale(options.cookieLocale) ??
      getLocaleFromAcceptLanguage(options.acceptLanguage ?? null)
    );
  }

  return getLocaleFromAcceptLanguage(options.acceptLanguage ?? null);
}
