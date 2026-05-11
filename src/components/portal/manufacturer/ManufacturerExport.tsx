import { Download, FileText, Database, FileSpreadsheet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (!data.length) { toast.info("Keine Daten zum Export"); return; }
  const headers = Object.keys(data[0]);
  const csv = [headers.join(";"), ...data.map((row) => headers.map((h) => {
    const v = row[h]; return typeof v === "object" ? JSON.stringify(v) : String(v ?? "");
  }).join(";"))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${filename}.csv`; a.click();
  URL.revokeObjectURL(url);
};

const ManufacturerExport = () => {
  const run = async (table: "automats" | "alerts" | "maintenance_logs", filename: string) => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) { toast.error(error.message); return; }
    exportToCSV((data ?? []) as any, filename);
  };

  const exports = [
    { label: "Automaten-Daten", description: "Alle Automaten als CSV-Export.", icon: Database, action: () => run("automats", "dentopoint-automaten") },
    { label: "Alert-Verlauf", description: "Alle Systembenachrichtigungen.", icon: FileText, action: () => run("alerts", "dentopoint-alerts") },
    { label: "Wartungsverlauf", description: "Alle Wartungsprotokolle.", icon: FileSpreadsheet, action: () => run("maintenance_logs", "dentopoint-wartung") },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Datenexport</h1>
      <p className="text-muted-foreground text-sm mb-8">Daten als CSV herunterladen.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exports.map((e) => (
          <div key={e.label} className="border border-border rounded-lg p-6 bg-card">
            <e.icon size={24} className="text-accent mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">{e.label}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{e.description}</p>
            <button onClick={e.action} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
              <Download size={16} /> CSV exportieren
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManufacturerExport;
