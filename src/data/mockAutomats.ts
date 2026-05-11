export interface Automat {
  id: string;
  nr: string;
  name: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  status: "online" | "offline" | "wartung";
  fillLevel: number; // 0-100
  lastMaintenance: string;
  nextMaintenance: string;
  revenue30d: number;
  products: { name: string; stock: number; maxStock: number }[];
  installDate: string;
}

export interface Alert {
  id: string;
  automatNr: string;
  automatName: string;
  type: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface MaintenanceRecord {
  id: string;
  automatNr: string;
  automatName: string;
  date: string;
  type: string;
  technician: string;
  notes: string;
  duration: string;
}

export const mockAutomats: Automat[] = [
  {
    id: "1", nr: "DP_01", name: "Zahnarztpraxis Olga Henriette Seifert", address: "", city: "Köln", country: "DE",
    lat: 50.9375, lng: 6.9603, status: "online", fillLevel: 100,
    lastMaintenance: "", nextMaintenance: "",
    revenue30d: 0, installDate: "",
    products: [],
  },
];

export const mockAlerts: Alert[] = [];

export const mockMaintenance: MaintenanceRecord[] = [];
