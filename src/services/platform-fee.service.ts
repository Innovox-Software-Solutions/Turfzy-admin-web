import { api } from "./api";
import { PlatformFeeSlab, CreateSlabDto, UpdateSlabDto } from "@/types/platform-fee";

export const platformFeeService = {
  async getSlabs(): Promise<PlatformFeeSlab[]> {
    const { data } = await api.get<PlatformFeeSlab[]>("/api/v1/admin/platform-fee-slabs");
    return data;
  },

  async getSlabById(id: string): Promise<PlatformFeeSlab> {
    const { data } = await api.get<PlatformFeeSlab>(`/api/v1/admin/platform-fee-slabs/${id}`);
    return data;
  },

  async createSlab(dto: CreateSlabDto): Promise<PlatformFeeSlab> {
    const { data } = await api.post<PlatformFeeSlab>("/api/v1/admin/platform-fee-slabs", dto);
    return data;
  },

  async updateSlab(id: string, dto: UpdateSlabDto): Promise<PlatformFeeSlab> {
    const { data } = await api.put<PlatformFeeSlab>(`/api/v1/admin/platform-fee-slabs/${id}`, dto);
    return data;
  },

  async deleteSlab(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/platform-fee-slabs/${id}`);
  },
};
