export type EventType = 'OUTDOOR' | 'INDOOR_TABLES' | 'INDOOR_SEATED';
export type QueueEntryType = 'reservation' | 'waitlist';
export type QueueEntryStatus =
  | 'QUEUED'
  | 'NOTIFIED'
  | 'SEATED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'NO_SHOW';

export interface WaitlistEntry {
  id: string;
  eventId: string;
  name: string;
  partySize: number;
  type: QueueEntryType;
  status: QueueEntryStatus;
  position?: number;
  estimatedWait?: number;
  specialRequests?: string;
  joinedAt?: string;
}

export interface WaitlistDashboard {
  eventId: string;
  eventType: EventType;
  occupancy: {
    current: number;
    capacity: number;
  };
  queues: {
    reservationsQueued: number;
    waitlistQueued: number;
    notified: number;
  };
  updatedAt: string;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp?: string;
  requestId?: string;
}

export interface JoinWaitlistRequest {
  name: string;
  partySize: number;
  type: QueueEntryType;
  phoneNumber?: string;
  specialRequests?: string;
}
