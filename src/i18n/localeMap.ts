import type { Language } from "./LanguageContext";

const localeMap: Record<Language, string> = {
  EN: "en-GB",
  DE: "de-DE",
  TR: "tr-TR",
  CN: "zh-CN",
  FR: "fr-FR",
  IT: "it-IT",
  ES: "es-ES",
  KO: "ko-KR",
  AR: "ar-SA",
  NL: "nl-NL",
};

export const getLocale = (lang: Language) => localeMap[lang] || "en-GB";
