export interface ClinicAutomat {
  id: string;
  nr: string;
  location: string;
  floor: string;
  status: "online" | "offline" | "wartung";
  fillLevel: number;
  dailyUsage: number;
  lastRefill: string;
}

export interface ClinicOrder {
  id: string;
  product: string;
  quantity: number;
  status: "bestellt" | "geliefert" | "ausstehend";
  date: string;
}

export interface PatientFeedback {
  id: string;
  rating: number;
  comment: string;
  date: string;
  automatNr: string;
}

export const mockClinicAutomats: ClinicAutomat[] = [
  { id: "c1", nr: "DP-K-001", location: "Eingangsbereich", floor: "EG", status: "online", fillLevel: 82, dailyUsage: 47, lastRefill: "2026-02-25" },
  { id: "c2", nr: "DP-K-002", location: "Wartezimmer Station A", floor: "1. OG", status: "online", fillLevel: 65, dailyUsage: 31, lastRefill: "2026-02-24" },
  { id: "c3", nr: "DP-K-003", location: "Cafeteria", floor: "EG", status: "wartung", fillLevel: 40, dailyUsage: 0, lastRefill: "2026-02-20" },
  { id: "c4", nr: "DP-K-004", location: "Notaufnahme", floor: "EG", status: "online", fillLevel: 91, dailyUsage: 58, lastRefill: "2026-02-26" },
];

export const mockClinicOrders: ClinicOrder[] = [
  { id: "o1", product: "Zahnbürsten-Set Premium", quantity: 200, status: "geliefert", date: "2026-02-20" },
  { id: "o2", product: "Zahnpasta Fluor+", quantity: 150, status: "bestellt", date: "2026-02-26" },
  { id: "o3", product: "Mundspülung Sensitiv", quantity: 100, status: "ausstehend", date: "2026-02-27" },
  { id: "o4", product: "Zahnseide Mint", quantity: 300, status: "geliefert", date: "2026-02-18" },
  { id: "o5", product: "Interdentalbürsten", quantity: 120, status: "bestellt", date: "2026-02-25" },
];

export const mockPatientFeedback: PatientFeedback[] = [
  { id: "f1", rating: 5, comment: "Super Angebot, sehr praktisch!", date: "2026-02-27", automatNr: "DP-K-001" },
  { id: "f2", rating: 4, comment: "Gute Auswahl, könnte günstiger sein.", date: "2026-02-26", automatNr: "DP-K-002" },
  { id: "f3", rating: 5, comment: "Endlich Zahnpflegeprodukte in der Klinik!", date: "2026-02-25", automatNr: "DP-K-001" },
  { id: "f4", rating: 3, comment: "Automat war kurzzeitig außer Betrieb.", date: "2026-02-24", automatNr: "DP-K-003" },
  { id: "f5", rating: 5, comment: "Meine Kinder lieben die Kinderzahnbürsten.", date: "2026-02-23", automatNr: "DP-K-004" },
  { id: "f6", rating: 4, comment: "Bezahlung per Karte funktioniert einwandfrei.", date: "2026-02-22", automatNr: "DP-K-002" },
];
