import { Star } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const ClinicFeedback = () => (
  <div>
    <h1 className="font-display text-2xl font-bold text-foreground mb-2">Patienten-Feedback</h1>
    <p className="text-muted-foreground text-sm mb-8">Bewertungen und Kommentare zu deinen Modulen.</p>
    <EmptyState
      icon={<Star size={18} />}
      title="Noch kein Feedback verfügbar"
      description="Sobald Bewertungen über die Module erfasst werden, siehst du hier Durchschnittswert, Verteilung und Kommentare."
    />
  </div>
);

export default ClinicFeedback;
