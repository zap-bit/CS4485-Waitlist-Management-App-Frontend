# CS4485 Waitlist Management App Frontend

A real-time management platform designed to streamline entry and room capacity at high-volume, multi-venue events, even under limited connectivity.

## Boilerplate Setup Included

This repository includes an API-ready TypeScript + React + Vite starter with:

- Route-based layout (`Dashboard`, `Venues`, `Not Found`)
- Typed API domain models for event types, queue entry states, and payloads
- Reusable HTTP client with structured API error handling
- Service layer for waitlist and staff dashboard endpoints
- Polling hook (`useWaitlistEntry`) for real-time status checks
- Starter venue intake form wired to `POST /events/{eventId}/waitlist`
- ESLint and TypeScript configuration

## Project Structure

```text
src/
  components/   # reusable UI building blocks
  config/       # environment-backed runtime settings
  hooks/        # custom React hooks (polling/realtime logic)
  lib/          # low-level HTTP/util layer
  pages/        # route pages
  services/     # API integration by domain
  types/        # shared TypeScript models
```

## Environment Variables

Copy the example file and adjust values as needed:

```bash
cp .env.example .env
```

- `VITE_API_BASE_URL` (default: `http://localhost:8000/v1`)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Recommended Next Steps

- Add authenticated login/token storage and inject JWT in service calls
- Implement WebSocket/SSE stream for near real-time updates
- Build paginated waitlist and reservation management screens
- Add tests for service and hook behavior (mocked API)
