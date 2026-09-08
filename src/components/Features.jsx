import React from 'react';
import { Cpu, Clock, Navigation, GitFork, CreditCard, LineChart } from 'lucide-react';

const FEATURES = [
  {
    num: '01',
    title: 'Sub-Second Telemetry Engine',
    subtitle: 'WEBSOCKET DISPATCH',
    description: 'Real-time bidirectional synchronization between salon chair sensors, tablet terminals, and customer mobile devices with sub-100ms latency.',
    icon: Cpu
  },
  {
    num: '02',
    title: 'AI Dynamic Wait Estimator',
    subtitle: 'ALGORITHMIC ACCURACY',
    description: 'Continuously self-calibrating algorithms adjust queue times based on specific haircut complexity, stylist pace, and live salon throughput.',
    icon: Clock
  },
  {
    num: '03',
    title: 'Zero Ghost Queues',
    subtitle: 'GEOFENCE VALIDATION',
    description: 'Intelligent GPS proximity checks and automated 2-tap SMS confirmations prevent phantom reservations and protect chair availability.',
    icon: Navigation
  },
  {
    num: '04',
    title: 'Multi-Station Smart Routing',
    subtitle: 'DYNAMIC CHAIR ALLOCATION',
    description: 'If a client finishes early or a barber speeds up, VEXORA instantly re-routes the next customer in line to the soonest available chair.',
    icon: GitFork
  },
  {
    num: '05',
    title: 'Unified Tap & Instant Pay',
    subtitle: 'FRICTIONLESS CHECKOUT',
    description: 'Digital passes support contactless payments, direct stylist tip disbursement, and automated digital receipts delivered via WhatsApp.',
    icon: CreditCard
  },
  {
    num: '06',
    title: 'Floor Analytics & Retention',
    subtitle: 'OPERATIONAL INTELLIGENCE',
    description: 'Comprehensive occupancy heatmaps, peak-hour forecasts, and repeat customer retention tracking built for modern salon owners.',
    icon: LineChart
  }
];

export const Features = () => {
  return (
    <section id="features" className="section-spacing" style={{ borderTop: '1px solid var(--border-subtle)' }}>
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
            <span className="eyebrow">PLATFORM ARCHITECTURE</span>
            <h2 className="section-headline" style={{ marginBottom: 0 }}>
              Engineered with<br />
              extreme discipline.
            </h2>
          </div>
          <div>
            <p className="section-description" style={{ fontSize: '1.15rem' }}>
              Built from the ground up for high-frequency salon operations. Clean APIs, zero fluff, and microsecond precision.
            </p>
          </div>
        </div>

        {/* 6-Grid Features Layout with Thin Borders */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid var(--border-strong)',
          borderLeft: '1px solid var(--border-subtle)'
        }}
        className="features-grid"
        >
          {FEATURES.map((feat, i) => {
            const IconComponent = feat.icon;

            return (
              <div
                key={feat.num}
                style={{
                  padding: '40px 32px',
                  borderRight: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '300px',
                  background: 'var(--bg-white)',
                  transition: 'background-color 0.2s ease'
                }}
                className="feature-cell"
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#0a0a0a',
                      letterSpacing: '0.08em'
                    }}>
                      {feat.num}
                    </span>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0a0a0a'
                    }}>
                      <IconComponent size={16} strokeWidth={1.8} />
                    </div>
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    color: 'var(--text-tertiary)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    {feat.subtitle}
                  </span>

                  <h3 style={{
                    fontSize: '1.22rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '12px'
                  }}>
                    {feat.title}
                  </h3>

                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .feature-cell:hover {
          background-color: var(--bg-surface) !important;
        }
        @media (max-width: 960px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
