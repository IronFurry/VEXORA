import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Users, Zap } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const FinalCta = ({ currentRole, onOpenCustomerModal, onOpenSalonModal }) => {
  const isCustomer = currentRole === 'customer';
  const { navigate } = useNavigation();

  return (
    <section id="get-started" className="section-spacing-lg" style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <span className="eyebrow">GET STARTED TODAY</span>
          <h2 style={{
            fontSize: 'clamp(2.8rem, 5.2vw, 4.6rem)',
            lineHeight: 1.04,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            marginBottom: '28px'
          }}>
            {isCustomer ? (
              <>
                Skip the waiting room.<br />
                Book in real time.
              </>
            ) : (
              <>
                Bring your salon to VEXORA.<br />
                Maximize every chair.
              </>
            )}
          </h2>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            margin: '0 auto 40px auto',
            lineHeight: 1.6
          }}>
            {isCustomer
              ? 'Join thousands of clients discovering top salons, joining live queues remotely, and booking in seconds — no phone calls, no waiting benches.'
              : 'Join premier salons eliminating lobby gaps, automating dispatch, and driving higher revenue with less overhead.'}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '64px'
          }}>
            <button
              onClick={onOpenCustomerModal}
              className="btn-primary"
              style={{ fontSize: '1.02rem', padding: '16px 36px', borderRadius: 'var(--radius-sm)' }}
            >
              <span>Book Now (Customer Experience)</span>
              <ArrowRight size={16} strokeWidth={2} />
            </button>

            <button
              onClick={() => navigate('dashboard')}
              className="btn-secondary"
              style={{ fontSize: '1.02rem', padding: '16px 36px', borderRadius: 'var(--radius-sm)' }}
            >
              <span>Launch Salon Dashboard →</span>
            </button>
          </div>

          {/* Platform Performance Strip */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            textAlign: 'left'
          }}
          className="cta-metrics-grid"
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0a0a0a' }}>
                48,000+
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                QUEUES SERVED
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0a0a0a' }}>
                18 MIN
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                AVERAGE TIME SAVED
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0a0a0a' }}>
                99.4%
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                ON-TIME SEAT RATE
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0a0a0a' }}>
                0 MIN
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                LOBBY WAITING DELAY
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .cta-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};
