/**
 * Leasing & Contract Data
 *
 * DentoPoint sells automats to clinics, MVZs and hospitals primarily via
 * a leasing model. Each contract covers:
 *  - Monthly leasing rate for the hardware
 *  - Optional service level (Basic / Advanced / Premium)
 *  - Payment terminal configuration
 *  - Installation & onboarding
 */

export type ServiceLevel = "basic" | "advanced" | "premium";
export type ContractStatus = "active" | "pending" | "expired" | "terminated";
export type PaymentMethod = "card" | "contactless" | "qr" | "app";
export type TerminalStatus = "online" | "offline" | "maintenance";

export interface LeasingContract {
  id: string;
  clinicId: string;
  clinicName: string;
  automatNr: string;
  automatCount: number;
  serviceLevel: ServiceLevel;
  monthlyRate: number;           // € per automat per month
  leasingDurationMonths: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  installAddress: string;
  city: string;
  country: string;
  signedDate: string;
  contactPerson: string;
  contactEmail: string;
  totalContractValue: number;    // total over full duration
}

export interface PaymentTerminal {
  id: string;
  automatNr: string;
  clinicName: string;
  terminalModel: string;
  serialNumber: string;
  status: TerminalStatus;
  acceptedMethods: PaymentMethod[];
  currency: string;
  lastTransaction: string;
  transactionCount30d: number;
  revenue30d: number;
  softwareVersion: string;
  lastHeartbeat: string;
}

export interface ServiceLevelSpec {
  level: ServiceLevel;
  label: string;
  monthlyRate: number;
  maintenanceIntervalDays: number;
  responseTimeHours: number;
  includes: string[];
}

// ── Service Level Specifications ─────────────────────────────────────────

export const serviceLevelSpecs: ServiceLevelSpec[] = [
  {
    level: "basic",
    label: "Basic",
    monthlyRate: 290,
    maintenanceIntervalDays: 90,
    responseTimeHours: 48,
    includes: [
      "Hardware leasing",
      "Remote monitoring",
      "Refill coordination",
      "E-mail support",
    ],
  },
  {
    level: "advanced",
    label: "Advanced",
    monthlyRate: 490,
    maintenanceIntervalDays: 60,
    responseTimeHours: 24,
    includes: [
      "All Basic features",
      "On-site maintenance (quarterly)",
      "Display content management",
      "Phone support",
      "Monthly KPI report",
    ],
  },
  {
    level: "premium",
    label: "Premium",
    monthlyRate: 790,
    maintenanceIntervalDays: 30,
    responseTimeHours: 4,
    includes: [
      "All Advanced features",
      "Monthly on-site service",
      "Dedicated account manager",
      "Google Maps premium listing",
      "Patient study participation",
      "Custom display branding",
      "Priority slot placement",
    ],
  },
];

// ── Active Leasing Contracts ──────────────────────────────────────────────

export const mockLeasingContracts: LeasingContract[] = [
  {
    id: "lc-001",
    clinicId: "clinic-1",
    clinicName: "Charité Universitätsmedizin Berlin",
    automatNr: "DP-001",
    automatCount: 1,
    serviceLevel: "premium",
    monthlyRate: 790,
    leasingDurationMonths: 36,
    startDate: "2025-06-15",
    endDate: "2028-06-14",
    status: "active",
    installAddress: "Charitéplatz 1",
    city: "Berlin",
    country: "DE",
    signedDate: "2025-05-20",
    contactPerson: "Dr. Andrea Hoffmann",
    contactEmail: "a.hoffmann@charite.de",
    totalContractValue: 28440,
  },
  {
    id: "lc-002",
    clinicId: "clinic-2",
    clinicName: "Universitätsklinikum Hamburg-Eppendorf (UKE)",
    automatNr: "DP-002",
    automatCount: 1,
    serviceLevel: "advanced",
    monthlyRate: 490,
    leasingDurationMonths: 24,
    startDate: "2025-07-01",
    endDate: "2027-06-30",
    status: "active",
    installAddress: "Martinistraße 52",
    city: "Hamburg",
    country: "DE",
    signedDate: "2025-06-10",
    contactPerson: "Dirk Brenner",
    contactEmail: "d.brenner@uke.de",
    totalContractValue: 11760,
  },
  {
    id: "lc-003",
    clinicId: "clinic-3",
    clinicName: "LMU Klinikum München",
    automatNr: "DP-003",
    automatCount: 1,
    serviceLevel: "premium",
    monthlyRate: 790,
    leasingDurationMonths: 36,
    startDate: "2025-05-20",
    endDate: "2028-05-19",
    status: "active",
    installAddress: "Marchioninistraße 15",
    city: "München",
    country: "DE",
    signedDate: "2025-04-28",
    contactPerson: "Prof. Dr. Klaus Bauer",
    contactEmail: "k.bauer@lmu-klinikum.de",
    totalContractValue: 28440,
  },
  {
    id: "lc-004",
    clinicId: "clinic-4",
    clinicName: "Inselspital Bern",
    automatNr: "DP-006",
    automatCount: 1,
    serviceLevel: "premium",
    monthlyRate: 890,
    leasingDurationMonths: 36,
    startDate: "2025-04-15",
    endDate: "2028-04-14",
    status: "active",
    installAddress: "Freiburgstrasse 18",
    city: "Bern",
    country: "CH",
    signedDate: "2025-03-22",
    contactPerson: "Dr. Barbara Müller",
    contactEmail: "b.mueller@inselspital.ch",
    totalContractValue: 32040,
  },
  {
    id: "lc-005",
    clinicId: "clinic-5",
    clinicName: "Medipol Istanbul Hastanesi",
    automatNr: "DP-011",
    automatCount: 1,
    serviceLevel: "advanced",
    monthlyRate: 390,
    leasingDurationMonths: 24,
    startDate: "2026-02-01",
    endDate: "2028-01-31",
    status: "active",
    installAddress: "Bağcılar Mahallesi, Atatürk Cad.",
    city: "Istanbul",
    country: "TR",
    signedDate: "2026-01-10",
    contactPerson: "Ahmet Yilmaz",
    contactEmail: "a.yilmaz@medipol.com.tr",
    totalContractValue: 9360,
  },
  {
    id: "lc-006",
    clinicId: "clinic-6",
    clinicName: "National University Hospital Singapore",
    automatNr: "DP-012",
    automatCount: 1,
    serviceLevel: "premium",
    monthlyRate: 990,
    leasingDurationMonths: 36,
    startDate: "2025-12-01",
    endDate: "2028-11-30",
    status: "active",
    installAddress: "5 Lower Kent Ridge Rd",
    city: "Singapore",
    country: "SG",
    signedDate: "2025-11-05",
    contactPerson: "Dr. Tan Wei Ling",
    contactEmail: "tanwl@nuh.com.sg",
    totalContractValue: 35640,
  },
  {
    id: "lc-007",
    clinicId: "clinic-7",
    clinicName: "MVZ Dental Frankfurt",
    automatNr: "DP-013-PENDING",
    automatCount: 2,
    serviceLevel: "advanced",
    monthlyRate: 490,
    leasingDurationMonths: 24,
    startDate: "2026-04-01",
    endDate: "2028-03-31",
    status: "pending",
    installAddress: "Theodor-Stern-Kai 7",
    city: "Frankfurt",
    country: "DE",
    signedDate: "2026-03-01",
    contactPerson: "Dr. Lisa Kessler",
    contactEmail: "l.kessler@mvz-frankfurt.de",
    totalContractValue: 23520,
  },
];

