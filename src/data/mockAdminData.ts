export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: "clinic" | "manufacturer" | "investor" | "partner" | "admin";
  organization: string;
  status: "aktiv" | "inaktiv" | "gesperrt";
  lastLogin: string;
  createdAt: string;
}

export interface SystemLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  level: "info" | "warning" | "error";
}

export const mockAdminUsers: AdminUser[] = [
  { id: "u1", email: "admin@dentopoint.de", displayName: "System Admin", role: "admin", organization: "DentoPoint GmbH", status: "aktiv", lastLogin: "2026-02-27T22:00:00", createdAt: "2025-01-15" },
  { id: "u2", email: "p.corovic@yahoo.de", displayName: "P. Corovic", role: "manufacturer", organization: "DentoPoint GmbH", status: "aktiv", lastLogin: "2026-02-27T22:55:00", createdAt: "2026-02-27" },
  { id: "u3", email: "klinik@muenchen-dental.de", displayName: "Dr. Müller", role: "clinic", organization: "Zahnklinik München Süd", status: "aktiv", lastLogin: "2026-02-26T14:30:00", createdAt: "2025-06-20" },
  { id: "u4", email: "investor@capital.de", displayName: "Thomas Richter", role: "investor", organization: "Health Capital GmbH", status: "aktiv", lastLogin: "2026-02-25T09:00:00", createdAt: "2025-03-10" },
  { id: "u5", email: "partner@vertrieb.de", displayName: "Sarah Klein", role: "partner", organization: "MedTech Vertrieb", status: "aktiv", lastLogin: "2026-02-27T18:00:00", createdAt: "2025-08-01" },
  { id: "u6", email: "alt@klinik.de", displayName: "Dr. Alt", role: "clinic", organization: "Praxis Alt", status: "inaktiv", lastLogin: "2025-12-01T10:00:00", createdAt: "2025-04-15" },
  { id: "u7", email: "gesperrt@test.de", displayName: "Test User", role: "clinic", organization: "Test Org", status: "gesperrt", lastLogin: "2025-11-15T08:00:00", createdAt: "2025-09-01" },
];

export const mockSystemLogs: SystemLog[] = [
  { id: "l1", action: "Login", user: "p.corovic@yahoo.de", timestamp: "2026-02-27T22:55:00", details: "Erfolgreich eingeloggt", level: "info" },
  { id: "l2", action: "Automat Offline", user: "System", timestamp: "2026-02-27T21:30:00", details: "DP-007 Berlin Mitte - Verbindung verloren", level: "warning" },
  { id: "l3", action: "Rolle zugewiesen", user: "admin@dentopoint.de", timestamp: "2026-02-27T20:00:00", details: "Neue Rolle 'manufacturer' für p.corovic@yahoo.de", level: "info" },
  { id: "l4", action: "Fehlgeschlagener Login", user: "unknown@test.de", timestamp: "2026-02-27T19:00:00", details: "3 fehlgeschlagene Versuche", level: "error" },
  { id: "l5", action: "Bestellung erstellt", user: "klinik@muenchen-dental.de", timestamp: "2026-02-27T14:00:00", details: "200x Zahnbürsten-Set Premium", level: "info" },
  { id: "l6", action: "Wartung geplant", user: "System", timestamp: "2026-02-27T10:00:00", details: "DP-003 Hamburg Eppendorf - Wartung am 05.03.2026", level: "info" },
  { id: "l7", action: "User gesperrt", user: "admin@dentopoint.de", timestamp: "2026-02-26T16:00:00", details: "gesperrt@test.de wegen Verdacht auf Missbrauch", level: "warning" },
];
