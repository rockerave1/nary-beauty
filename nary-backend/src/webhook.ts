// Make.com / Zapier webhook integration
// Sends booking data to an external webhook for Google Sheets logging

interface BookingData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

export async function sendToWebhook(booking: BookingData): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, error: 'Webhook URL not configured' };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...booking,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      return { success: false, error: `Webhook returned ${res.status}` };
    }

    return { success: true };
  } catch (err) {
    console.warn('Webhook send failed:', err);
    return { success: false, error: 'Network error' };
  }
}
