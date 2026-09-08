import React from 'react';

const customerJourney = [
  { step: '01', title: 'Discover', desc: 'Scan salons within custom distance radii based on real-time open status.' },
  { step: '02', title: 'Compare', desc: 'Evaluate wait times, barber expertise, genuine reviews and transparent service rates.' },
  { step: '03', title: 'Join', desc: 'Enter digital queues from home with instant digital ticket confirmation.' },
  { step: '04', title: 'Track', desc: 'Observe queue countdown with precision milestone push notifications.' },
  { step: '05', title: 'Pay', desc: 'Frictionless checkout with promo codes and digital receipt preservation.' },
  { step: '06', title: 'Review', desc: 'Rate your styling session and save favorite barbers for rapid 1-click repeat bookings.' },
];

const salonJourney = [
  { step: '01', title: 'Register', desc: 'Onboard your location, station count, stylists and service catalogue in 15 minutes.' },
  { step: '02', title: 'Manage', desc: 'Automate queue sequencing, walk-in assignments and chair turnover velocity.' },
  { step: '03', title: 'Operate', desc: 'Synchronize staff shifts, service durations and backbar inventory consumption.' },
  { step: '04', title: 'Analyze', desc: 'Audit revenue patterns, peak hours, idle time and stylist efficiency metrics.' },
  { step: '05', title: 'Retain', desc: 'Deploy automated return reminders, loyalty coupons and personalized offers.' },
  { step: '06', title: 'Grow', desc: 'Expand chair throughput by 35% by eliminating empty lobby waiting gaps.' },
];

export const TwoExperiences = () => {
  return (
    <section className="section-spacing">
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '80px' }}>
          <span className="eyebrow">ONE PLATFORM</span>
          <h2 className="section-headline">
            Two experiences.<br />
            One ecosystem.
          </h2>
          <p className="section-description">
            A synchronized technology protocol linking customer demand directly to salon station capacity in real time.
          </p>
        </div>

        {/* Two Sides with Thin Vertical Divider */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          gap: '0',
          borderTop: '1px solid var(--border-medium)',
          borderBottom: '1px solid var(--border-medium)'
        }}
        className="two-experiences-grid"
        >
          {/* Left: CUSTOMER */}
          <div style={{ padding: '48px 48px 48px 0' }} className="journey-col-left">
            <div style={{ marginBottom: '40px' }}>
              <span className="eyebrow">END-TO-END CONSUMER FLOW</span>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.4rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)'
              }}>
                CUSTOMER
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {customerJourney.map((item) => (
                <div
                  key={item.step}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '24px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    width: '24px'
                  }}>
                    {item.step}
                  </span>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thin Vertical Divider */}
          <div style={{ background: 'var(--border-medium)' }} className="journey-divider" />

          {/* Right: SALON */}
          <div style={{ padding: '48px 0 48px 48px' }} className="journey-col-right">
            <div style={{ marginBottom: '40px' }}>
              <span className="eyebrow">ENTERPRISE SAAS SYSTEM</span>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.4rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)'
              }}>
                SALON
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {salonJourney.map((item) => (
                <div
                  key={item.step}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '24px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    width: '24px'
                  }}>
                    {item.step}
                  </span>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .two-experiences-grid {
            grid-template-columns: 1fr !important;
          }
          .journey-divider {
            display: none !important;
          }
          .journey-col-left {
            padding: 32px 0 !important;
            border-bottom: 1px solid var(--border-medium);
          }
          .journey-col-right {
            padding: 32px 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
