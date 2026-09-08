import React, { useState } from 'react';
import { MapPin, Users, Clock } from 'lucide-react';

const salons = [
  {
    id: 'looks-co',
    name: 'Looks & Co.',
    rating: '4.8',
    reviewsCount: '240',
    distance: '0.8 km',
    waitingCount: 2,
    waitTime: '~8 min',
    services: ['Haircut', 'Fade', 'Beard Styling'],
    address: '42 Downtown Avenue'
  },
  {
    id: 'style-studio',
    name: 'Style Studio',
    rating: '4.6',
    reviewsCount: '180',
    distance: '1.2 km',
    waitingCount: 7,
    waitTime: '~28 min',
    services: ['Executive Trim', 'Hair Spa', 'Head Massage'],
    address: '88 Westside Galleria'
  },
  {
    id: 'urban-cuts',
    name: 'Urban Cuts',
    rating: '4.7',
    reviewsCount: '310',
    distance: '1.6 km',
    waitingCount: 0,
    waitTime: 'Available now',
    isAvailableNow: true,
    services: ['Classic Cut', 'Scissor Precision', 'Beard Trim'],
    address: '15 Highline Square'
  }
];

export const CustomerExperience = ({ onJoinQueue }) => {
  const [selectedSalonId, setSelectedSalonId] = useState('looks-co');

  return (
    <section id="customers" className="section-spacing">
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          marginBottom: '64px',
          alignItems: 'end'
        }}
        className="customer-header-grid"
        >
          <div>
            <span className="eyebrow">FOR CUSTOMERS</span>
            <h2 className="section-headline" style={{ marginBottom: 0 }}>
              Don't wait blindly.
            </h2>
          </div>
          <div>
            <p className="section-description" style={{ fontSize: '1.2rem' }}>
              See what's happening before you arrive. Every chair, barber queue, and expected start time is visible with live second-by-second updates.
            </p>
          </div>
        </div>

        {/* UI Mockup Container */}
        <div style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-white)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          {/* Mockup Top Status Bar */}
          <div style={{
            padding: '16px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.92rem',
                letterSpacing: '0.12em'
              }}>
                VEXORA
              </span>
              <span style={{
                height: '14px',
                width: '1px',
                background: 'var(--border-medium)'
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)'
              }}>
                NEARBY SALONS · 3 DISCOVERED WITHIN 2.0 KM
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-mono badge-live">LIVE METRICS</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderBottom: '1px solid var(--border-subtle)'
          }}
          className="salons-mockup-grid"
          >
            {salons.map((salon, index) => {
              const isSelected = selectedSalonId === salon.id;

              return (
                <div
                  key={salon.id}
                  onClick={() => setSelectedSalonId(salon.id)}
                  style={{
                    padding: '36px 32px',
                    borderRight: index < 2 ? '1px solid var(--border-subtle)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'var(--bg-surface)' : 'var(--bg-white)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--bg-black)'
                    }} />
                  )}

                  <div>
                    {/* Header: Title & Rating */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}>
                        {salon.name}
                      </h3>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '0.84rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '28px'
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        ★ {salon.rating}
                      </span>
                      <span>·</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} strokeWidth={1.5} />
                        {salon.distance}
                      </span>
                    </div>

                    {/* Real-time waiting badge block */}
                    <div style={{
                      padding: '20px',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-white)',
                      marginBottom: '24px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          fontSize: '0.88rem',
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Users size={14} strokeWidth={1.5} />
                          {salon.waitingCount === 0 ? 'No waiting' : `${salon.waitingCount} people waiting`}
                        </span>
                      </div>

                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Clock size={16} strokeWidth={1.5} />
                        <span>{salon.waitTime}</span>
                      </div>
                    </div>

                    {/* Services Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}>
                      {salon.services.map((svc, i) => (
                        <span
                          key={i}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            letterSpacing: '0.04em',
                            padding: '3px 8px',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '3px',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    {salon.name === 'Style Studio' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJoinQueue(salon.name);
                        }}
                        className="btn-secondary"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        VIEW SALON
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJoinQueue(salon.name);
                        }}
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        JOIN QUEUE
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer of Mockup */}
          <div style={{
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            color: 'var(--text-muted)'
          }}>
            <span>GPS ACCURACY: ±3.2 METERS</span>
            <span>QUEUE DELAY ENGINE: SUB-SECOND WEBSOCKET SYNC</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .customer-header-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .salons-mockup-grid {
            grid-template-columns: 1fr !important;
          }
          .salons-mockup-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle);
          }
        }
      `}</style>
    </section>
  );
};
