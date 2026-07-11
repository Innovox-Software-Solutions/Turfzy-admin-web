export interface OwnerProfile {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  totalTurfs: number;
  totalEarnings: number;
}

export interface OwnerAuth {
  id: string;
  phone: string;
  isBanned: boolean;
  createdAt: string;
  banReason?: string | null;
  bannedAt?: string | null;
  profile: OwnerProfile | null;
}

export interface OwnerListResponse {
  success: boolean;
  data: {
    owners: OwnerAuth[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface BankDetails {
  id: string;
  ownerProfileId: string;
  accountHolderName?: string | null;
  accountNumber?: string | null;
  ifscCode?: string | null;
  bankName?: string | null;
  upiId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BankDetailsResponse {
  success: boolean;
  data: BankDetails | { message: string };
}

export interface SettlementRecord {
  id: string;
  ownerProfileId: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | string;
  referenceId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SettlementHistoryResponse {
  success: boolean;
  data: SettlementRecord[];
}

export interface OwnerDetails {
  owner: {
    id: string;
    phone: string;
    isBanned: boolean;
    banReason: string | null;
    bannedAt: string | null;
    createdAt: string;
    deletedAt: string | null;
    profile: {
      id: string;
      name: string;
      email: string;
      contactNumber: string;
      createdAt: string;
      updatedAt: string;
    } | null;
  };
  bankDetails: BankDetails | null;
  settlementSummary: SettlementRecord[];
  turfCount: number;
  totalEarnings: number;
  rating: {
    average: number;
    count: number;
  };
  activeBookings: number;
}

export interface OwnerDetailsResponse {
  success: boolean;
  data: OwnerDetails;
}
