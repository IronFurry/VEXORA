import React from 'react';

export const Introduction = ({ currentRole }) => {
  const isCustomer = currentRole === 'customer';

  return (
    <section id="why-vexora" className="section-spacing">
      <div className="container">
        {/* Editorial Header */}
        <div style={{ maxWidth: '820px', marginBottom: '80px' }}>
          <span className="eyebrow">WHY VEXORA</span>
          <h2 className="section-headline">
            {isCustomer ? (
              'The salon visit should start before you reach the salon.'
            ) : (
              'The salon day should run on predictability, not chaos.'
            )}
          </h2>
          <p className="section-description">
            {isCustomer ? (
              'See live wait times before you leave home. Join queues remotely, book a slot instantly, and walk into a salon that\'s already expecting you — VEXORA removes every friction from the salon visit.'
            ) : (
              'VEXORA gives salon owners real-time control over lobby occupancy, stylist scheduling, service dispatch, and customer retention — all from one unified platform built for modern salon operations.'
            )}
          </p>
        </div>

        {/* 3 Large Editorial Typography Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)'
        }}
        className="editorial-stats-grid"
        >
          {/* Stat 1: LIVE */}
          <div style={{
            padding: '48px 32px 48px 0',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: '12px'
              }}>
                LIVE
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)'
              }}>
                SYNCHRONIZED METRICS
              </span>
            </div>
            <p style={{
              marginTop: '32px',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              fontWeight: 500
            }}>
              {isCustomer ? 'Queue visibility' : 'Chair throughput'}
            </p>
          </div>

          {/* Stat 2: SMART */}
          <div style={{
            padding: '48px 32px',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          className="stat-center-col"
          >
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: '12px'
              }}>
                SMART
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)'
              }}>
                {isCustomer ? 'GEO-PROXIMITY ENGINE' : 'AUTOMATED DISPATCH'}
              </span>
            </div>
            <p style={{
              marginTop: '32px',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              fontWeight: 500
            }}>
              {isCustomer ? 'Salon discovery' : 'Walk-in & booking balance'}
            </p>
          </div>

          {/* Stat 3: CONNECTED */}
          <div style={{
            padding: '48px 0 48px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          className="stat-right-col"
          >
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: '12px'
              }}>
                CONNECTED
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)'
              }}>
                UNIFIED ECOSYSTEM
              </span>
            </div>
            <p style={{
              marginTop: '32px',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              fontWeight: 500
            }}>
              {isCustomer ? 'Salons, bookings & payments' : 'Inventory + Staff + Finance'}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .editorial-stats-grid {
            grid-template-columns: 1fr !important;
            border-bottom: none !important;
          }
          .editorial-stats-grid > div {
            padding: 36px 0 !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle);
          }
        }
      `}</style>
    </section>
  );
};
