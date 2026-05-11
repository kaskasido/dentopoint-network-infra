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

export const mockFinancials: FinancialMetric[] = [];

export const mockGrowthData: GrowthData[] = [];

export const mockRegionData: RegionData[] = [];

