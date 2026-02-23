import { ApiStatusCard } from '../components/ApiStatusCard';
import { WaitlistEntryStatus } from '../components/WaitlistEntryStatus';

const statusFlow = ['QUEUED', 'NOTIFIED', 'SEATED'];

export function DashboardPage() {
  return (
    <section>
      <h2>Staff Dashboard Boilerplate</h2>
      <p>
        This starter is aligned with the Waitlist API contract and includes routes, typed API services,
        and polling hooks.
      </p>

      <h3>Status flow</h3>
      <ol>
        {statusFlow.map((status) => (
          <li key={status}>{status}</li>
        ))}
      </ol>

      <ApiStatusCard />
      <WaitlistEntryStatus
        eventId="550e8400-e29b-41d4-a716-446655440000"
        entryId="880e8400-e29b-41d4-a716-446655440003"
      />
    </section>
  );
}
