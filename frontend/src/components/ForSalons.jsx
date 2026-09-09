import React from 'react';
import { Activity, BarChart3, Layers, Check, Shield, Users, LayoutDashboard } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const ForSalons = ({ onOpenSalonModal }) => {
  const { navigate } = useNavigation();
  return (
    <section id="for-salons" className="section-spacing" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}>
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
            <span className="eyebrow">FOR SALON OPERATORS</span>
            <h2 className="section-headline" style={{ marginBottom: 0 }}>
              Turn walk-in chaos<br />
              into peak chair throughput.
            </h2>
          </div>
          <div>
            <p className="section-description" style={{ fontSize: '1.15rem' }}>
              VEXORA replaces clipboards, ringing landlines, and overcrowded lobbies with precision operations telemetry built specifically for high-volume salons.
            </p>
          </div>
        </div>

        {/* 3 Metric Cards with Thin Borders */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid var(--border-strong)',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '64px',
          background: 'var(--bg-white)'
        }}
        className="pillars-grid"
        >
          {/* Card 1 */}
          <div style={{
            padding: '40px 32px',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '280px'
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 4vw, 3.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#0a0a0a',
                display: 'block',
                marginBottom: '10px'
              }}>
                +35%
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '14px'
              }}>
                CHAIR UTILIZATION
              </span>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Zero lobby gaps.
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Clients arrive exactly as the previous service finishes. No empty chairs waiting for delayed appointments.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{
            padding: '40px 32px',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '280px'
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 4vw, 3.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#0a0a0a',
                display: 'block',
                marginBottom: '10px'
              }}>
                0 MIN
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '14px'
              }}>
                LOBBY CROWDING
              </span>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                A calm, editorial studio.
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Clear the crowded benches. Clients wait where they choose, arriving only when their chair is being prepped.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '280px'
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 4vw, 3.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#0a0a0a',
                display: 'block',
                marginBottom: '10px'
              }}>
                100%
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '14px'
              }}>
                AUTOMATED DISPATCH
              </span>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                Synchronized sequencing.
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Online bookings and physical walk-ins seamlessly weave into one unified, priority-weighted queue track.
              </p>
            </div>
          </div>
        </div>

        {/* Salon Operations Telemetry Terminal Mockup */}
        <div style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          background: '#0a0a0a',
          color: '#ffffff',
          padding: '36px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.18)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #27272a',
            paddingBottom: '20px',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 800,
                letterSpacing: '0.08em'
              }}>
                VEXORA FLOOR OS
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#a1a1aa',
                padding: '2px 8px',
                border: '1px solid #27272a',
                borderRadius: '3px'
              }}>
                LOOKS &amp; CO. · 4 STATIONS ACTIVE
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('dashboard')}
                className="btn-primary"
                style={{
                  background: '#ffffff',
                  color: '#0a0a0a',
                  padding: '8px 20px',
                  fontSize: '0.84rem'
                }}
              >
                <span>View Dashboard →</span>
              </button>
              <button
                onClick={() => navigate('onboarding')}
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '1px solid #3f3f46',
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <span>List Your Salon</span>
              </button>
            </div>
          </div>

          {/* 4 Styling Stations Status Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '28px'
          }}
          className="salon-stations-grid"
          >
            {[
              { station: 'CHAIR 01', stylist: 'Vikram S.', service: 'Precision Scissor', elapsed: '22 / 30m', status: 'IN SERVICE', active: true },
              { station: 'CHAIR 02', stylist: 'Sameer K.', service: 'Hot Towel Beard', elapsed: '14 / 20m', status: 'IN SERVICE', active: true },
              { station: 'CHAIR 03', stylist: 'Anita R.', service: 'Hair Spa Detox', elapsed: '38 / 45m', status: 'IN SERVICE', active: true },
              { station: 'CHAIR 04', stylist: 'Kunal P.', service: 'Sanitized & Ready', elapsed: 'Next: #107', status: 'READY · ON DECK', active: false },
            ].map((st, i) => (
              <div
                key={i}
                style={{
                  border: st.active ? '1px solid #3f3f46' : '1px solid #27272a',
                  borderRadius: 'var(--radius-sm)',
                  padding: '18px',
                  background: '#141414'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 600 }}>
                    {st.station}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    background: st.active ? 'rgba(255,255,255,0.1)' : '#ffffff',
                    color: st.active ? '#ffffff' : '#0a0a0a',
                    fontWeight: 700
                  }}>
                    {st.status}
                  </span>
                </div>

                <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2px' }}>
                  {st.stylist}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#a1a1aa', marginBottom: '12px' }}>
                  {st.service}
                </div>

                <div style={{
                  borderTop: '1px solid #27272a',
                  paddingTop: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: '#d4d4d8',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>Progress</span>
                  <span style={{ fontWeight: 600 }}>{st.elapsed}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Ops Summary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: '#a1a1aa',
            borderTop: '1px solid #27272a',
            paddingTop: '18px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>TODAY'S TURNOVER: 38 CLIENTS · ₹18,400 INTAKE</div>
            <div>AVERAGE WAIT TIME: 6.2 MINS (99.4% ON-TIME RATE)</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .salon-stations-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .salon-stations-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