// ── Payment Terminals ──────────────────────────────────────────────────────

export const mockPaymentTerminals: PaymentTerminal[] = [
  {
    id: "pt-001",
    automatNr: "DP-001",
    clinicName: "Charité Mitte",
    terminalModel: "Ingenico Move/5000",
    serialNumber: "M5K-2025-0023",
    status: "online",
    acceptedMethods: ["card", "contactless", "qr", "app"],
    currency: "EUR",
    lastTransaction: "2026-03-03T21:47:00Z",
    transactionCount30d: 312,
    revenue30d: 4820,
    softwareVersion: "8.4.1",
    lastHeartbeat: "2026-03-03T22:50:00Z",
  },
  {
    id: "pt-002",
    automatNr: "DP-002",
    clinicName: "UKE Hamburg",
    terminalModel: "Ingenico Move/5000",
    serialNumber: "M5K-2025-0024",
    status: "online",
    acceptedMethods: ["card", "contactless", "qr"],
    currency: "EUR",
    lastTransaction: "2026-03-03T20:10:00Z",
    transactionCount30d: 251,
    revenue30d: 3650,
    softwareVersion: "8.4.1",
    lastHeartbeat: "2026-03-03T22:49:00Z",
  },
  {
    id: "pt-003",
    automatNr: "DP-005",
    clinicName: "Uniklinik Frankfurt",
    terminalModel: "Verifone P400",
    serialNumber: "VFP400-2025-0011",
    status: "offline",
    acceptedMethods: ["card", "contactless"],
    currency: "EUR",
    lastTransaction: "2026-03-01T09:22:00Z",
    transactionCount30d: 88,
    revenue30d: 1240,
    softwareVersion: "8.2.3",
    lastHeartbeat: "2026-03-01T09:30:00Z",
  },
  {
    id: "pt-004",
    automatNr: "DP-006",
    clinicName: "Inselspital Bern",
    terminalModel: "Ingenico Move/5000",
    serialNumber: "M5K-2025-0031",
    status: "online",
    acceptedMethods: ["card", "contactless", "qr", "app"],
    currency: "CHF",
    lastTransaction: "2026-03-03T22:01:00Z",
    transactionCount30d: 398,
    revenue30d: 6100,
    softwareVersion: "8.4.1",
    lastHeartbeat: "2026-03-03T22:55:00Z",
  },
  {
    id: "pt-005",
    automatNr: "DP-012",
    clinicName: "NUH Singapore",
    terminalModel: "PAX A920",
    serialNumber: "PAX-2025-SG-007",
    status: "online",
    acceptedMethods: ["card", "contactless", "qr", "app"],
    currency: "SGD",
    lastTransaction: "2026-03-03T14:30:00Z",
    transactionCount30d: 610,
    revenue30d: 9200,
    softwareVersion: "9.1.0",
    lastHeartbeat: "2026-03-03T22:52:00Z",
  },
];
