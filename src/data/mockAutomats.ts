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
    id: "1", nr: "DP-001", name: "Charité Mitte", address: "Charitéplatz 1", city: "Berlin", country: "DE",
    lat: 52.5256, lng: 13.3789, status: "online", fillLevel: 78,
    lastMaintenance: "2026-02-10", nextMaintenance: "2026-03-10",
    revenue30d: 4820, installDate: "2025-06-15",
    products: [
      { name: "Implant Care Kit", stock: 24, maxStock: 40 },
      { name: "Whitening Gel Pro", stock: 18, maxStock: 30 },
      { name: "Hygiene Set Standard", stock: 32, maxStock: 50 },
      { name: "Therapeutic Rinse", stock: 12, maxStock: 25 },
    ],
  },
  {
    id: "2", nr: "DP-002", name: "UKE Hamburg", address: "Martinistraße 52", city: "Hamburg", country: "DE",
    lat: 53.5891, lng: 9.9714, status: "online", fillLevel: 45,
    lastMaintenance: "2026-02-18", nextMaintenance: "2026-03-18",
    revenue30d: 3650, installDate: "2025-07-01",
    products: [
      { name: "Implant Care Kit", stock: 10, maxStock: 40 },
      { name: "Whitening Gel Pro", stock: 22, maxStock: 30 },
      { name: "Hygiene Set Standard", stock: 8, maxStock: 50 },
      { name: "Preventive Pack", stock: 15, maxStock: 20 },
    ],
  },
  {
    id: "3", nr: "DP-003", name: "LMU Klinikum", address: "Marchioninistraße 15", city: "München", country: "DE",
    lat: 48.1102, lng: 11.4697, status: "wartung", fillLevel: 92,
    lastMaintenance: "2026-02-25", nextMaintenance: "2026-03-25",
    revenue30d: 5210, installDate: "2025-05-20",
    products: [
      { name: "Implant Care Kit", stock: 35, maxStock: 40 },
      { name: "Whitening Gel Pro", stock: 28, maxStock: 30 },
      { name: "Hygiene Set Standard", stock: 45, maxStock: 50 },
      { name: "Therapeutic Rinse", stock: 20, maxStock: 25 },
    ],
  },
  {
    id: "4", nr: "DP-004", name: "Uniklinik Köln", address: "Kerpener Str. 62", city: "Köln", country: "DE",
    lat: 50.9244, lng: 6.9168, status: "online", fillLevel: 62,
    lastMaintenance: "2026-02-05", nextMaintenance: "2026-03-05",
    revenue30d: 3890, installDate: "2025-08-10",
    products: [
      { name: "Implant Care Kit", stock: 20, maxStock: 40 },
      { name: "Whitening Gel Pro", stock: 15, maxStock: 30 },
      { name: "Hygiene Set Standard", stock: 30, maxStock: 50 },
      { name: "Preventive Pack", stock: 18, maxStock: 20 },
    ],
  },
  {
    id: "5", nr: "DP-005", name: "Uniklinik Frankfurt", address: "Theodor-Stern-Kai 7", city: "Frankfurt", country: "DE",
    lat: 50.0937, lng: 8.6504, status: "offline", fillLevel: 15,
    lastMaintenance: "2026-01-20", nextMaintenance: "2026-02-20",
    revenue30d: 1240, installDate: "2025-09-01",
    products: [
      { name: "Implant Care Kit", stock: 3, maxStock: 40 },
      { name: "Whitening Gel Pro", stock: 2, maxStock: 30 },
      { name: "Hygiene Set Standard", stock: 5, maxStock: 50 },
      { name: "Therapeutic Rinse", stock: 1, maxStock: 25 },
    ],
  },
  {
    id: "6", nr: "DP-006", name: "Inselspital Bern", address: "Freiburgstrasse 18", city: "Bern", country: "CH",
    lat: 46.9470, lng: 7.4253, status: "online", fillLevel: 88,
    lastMaintenance: "2026-02-20", nextMaintenance: "2026-03-20",
    revenue30d: 6100, installDate: "2025-04-15",
    products: [
      { name: "Implant Care Kit", stock: 36, maxStock: 40 },
      { name: "Whitening Gel Pro", stock: 25, maxStock: 30 },
      { name: "Hygiene Set Standard", stock: 42, maxStock: 50 },
      { name: "Preventive Pack", stock: 19, maxStock: 20 },
    ],
  },
  {
    id: "7", nr: "DP-007", name: "AKH Wien", address: "Währinger Gürtel 18-20", city: "Wien", country: "AT",
    lat: 48.2206, lng: 16.3452, status: "online", fillLevel: 55,
    lastMaintenance: "2026-02-12", nextMaintenance: "2026-03-12",
    revenue30d: 4150, installDate: "2025-07-20",
    products: [
      { name: "Implant Care Kit", stock: 18, maxStock: 40 },
      { name: "Whitening Gel Pro", stock: 14, maxStock: 30 },
      { name: "Hygiene Set Standard", stock: 28, maxStock: 50 },
      { name: "Therapeutic Rinse", stock: 10, maxStock: 25 },
    ],
  },
  {
    id: "8", nr: "DP-008", name: "Tongji Shanghai", address: "Yanchang Road 1239", city: "Shanghai", country: "CN",
    lat: 31.2532, lng: 121.4498, status: "online", fillLevel: 70,
    lastMaintenance: "2026-02-15", nextMaintenance: "2026-03-15",
    revenue30d: 7800, installDate: "2025-10-01",
    products: [
      { name: "Implant Care Kit", stock: 28, maxStock: 40 },
      { name: "Whitening Gel Pro", stock: 20, maxStock: 30 },
      { name: "Hygiene Set Standard", stock: 35, maxStock: 50 },
      { name: "Therapeutic Rinse", stock: 15, maxStock: 25 },
    ],
  },
];

