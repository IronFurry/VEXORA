import React from 'react';

const operations = [
  {
    tag: '01',
    title: 'LIVE QUEUE',
    description: 'Know exactly who is waiting and who is being served in every chair in real time.'
  },
  {
    tag: '02',
    title: 'STAFF',
    description: 'Manage staff availability, shift schedules, skill-based assignments and active services.'
  },
  {
    tag: '03',
    title: 'SERVICES',
    description: 'Control service menus, tiered prices, add-on options and calibrated estimated duration.'
  },
  {
    tag: '04',
    title: 'INVENTORY',
    description: 'Track backbar and retail products automatically with proactive low-stock alerts.'
  },
  {
    tag: '05',
    title: 'CUSTOMERS',
    description: 'Understand returning clients, preferred stylists, formula notes and visit frequency patterns.'
  },
  {
    tag: '06',
    title: 'REVIEWS',
    description: 'Monitor post-visit customer feedback, Net Promoter Scores, and overall salon reputation.'
  },
  {
    tag: '07',
    title: 'COUPONS',
    description: 'Create off-peak incentives, targeted loyalty vouchers and track marketing campaign ROI.'
  },
  {
    tag: '08',
    title: 'ANALYTICS',
    description: 'Understand rush hours, high-margin services, seat turnover rate and stylist productivity.'
  }
];

export const SalonOperations = () => {
  return (
    <section className="section-spacing">
      <div className="container">
        {/* Editorial Header */}
        <div style={{ maxWidth: '780px', marginBottom: '72px' }}>
          <span className="eyebrow">SYSTEM ARCHITECTURE</span>
          <h2 className="section-headline">
            Complete operational control.<br />
            Zero friction.
          </h2>
          <p className="section-description">
            Engineered for high-volume modern salons. Every function communicates seamlessly over a unified real-time protocol.
          </p>
        </div>

        {/* Editorial 8-Item Grid separated by 1px rules */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid var(--border-medium)',
          borderLeft: '1px solid var(--border-medium)'
        }}
        className="operations-grid"
        >
          {operations.map((op, idx) => (
            <div
              key={idx}
              style={{
                padding: '40px 32px',
                borderRight: '1px solid var(--border-medium)',
                borderBottom: '1px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '32px'
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  color: 'var(--text-muted)'
                }}>
                  [{op.tag}]
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-tertiary)'
                }}>
                  OP-SYS
                </span>
              </div>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '12px'
                }}>
                  {op.title}
                </h3>
                <p style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)'
                }}>
                  {op.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .operations-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .operations-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
