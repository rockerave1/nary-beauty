// WhatsApp Business Cloud API integration
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api

const GRAPH_API = 'https://graph.facebook.com/v22.0';

interface BookingData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

/**
 * Send a booking notification to the salon via WhatsApp template message.
 * Uses the "booking_notification" template so it works without a prior conversation.
 */
export async function sendBookingNotification(booking: BookingData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const salonNumber = process.env.SALON_WHATSAPP_NUMBER;

  if (!token || !phoneId || !salonNumber) {
    console.error('Missing WhatsApp config. Check .env file.');
    return { success: false, error: 'WhatsApp not configured' };
  }

  const formattedDate = new Date(booking.date + 'T00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const dateTime = `${formattedDate} at ${booking.time}`;

  try {
    const res = await fetch(`${GRAPH_API}/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: salonNumber,
        type: 'template',
        template: {
          name: 'booking_notification',
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: booking.name },
                { type: 'text', text: booking.phone },
                { type: 'text', text: booking.service },
                { type: 'text', text: dateTime },
              ],
            },
          ],
        },
      }),
    });

    const data: any = await res.json();

    if (!res.ok) {
      console.error('WhatsApp API error:', data);
      return { success: false, error: data.error?.message || 'Failed to send message' };
    }

    const messageId = data.messages?.[0]?.id;
    console.log('WhatsApp message sent:', messageId);
    return { success: true, messageId };
  } catch (err) {
    console.error('WhatsApp send failed:', err);
    return { success: false, error: 'Network error sending WhatsApp message' };
  }
}
