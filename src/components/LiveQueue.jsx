import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, User, CheckCircle2 } from 'lucide-react';

export const LiveQueue = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [userPosition, setUserPosition] = useState(3);
  const [estimatedWait, setEstimatedWait] = useState(12);
  const sectionRef = useRef(null);

  const [queue, setQueue] = useState([
    { ticket: '#104', name: 'Rahul Sharma', service: 'Precision Haircut', status: 'IN SERVICE', barber: 'Chair 1 — Vikram' },
    { ticket: '#105', name: 'Akash Verma', service: 'Beard Trim & Sculpt', status: 'IN SERVICE', barber: 'Chair 2 — Sameer' },
    { ticket: '#106', name: 'Priya Nair', service: 'Facial & Head Massage', status: 'WAITING', barber: 'Chair 3 — Anita' },
    { ticket: '#107', name: 'Aryan Sharma (You)', service: 'Precision Haircut', status: 'WAITING', barber: 'Chair 1 — Next on Deck', isUser: true },
    { ticket: '#108', name: 'Neha Kapoor', service: 'Haircut & Styling', status: 'WAITING', barber: 'Unassigned' }
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const timer = setTimeout(() => {
            advanceQueue();
          }, 1200);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const advanceQueue = () => {
    setQueue((prev) =>
      prev.map((item) => {
        if (item.ticket === '#104') {
          return { ...item, status: 'COMPLETED' };
        }
        if (item.ticket === '#106') {
          return { ...item, status: 'IN SERVICE' };
        }
        if (item.ticket === '#107') {
          return { ...item, status: 'UP NEXT' };
        }
        return item;
      })
    );
    setUserPosition(2);
    setEstimatedWait(7);
    setHasAnimated(true);
  };

  const resetQueue = () => {
    setQueue([
      { ticket: '#104', name: 'Rahul Sharma', service: 'Precision Haircut', status: 'IN SERVICE', barber: 'Chair 1 — Vikram' },
      { ticket: '#105', name: 'Akash Verma', service: 'Beard Trim & Sculpt', status: 'IN SERVICE', barber: 'Chair 2 — Sameer' },
      { ticket: '#106', name: 'Priya Nair', service: 'Facial & Head Massage', status: 'WAITING', barber: 'Chair 3 — Anita' },
      { ticket: '#107', name: 'Aryan Sharma (You)', service: 'Precision Haircut', status: 'WAITING', barber: 'Chair 1 — Next on Deck', isUser: true },
      { ticket: '#108', name: 'Neha Kapoor', service: 'Haircut & Styling', status: 'WAITING', barber: 'Unassigned' }
    ]);
    setUserPosition(3);
    setEstimatedWait(12);
    setHasAnimated(false);
  };

  return (
    <section ref={sectionRef} id="live-queue" className="section-spacing">
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '64px' }}>
          <span className="eyebrow">LIVE TELEMETRY</span>
          <h2 className="section-headline">
            Your queue.<br />
            Live.
          </h2>
          <p className="section-description">
            No more guessing how long you'll wait. VEXORA keeps customers and salon staff synchronized in real time with second-by-second updates.
          </p>
        </div>

        {/* Queue Dashboard Container */}
        <div style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-white)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          {/* Top telemetry bar */}
          <div style={{
            padding: '20px 32px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}>
                CURRENT QUEUE — SALON #042 (LOOKS &amp; CO.)
              </span>
              <span className="badge-mono badge-live">LIVE SYNC</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={hasAnimated ? resetQueue : advanceQueue}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-medium)',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  background: 'var(--bg-white)',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0a0a0a')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
              >
                <RefreshCw size={12} strokeWidth={1.75} />
                <span>{hasAnimated ? 'RESET SIMULATION' : 'ADVANCE QUEUE'}</span>
              </button>
            </div>
          </div>

          {/* Queue Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '16px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>TICKET</th>
                  <th style={{ padding: '16px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>CUSTOMER NAME</th>
                  <th style={{ padding: '16px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>SERVICE</th>
                  <th style={{ padding: '16px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>CHAIR / STYLIST</th>
                  <th style={{ padding: '16px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--text-muted)', textAlign: 'right' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((item) => {
                  const isInService = item.status === 'IN SERVICE';
                  const isUser = item.isUser;

                  return (
                    <tr
                      key={item.ticket}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        backgroundColor: isUser ? '#fafafa' : isInService ? 'var(--bg-subtle)' : 'transparent',
                        transition: 'background-color 0.4s ease'
                      }}
                    >
                      <td style={{ padding: '22px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.ticket}
                      </td>
                      <td style={{ padding: '22px 32px', fontWeight: isUser ? 700 : 500, color: 'var(--text-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: isUser ? '#0a0a0a' : 'var(--bg-surface)',
                            color: isUser ? '#ffffff' : 'var(--text-secondary)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem'
                          }}>
                            <User size={14} strokeWidth={1.75} />
                          </div>
                          <span>{item.name}</span>
                          {isUser && (
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.66rem',
                              background: '#0a0a0a',
                              color: '#ffffff',
                              padding: '2px 6px',
                              borderRadius: '3px',
                              fontWeight: 600
                            }}>
                              YOU
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '22px 32px', color: 'var(--text-secondary)' }}>
                        {item.service}
                      </td>
                      <td style={{ padding: '22px 32px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {item.barber}
                      </td>
                      <td style={{ padding: '22px 32px', textAlign: 'right' }}>
                        {isInService ? (
                          <span className="badge-mono badge-black badge-live" style={{ padding: '5px 12px' }}>
                            IN SERVICE
                          </span>
                        ) : item.status === 'UP NEXT' ? (
                          <span className="badge-mono badge-black" style={{ padding: '5px 12px' }}>
                            UP NEXT
                          </span>
                        ) : item.status === 'COMPLETED' ? (
                          <span className="badge-mono" style={{ padding: '5px 12px', color: 'var(--text-tertiary)' }}>
                            COMPLETED
                          </span>
                        ) : (
                          <span className="badge-mono" style={{ padding: '5px 12px' }}>
                            WAITING
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* User's Dedicated Position Banner with Customer Name */}
          <div style={{
            padding: '36px 32px',
            backgroundColor: 'var(--bg-black)',
            color: 'var(--text-white)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            gap: '32px',
            alignItems: 'center'
          }}
          className="user-status-strip"
          >
            {/* Customer Name and Identification */}
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.18em',
                color: 'var(--text-white-dim)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}>
                CUSTOMER NAME
              </span>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#ffffff'
              }}>
                Aryan Sharma
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#a1a1aa',
                marginTop: '4px'
              }}>
                TICKET #107 · LOOKS &amp; CO. INDIRANAGAR
              </div>
            </div>

            {/* Position */}
            <div style={{ borderLeft: '1px solid var(--border-dark)', paddingLeft: '32px' }} className="wait-time-col">
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.18em',
                color: 'var(--text-white-dim)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}>
                YOUR POSITION
              </span>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                transition: 'all 0.3s ease'
              }}>
                #0{userPosition}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#a1a1aa',
                marginTop: '6px'
              }}>
                1 client ahead of you
              </div>
            </div>

            {/* Estimated wait */}
            <div style={{ borderLeft: '1px solid var(--border-dark)', paddingLeft: '32px' }} className="wait-time-col">
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.18em',
                color: 'var(--text-white-dim)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}>
                ESTIMATED WAIT
              </span>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                transition: 'all 0.3s ease'
              }}>
                {estimatedWait} MIN
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#a1a1aa',
                marginTop: '6px'
              }}>
                Real-time queue pace calibrated
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .user-status-strip {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .wait-time-col {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--border-dark);
            padding-top: 20px;
          }
        }
      `}</style>
    </section>
  );
};