export const mockAlerts: Alert[] = [
  { id: "a1", automatNr: "DP-005", automatName: "Uniklinik Frankfurt", type: "critical", message: "Automat offline – keine Verbindung seit 48h", timestamp: "2026-02-27T08:15:00Z", resolved: false },
  { id: "a2", automatNr: "DP-002", automatName: "UKE Hamburg", type: "warning", message: "Füllstand unter 50% – Nachfüllung empfohlen", timestamp: "2026-02-27T06:30:00Z", resolved: false },
  { id: "a3", automatNr: "DP-003", automatName: "LMU Klinikum", type: "info", message: "Planmäßige Wartung läuft", timestamp: "2026-02-25T14:00:00Z", resolved: false },
  { id: "a4", automatNr: "DP-005", automatName: "Uniklinik Frankfurt", type: "warning", message: "Niedriger Produktbestand: Implant Care Kit (3/40)", timestamp: "2026-02-26T10:45:00Z", resolved: false },
  { id: "a5", automatNr: "DP-001", automatName: "Charité Mitte", type: "info", message: "Wartung erfolgreich abgeschlossen", timestamp: "2026-02-10T16:00:00Z", resolved: true },
  { id: "a6", automatNr: "DP-004", automatName: "Uniklinik Köln", type: "warning", message: "Nächste Wartung überfällig (05.03.2026)", timestamp: "2026-02-27T00:00:00Z", resolved: false },
];

export const mockMaintenance: MaintenanceRecord[] = [
  { id: "m1", automatNr: "DP-003", automatName: "LMU Klinikum", date: "2026-02-25", type: "Planmäßige Wartung", technician: "M. Weber", notes: "Kalibrierung, Reinigung, Software-Update v3.2", duration: "2h 15min" },
  { id: "m2", automatNr: "DP-002", automatName: "UKE Hamburg", date: "2026-02-18", type: "Nachfüllung", technician: "K. Schulz", notes: "Alle Produkte aufgefüllt, Sensor geprüft", duration: "45min" },
  { id: "m3", automatNr: "DP-001", automatName: "Charité Mitte", date: "2026-02-10", type: "Planmäßige Wartung", technician: "M. Weber", notes: "Kompressor getauscht, Temperaturregelung optimiert", duration: "3h 00min" },
  { id: "m4", automatNr: "DP-004", automatName: "Uniklinik Köln", date: "2026-02-05", type: "Störungsbehebung", technician: "L. Fischer", notes: "Kartenleser-Modul ersetzt, Testlauf erfolgreich", duration: "1h 30min" },
  { id: "m5", automatNr: "DP-005", automatName: "Uniklinik Frankfurt", date: "2026-01-20", type: "Planmäßige Wartung", technician: "K. Schulz", notes: "Volle Inspektion, keine Auffälligkeiten", duration: "2h 00min" },
  { id: "m6", automatNr: "DP-006", automatName: "Inselspital Bern", date: "2026-02-20", type: "Nachfüllung", technician: "P. Meier", notes: "Produkte aufgefüllt, Display-Kalibrierung", duration: "50min" },
  { id: "m7", automatNr: "DP-007", automatName: "AKH Wien", date: "2026-02-12", type: "Planmäßige Wartung", technician: "A. Huber", notes: "Software-Update v3.2, Sensorcheck", duration: "1h 45min" },
  { id: "m8", automatNr: "DP-008", automatName: "Tongji Shanghai", date: "2026-02-15", type: "Nachfüllung", technician: "L. Chen", notes: "Vollständig aufgefüllt, Netzwerk-Check", duration: "1h 00min" },
];
