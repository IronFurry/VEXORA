import React from 'react';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { HeroAnimation } from './HeroAnimation.jsx';
import { useNavigation } from '../context/NavigationContext';

export const Hero = ({ currentRole, onOpenCustomerModal, onOpenSalonModal }) => {
  const { navigate } = useNavigation();
  const scrollToExplore = () => {
    const nextSection = document.getElementById(currentRole === 'salon' ? 'salons' : 'about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCustomer = currentRole === 'customer';

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: '100px',
      paddingBottom: '40px',
      position: 'relative',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          alignItems: 'center',
          gap: '60px',
          width: '100%'
        }}
        className="hero-grid"
        >
          {/* Left Column: Editorial Headline & Actions */}
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                {isCustomer ? 'THE REAL-TIME SALON PLATFORM · FOR CUSTOMERS' : 'THE REAL-TIME SALON PLATFORM · FOR SALON OPERATORS'}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.8rem, 5.2vw, 4.8rem)',
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              marginBottom: '26px'
            }}>
              {isCustomer ? (
                <>
                  Find your salon.<br />
                  Skip the wait.<br />
                  Book in seconds.
                </>
              ) : (
                <>
                  One dashboard.<br />
                  Every chair filled.
                </>
              )}
            </h1>

            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '38px',
              maxWidth: '560px'
            }}>
              {isCustomer ? (
                'See live wait times before you walk in. Join a queue remotely, book appointments, pay instantly — VEXORA turns an unpredictable errand into a friction-free experience.'
              ) : (
                'The operating system for modern salons. Queue, staff, inventory and revenue — one platform.'
              )}
            </p>

            {/* Role-Specific Action CTAs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '42px'
            }}>
              {isCustomer ? (
                <>
                  <button
                    onClick={onOpenCustomerModal}
                    className="btn-primary"
                    style={{ fontSize: '0.96rem', padding: '16px 32px' }}
                  >
                    <span>Book Now →</span>
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('queue');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-secondary"
                    style={{ fontSize: '0.96rem', padding: '16px 32px' }}
                  >
                    <span>See How It Works</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('onboarding')}
                    className="btn-primary"
                    style={{ fontSize: '0.96rem', padding: '16px 32px' }}
                  >
                    <span>List Your Salon →</span>
                  </button>

                  <button
                    onClick={() => navigate('dashboard')}
                    className="btn-secondary"
                    style={{ fontSize: '0.96rem', padding: '16px 32px' }}
                  >
                    <span>View Dashboard</span>
                  </button>
                </>
              )}
            </div>

            {/* Capability Line */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              letterSpacing: '0.16em',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {isCustomer ? (
                <>
                  <span>LIVE WAIT TIMES</span>
                  <span>·</span>
                  <span>REMOTE QUEUING</span>
                  <span>·</span>
                  <span>INSTANT BOOKING</span>
                  <span>·</span>
                  <span>SMART PAYMENTS</span>
                </>
              ) : (
                <>
                  <span>QUEUE DISPATCH</span>
                  <span>·</span>
                  <span>STAFF SCHEDULING</span>
                  <span>·</span>
                  <span>INVENTORY</span>
                  <span>·</span>
                  <span>REVENUE ANALYTICS</span>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Custom Line-Art Animation */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HeroAnimation currentRole={currentRole} />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        cursor: 'pointer',
        paddingTop: '20px'
      }}
      onClick={scrollToExplore}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase'
        }}>
          SCROLL TO EXPLORE
        </span>
        <div className="floating-arrow" style={{ color: 'var(--text-primary)' }}>
          <ChevronDown size={16} strokeWidth={1.75} />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};
