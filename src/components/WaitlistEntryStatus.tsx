import { useWaitlistEntry } from '../hooks/useWaitlistEntry';

interface WaitlistEntryStatusProps {
  eventId: string;
  entryId: string;
}

export function WaitlistEntryStatus({ eventId, entryId }: WaitlistEntryStatusProps) {
  const { entry, loading, error } = useWaitlistEntry(eventId, entryId);

  if (loading) {
    return <p>Checking waitlist status…</p>;
  }

  if (error) {
    return <p className="result-message">Could not load entry: {error}</p>;
  }

  if (!entry) {
    return <p className="result-message">No entry found for provided IDs.</p>;
  }

  return (
    <div className="api-status">
      <h3>Sample Waitlist Status</h3>
      <p>
        <strong>{entry.name}</strong> is currently <strong>{entry.status}</strong>.
      </p>
      <p>
        Position: {entry.position ?? 'n/a'} · Estimated wait: {entry.estimatedWait ?? 'n/a'} mins
      </p>
    </div>
  );
}
