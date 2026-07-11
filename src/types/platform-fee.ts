export interface PlatformFeeSlab {
  id: string;
  minAmount: number;
  maxAmount: number;
  platformFee: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSlabDto {
  minAmount: number;
  maxAmount: number;
  platformFee: number;
  isActive?: boolean;
}

export interface UpdateSlabDto {
  minAmount?: number;
  maxAmount?: number;
  platformFee?: number;
  isActive?: boolean;
}
