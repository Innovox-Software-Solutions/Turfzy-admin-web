import { api } from "./api";
import { GetAnalyticsResponse } from "@/types/analytics";

export const analyticsService = {
  async getAnalytics(): Promise<GetAnalyticsResponse> {
    const { data } = await api.get<GetAnalyticsResponse>("/api/v1/admin/analytics");
    return data;
  },

  async exportCsv(): Promise<Blob> {
    const response = await api.get("/api/v1/admin/analytics/export/csv", {
      responseType: "blob",
    });
    return response.data;
  },

  async exportPdf(): Promise<Blob> {
    const response = await api.get("/api/v1/admin/analytics/export/pdf", {
      responseType: "blob",
    });
    return response.data;
  },
};
