/**
 * Slot Management Data
 *
 * Each DentoPoint automat has 29 physical slots:
 *  - 6 slots are reserved by DentoPoint (own positioning / house products)
 *  - 23 slots are available for manufacturers to book
 *
 * Slot bookings are per automat per manufacturer with a monthly rental fee.
 */

export interface Slot {
  slotId: number;          // 1–29
  automatNr: string;
  owner: "dentopoint" | "manufacturer";
  manufacturerId?: string;
  manufacturerName?: string;
  productName?: string;
  productCategory?: SlotCategory;
  monthlyFee: number;      // €/month
  bookedUntil?: string;    // ISO date
  status: "active" | "available" | "reserved";
}

export type SlotCategory =
  | "implant"
  | "whitening"
  | "hygiene"
  | "prevention"
  | "therapeutic"
  | "dentopoint";   // DentoPoint own slots

export interface SlotBooking {
  id: string;
  manufacturerId: string;
  manufacturerName: string;
  automatNr: string;
  slotIds: number[];
  productName: string;
  category: SlotCategory;
  monthlyFeePerSlot: number;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "expired" | "cancelled";
}

export interface ManufacturerSlotSummary {
  manufacturerId: string;
  manufacturerName: string;
  totalSlotsBooked: number;
  totalMonthlyCost: number;
  bookings: SlotBooking[];
}

// ── Slot bookings per automat ──────────────────────────────────────────────

export const mockSlotBookings: SlotBooking[] = [
  // Pilot Automat 1 – Charité Mitte (DP-001)
  { id: "sb-001-01", manufacturerId: "mfr-1", manufacturerName: "OralB Professional", automatNr: "DP-001", slotIds: [7, 8, 9], productName: "Oral-B iO Replacement Heads", category: "hygiene", monthlyFeePerSlot: 180, startDate: "2026-01-01", endDate: "2026-12-31", status: "active" },
  { id: "sb-001-02", manufacturerId: "mfr-2", manufacturerName: "Philips Sonicare", automatNr: "DP-001", slotIds: [10, 11], productName: "Sonicare Brush Heads", category: "hygiene", monthlyFeePerSlot: 180, startDate: "2026-01-01", endDate: "2026-12-31", status: "active" },
  { id: "sb-001-03", manufacturerId: "mfr-3", manufacturerName: "Dentsply Implant Care", automatNr: "DP-001", slotIds: [12, 13, 14, 15], productName: "Implant Care Kit Pro", category: "implant", monthlyFeePerSlot: 220, startDate: "2026-02-01", endDate: "2026-12-31", status: "active" },
  { id: "sb-001-04", manufacturerId: "mfr-4", manufacturerName: "Colgate-Palmolive", automatNr: "DP-001", slotIds: [16, 17, 18], productName: "Colgate Whitening Pro", category: "whitening", monthlyFeePerSlot: 160, startDate: "2026-01-01", endDate: "2026-06-30", status: "active" },
  { id: "sb-001-05", manufacturerId: "mfr-5", manufacturerName: "GC Europe", automatNr: "DP-001", slotIds: [19, 20], productName: "GC Tooth Mousse Plus", category: "therapeutic", monthlyFeePerSlot: 200, startDate: "2026-03-01", endDate: "2026-12-31", status: "pending" },

  // Pilot Automat 2 – UKE Hamburg (DP-002)
  { id: "sb-002-01", manufacturerId: "mfr-1", manufacturerName: "OralB Professional", automatNr: "DP-002", slotIds: [7, 8], productName: "Oral-B iO Replacement Heads", category: "hygiene", monthlyFeePerSlot: 180, startDate: "2026-01-01", endDate: "2026-12-31", status: "active" },
  { id: "sb-002-02", manufacturerId: "mfr-3", manufacturerName: "Dentsply Implant Care", automatNr: "DP-002", slotIds: [9, 10, 11, 12], productName: "Implant Care Kit Pro", category: "implant", monthlyFeePerSlot: 220, startDate: "2026-02-01", endDate: "2026-12-31", status: "active" },
  { id: "sb-002-03", manufacturerId: "mfr-6", manufacturerName: "Sunstar GUM", automatNr: "DP-002", slotIds: [13, 14, 15], productName: "GUM Expanding Floss", category: "prevention", monthlyFeePerSlot: 150, startDate: "2026-01-01", endDate: "2026-12-31", status: "active" },
];

// ── Full slot map for pilot automats ──────────────────────────────────────

function buildSlotMap(automatNr: string): Slot[] {
  const bookings = mockSlotBookings.filter((b) => b.automatNr === automatNr && b.status === "active");
  const slots: Slot[] = [];

  // Slots 1–6: DentoPoint reserved
  for (let i = 1; i <= 6; i++) {
    slots.push({
      slotId: i,
      automatNr,
      owner: "dentopoint",
      productName: i <= 3 ? "DentoPoint House Products" : "DentoPoint Promotion",
      productCategory: "dentopoint",
      monthlyFee: 0,
      status: "reserved",
    });
  }

  // Slots 7–29: manufacturer bookable
  const occupied = new Set<number>();
  for (const booking of bookings) {
    for (const sid of booking.slotIds) {
      occupied.add(sid);
      slots.push({
        slotId: sid,
        automatNr,
        owner: "manufacturer",
        manufacturerId: booking.manufacturerId,
        manufacturerName: booking.manufacturerName,
        productName: booking.productName,
        productCategory: booking.category,
        monthlyFee: booking.monthlyFeePerSlot,
        bookedUntil: booking.endDate,
        status: "active",
      });
    }
  }

  for (let i = 7; i <= 29; i++) {
    if (!occupied.has(i)) {
      slots.push({
        slotId: i,
        automatNr,
        owner: "manufacturer",
        monthlyFee: 160,
        status: "available",
      });
    }
  }

  return slots.sort((a, b) => a.slotId - b.slotId);
}

export const mockSlotsDP001: Slot[] = buildSlotMap("DP-001");
export const mockSlotsDP002: Slot[] = buildSlotMap("DP-002");

export const mockAllSlotBookings: SlotBooking[] = mockSlotBookings;

export const TOTAL_SLOTS = 29;
export const DENTOPOINT_SLOTS = 6;
export const MANUFACTURER_SLOTS = TOTAL_SLOTS - DENTOPOINT_SLOTS; // 23

export const SLOT_PRICING = {
  base: 160,          // €/month standard
  implant: 220,       // €/month for implant category (higher value)
  therapeutic: 200,   // €/month therapeutic
  whitening: 160,
  hygiene: 180,
  prevention: 150,
};
