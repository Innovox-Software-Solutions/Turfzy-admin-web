export type SettlementStatus = "PENDING" | "PAID" | "COMPLETED";

export interface SettlementOwner {
  id: string;
  name: string;
  email: string | null;
  contactNumber: string | null;
}

export interface SettlementItem {
  id: string;
  ownerProfileId: string;
  amount: number;
  status: SettlementStatus;
  txRef: string | null;
  notes: string | null;
  bookingCount: number | null;
  period: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  owner: SettlementOwner;
}

export interface SettlementPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface GetSettlementsResponse {
  success: boolean;
  data: {
    settlements: SettlementItem[];
    pagination: SettlementPagination;
  };
}

export interface GetSettlementDetailsResponse {
  success: boolean;
  data: SettlementItem;
}

export interface CreateSettlementDto {
  ownerProfileId: string;
  amount: number;
  notes?: string;
  bookingCount?: number;
  period?: string;
}

export interface MarkPaidDto {
  txRef: string;
  notes?: string;
}
