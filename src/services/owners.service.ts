import { api } from "./api";
import {
  OwnerListResponse,
  OwnerDetailsResponse,
  BankDetailsResponse,
  SettlementHistoryResponse,
} from "@/types/owners";

export const ownersService = {
  async getOwners(params: {
    search?: string;
    status?: "active" | "suspended";
    page?: number;
    limit?: number;
  }): Promise<OwnerListResponse> {
    const response = await api.get<OwnerListResponse>("/api/v1/admin/owners", {
      params,
    });
    return response.data;
  },

  async getOwnerDetails(id: string): Promise<OwnerDetailsResponse> {
    const response = await api.get<OwnerDetailsResponse>(`/api/v1/admin/owners/${id}`);
    return response.data;
  },

  async suspendOwner(id: string, reason: string): Promise<any> {
    const response = await api.patch(`/api/v1/admin/owners/${id}/suspend`, { reason });
    return response.data;
  },

  async activateOwner(id: string): Promise<any> {
    const response = await api.patch(`/api/v1/admin/owners/${id}/activate`);
    return response.data;
  },

  async getBankDetails(id: string): Promise<BankDetailsResponse> {
    const response = await api.get<BankDetailsResponse>(`/api/v1/admin/owners/${id}/bank-details`);
    return response.data;
  },

  async getSettlements(id: string): Promise<SettlementHistoryResponse> {
    const response = await api.get<SettlementHistoryResponse>(`/api/v1/admin/owners/${id}/settlements`);
    return response.data;
  },

  async exportCsv(): Promise<Blob> {
    const response = await api.get("/api/v1/admin/owners/export/csv", {
      responseType: "blob",
    });
    return response.data;
  },

  async exportPdf(): Promise<Blob> {
    const response = await api.get("/api/v1/admin/owners/export/pdf", {
      responseType: "blob",
    });
    return response.data;
  },
};
