import { useEffect, useState } from 'react';
import { waitlistService } from '../services/waitlistService';
import type { WaitlistEntry } from '../types/api';

interface UseWaitlistEntryResult {
  entry: WaitlistEntry | null;
  loading: boolean;
  error: string | null;
}

export function useWaitlistEntry(eventId: string, entryId: string): UseWaitlistEntryResult {
  const [entry, setEntry] = useState<WaitlistEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchEntry = async () => {
      try {
        const data = await waitlistService.getWaitlistEntry(eventId, entryId);
        if (active) {
          setEntry(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          setError(message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchEntry();
    const interval = window.setInterval(fetchEntry, 15000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [eventId, entryId]);

  return { entry, loading, error };
}
