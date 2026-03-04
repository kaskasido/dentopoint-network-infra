import { mockAllSlotBookings, TOTAL_SLOTS, DENTOPOINT_SLOTS, MANUFACTURER_SLOTS, mockSlotsDP001, mockSlotsDP002 } from "@/data/mockSlotData";
import { mockAutomats } from "@/data/mockAutomats";
import { useLanguage } from "@/i18n/LanguageContext";
import { Package, Lock, CheckCircle2, Euro, BarChart3 } from "lucide-react";

const AdminSlots = () => {
  const { t } = useLanguage();
  const ap = t.adminPortal;

  const activeBookings = mockAllSlotBookings.filter((b) => b.status === "active");
  const pendingBookings = mockAllSlotBookings.filter((b) => b.status === "pending");
  const totalMfr = [...new Set(activeBookings.map((b) => b.manufacturerId))].length;
  const monthlyRevenue = activeBookings.reduce((s, b) => s + b.slotIds.length * b.monthlyFeePerSlot, 0);
  const annualRevenue = monthlyRevenue * 12;

  const automatStats = mockAutomats.map((a) => {
    const bookings = activeBookings.filter((b) => b.automatNr === a.nr);
    const bookedSlots = bookings.reduce((s, b) => s + b.slotIds.length, 0);
    const availableSlots = MANUFACTURER_SLOTS - bookedSlots;
    const revenue = bookings.reduce((s, b) => s + b.slotIds.length * b.monthlyFeePerSlot, 0);
    return { ...a, bookedSlots, availableSlots, monthlyRevenue: revenue };
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{ap.slotsTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{ap.slotsDesc}</p>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: ap.slotsPerAutomat, value: TOTAL_SLOTS, icon: Package },
          { label: ap.dpReserved, value: DENTOPOINT_SLOTS, icon: Lock },
          { label: ap.mfrSlots, value: MANUFACTURER_SLOTS, icon: CheckCircle2 },
          { label: ap.activeManufacturers, value: totalMfr, icon: BarChart3 },
          { label: ap.monthlySlotRevenue, value: `€${monthlyRevenue.toLocaleString()}`, icon: Euro },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Per-automat slot utilisation */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{ap.slotUtilisationByAutomat}</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.slotsNr}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.slotsLocation}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.slotsCity}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.slotsBooked}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.slotsAvailable}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.slotsUtilisation}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.slotsMonthlyRevenue}</th>
              </tr>
            </thead>
            <tbody>
              {automatStats.map((a) => {
                const util = Math.round((a.bookedSlots / MANUFACTURER_SLOTS) * 100);
                return (
                  <tr key={a.id} className="border-t border-border hover:bg-muted/20">
                    <td className="px-4 py-3 font-mono font-semibold text-foreground text-xs">{a.nr}</td>
                    <td className="px-4 py-3 text-foreground">{a.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.city}</td>
                    <td className="px-4 py-3 text-foreground">{a.bookedSlots}</td>
                    <td className="px-4 py-3 text-foreground">{a.availableSlots}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${util > 80 ? "bg-accent" : util > 40 ? "bg-yellow-500" : "bg-destructive/50"}`} style={{ width: `${util}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{util}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground">€{a.monthlyRevenue.toLocaleString()}</td>
                  </tr>
                );
              })}
              <tr className="border-t-2 border-border bg-muted/30 font-semibold">
                <td colSpan={6} className="px-4 py-3 text-foreground">{ap.total}</td>
                <td className="px-4 py-3 text-foreground">€{monthlyRevenue.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo · €{annualRevenue.toLocaleString()}/yr</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Bookings */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{ap.allSlotBookings} ({pendingBookings.length} {ap.pendingApproval})</h2>
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.bookingManufacturer}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.bookingAutomat}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.bookingSlots}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.bookingProduct}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.bookingFee}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.bookingStatus}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.bookingEnd}</th>
              </tr>
            </thead>
            <tbody>
              {mockAllSlotBookings.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium text-foreground">{b.manufacturerName}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.automatNr}</td>
                  <td className="px-4 py-3 text-foreground">{b.slotIds.join(", ")}</td>
                  <td className="px-4 py-3 text-foreground">{b.productName}</td>
                  <td className="px-4 py-3 text-foreground">€{(b.slotIds.length * b.monthlyFeePerSlot).toLocaleString()}/mo</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      b.status === "active" ? "bg-accent/10 text-accent" :
                      b.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
                      "bg-muted text-muted-foreground"
                    }`}>{b.status}</span>
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

export default AdminSlots;
