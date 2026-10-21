import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en } from "./translations/en";
import { de } from "./translations/de";
import { nl } from "./translations/nl";
// Niederländisch (NL) ist registriert, weil der Partnerhersteller bluem aus den Niederlanden kommt
// und die Niederlande als Markt geplant sind. Die Portal-Abschnitte fehlen in nl.ts und fallen auf Englisch zurück.
// Weitere Übersetzungen (TR, CN, FR, IT, ES, KO, AR, SR) liegen weiterhin unter
// ./translations, sind aber bewusst nicht registriert: Die Website richtet sich derzeit
// nur an den deutschen Markt. Reaktivierbar, sobald es Partner und Ansprechpartner in
// dem jeweiligen Land gibt. Dazu den Import ergänzen und den Code in SUPPORTED_LANGUAGES
// aufnehmen; die Texte dort müssen vorher inhaltlich auf den aktuellen Stand gebracht werden.

export type Language = "DE" | "EN" | "NL";

type Translations = typeof en;

export const SUPPORTED_LANGUAGES: { code: Language; label: string }[] = [
  { code: "DE", label: "Deutsch" },
  { code: "EN", label: "English" },
  { code: "NL", label: "Nederlands" },
];

// Partial: eine Sprache darf ganze oberste Abschnitte weglassen (Rückfall auf Englisch, siehe unten)
const translationMap: Record<Language, Partial<Translations>> = {
  DE: de,
  EN: en,
  NL: nl,
};

const isSupported = (value: string | null): value is Language =>
  !!value && SUPPORTED_LANGUAGES.some((l) => l.code === value);

const detectBrowserLanguage = (): Language => {
  if (typeof navigator === "undefined") return "DE";
  // Suchmaschinen melden sich meist mit englischer Browsersprache; sie sollen die deutsche Fassung aufnehmen
  if (/bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent)) return "DE";
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    if (!raw) continue;
    const [primary, region] = raw.toLowerCase().split("-");
    if (primary === "de") return "DE";
    if (primary === "nl") return "NL";
    // Browser in den Niederlanden (z. B. en-NL) bekommen die niederländische Fassung; nl-BE greift schon oben
    if (region === "nl") return "NL";
    if (primary === "en") return "EN";
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
    try {
      const saved = localStorage.getItem("dentopoint-lang");
      if (isSupported(saved)) return saved;
    } catch {
      // localStorage may be unavailable (privacy mode); fall back to detection
    }
    return detectBrowserLanguage();
  });

  const setLang = (l: Language) => {
    try {
      localStorage.setItem("dentopoint-lang", l);
    } catch {
      // ignore
    }
    setLangState(l);
  };

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const raw = translationMap[lang] ?? de;
  // Shallow merge with English fallback so a missing key never crashes the UI
  const t = new Proxy(raw, {
    get(target, prop: string) {
      const val = (target as Record<string, unknown>)[prop];
      const fallback = (en as Record<string, unknown>)[prop];
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
