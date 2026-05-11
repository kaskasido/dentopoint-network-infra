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

export const mockClinicAutomats: ClinicAutomat[] = [];

export const mockClinicOrders: ClinicOrder[] = [];

export const mockPatientFeedback: PatientFeedback[] = [];

