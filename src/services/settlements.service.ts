import { api } from "./api";
import {
  GetSettlementsResponse,
  GetSettlementDetailsResponse,
  CreateSettlementDto,
  MarkPaidDto,
  SettlementItem,
} from "@/types/settlements";

export const settlementsService = {
  async getSettlements(params: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<GetSettlementsResponse> {
    const { data } = await api.get<GetSettlementsResponse>("/api/v1/admin/settlements", {
      params,
    });
    return data;
  },

  async getSettlementDetails(id: string): Promise<GetSettlementDetailsResponse> {
    const { data } = await api.get<GetSettlementDetailsResponse>(`/api/v1/admin/settlements/${id}`);
    return data;
  },

  async getOwnerSettlements(ownerId: string): Promise<{ success: boolean; data: SettlementItem[] }> {
    const { data } = await api.get<{ success: boolean; data: SettlementItem[] }>(
      `/api/v1/admin/settlements/owner/${ownerId}`
    );
    return data;
  },

  async createSettlement(payload: CreateSettlementDto): Promise<GetSettlementDetailsResponse> {
    const { data } = await api.post<GetSettlementDetailsResponse>("/api/v1/admin/settlements", payload);
    return data;
  },

  async paySettlement(id: string, payload: MarkPaidDto): Promise<GetSettlementDetailsResponse> {
    const { data } = await api.patch<GetSettlementDetailsResponse>(
      `/api/v1/admin/settlements/${id}/pay`,
      payload
    );
    return data;
  },

  async exportCsv(status?: string): Promise<Blob> {
    const response = await api.get("/api/v1/admin/settlements/export/csv", {
      params: { status },
      responseType: "blob",
    });
    return response.data;
  },

  async exportPdf(status?: string): Promise<Blob> {
    const response = await api.get("/api/v1/admin/settlements/export/pdf", {
      params: { status },
      responseType: "blob",
    });
    return response.data;
  },
};
