import { mockPatientFeedback } from "@/data/mockClinicData";
import { Star, TrendingUp, MessageSquare } from "lucide-react";

const ClinicFeedback = () => {
  const avgRating = (mockPatientFeedback.reduce((s, f) => s + f.rating, 0) / mockPatientFeedback.length).toFixed(1);
  const ratingDist = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    count: mockPatientFeedback.filter((f) => f.rating === r).length,
    pct: Math.round((mockPatientFeedback.filter((f) => f.rating === r).length / mockPatientFeedback.length) * 100),
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Patienten-Feedback</h1>
      <p className="text-muted-foreground text-sm mb-8">Bewertungen und Kommentare Ihrer Patienten.</p>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Average Rating */}
        <div className="border border-border rounded-lg p-6 bg-card text-center">
          <Star size={24} className="text-yellow-500 mx-auto mb-2" />
          <p className="font-display text-4xl font-bold text-foreground">{avgRating}</p>
          <p className="text-sm text-muted-foreground mt-1">Durchschnittsbewertung</p>
          <p className="text-xs text-muted-foreground">{mockPatientFeedback.length} Bewertungen</p>
        </div>

        {/* Distribution */}
        <div className="border border-border rounded-lg p-6 bg-card col-span-2">
          <h3 className="text-sm font-medium text-foreground mb-4">Verteilung</h3>
          <div className="space-y-2">
            {ratingDist.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-12">{r.stars} ★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">{r.count} ({r.pct}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Letzte Kommentare</h2>
      <div className="space-y-3">
        {mockPatientFeedback.map((f) => (
          <div key={f.id} className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">{f.automatNr}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-yellow-500">{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</span>
                <span className="text-xs text-muted-foreground">{new Date(f.date).toLocaleDateString("de-DE")}</span>
              </div>
            </div>
            <p className="text-sm text-foreground">{f.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicFeedback;
