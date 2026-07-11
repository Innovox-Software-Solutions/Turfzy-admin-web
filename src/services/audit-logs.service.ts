import { api } from "./api";
import { AuditLogsResponse } from "@/types/audit-logs";

export interface GetAuditLogsParams {
  search?: string;
  action?: string;
  adminId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export const auditLogsService = {
  async getAuditLogs(params: GetAuditLogsParams): Promise<AuditLogsResponse> {
    const { data } = await api.get<AuditLogsResponse>("/api/v1/admin/audit-logs", {
      params,
    });
    return data;
  },
};
