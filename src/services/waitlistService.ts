import { http } from '../lib/http';
import type {
  JoinWaitlistRequest,
  QueueEntryType,
  WaitlistDashboard,
  WaitlistEntry
} from '../types/api';

export const waitlistService = {
  getDashboard(eventId: string, token?: string) {
    return http<WaitlistDashboard>(`/events/${eventId}/staff/dashboard`, {
      token
    });
  },

  getWaitlistEntry(eventId: string, entryId: string, token?: string) {
    return http<WaitlistEntry>(`/events/${eventId}/waitlist/${entryId}`, {
      token
    });
  },

  joinWaitlist(eventId: string, payload: JoinWaitlistRequest) {
    return http<WaitlistEntry>(`/events/${eventId}/waitlist`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  promoteNext(eventId: string, type?: QueueEntryType, token?: string) {
    return http<{ promotedCount: number }>(`/events/${eventId}/staff/promote`, {
      method: 'POST',
      token,
      body: JSON.stringify({
        count: 1,
        type
      })
    });
  }
};
