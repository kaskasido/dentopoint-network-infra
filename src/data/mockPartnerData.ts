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

export const mockDeals: PartnerDeal[] = [];

export const mockCommissions: Commission[] = [];

export const mockTerritories: Territory[] = [];

