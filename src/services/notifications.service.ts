import { api } from "./api";
import { BroadcastNotificationDto, NotificationHistoryResponse, NotificationLog } from "@/types/notifications";

export const notificationsService = {
  async broadcast(dto: BroadcastNotificationDto): Promise<{ success: boolean; message: string }> {
    const { data } = await api.post<{ success: boolean; message: string }>("/api/v1/admin/notifications/broadcast", dto);
    return data;
  },

  async getHistory(page = 1, limit = 10): Promise<NotificationHistoryResponse> {
    const { data } = await api.get<NotificationHistoryResponse>("/api/v1/admin/notifications/history", {
      params: { page, limit },
    });
    return data;
  },
};
