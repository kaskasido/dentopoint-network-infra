import { createContext, useContext, useState, ReactNode } from "react";
import { en } from "./translations/en";
import { de } from "./translations/de";
import { tr } from "./translations/tr";
import { cn } from "./translations/cn";
import { fr } from "./translations/fr";
import { it } from "./translations/it";
import { es } from "./translations/es";
import { ko } from "./translations/ko";
import { ar } from "./translations/ar";
import { nl } from "./translations/nl";
import { sr } from "./translations/sr";

export type Language = "EN" | "DE" | "TR" | "CN" | "FR" | "IT" | "ES" | "KO" | "AR" | "NL" | "SR";

type Translations = typeof en;

const translationMap: Record<string, Translations> = {
  EN: en,
  DE: de,
  TR: tr as unknown as Translations,
  CN: cn as unknown as Translations,
  FR: fr as unknown as Translations,
  IT: it as unknown as Translations,
  ES: es as unknown as Translations,
  KO: ko as unknown as Translations,
  AR: ar as unknown as Translations,
  NL: nl as unknown as Translations,
  SR: sr as unknown as Translations,
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "DE",
  setLang: () => {},
  t: de,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("dentopoint-lang");
    if (saved && saved in translationMap) return saved as Language;
    return detectBrowserLanguage();
  });
  const setLang = (l: Language) => {
    localStorage.setItem("dentopoint-lang", l);
    setLangState(l);
  };
  const raw = translationMap[lang] || en;
  // Deep merge with English fallback so missing keys never crash
  const t = new Proxy(raw, {
    get(target, prop: string) {
      const val = (target as any)[prop];
      const fallback = (en as any)[prop];
      if (val === undefined) return fallback;
      if (typeof val === "object" && val !== null && !Array.isArray(val) && typeof fallback === "object" && fallback !== null) {
        return { ...fallback, ...val };
      }
      return val;
    },
  }) as Translations;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
