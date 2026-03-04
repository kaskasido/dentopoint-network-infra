import { useLanguage } from "@/i18n/LanguageContext";
import { Monitor, Play, Clock, Eye, Star, Plus } from "lucide-react";

interface DisplaySlide {
  id: string;
  automatNr: string;
  type: "product" | "clinic" | "study" | "promotion";
  title: string;
  description: string;
  sponsor: string;
  duration: number;     // seconds
  active: boolean;
  priority: number;     // 1 = highest
  impressions30d: number;
  clicks30d: number;
}

const mockDisplaySlides: DisplaySlide[] = [
  { id: "ds-1", automatNr: "DP-K-001", type: "clinic", title: "Willkommen in der Charité Zahnklinik", description: "Buchen Sie Ihren nächsten Termin jetzt online oder per App.", sponsor: "Charité Universitätsmedizin Berlin", duration: 15, active: true, priority: 1, impressions30d: 4820, clicks30d: 312 },
  { id: "ds-2", automatNr: "DP-K-001", type: "product", title: "Oral-B iO – Professionelle Pflege", description: "Empfohlen von 9 von 10 Zahnärzten. Jetzt im Automaten erhältlich.", sponsor: "OralB Professional", duration: 10, active: true, priority: 2, impressions30d: 4820, clicks30d: 198 },
  { id: "ds-3", automatNr: "DP-K-001", type: "product", title: "Implant Care Kit Pro", description: "Speziell entwickelt für Implantat-Träger. Klinisch getestet.", sponsor: "Dentsply Sirona", duration: 12, active: true, priority: 3, impressions30d: 4820, clicks30d: 421 },
  { id: "ds-4", automatNr: "DP-K-001", type: "study", title: "Nehmen Sie an unserer Studie teil", description: "Helfen Sie, die Zahnpflege zu verbessern – ECIPS-2025 Studie jetzt offen.", sponsor: "Charité Research", duration: 20, active: true, priority: 4, impressions30d: 4820, clicks30d: 87 },
  { id: "ds-5", automatNr: "DP-K-001", type: "promotion", title: "DentoPoint App – Jetzt herunterladen", description: "Produktempfehlungen, Termine und Treuepunkte – alles in einer App.", sponsor: "DentoPoint", duration: 10, active: true, priority: 5, impressions30d: 4820, clicks30d: 523 },
  { id: "ds-6", automatNr: "DP-K-002", type: "clinic", title: "Station A – Ihre Wartezimmerbegleitung", description: "Qualitätsprodukte direkt bei Ihnen. Fragen Sie Ihr Pflegeteam.", sponsor: "Charité Universitätsmedizin Berlin", duration: 15, active: true, priority: 1, impressions30d: 3100, clicks30d: 201 },
];

const typeColors: Record<string, string> = {
  clinic:     "bg-blue-500/10 text-blue-500",
  product:    "bg-accent/10 text-accent",
  study:      "bg-purple-500/10 text-purple-500",
  promotion:  "bg-orange-500/10 text-orange-500",
};

const ClinicDisplay = () => {
  const { t } = useLanguage();
  const dp = t.clinicPortal;

  const activeSlides = mockDisplaySlides.filter((s) => s.active);
  const totalImpressions = new Set(mockDisplaySlides.map((s) => s.automatNr)).size > 0
    ? mockDisplaySlides.filter((v, i, a) => a.findIndex((s) => s.automatNr === v.automatNr) === i)
        .reduce((sum, s) => sum + s.impressions30d, 0)
    : 0;
  const totalClicks = mockDisplaySlides.reduce((sum, s) => sum + s.clicks30d, 0);
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0.0";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{dp.displayTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{dp.displayDesc}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: dp.activeSlides, value: activeSlides.length, icon: Play },
          { label: dp.impressions30d, value: totalImpressions.toLocaleString(), icon: Eye },
          { label: dp.clicks30d, value: totalClicks.toLocaleString(), icon: Star },
          { label: dp.ctr, value: `${ctr}%`, icon: Monitor },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Display content list */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-foreground">{dp.displayPlaylist}</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
          <Plus size={14} />
          {dp.addSlide}
        </button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displayAutomat}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displayType}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displaySlideTitle}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displaySponsor}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displayDuration}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displayPriority}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displayImpressions}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displayClicks}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{dp.displayStatus}</th>
              </tr>
            </thead>
            <tbody>
              {mockDisplaySlides.map((slide) => (
                <tr key={slide.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{slide.automatNr}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[slide.type] ?? "bg-muted text-muted-foreground"}`}>
                      {slide.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground max-w-xs truncate">{slide.title}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{slide.sponsor}</td>
                  <td className="px-4 py-3 text-foreground flex items-center gap-1">
                    <Clock size={12} className="text-muted-foreground" />{slide.duration}s
                  </td>
                  <td className="px-4 py-3 text-foreground">{slide.priority}</td>
                  <td className="px-4 py-3 text-foreground">{slide.impressions30d.toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground">{slide.clicks30d.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`w-2 h-2 rounded-full inline-block ${slide.active ? "bg-accent" : "bg-muted-foreground"}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info box */}
      <div className="mt-6 border border-border rounded-lg p-4 bg-muted/30">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">{dp.displayInfoTitle}:</strong> {dp.displayInfoText}
        </p>
      </div>
    </div>
  );
};

export default ClinicDisplay;
