import { mockClinicOrders } from "@/data/mockClinicData";
import { Package, Truck, Clock, CheckCircle } from "lucide-react";

const ClinicOrders = () => {
  const delivered = mockClinicOrders.filter((o) => o.status === "geliefert").length;
  const ordered = mockClinicOrders.filter((o) => o.status === "bestellt").length;
  const pending = mockClinicOrders.filter((o) => o.status === "ausstehend").length;

  const statusConfig = {
    geliefert: { icon: CheckCircle, className: "bg-accent/10 text-accent", label: "Geliefert" },
    bestellt: { icon: Truck, className: "bg-blue-500/10 text-blue-500", label: "Bestellt" },
    ausstehend: { icon: Clock, className: "bg-yellow-500/10 text-yellow-500", label: "Ausstehend" },
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Bestellungen</h1>
      <p className="text-muted-foreground text-sm mb-8">Verwalten Sie Ihre Nachbestellungen für alle Automaten.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card">
          <CheckCircle size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{delivered}</p>
          <p className="text-xs text-muted-foreground">Geliefert</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Truck size={20} className="text-blue-500 mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{ordered}</p>
          <p className="text-xs text-muted-foreground">Bestellt</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Clock size={20} className="text-yellow-500 mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{pending}</p>
          <p className="text-xs text-muted-foreground">Ausstehend</p>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Produkt</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Menge</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Datum</th>
            </tr>
          </thead>
          <tbody>
            {mockClinicOrders.map((o) => {
              const cfg = statusConfig[o.status];
              return (
                <tr key={o.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                    <Package size={14} className="text-muted-foreground" />
                    {o.product}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{o.quantity} Stk.</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
                      <cfg.icon size={12} />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(o.date).toLocaleDateString("de-DE")}</td>
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
