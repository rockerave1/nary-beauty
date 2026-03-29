import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sendBookingNotification, sendCustomerConfirmation } from './whatsapp';

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

  const whatsappConfigured = process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_ID
    && process.env.WHATSAPP_TOKEN !== 'your_permanent_access_token_here';

  if (whatsappConfigured) {
    // Send notification to salon
    const salonResult = await sendBookingNotification(booking);

    if (!salonResult.success) {
      console.warn('WhatsApp send failed:', salonResult.error);
      // Still accept the booking — don't fail just because WhatsApp is down
    }

    // Try to send confirmation to customer (non-blocking)
    sendCustomerConfirmation(booking).then(result => {
      if (result.success) {
        console.log('Customer confirmation sent to', phone);
      } else {
        console.log('Customer confirmation skipped:', result.error);
      }
    });
  } else {
    console.log('WhatsApp not configured — booking logged only.');
  }

  res.json({
    success: true,
    message: 'Booking received! We will confirm your appointment shortly.',
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
