export interface AnalyticsSummary {
  totalRevenue: number;
  totalPlatformFee: number;
  completedCount: number;
  totalBookingsCount: number;
  cancellationRate: number;
  noShowRate: number;
}

export interface AnalyticsTopTurf {
  id: string;
  name: string;
  bookingsCount: number;
  revenue: number;
}

export interface AnalyticsTopOwner {
  id: string;
  name: string;
  revenue: number;
}

export interface AnalyticsPeakHour {
  hour: string;
  count: number;
}

export interface AnalyticsCity {
  city: string;
  bookingsCount: number;
  revenue: number;
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  topTurfs: AnalyticsTopTurf[];
  topOwners: AnalyticsTopOwner[];
  peakHours: AnalyticsPeakHour[];
  cityAnalytics: AnalyticsCity[];
}

export interface GetAnalyticsResponse {
  success: boolean;
  data: AnalyticsData;
}
