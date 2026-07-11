import { api } from "./api";
import {
  DashboardResponse,
  RevenueStatsResponse,
  ChartDataResponse,
  RecentBookingsResponse,
} from "@/types/dashboard";

export const dashboardService = {
  async getDashboard(): Promise<DashboardResponse> {
    const response = await api.get<DashboardResponse>("/api/v1/admin/dashboard");
    return response.data;
  },

  async getRevenue(): Promise<RevenueStatsResponse> {
    const response = await api.get<RevenueStatsResponse>("/api/v1/admin/dashboard/revenue");
    return response.data;
  },

  async getCharts(): Promise<ChartDataResponse> {
    const response = await api.get<ChartDataResponse>("/api/v1/admin/dashboard/charts");
    return response.data;
  },

  async getRecentBookings(page = 1, limit = 10): Promise<RecentBookingsResponse> {
    const response = await api.get<RecentBookingsResponse>("/api/v1/admin/dashboard/recent-bookings", {
      params: { page, limit },
    });
    return response.data;
  },
};
