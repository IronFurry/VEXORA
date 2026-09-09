import React from 'react';
import { ArrowDown, Smartphone, MessageSquare, Globe } from 'lucide-react';

const notifications = [
  {
    step: '01',
    title: 'QUEUE RESERVATION CONFIRMED',
    message: "You're #4 in the queue at Looks & Co.",
    time: '10:14 AM',
    status: 'Delivered via Web & WhatsApp'
  },
  {
    step: '02',
    title: 'PROGRESSION UPDATE',
    message: "You're now #2. Estimated wait is approximately 14 minutes.",
    time: '10:28 AM',
    status: 'Delivered via WhatsApp'
  },
  {
    step: '03',
    title: 'CALL TO SALON',
    message: "You're next. Please make your way to the salon.",
    time: '10:41 AM',
    status: 'Priority Alert via SMS & Push'
  },
  {
    step: '04',
    title: 'SERVICE COMMENCED',
    message: "Your service has started with Stylist Vikram.",
    time: '10:48 AM',
    status: 'Session Synchronized'
  }
];

export const Notifications = () => {
  return (
    <section className="section-spacing">
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '780px', marginBottom: '72px' }}>
          <span className="eyebrow">AUTOMATED TELEMETRY</span>
          <h2 className="section-headline">
            Always know what's next.
          </h2>
          <p className="section-description">
            Predictive status alerts timed exactly to your transit distance, ensuring you arrive precisely as your chair becomes available.
          </p>
        </div>

        {/* Vertical Notification Sequence */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {notifications.map((item, index) => (
            <div key={item.step} style={{ position: 'relative' }}>
              {/* Notification Card */}
              <div style={{
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '24px 28px',
                background: 'var(--bg-white)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      letterSpacing: '0.12em',
                      color: 'var(--text-primary)'
                    }}>
                      VEXORA
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)'
                    }}>
                      · {item.title}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-tertiary)'
                  }}>
                    {item.time}
                  </span>
                </div>

                <p style={{
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '10px'
                }}>
                  {item.message}
                </p>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>✓</span>
                  <span>{item.status}</span>
                </div>
              </div>

              {/* Connecting arrow if not last */}
              {index < notifications.length - 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '16px 0',
                  color: 'var(--text-tertiary)'
                }}>
                  <ArrowDown size={18} strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Multi-channel Delivery note */}
        <div style={{
          marginTop: '60px',
          padding: '28px',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-surface)',
          maxWidth: '680px',
          margin: '48px auto 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          textAlign: 'center'
        }}
        className="notification-channels"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <Globe size={16} strokeWidth={1.5} />
            <span>Instant Web Push</span>
          </div>
          <span style={{ color: 'var(--border-medium)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <MessageSquare size={16} strokeWidth={1.5} />
            <span>WhatsApp Notifications</span>
          </div>
          <span style={{ color: 'var(--border-medium)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <Smartphone size={16} strokeWidth={1.5} />
            <span>SMS Fallback</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .notification-channels {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .notification-channels > span {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
