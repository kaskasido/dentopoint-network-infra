import { Inbox } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

const EmptyState = ({ title = "Noch keine Daten", description = "Sobald Daten verfügbar sind, erscheinen sie hier.", icon }: Props) => (
  <div className="border border-dashed border-border rounded-lg p-10 text-center bg-card/40">
    <div className="mx-auto mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
      {icon ?? <Inbox size={18} />}
    </div>
    <p className="text-sm font-medium text-foreground">{title}</p>
    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">{description}</p>
  </div>
);

export default EmptyState;
