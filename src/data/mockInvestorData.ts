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
  { month: "Mär 26", revenue: 214000, automats: 920, clinics: 138 },
  { month: "Apr 26", revenue: 231000, automats: 1010, clinics: 155 },
];

// Regions split: DE home market + international expansion markets
export const mockRegionData: RegionData[] = [
  // Germany – home market
  { region: "Bayern", automats: 210, revenue: 520000, growth: 32 },
  { region: "NRW", automats: 185, revenue: 445000, growth: 28 },
  { region: "Baden-Württemberg", automats: 142, revenue: 380000, growth: 41 },
  { region: "Hessen", automats: 98, revenue: 245000, growth: 35 },
  { region: "Sonstige DE", automats: 212, revenue: 536000, growth: 22 },
  // International – expansion markets
  { region: "Österreich (AT)", automats: 45, revenue: 118000, growth: 88 },
  { region: "Schweiz (CH)", automats: 38, revenue: 112000, growth: 74 },
  { region: "Niederlande (NL)", automats: 22, revenue: 58000, growth: 210 },
  { region: "Frankreich (FR)", automats: 18, revenue: 46000, growth: 195 },
  { region: "Türkei (TR)", automats: 12, revenue: 28000, growth: 320 },
  { region: "China (CN)", automats: 31, revenue: 98000, growth: 145 },
  { region: "Singapur (SG)", automats: 8, revenue: 32000, growth: 480 },
  { region: "Japan (JP)", automats: 6, revenue: 26000, growth: 390 },
];
