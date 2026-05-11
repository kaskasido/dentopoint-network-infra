export interface FinancialMetric {
  label: string;
  value: string;
  change: number;
  period: string;
}

export interface GrowthData {
  month: string;
  revenue: number;
  automats: number;
  clinics: number;
}

export interface RegionData {
  region: string;
  automats: number;
  revenue: number;
  growth: number;
}

export const mockFinancials: FinancialMetric[] = [
  { label: "ARR (Annual Recurring Revenue)", value: "€2.4M", change: 34, period: "vs. Vorjahr" },
  { label: "MRR (Monthly Recurring Revenue)", value: "€198K", change: 12, period: "vs. Vormonat" },
  { label: "Netzwerk-Automaten", value: "847", change: 28, period: "vs. Vorjahr" },
  { label: "Aktive Kliniken", value: "124", change: 45, period: "vs. Vorjahr" },
  { label: "Ø Revenue per Automat", value: "€234/Mo", change: 8, period: "vs. Vormonat" },
  { label: "Bruttomarge", value: "68%", change: 3, period: "vs. Vorjahr" },
  { label: "Customer Acquisition Cost", value: "€1.2K", change: -15, period: "vs. Vorjahr" },
  { label: "LTV/CAC Ratio", value: "5.8x", change: 22, period: "vs. Vorjahr" },
];

export const mockGrowthData: GrowthData[] = [
  { month: "Sep 25", revenue: 142000, automats: 580, clinics: 78 },
  { month: "Okt 25", revenue: 151000, automats: 620, clinics: 85 },
  { month: "Nov 25", revenue: 163000, automats: 670, clinics: 92 },
  { month: "Dez 25", revenue: 175000, automats: 710, clinics: 98 },
  { month: "Jan 26", revenue: 185000, automats: 770, clinics: 110 },
  { month: "Feb 26", revenue: 198000, automats: 847, clinics: 124 },
];

export const mockRegionData: RegionData[] = [
  { region: "Bayern", automats: 210, revenue: 520000, growth: 32 },
  { region: "NRW", automats: 185, revenue: 445000, growth: 28 },
  { region: "Baden-Württemberg", automats: 142, revenue: 380000, growth: 41 },
  { region: "Hessen", automats: 98, revenue: 245000, growth: 35 },
  { region: "Niedersachsen", automats: 78, revenue: 190000, growth: 25 },
  { region: "Sachsen", automats: 65, revenue: 158000, growth: 52 },
  { region: "Berlin", automats: 42, revenue: 120000, growth: 60 },
  { region: "Sonstige", automats: 27, revenue: 68000, growth: 18 },
];
