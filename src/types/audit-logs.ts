export interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  module: string;
  details?: Record<string, any> | null;
  ipAddress?: string | null;
  createdAt: string;
  admin?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface AuditLogsResponse {
  success: boolean;
  data: {
    logs: AuditLog[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
