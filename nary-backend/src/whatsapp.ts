// WhatsApp Business Cloud API integration
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api

const GRAPH_API = 'https://graph.facebook.com/v21.0';

interface BookingData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

/**
 * Send a WhatsApp text message via Meta Cloud API.
 * This sends to the SALON's number so staff get notified of new bookings.
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

  const message = [
    '📋 *New Booking Request*',
    '',
    `*Name:* ${booking.name}`,
    `*Phone:* ${booking.phone}`,
    `*Service:* ${booking.service}`,
    `*Date:* ${formattedDate}`,
    `*Time:* ${booking.time}`,
    booking.notes ? `*Notes:* ${booking.notes}` : '',
    '',
    '_Sent from narybeautycenter.com_',
  ].filter(Boolean).join('\n');

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
        type: 'text',
        text: { body: message },
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

/**
 * Send a confirmation message to the CUSTOMER's WhatsApp number.
 * Note: The customer must have previously messaged the business number
 * (or opted in) for this to work under WhatsApp Business policy.
 */
export async function sendCustomerConfirmation(booking: BookingData): Promise<{ success: boolean; error?: string }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  if (!token || !phoneId) {
    return { success: false, error: 'WhatsApp not configured' };
  }

  // Strip any spaces/dashes from the phone number
  const customerNumber = booking.phone.replace(/[\s\-\(\)]/g, '').replace(/^\+/, '');

  const formattedDate = new Date(booking.date + 'T00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const message = [
    `Hi ${booking.name}! 💆‍♀️`,
    '',
    'Your booking request at *Nary Beauty Center* has been received.',
    '',
    `*Service:* ${booking.service}`,
    `*Date:* ${formattedDate}`,
    `*Time:* ${booking.time}`,
    '',
    "We'll confirm your appointment shortly. Thank you!",
  ].join('\n');

  try {
    const res = await fetch(`${GRAPH_API}/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: customerNumber,
        type: 'text',
        text: { body: message },
      }),
    });

    const data: any = await res.json();

    if (!res.ok) {
      // Don't fail the whole booking if customer message fails
      console.warn('Customer WhatsApp message failed:', data.error?.message);
      return { success: false, error: data.error?.message };
    }

    return { success: true };
  } catch (err) {
    console.warn('Customer WhatsApp send failed:', err);
    return { success: false, error: 'Network error' };
  }
}
