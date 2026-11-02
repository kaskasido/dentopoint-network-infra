import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * KI-Kennzeichnung für Bilder und Videos (EU-KI-Verordnung Art. 50 Abs. 4, Verhaltenskodex der Kommission vom Juni 2026).
 * Pflicht für Inhalte, die echt wirken könnten und mit KI erzeugt oder bearbeitet sind. Das Etikett sitzt sichtbar im Medium
 * selbst, ab dem ersten Bild und die ganze Zeit; ein Hinweis im Footer reicht nicht. Dazu kommt der Text als aria-label
 * für Screenreader. Reine Illustrationen und Symbole brauchen kein Etikett.
 *
 *   <KiMedium art="generiert"><img src={…} alt="…, KI-generiert" /></KiMedium>
 *   <KiVideo src={heroVideo} poster={heroPoster} art="generiert" />      // Hero-Video: vorbereitet 02.11.2026, noch nicht eingebaut
 *
 * Wird die Videodatei selbst weitergegeben (Social Media, Messe), das Etikett zusätzlich ins Bild brennen:
 * ZK-Dental-Core-New docs/dentopoint/ki_kennzeichnung.md.
 */
export type KiArt = "generiert" | "bearbeitet";

const TEXTE: Record<string, Record<KiArt, string>> = {
  de: { generiert: "KI-generiert", bearbeitet: "Mit KI bearbeitet" },
  en: { generiert: "AI-generated", bearbeitet: "Edited with AI" },
  nl: { generiert: "Door AI gegenereerd", bearbeitet: "Bewerkt met AI" },
  fr: { generiert: "Généré par IA", bearbeitet: "Modifié par IA" },
  it: { generiert: "Generato con IA", bearbeitet: "Modificato con IA" },
  es: { generiert: "Generado con IA", bearbeitet: "Editado con IA" },
  hr: { generiert: "Generirano umjetnom inteligencijom", bearbeitet: "Uređeno umjetnom inteligencijom" },
  sr: { generiert: "Generisano veštačkom inteligencijom", bearbeitet: "Uređeno veštačkom inteligencijom" },
  zh: { generiert: "AI 生成", bearbeitet: "经 AI 编辑" },
  cn: { generiert: "AI 生成", bearbeitet: "经 AI 编辑" },
  ja: { generiert: "AI生成", bearbeitet: "AIで編集" },
  ko: { generiert: "AI 생성", bearbeitet: "AI로 편집됨" },
  ar: { generiert: "مُنشأ بالذكاء الاصطناعي", bearbeitet: "معدّل بالذكاء الاصطناعي" },
  tr: { generiert: "Yapay zekâ ile üretildi", bearbeitet: "Yapay zekâ ile düzenlendi" },
};

export const useKiText = (art: KiArt) => {
  const lang = useLanguage().lang.toLowerCase();
  return (TEXTE[lang] ?? TEXTE.en)[art];
};

/** Kleines Etikett oben links im Medium. Das Elternelement braucht position: relative (KiMedium setzt das). */
export const KiEtikett = ({ art = "generiert", className = "" }: { art?: KiArt; className?: string }) => {
  const text = useKiText(art);
  return (
    <span
      role="note"
      className={`pointer-events-none absolute left-2 top-2 z-10 select-none rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium leading-5 text-white backdrop-blur-sm ${className}`}
    >
      {text}
    </span>
  );
};

/** Beliebiges Bild oder Video mit sichtbarem Etikett. */
export const KiMedium = ({ art = "generiert", children, className = "" }: { art?: KiArt; children: ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    {children}
    <KiEtikett art={art} />
  </div>
);

/**
 * Hero-Video mit Kennzeichnung. Läuft stumm in Schleife; bei „weniger Bewegung“ startet es nicht von selbst,
 * dann gibt es Bedienelemente. Das Etikett bleibt während des ganzen Videos sichtbar.
 */
export const KiVideo = ({ src, poster, art = "generiert", beschreibung, className = "" }: {
  src: string; poster?: string; art?: KiArt; beschreibung?: string; className?: string;
}) => {
  const text = useKiText(art);
  const [ruhig, setRuhig] = useState(false);
  useEffect(() => {
    setRuhig(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return (
    <figure className={className}>
      <KiMedium art={art}>
        <video
          src={src}
          poster={poster}
          muted
          playsInline
          loop={!ruhig}
          autoPlay={!ruhig}
          controls={ruhig}
          preload="metadata"
          aria-label={beschreibung ? `${beschreibung} (${text})` : text}
          className="block h-auto w-full"
        />
      </KiMedium>
      {beschreibung && <figcaption className="mt-1 text-center text-xs text-muted-foreground">{beschreibung} · {text}</figcaption>}
    </figure>
  );
};
