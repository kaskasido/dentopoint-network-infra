import { mockLeasingContracts, mockPaymentTerminals, serviceLevelSpecs } from "@/data/mockLeasingData";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";
import { FileText, CreditCard, CheckCircle2, Clock, WifiOff } from "lucide-react";

const ClinicLeasing = () => {
  const { t, lang } = useLanguage();
  const lp = t.clinicPortal;
  const locale = getLocale(lang);

  // In a real app, filter by clinic ID from auth context.
  // Here we show Charité (lc-001) as the logged-in clinic.
  const myContracts = mockLeasingContracts.filter((c) => c.status === "active").slice(0, 2);
  const myTerminals = mockPaymentTerminals.filter((pt) =>
    myContracts.some((c) => c.automatNr === pt.automatNr)
  );
  const mySpec = serviceLevelSpecs.find((s) => s.level === myContracts[0]?.serviceLevel);

  const totalMonthly = myContracts.reduce((sum, c) => sum + c.monthlyRate * c.automatCount, 0);
  const totalContractValue = myContracts.reduce((sum, c) => sum + c.totalContractValue, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{lp.leasingTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{lp.leasingDesc}</p>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: lp.activeContracts, value: myContracts.length, icon: FileText, color: "text-accent" },
          { label: lp.monthlyRate, value: `€${totalMonthly.toLocaleString(locale)}`, icon: CreditCard, color: "text-accent" },
          { label: lp.totalContractValue, value: `€${totalContractValue.toLocaleString(locale)}`, icon: CheckCircle2, color: "text-accent" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Contract Details */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{lp.contractDetails}</h2>
      <div className="space-y-4 mb-8">
        {myContracts.map((c) => {
          const spec = serviceLevelSpecs.find((s) => s.level === c.serviceLevel);
          return (
            <div key={c.id} className="border border-border rounded-lg bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-display font-semibold text-foreground">{c.automatNr}</p>
                  <p className="text-sm text-muted-foreground">{c.installAddress}, {c.city}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  c.status === "active" ? "bg-accent/10 text-accent" :
                  c.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {c.status === "active" ? lp.contractActive : lp.contractPending}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><p className="text-muted-foreground text-xs">{lp.serviceLevel}</p><p className="font-semibold capitalize text-foreground">{c.serviceLevel}</p></div>
                <div><p className="text-muted-foreground text-xs">{lp.monthlyRate}</p><p className="font-semibold text-foreground">€{c.monthlyRate}</p></div>
                <div><p className="text-muted-foreground text-xs">{lp.contractStart}</p><p className="font-semibold text-foreground">{new Date(c.startDate).toLocaleDateString(locale)}</p></div>
                <div><p className="text-muted-foreground text-xs">{lp.contractEnd}</p><p className="font-semibold text-foreground">{new Date(c.endDate).toLocaleDateString(locale)}</p></div>
              </div>
              {spec && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">{lp.includes}:</p>
                  <div className="flex flex-wrap gap-2">
                    {spec.includes.map((item) => (
                      <span key={item} className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs">{item}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Service Level Comparison */}
      {mySpec && (
        <>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{lp.serviceLevelComparison}</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {serviceLevelSpecs.map((spec) => (
              <div key={spec.level} className={`border rounded-lg p-5 bg-card ${spec.level === myContracts[0]?.serviceLevel ? "border-accent" : "border-border"}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-display font-bold text-foreground capitalize">{spec.label}</p>
                  {spec.level === myContracts[0]?.serviceLevel && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{lp.yourPlan}</span>
                  )}
                </div>
                <p className="font-display text-2xl font-bold text-foreground mb-1">€{spec.monthlyRate}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                <p className="text-xs text-muted-foreground mb-3">{lp.responseTime}: {spec.responseTimeHours}h</p>
                <ul className="space-y-1">
                  {spec.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 size={12} className="text-accent mt-0.5 shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Payment Terminals */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{lp.paymentTerminals}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {myTerminals.map((pt) => (
          <div key={pt.id} className="border border-border rounded-lg bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-mono text-sm font-semibold text-foreground">{pt.automatNr}</p>
                <p className="text-xs text-muted-foreground">{pt.terminalModel} · {pt.serialNumber}</p>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                pt.status === "online" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
              }`}>
                {pt.status === "online" ? <CheckCircle2 size={10} /> : <WifiOff size={10} />}
                {pt.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><p className="text-muted-foreground">{lp.currency}</p><p className="font-medium text-foreground">{pt.currency}</p></div>
              <div><p className="text-muted-foreground">{lp.transactions30d}</p><p className="font-medium text-foreground">{pt.transactionCount30d}</p></div>
              <div><p className="text-muted-foreground">{lp.revenue30d}</p><p className="font-medium text-foreground">€{pt.revenue30d.toLocaleString(locale)}</p></div>
              <div><p className="text-muted-foreground">{lp.terminalSoftware}</p><p className="font-medium text-foreground">v{pt.softwareVersion}</p></div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {pt.acceptedMethods.map((m) => (
                <span key={m} className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs capitalize">{m}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicLeasing;
