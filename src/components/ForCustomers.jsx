import React from 'react';
import { Smartphone, BellRing, Navigation, Clock, ShieldCheck, Check } from 'lucide-react';

export const ForCustomers = () => {
  return (
    <section id="for-customers" className="section-spacing" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '60px',
          marginBottom: '64px',
          alignItems: 'end'
        }}
        className="customer-header-grid"
        >
          <div>
            <span className="eyebrow">THE CUSTOMER JOURNEY</span>
            <h2 className="section-headline" style={{ marginBottom: 0 }}>
              The salon visit.<br />
              Completely friction-free.
            </h2>
          </div>
          <div>
            <p className="section-description" style={{ fontSize: '1.15rem' }}>
              We removed phone calls, guesswork, and waiting benches. Experience complete transparency from your morning routine to the styling chair.
            </p>
          </div>
        </div>

        {/* 3 Editorial Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid var(--border-strong)',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '64px'
        }}
        className="pillars-grid"
        >
          {/* Pillar 1 */}
          <div style={{
            padding: '40px 32px 40px 0',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '280px'
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '16px'
              }}>
                01 / JOIN REMOTELY
              </span>
              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '12px'
              }}>
                Join before you commute.
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Open VEXORA from your desk or cafe. Check wait times across 40+ local salons, lock your spot in line, and commute only when it’s almost your turn.
              </p>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              marginTop: '24px'
            }}>
              ZERO LOBBY BENCHES · REAL-TIME GPS
            </div>
          </div>

          {/* Pillar 2 */}
          <div style={{
            padding: '40px 32px',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '280px'
          }}
          className="pillar-center"
          >
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '16px'
              }}>
                02 / LIVE TELEMETRY
              </span>
              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '12px'
              }}>
                Second-by-second updates.
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Every chair movement, service completion, and position change synchronizes to your device. Automated alerts tell you precisely when to step inside.
              </p>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              marginTop: '24px'
            }}>
              WHATSAPP &amp; SMS · 0 SEC DESYNC
            </div>
          </div>

          {/* Pillar 3 */}
          <div style={{
            padding: '40px 0 40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '280px'
          }}
          className="pillar-right"
          >
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '16px'
              }}>
                03 / IMMEDIATE SEAT
              </span>
              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '12px'
              }}>
                Walk in &amp; be seated.
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Your barber or stylist is already notified. Your station is sanitized and prepped. Walk in, show your digital ticket pass, and sit straight in the chair.
              </p>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              marginTop: '24px'
            }}>
              DIGITAL PASS · INSTANT CHECKOUT
            </div>
          </div>
        </div>

        {/* Clean Monochrome Interactive Pass Demonstration */}
        <div style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }}
        className="pass-demo-grid"
        >
          <div>
            <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
              LIVE MOBILE EXPERIENCE
            </span>
            <h3 style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: '16px'
            }}>
              No app download required. Everything runs in your browser.
            </h3>
            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Access live queues directly on the web. Save your pass to Apple Wallet or Google Pay with a single tap, or follow real-time SMS progress updates.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Instant radial search shows salons within walking distance',
                'Live position updates notify you 8 mins and 3 mins before seat time',
                'Transparent pricing with zero surge fees or hidden salon markups'
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#0a0a0a',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pass Preview Card */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #0a0a0a',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px dashed #e4e4e7', paddingBottom: '14px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em' }}>
                  VEXORA LIVE TICKET
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Looks &amp; Co. Studio · Indiranagar
                </span>
              </div>
              <span className="badge-mono badge-live">LIVE ACTIVE</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>
                  YOUR NUMBER
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3.4rem', fontWeight: 800, lineHeight: 1, color: '#0a0a0a' }}>
                  #07
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>
                  EXPECTED SEAT
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#0a0a0a' }}>
                  ~8 mins
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  1 ahead of you
                </span>
              </div>
            </div>

            <div style={{
              background: '#f4f4f5',
              borderRadius: '8px',
              padding: '12px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--text-primary)'
            }}>
              <span>Precision Haircut + Wash</span>
              <span style={{ fontWeight: 700 }}>₹550</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .pillars-grid > div {
            border-right: none !important;
            padding: 24px 0 !important;
            border-bottom: 1px solid var(--border-subtle);
          }
          .pass-demo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
