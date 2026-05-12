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
    id: "e74ffd22-bc99-49fd-a9a3-6ef227c7f399",
    nr: "DP_01",
    name: "Zahnarztpraxis Olga Henriette Seifert",
    address: "Clarenbachstraße 2, 50931 Köln",
    city: "Köln",
    country: "DE",
    lat: 50.9356343,
    lng: 6.9235989,
    status: "online",
    fillLevel: 100,
    lastMaintenance: "",
    nextMaintenance: "",
    revenue30d: 0,
    installDate: "",
    products: [],
  },
  {
    id: "830850ae-b2e7-4d66-a1f9-1314bce3a3b6",
    nr: "DP_02",
    name: "DensArt",
    address: "Neusser Straße 222, 50733 Köln",
    city: "Köln",
    country: "DE",
    lat: 50.9620649,
    lng: 6.9545895,
    status: "online",
    fillLevel: 100,
    lastMaintenance: "",
    nextMaintenance: "",
    revenue30d: 0,
    installDate: "",
    products: [],
  },
];

export const mockAlerts: Alert[] = [];

export const mockMaintenance: MaintenanceRecord[] = [];
