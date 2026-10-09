import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

// Kanonische Adresse der Website. Auch Kopien unter anderen Adressen (z. B. netzwerk.dentopoint.com)
// verweisen per Canonical hierher, damit Suchmaschinen nur dentopoint.care aufnehmen.
export const SITE_URL = "https://dentopoint.care";

export interface SeoOptions {
  title: string;
  description?: string;
  /** Pfad der Seite, z. B. "/clinics"; ergibt Canonical und og:url */
  path?: string;
  /** Seiten, die nicht in Suchmaschinen sollen (Login, 404 …) */
  noindex?: boolean;
  /** Strukturierte Daten (schema.org), werden als JSON-LD in den Seitenkopf geschrieben */
  jsonLd?: object;
}

// Jedes Element, das hier gesetzt wird, bekommt data-seo. Das Vorrendern (scripts/prerender.mjs)
// übernimmt genau diese Elemente in die fertige HTML-Datei der Seite.
const upsert = (selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute("data-seo", "");
  apply(el);
};

const setMeta = (attr: "name" | "property", key: string, content: string) =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute(attr, key);
      return m;
    },
    (el) => el.setAttribute("content", content),
  );

export const useSeo = ({ title, description, path, noindex, jsonLd }: SeoOptions) => {
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    document.title = title;
    setMeta("property", "og:title", title);
    setMeta("name", "twitter:title", title);
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    if (path !== undefined) {
      const url = SITE_URL + path;
      setMeta("property", "og:url", url);
      upsert(
        'link[rel="canonical"]',
        () => {
          const l = document.createElement("link");
          l.setAttribute("rel", "canonical");
          return l;
        },
        (el) => el.setAttribute("href", url),
      );
    }
    const old = document.head.querySelector('script[type="application/ld+json"][data-seo-page]');
    if (old) old.remove();
    if (ld) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo", "");
      s.setAttribute("data-seo-page", "");
      s.textContent = ld;
      document.head.appendChild(s);
    }
  }, [title, description, path, noindex, ld]);
};

type PageKey = keyof typeof import("@/i18n/translations/de").de.seo;

/** Titel und Beschreibung einer Seite aus den Übersetzungen (Abschnitt seo) */
export const usePageSeo = (key: PageKey, path?: string, extra: Partial<SeoOptions> = {}) => {
  const { t } = useLanguage();
  const page = t.seo[key] as { title: string; desc?: string };
  useSeo({ title: page.title, description: page.desc, path, ...extra });
};
