import { createContext, useContext, useState, ReactNode } from "react";
import { en } from "./translations/en";
import { de } from "./translations/de";
import { tr } from "./translations/tr";
import { cn } from "./translations/cn";
import { fr } from "./translations/fr";
import { it } from "./translations/it";
import { es } from "./translations/es";

export type Language = "EN" | "DE" | "TR" | "CN" | "FR" | "IT" | "ES";

type Translations = typeof en;

const translationMap: Record<string, Translations> = {
  EN: en,
  DE: de,
  TR: tr as unknown as Translations,
  CN: cn as unknown as Translations,
  FR: fr as unknown as Translations,
  IT: it as unknown as Translations,
  ES: es as unknown as Translations,
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
