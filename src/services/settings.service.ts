import { api } from "./api";
import { PlatformSettings, GetSettingsResponse, UpdateSettingsDto } from "@/types/settings";

export const settingsService = {
  async getSettings(): Promise<GetSettingsResponse> {
    const { data } = await api.get<GetSettingsResponse>("/api/v1/admin/settings");
    return data;
  },

  async updateSettings(dto: UpdateSettingsDto): Promise<GetSettingsResponse> {
    const { data } = await api.put<GetSettingsResponse>("/api/v1/admin/settings", dto);
    return data;
  },
};
