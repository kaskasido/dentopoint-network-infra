import type { Language } from "./LanguageContext";

const localeMap: Record<Language, string> = {
  DE: "de-DE",
  EN: "en-GB",
  NL: "nl-NL",
};

export const getLocale = (lang: Language) => localeMap[lang] || "de-DE";
