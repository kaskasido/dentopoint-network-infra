import { mockLeasingContracts, mockPaymentTerminals, serviceLevelSpecs } from "@/data/mockLeasingData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";
import { FileText, CreditCard, CheckCircle2, Clock, WifiOff, Euro } from "lucide-react";

const AdminLeasing = () => {
  const { t, lang } = useLanguage();
  const ap = t.adminPortal;
  const locale = getLocale(lang);

  const active = mockLeasingContracts.filter((c) => c.status === "active");
  const pending = mockLeasingContracts.filter((c) => c.status === "pending");
  const totalMonthlyRevenue = active.reduce((s, c) => s + c.monthlyRate * c.automatCount, 0);
  const totalContractValue = mockLeasingContracts.reduce((s, c) => s + c.totalContractValue, 0);
  const terminalOnline = mockPaymentTerminals.filter((t) => t.status === "online").length;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{ap.leasingTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{ap.leasingDesc}</p>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: ap.activeContracts, value: active.length, icon: FileText },
          { label: ap.pendingContracts, value: pending.length, icon: Clock },
          { label: ap.monthlyLeasingRevenue, value: `€${totalMonthlyRevenue.toLocaleString(locale)}`, icon: Euro },
          { label: ap.terminalsOnline, value: `${terminalOnline}/${mockPaymentTerminals.length}`, icon: CreditCard },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Contracts table */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{ap.allLeasingContracts}</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.leasingClinic}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.leasingAutomat}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.leasingCity}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.leasingLevel}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.leasingMonthlyRate}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.leasingStart}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.leasingEnd}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.leasingStatus}</th>
              </tr>
            </thead>
            <tbody>
              {mockLeasingContracts.map((c) => (
                <tr key={c.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium text-foreground max-w-[180px] truncate">{c.clinicName}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.automatNr}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.city}, {c.country}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      c.serviceLevel === "premium" ? "bg-accent/10 text-accent" :
                      c.serviceLevel === "advanced" ? "bg-blue-500/10 text-blue-500" :
                      "bg-muted text-muted-foreground"
                    }`}>{c.serviceLevel}</span>
                  </td>
                  <td className="px-4 py-3 text-foreground">€{c.monthlyRate.toLocaleString(locale)}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(c.startDate).toLocaleDateString(locale)}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(c.endDate).toLocaleDateString(locale)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.status === "active" ? "bg-accent/10 text-accent" :
                      c.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {c.status === "active" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-border bg-muted/30 font-semibold">
                <td colSpan={4} className="px-4 py-3 text-foreground">{ap.total}</td>
                <td className="px-4 py-3 text-foreground">€{totalMonthlyRevenue.toLocaleString(locale)}/mo</td>
                <td colSpan={3} className="px-4 py-3 text-muted-foreground text-xs">€{totalContractValue.toLocaleString(locale)} {ap.totalContractValue}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Terminals */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{ap.paymentTerminalsTitle}</h2>
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.terminalAutomat}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.terminalModel}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.terminalSerial}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.terminalCurrency}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.terminalTx30d}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.terminalRevenue30d}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.terminalSoftware}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.terminalStatus}</th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentTerminals.map((pt) => (
                <tr key={pt.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground">{pt.automatNr}</td>
                  <td className="px-4 py-3 text-foreground">{pt.terminalModel}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{pt.serialNumber}</td>
                  <td className="px-4 py-3 text-foreground">{pt.currency}</td>
                  <td className="px-4 py-3 text-foreground">{pt.transactionCount30d}</td>
                  <td className="px-4 py-3 text-foreground">€{pt.revenue30d.toLocaleString(locale)}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">v{pt.softwareVersion}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      pt.status === "online" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                    }`}>
                      {pt.status === "online" ? <CheckCircle2 size={10} /> : <WifiOff size={10} />}
                      {pt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLeasing;
