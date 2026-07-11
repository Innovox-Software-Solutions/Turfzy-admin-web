export type NotificationTarget = "ALL_USERS" | "ALL_OWNERS" | "BY_CITY" | "PROMOTIONAL";

export interface BroadcastNotificationDto {
  target: NotificationTarget;
  city?: string;
  title: string;
  body: string;
  data?: Record<string, any>;
}

export interface NotificationLog {
  id: string;
  title: string;
  message: string;
  target: NotificationTarget;
  sentBy: string;
  sentTime: string;
  deliveryStatus: string;
  sentCount: number;
}

export interface NotificationHistoryResponse {
  success: boolean;
  data: {
    history: NotificationLog[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}
