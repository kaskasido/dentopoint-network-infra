import { createContext, useContext, useState, ReactNode } from "react";
import { en } from "./translations/en";
import { de } from "./translations/de";

export type Language = "EN" | "DE" | "TR" | "CN";

type Translations = typeof en;

const translationMap: Record<string, Translations> = {
  EN: en,
  DE: de,
  // TR and CN fall back to EN for now
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  t: en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("EN");
  const t = translationMap[lang] || en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
