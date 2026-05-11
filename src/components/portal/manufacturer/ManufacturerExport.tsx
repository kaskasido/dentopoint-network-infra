import { mockAutomats, mockAlerts, mockMaintenance } from "@/data/mockAutomats";
import { Download, FileSpreadsheet, FileText, Database } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(";"),
    ...data.map((row) => headers.map((h) => {
      const val = row[h];
      return typeof val === "object" ? JSON.stringify(val) : String(val ?? "");
    }).join(";")),
  ].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const ManufacturerExport = () => {
  const { t } = useLanguage();
  const mp = t.manufacturerPortal;

  const exports = [
    {
      label: mp.automatData, description: mp.automatDataDesc, icon: Database,
      action: () => exportToCSV(mockAutomats.map(({ products, ...rest }) => ({ ...rest, productCount: products.length })), "dentopoint-automaten"),
    },
    {
      label: mp.alertLog, description: mp.alertLogDesc, icon: FileText,
      action: () => exportToCSV(mockAlerts as unknown as Record<string, unknown>[], "dentopoint-alerts"),
    },
    {
      label: mp.maintenanceHistory, description: mp.maintenanceHistoryDesc, icon: FileSpreadsheet,
      action: () => exportToCSV(mockMaintenance as unknown as Record<string, unknown>[], "dentopoint-wartung"),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{mp.exportTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{mp.exportDesc}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exports.map((e) => (
          <div key={e.label} className="border border-border rounded-lg p-6 bg-card">
            <e.icon size={24} className="text-accent mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">{e.label}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{e.description}</p>
            <button onClick={e.action} className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              <Download size={16} />
              {mp.exportCSV}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManufacturerExport;
