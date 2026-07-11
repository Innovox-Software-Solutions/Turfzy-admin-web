export interface DashboardStats {
  totalUsers: number;
  totalOwners: number;
  totalTurfs: number;
  activeBookings: number;
  todayBookings: number;
  todayRevenue: number;
  platformFeeEarned: number;
  pendingSettlements: number;
  completedSettlements: number;
  pendingManualApprovals: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  targetType: string;
  targetId: string;
  reason: string;
  ipAddress: string;
  createdAt: string;
  admin?: {
    name: string;
  };
}

export interface ActivityBooking {
  id: string;
  amount: number;
  bookingStatus: string;
  bookingDate: string;
  createdAt: string;
  user: {
    phone: string;
  };
  turf: {
    name: string;
    city?: string;
  };
}

export interface RecentActivity {
  logs: ActivityLog[];
  bookings: ActivityBooking[];
}

export interface Past7DaysChart {
  date: string;
  revenue: number;
  bookings: number;
  users: number;
}

export interface DashboardResponse {
  success: boolean;
  data: {
    stats: DashboardStats;
    recentActivity: RecentActivity;
    charts: Past7DaysChart[];
  };
}

export interface RevenueStats {
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  platformFeeEarned: number;
  totalPlatformFeeWeekly: number;
  totalPlatformFeeMonthly: number;
  pendingSettlementAmount: number;
}

export interface RevenueStatsResponse {
  success: boolean;
  data: RevenueStats;
}

export interface ChartDataResponse {
  success: boolean;
  data: {
    bookingChart: { date: string; bookings: number }[];
    revenueChart: { date: string; revenue: number }[];
    userGrowth: { date: string; count: number }[];
    ownerGrowth: { date: string; count: number }[];
  };
}

export interface RecentBooking {
  id: string;
  amount: number;
  bookingStatus: string;
  bookingDate: string;
  createdAt: string;
  user: {
    phone: string;
    userProfile?: {
      name: string;
    };
  };
  turf: {
    name: string;
    city: string;
  };
}

export interface RecentBookingsResponse {
  success: boolean;
  data: {
    bookings: RecentBooking[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}
