export interface PartnerDeal {
  id: string;
  clinicName: string;
  automats: number;
  status: "lead" | "verhandlung" | "abgeschlossen" | "verloren";
  value: number;
  date: string;
}

export interface Commission {
  id: string;
  month: string;
  amount: number;
  deals: number;
  paid: boolean;
}

export interface Territory {
  region: string;
  leads: number;
  conversions: number;
  automatsPlaced: number;
  revenue: number;
}

export const mockDeals: PartnerDeal[] = [
  { id: "d1", clinicName: "Zahnklinik München Süd", automats: 4, status: "abgeschlossen", value: 48000, date: "2026-02-15" },
  { id: "d2", clinicName: "MVZ Dental Frankfurt", automats: 6, status: "verhandlung", value: 72000, date: "2026-02-22" },
  { id: "d3", clinicName: "Praxis Dr. Weber", automats: 2, status: "lead", value: 24000, date: "2026-02-25" },
  { id: "d4", clinicName: "Universitätsklinikum Köln", automats: 12, status: "verhandlung", value: 144000, date: "2026-02-20" },
  { id: "d5", clinicName: "Zahnarztpraxis Schiller", automats: 3, status: "abgeschlossen", value: 36000, date: "2026-02-10" },
  { id: "d6", clinicName: "Dental Center Hamburg", automats: 5, status: "lead", value: 60000, date: "2026-02-26" },
  { id: "d7", clinicName: "Klinik am Park Berlin", automats: 8, status: "verloren", value: 96000, date: "2026-01-28" },
];

export const mockCommissions: Commission[] = [
  { id: "c1", month: "Februar 2026", amount: 8400, deals: 2, paid: false },
  { id: "c2", month: "Januar 2026", amount: 5200, deals: 1, paid: true },
  { id: "c3", month: "Dezember 2025", amount: 12600, deals: 3, paid: true },
  { id: "c4", month: "November 2025", amount: 7800, deals: 2, paid: true },
  { id: "c5", month: "Oktober 2025", amount: 9400, deals: 2, paid: true },
];

export const mockTerritories: Territory[] = [
  { region: "Bayern Süd", leads: 18, conversions: 6, automatsPlaced: 24, revenue: 288000 },
  { region: "Bayern Nord", leads: 12, conversions: 4, automatsPlaced: 16, revenue: 192000 },
  { region: "Hessen", leads: 8, conversions: 2, automatsPlaced: 8, revenue: 96000 },
];
