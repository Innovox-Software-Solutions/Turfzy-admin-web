export interface PlatformSettings {
  maintenanceMode: boolean;
  bookingWindowDays: number;
  termsUrl: string;
  privacyUrl: string;
  contactEmail: string;
  contactPhone: string;
  notificationTemplates?: Record<string, any>;
}

export interface GetSettingsResponse {
  success: boolean;
  data: PlatformSettings;
}

export interface UpdateSettingsDto {
  maintenanceMode?: boolean;
  bookingWindowDays?: number;
  termsUrl?: string;
  privacyUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  notificationTemplates?: Record<string, any>;
}
