import { useEffect, useRef, useState } from "react";
import { Volume2, Square } from "lucide-react";
import type { Language } from "@/i18n/LanguageContext";

const TEXTE: Record<Language, { an: string; aus: string }> = {
  DE: { an: "Anhören", aus: "Stopp" },
  EN: { an: "Listen", aus: "Stop" },
  NL: { an: "Beluisteren", aus: "Stop" },
};
const STIMME: Record<Language, string> = { DE: "de-DE", EN: "en-GB", NL: "nl-NL" };

/**
 * Knopf „Anhören“: spielt die eingesprochene Aufnahme (audioUrl, aus ElevenLabs), sonst liest der Browser den Text vor.
 * Es spielt immer nur ein Knopf zugleich; beim Schließen des Fensters endet die Wiedergabe.
 */
const Anhoeren = ({ text, lang, audioUrl, className = "" }: { text: string; lang: Language; audioUrl?: string; className?: string }) => {
  const [laeuft, setLaeuft] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const kannSprechen = typeof window !== "undefined" && "speechSynthesis" in window;

  const stopp = () => {
    audio.current?.pause();
    audio.current = null;
    if (kannSprechen) window.speechSynthesis.cancel();
    setLaeuft(false);
  };
  useEffect(() => stopp, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!audioUrl && !kannSprechen) return null;

  const start = () => {
    stopp();
    if (audioUrl) {
      const a = new Audio(audioUrl);
      a.onended = () => setLaeuft(false);
      a.onerror = () => setLaeuft(false);
      audio.current = a;
      void a.play().catch(() => setLaeuft(false));
    } else {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = STIMME[lang];
      u.onend = () => setLaeuft(false);
      u.onerror = () => setLaeuft(false);
      window.speechSynthesis.speak(u);
    }
    setLaeuft(true);
  };

  return (
    <button
      type="button"
      onClick={laeuft ? stopp : start}
      aria-pressed={laeuft}
      className={`inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted ${className}`}
    >
      {laeuft ? <Square size={15} /> : <Volume2 size={16} />}
      {laeuft ? TEXTE[lang].aus : TEXTE[lang].an}
    </button>
  );
};

export default Anhoeren;
