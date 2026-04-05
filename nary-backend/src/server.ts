import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sendBookingNotification } from './whatsapp';
import { sendToWebhook } from './webhook';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — allow frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5177',
  methods: ['POST'],
}));

app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Booking endpoint
app.post('/api/bookings', async (req, res) => {
  const { name, phone, service, date, time, notes } = req.body;

  // Basic validation
  if (!name || !phone || !service || !date || !time) {
    res.status(400).json({ error: 'Missing required fields: name, phone, service, date, time' });
    return;
  }

  const booking = { name, phone, service, date, time, notes };

  console.log('New booking:', booking);

  // Respond immediately — don't make the user wait for WhatsApp/webhook
  res.json({
    success: true,
    message: 'Booking received! We will confirm your appointment shortly.',
  });

  // Fire-and-forget: WhatsApp notification
  const whatsappConfigured = process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID
    && process.env.SALON_WHATSAPP_NUMBER;

  if (whatsappConfigured) {
    sendBookingNotification(booking).then(result => {
      if (!result.success) {
        console.warn('WhatsApp send failed:', result.error);
      } else {
        console.log('WhatsApp notification sent');
      }
    });
  } else {
    console.log('WhatsApp not configured — booking logged only.');
  }

  // Fire-and-forget: Google Sheets webhook
  sendToWebhook(booking).then(result => {
    if (result.success) {
      console.log('Booking sent to webhook');
    } else {
      console.log('Webhook skipped:', result.error);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Nary backend running on http://localhost:${PORT}`);

  // Warn if WhatsApp is not configured
  if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_ID) {
    console.warn('\n⚠️  WhatsApp credentials not set. Bookings will be logged but not sent.');
    console.warn('   See .env.example for required variables.\n');
  }
});
