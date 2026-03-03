import { mockSlotsDP001, mockSlotsDP002, mockAllSlotBookings, TOTAL_SLOTS, DENTOPOINT_SLOTS, MANUFACTURER_SLOTS, SLOT_PRICING } from "@/data/mockSlotData";
import { useLanguage } from "@/i18n/LanguageContext";
import { Package, Lock, CheckCircle2, Clock, Euro } from "lucide-react";

const slotColorMap: Record<string, string> = {
  dentopoint: "bg-accent/20 border-accent/40 text-accent",
  active: "bg-blue-500/10 border-blue-500/30 text-blue-500",
  available: "bg-muted/50 border-border text-muted-foreground",
  pending: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600",
};

const ManufacturerSlots = () => {
  const { t } = useLanguage();
  const sp = t.manufacturerPortal;

  const allBookings = mockAllSlotBookings;
  const activeBookings = allBookings.filter((b) => b.status === "active");
  const totalMonthlyRevenue = activeBookings.reduce(
    (sum, b) => sum + b.slotIds.length * b.monthlyFeePerSlot,
    0
  );

  const slotsDP001 = mockSlotsDP001;
  const slotsDP002 = mockSlotsDP002;

  const occupiedCount001 = slotsDP001.filter((s) => s.status === "active").length;
  const occupiedCount002 = slotsDP002.filter((s) => s.status === "active").length;

  const renderSlotGrid = (slots: typeof mockSlotsDP001, automatNr: string) => (
    <div className="border border-border rounded-lg bg-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">{automatNr}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {slots.filter((s) => s.status === "active").length}/{MANUFACTURER_SLOTS} {sp.slotsBooked} · {DENTOPOINT_SLOTS} {sp.slotsDentoPoint}
          </p>
        </div>
        <span className="text-sm font-semibold text-foreground">
          {slots.filter((s) => s.status === "available").length} {sp.slotsAvailable}
        </span>
      </div>

      <div className="grid grid-cols-10 gap-1.5 mb-5">
        {slots.map((slot) => {
          const colorClass =
            slot.owner === "dentopoint"
              ? slotColorMap.dentopoint
              : slot.status === "active"
              ? slotColorMap.active
              : slot.status === "pending"
              ? slotColorMap.pending
              : slotColorMap.available;
          return (
            <div
              key={slot.slotId}
              title={slot.productName ?? sp.slotAvailableLabel}
              className={`aspect-square rounded border flex items-center justify-center text-xs font-mono font-bold cursor-default transition-all hover:scale-110 ${colorClass}`}
            >
              {slot.slotId}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-accent/20 border border-accent/40 inline-block" /> {sp.legendDentoPoint} (1–{DENTOPOINT_SLOTS})</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/10 border border-blue-500/30 inline-block" /> {sp.legendBooked}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-muted/50 border border-border inline-block" /> {sp.legendAvailable}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-500/10 border border-yellow-500/30 inline-block" /> {sp.legendPending}</span>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{sp.slotsTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{sp.slotsDesc}</p>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: sp.totalSlots, value: TOTAL_SLOTS, icon: Package, color: "text-accent" },
          { label: sp.dpReservedSlots, value: DENTOPOINT_SLOTS, icon: Lock, color: "text-accent" },
          { label: sp.manufacturerSlots, value: MANUFACTURER_SLOTS, icon: CheckCircle2, color: "text-blue-500" },
          { label: sp.monthlySlotRevenue, value: `€${totalMonthlyRevenue.toLocaleString()}`, icon: Euro, color: "text-accent" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Slot grids */}
      {renderSlotGrid(slotsDP001, "DP-001 – Charité Mitte, Berlin")}
      {renderSlotGrid(slotsDP002, "DP-002 – UKE Hamburg")}

      {/* Pricing */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{sp.slotPricingTitle}</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {Object.entries(SLOT_PRICING).map(([cat, fee]) => (
          <div key={cat} className="border border-border rounded-lg p-4 bg-card flex items-center justify-between">
            <span className="text-sm text-foreground capitalize">{cat}</span>
            <span className="font-semibold text-foreground">€{fee}<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
          </div>
        ))}
      </div>

      {/* Active bookings */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{sp.activeBookings}</h2>
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.manufacturer}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.automat}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.slotsCount}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.product}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.monthlyFee}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.status}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{sp.nextMaintenance}</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium text-foreground">{b.manufacturerName}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.automatNr}</td>
                  <td className="px-4 py-3 text-foreground">{b.slotIds.length}</td>
                  <td className="px-4 py-3 text-foreground">{b.productName}</td>
                  <td className="px-4 py-3 text-foreground">€{(b.slotIds.length * b.monthlyFeePerSlot).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      b.status === "active" ? "bg-accent/10 text-accent" :
                      b.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {b.status === "active" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {b.status === "active" ? sp.statusActive : sp.statusPending}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{b.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerSlots;
