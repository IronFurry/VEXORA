/**
 * Notification Service for VEXORA
 * Provides WhatsApp & SMS message formatting, simulation, and history tracking.
 * Ready to connect to WhatsApp Cloud API / Twilio when credentials are provided.
 */

// In-memory notification storage for demo tracking
const notificationStore = new Map();

class NotificationService {
  /**
   * Log and format an outgoing WhatsApp notification
   */
  async sendNotification({ phone, customerName, title, message, type = "info", ticketNumber, metadata = {} }) {
    const timestamp = new Date();
    const notification = {
      id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      phone,
      customerName,
      title,
      message,
      type, // 'booking_confirmation' | 'travel_reminder' | 'service_started' | 'service_completed'
      ticketNumber,
      metadata,
      sentAt: timestamp.toISOString(),
      channel: "whatsapp",
      status: "delivered",
    };

    console.log(`[VEXORA WhatsApp] To: ${phone} (${customerName}) | ${title}: "${message}"`);

    // Store by phone for retrieval
    const history = notificationStore.get(phone) || [];
    history.unshift(notification);
    notificationStore.set(phone, history.slice(0, 30));

    return notification;
  }

  /**
   * Send booking confirmation with ticket # and initial ETA
   */
  async sendBookingConfirmation({ phone, customerName, ticketNumber, salonName, stylistName, serviceNames, etaMinutes, position }) {
    const title = "🎟️ VEXORA Queue Ticket Confirmed";
    const message = `Hello ${customerName}! Your spot at ${salonName} is confirmed. Ticket #${ticketNumber}. Stylist: ${stylistName}. Services: ${serviceNames}. You are #${position} in line (~${etaMinutes} min wait). We'll notify you when to leave home!`;

    return this.sendNotification({
      phone,
      customerName,
      title,
      message,
      type: "booking_confirmation",
      ticketNumber,
      metadata: { salonName, stylistName, etaMinutes, position },
    });
  }

  /**
   * Send travel-time reminder: triggers when remaining queue time matches or nears travel time
   */
  async sendTravelReminder({ phone, customerName, ticketNumber, salonName, etaMinutes, travelTimeMinutes, distanceKm }) {
    const title = "🚗 Time to Head to Salon!";
    const message = `Heads up ${customerName}! Your turn at ${salonName} is approaching. Estimated wait: ${etaMinutes} min. Travel time: ~${travelTimeMinutes} min (${distanceKm} km). It's a great time to leave home now!`;

    return this.sendNotification({
      phone,
      customerName,
      title,
      message,
      type: "travel_reminder",
      ticketNumber,
      metadata: { salonName, etaMinutes, travelTimeMinutes, distanceKm },
    });
  }

  /**
   * Send notification when stylist begins customer's service
   */
  async sendServiceStarted({ phone, customerName, ticketNumber, salonName, stylistName }) {
    const title = "✂️ Your Service Has Started!";
    const message = `Great news ${customerName}! ${stylistName} at ${salonName} has prepared your chair and your service has started. Enjoy your experience!`;

    return this.sendNotification({
      phone,
      customerName,
      title,
      message,
      type: "service_started",
      ticketNumber,
      metadata: { salonName, stylistName },
    });
  }

  /**
   * Get notifications for a customer by phone
   */
  getNotificationsByPhone(phone) {
    return notificationStore.get(phone) || [];
  }
}

module.exports = new NotificationService();
