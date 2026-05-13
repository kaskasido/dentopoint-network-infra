export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: "clinic" | "manufacturer" | "partner" | "admin";
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

export const mockAdminUsers: AdminUser[] = [];

export const mockSystemLogs: SystemLog[] = [];

