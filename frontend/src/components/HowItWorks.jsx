import React from 'react';

const customerSteps = [
  {
    num: '01',
    phase: 'DISCOVER',
    title: 'Find salons around you.',
    description: 'Use your location to discover nearby salons and compare services, ratings, distance and current waiting times.',
    meta: 'RADIAL GPS SEARCH · REAL-TIME AVAILABILITY'
  },
  {
    num: '02',
    phase: 'JOIN',
    title: 'Reserve your place.',
    description: 'Choose a service, view the live queue and join the salon that works best for you.',
    meta: 'CHAIR ALLOCATION · LIVE TICKET ISSUANCE'
  },
  {
    num: '03',
    phase: 'GO',
    title: 'Arrive when it matters.',
    description: 'Track your live queue position and estimated waiting time instead of sitting around unnecessarily.',
    meta: 'AUTOMATED PUSH · 0 MINUTE LOBBY DELAY'
  }
];

const salonSteps = [
  {
    num: '01',
    phase: 'CONFIGURE',
    title: 'Set up chairs, staff & catalog.',
    description: 'Input your station count, stylists, work shifts, services and expected durations in under 15 minutes.',
    meta: 'STATION MAPPING · TIERED SERVICE PRICING'
  },
  {
    num: '02',
    phase: 'SYNCHRONIZE',
    title: 'Automate queue & walk-in flow.',
    description: 'VEXORA sequences online bookings and walk-in arrivals into one smart, priority-calibrated queue.',
    meta: 'AUTO DISPATCH · WEBSOCKET LIVE SYNC'
  },
  {
    num: '03',
    phase: 'SCALE',
    title: 'Eliminate lobby gaps & grow intake.',
    description: 'Keep every styling chair active with smooth handoffs and automatic client arrival notifications.',
    meta: '35% HIGHER THROUGHPUT · ZERO IDLE TIME'
  }
];

export const HowItWorks = ({ currentRole }) => {
  const isCustomer = currentRole === 'customer';
  const steps = isCustomer ? customerSteps : salonSteps;

  return (
    <section id="how-it-works" className="section-spacing">
      <div className="container">
        {/* Section Heading */}
        <div style={{ maxWidth: '780px', marginBottom: '84px' }}>
          <span className="eyebrow">{isCustomer ? 'FOR CUSTOMERS' : 'FOR SALONS'}</span>
          <h2 className="section-headline">
            {isCustomer ? 'A simpler way to visit the salon.' : 'A smarter way to run salon operations.'}
          </h2>
          <p className="section-description">
            {isCustomer
              ? 'Experience complete predictability from your morning coffee to the styling chair. No phone calls, no waiting benches.'
              : 'Transform walk-in chaos into an automated, predictable high-efficiency operation that delights customers and stylists alike.'}
          </p>
        </div>

        {/* 3 Horizontally Aligned Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px'
        }}
        className="how-it-works-grid"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingTop: '32px',
                borderTop: '1px solid var(--border-strong)',
                minHeight: '340px'
              }}
            >
              <div>
                {/* Large Editorial Number */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '28px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.6rem, 4vw, 3.6rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    color: 'var(--text-primary)'
                  }}>
                    {step.num}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.14em',
                    color: 'var(--text-muted)'
                  }}>
                    {step.phase}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  marginBottom: '14px',
                  color: 'var(--text-primary)'
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)'
                }}>
                  {step.description}
                </p>
              </div>

              {/* Monospace capability footnote */}
              <div style={{
                paddingTop: '24px',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: '32px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: 'var(--text-tertiary)'
              }}>
                {step.meta}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};
