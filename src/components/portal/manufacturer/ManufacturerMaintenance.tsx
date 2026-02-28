import { mockMaintenance } from "@/data/mockAutomats";
import { Wrench, Clock, User } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ManufacturerMaintenance = () => {
  const { t } = useLanguage();
  const mp = t.manufacturerPortal;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{mp.maintenanceTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{mp.maintenanceDesc}</p>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{mp.date}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{mp.automat}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{mp.type}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{mp.technician}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{mp.duration}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{mp.notes}</th>
              </tr>
            </thead>
            <tbody>
              {mockMaintenance.map((m) => (
                <tr key={m.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-foreground">{new Date(m.date).toLocaleDateString("de-DE")}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-semibold text-foreground">{m.automatNr}</span>
                    <span className="text-muted-foreground ml-2">{m.automatName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                      m.type === "Planmäßige Wartung" ? "bg-accent/10 text-accent" :
                      m.type === "Störungsbehebung" ? "bg-destructive/10 text-destructive" :
                      "bg-secondary text-secondary-foreground"
                    }`}>
                      <Wrench size={12} />
                      {m.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground flex items-center gap-1">
                    <User size={12} /> {m.technician}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground flex items-center gap-1">
                    <Clock size={12} /> {m.duration}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{m.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerMaintenance;
