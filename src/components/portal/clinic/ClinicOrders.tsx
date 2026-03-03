import { mockClinicOrders } from "@/data/mockClinicData";
import { Package, Truck, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const productMap: Record<string, string> = {
  "Zahnbürsten-Set Premium": "toothbrushSetPremium",
  "Zahnpasta Fluor+": "toothpasteFluor",
  "Mundspülung Sensitiv": "mouthwashSensitive",
  "Zahnseide Mint": "flossMint",
  "Interdentalbürsten": "interdentalBrushes",
};

const ClinicOrders = () => {
  const { t, lang } = useLanguage();
  const cp = t.clinicPortal;
  const md = t.mockData;
  const locale = getLocale(lang);

  const tr = (val: string) => {
    const key = productMap[val];
    return key && md[key] ? md[key] : val;
  };

  const delivered = mockClinicOrders.filter((o) => o.status === "geliefert").length;
  const ordered = mockClinicOrders.filter((o) => o.status === "bestellt").length;
  const pending = mockClinicOrders.filter((o) => o.status === "ausstehend").length;

  const statusConfig: Record<string, { icon: typeof CheckCircle; className: string; label: string }> = {
    geliefert: { icon: CheckCircle, className: "bg-accent/10 text-accent", label: cp.delivered },
    bestellt: { icon: Truck, className: "bg-blue-500/10 text-blue-500", label: cp.ordered },
    ausstehend: { icon: Clock, className: "bg-yellow-500/10 text-yellow-500", label: cp.pending },
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{cp.ordersTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{cp.ordersDesc}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card">
          <CheckCircle size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{delivered}</p>
          <p className="text-xs text-muted-foreground">{cp.delivered}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Truck size={20} className="text-blue-500 mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{ordered}</p>
          <p className="text-xs text-muted-foreground">{cp.ordered}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Clock size={20} className="text-yellow-500 mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{pending}</p>
          <p className="text-xs text-muted-foreground">{cp.pending}</p>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{cp.product}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{cp.quantity}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{cp.status}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{cp.date}</th>
            </tr>
          </thead>
          <tbody>
            {mockClinicOrders.map((o) => {
              const cfg = statusConfig[o.status];
              return (
                <tr key={o.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                    <Package size={14} className="text-muted-foreground" />
                    {tr(o.product)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.quantity} {cp.pcs}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
                      <cfg.icon size={12} />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(o.date).toLocaleDateString(locale)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClinicOrders;
