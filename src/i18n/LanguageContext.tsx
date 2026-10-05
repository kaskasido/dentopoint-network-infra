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

// Map browser language / region codes to supported app languages
const langMap: Record<string, Language> = {
  de: "DE", en: "EN", nl: "NL", fr: "FR", it: "IT", es: "ES",
  tr: "TR", sr: "SR", hr: "SR", bs: "SR", zh: "CN", ko: "KO", ar: "AR",
};
// Country (region) → language fallback when browser language isn't supported
const countryMap: Record<string, Language> = {
  DE: "DE", AT: "DE", CH: "DE", LI: "DE",
  NL: "NL", BE: "NL",
  FR: "FR", LU: "FR", MC: "FR",
  IT: "IT", SM: "IT", VA: "IT",
  ES: "ES", MX: "ES", AR: "ES", CO: "ES", CL: "ES", PE: "ES", VE: "ES",
  TR: "TR", CY: "TR",
  RS: "SR", ME: "SR", BA: "SR", HR: "SR",
  CN: "CN", HK: "CN", TW: "CN", SG: "CN",
  KR: "KO", KP: "KO",
  SA: "AR", AE: "AR", EG: "AR", QA: "AR", KW: "AR", BH: "AR", OM: "AR", JO: "AR", LB: "AR", MA: "AR", TN: "AR", DZ: "AR", IQ: "AR", SY: "AR", YE: "AR", LY: "AR",
};

const detectBrowserLanguage = (): Language => {
  if (typeof navigator === "undefined") return "DE";
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    if (!raw) continue;
    const [primary, region] = raw.toLowerCase().split("-");
    const byLang = langMap[primary];
    if (byLang) return byLang;
    if (region) {
      const byRegion = countryMap[region.toUpperCase()];
      if (byRegion) return byRegion;
    }
  }
  return "DE";
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
