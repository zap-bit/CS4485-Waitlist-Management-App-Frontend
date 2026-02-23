import { useMemo, useState } from 'react';
import { waitlistService } from '../services/waitlistService';
import type { EventType } from '../types/api';

const eventTypes: EventType[] = ['OUTDOOR', 'INDOOR_TABLES', 'INDOOR_SEATED'];

export function VenuesPage() {
  const [eventId, setEventId] = useState('');
  const [guestName, setGuestName] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [eventType, setEventType] = useState<EventType>('INDOOR_TABLES');
  const [resultMessage, setResultMessage] = useState('');

  const helperText = useMemo(() => {
    if (eventType === 'OUTDOOR') {
      return 'Outdoor events typically use simple capacity tracking.';
    }

    if (eventType === 'INDOOR_SEATED') {
      return 'Seated events should include seat/section assignment in staff workflows.';
    }

    return 'Table events support smart assignment and proximity/table requests.';
  }, [eventType]);

  const onSubmit = async (formData: FormData) => {
    const id = String(formData.get('eventId') ?? '').trim();

    if (!id) {
      setResultMessage('Please provide an event ID first.');
      return;
    }

    try {
      const entry = await waitlistService.joinWaitlist(id, {
        name: guestName,
        partySize,
        type: 'waitlist',
        specialRequests
      });

      setResultMessage(`Guest queued successfully. Entry ID: ${entry.id}`);
      setEventId(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create waitlist entry.';
      setResultMessage(message);
    }
  };

  return (
    <section>
      <h2>Venue Intake Boilerplate</h2>
      <p>Use this starter form to test the <code>POST /events/{'{eventId}'}/waitlist</code> integration.</p>

      <label>
        Event Type
        <select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)}>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <p className="helper-text">{helperText}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void onSubmit(new FormData(e.currentTarget));
        }}
      >
        <label>
          Event ID
          <input
            name="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            placeholder="550e8400-e29b-41d4-a716-446655440000"
          />
        </label>

        <label>
          Guest name
          <input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Sarah Johnson" />
        </label>

        <label>
          Party size
          <input
            type="number"
            min={1}
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
          />
        </label>

        <label>
          Special requests
          <input
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Table 5 or near window"
          />
        </label>

        <button type="submit">Create waitlist entry</button>
      </form>

      {resultMessage ? <p className="result-message">{resultMessage}</p> : null}
    </section>
  );
}
