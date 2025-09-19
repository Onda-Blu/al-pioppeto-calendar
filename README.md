# al-pioppeto-calendar

Google Calendar API microservice for booking and viewing available time slots.

## Setup

1. Place your Google service account credentials as `google-service-account.json` in this folder.
2. Update the `calendarId` in `src/google-calendar-api.ts` to your business calendar ID.
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the service:
   ```sh
   npm run start
   ```

## Endpoints

- `GET /api/calendar/slots?date=YYYY-MM-DD` — Get available slots for a date
- `POST /api/calendar/book` — Book a slot (body: `{ start, end, summary, description }`)

## Deployment

This service is ready to deploy to Railway.com or similar platforms. Ensure your credentials are securely managed.
