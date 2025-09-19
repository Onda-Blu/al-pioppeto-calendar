import { google } from 'googleapis';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import process from 'process';
import 'dotenv/config';

const app = express();
app.use(bodyParser.json());

// Load service account credentials
if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set');
}
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
const calendarId = '07b3067fce6c958cd2ce7b642da7e5f65ccb43ae4b933e5757e52facc5c958b2@group.calendar.google.com'; // Replace with your calendar ID

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

// Get available time slots (freebusy)
app.get('/api/calendar/slots', async (req, res) => {
  const { date } = req.query;
  const start = new Date(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        items: [{ id: calendarId }],
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book a time slot (create event)
app.post('/api/calendar/book', async (req, res) => {
  const { start, end, summary, description } = req.body;
  try {
    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        start: { dateTime: start },
        end: { dateTime: end },
        summary,
        description,
      },
    });
    res.json(event.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Google Calendar API server running on port ${PORT}`);
});
