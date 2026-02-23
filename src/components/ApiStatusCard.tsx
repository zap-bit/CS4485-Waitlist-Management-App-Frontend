import { env } from '../config/env';

export function ApiStatusCard() {
  return (
    <aside className="api-status">
      <h3>API Environment</h3>
      <p>
        Base URL: <code>{env.apiBaseUrl}</code>
      </p>
      <p>Update in <code>.env</code> using <code>VITE_API_BASE_URL</code>.</p>
    </aside>
  );
}
