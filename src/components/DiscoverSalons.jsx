import React, { useState } from 'react';
import { Star, MapPin, Heart, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';

export const DISCOVER_SALONS = [
  {
    id: 'looks-co',
    name: 'Looks & Co. Studio',
    tagline: 'Flagship Scissor & Barber Studio',
    rating: '4.9',
    reviewsCount: '420',
    distance: '0.4 km · Indiranagar',
    address: '42 Downtown 100ft Road, Indiranagar',
    description: 'Boutique editorial salon renowned for precision scissor architecture, modern skin fades, and tailored hot-towel grooming.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    currentQueue: 3,
    waitTime: '~8 min wait',
    startingPrice: 'from ₹450',
    category: 'haircut',
    featured: true
  },
  {
    id: 'fade-district',
    name: 'Fade District Atelier',
    tagline: 'Contemporary Barber & Shave Lounge',
    rating: '4.8',
    reviewsCount: '310',
    distance: '0.9 km · 12th Main',
    address: '88 12th Main, HAL 2nd Stage, Indiranagar',
    description: 'Sharp razor lines, artisanal beard sculpting, and espresso bar designed for the busy modern professional.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    currentQueue: 5,
    waitTime: '~16 min wait',
    startingPrice: 'from ₹380',
    category: 'beard',
    featured: false
  },
  {
    id: 'barber-republic',
    name: 'Barber Republic',
    tagline: 'Heritage Grooming & Royal Shaves',
    rating: '4.9',
    reviewsCount: '520',
    distance: '1.4 km · 100 Feet Rd',
    address: '15 Highline Square, 100 Feet Road',
    description: 'Preserving old-world barbershop traditions with Japanese steel blades, organic pomades, and bespoke head massage.',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    currentQueue: 8,
    waitTime: '~24 min wait',
    startingPrice: 'from ₹400',
    category: 'haircut',
    featured: false
  },
  {
    id: 'toni-guy',
    name: 'Toni & Guy Atelier',
    tagline: 'Couture Hair Styling & Coloring',
    rating: '4.9',
    reviewsCount: '680',
    distance: '1.8 km · Koramangala',
    address: '104 5th Block, Koramangala',
    description: 'International runway-level color formulations, avant-garde textures, and deep scalp revitalization treatments.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    currentQueue: 2,
    waitTime: '~10 min wait',
    startingPrice: 'from ₹650',
    category: 'styling',
    featured: true
  },
  {
    id: 'truefitt-hill',
    name: 'Truefitt & Hill Gentleman\'s',
    tagline: 'Royal Grooming Since 1805',
    rating: '4.9',
    reviewsCount: '890',
    distance: '2.3 km · Lavelle Road',
    address: '24 Lavelle Road, Shanthala Nagar',
    description: 'Aristocratic British barbering offering signature facial cleanses, hot-lather shave rituals, and shoe care.',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80',
    currentQueue: 1,
    waitTime: 'Available now',
    startingPrice: 'from ₹850',
    category: 'spa',
    featured: false
  },
  {
    id: 'grooming-lounge',
    name: 'The Grooming Lounge',
    tagline: 'Minimalist Executive Maintenance',
    rating: '4.7',
    reviewsCount: '270',
    distance: '2.6 km · Richmond Town',
    address: '6 Victoria Layout, Richmond Town',
    description: 'Quiet, sunlit aesthetic space built for rapid lunchtime maintenance, beard alignment, and express scalp exfoliation.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
    currentQueue: 4,
    waitTime: '~18 min wait',
    startingPrice: 'from ₹400',
    category: 'haircut',
    featured: false
  }
];

export const DiscoverSalons = ({ onBookSalon }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [wishlist, setWishlist] = useState(['looks-co', 'toni-guy']);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredSalons = activeFilter === 'all'
    ? DISCOVER_SALONS
    : DISCOVER_SALONS.filter(s => s.category === activeFilter);

  return (
    <section id="salons" className="section-spacing">
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '60px',
          marginBottom: '56px',
          alignItems: 'end'
        }}
        className="customer-header-grid"
        >
          <div>
            <span className="eyebrow">DISCOVER NEARBY SALONS</span>
            <h2 className="section-headline" style={{ marginBottom: 0 }}>
              Live queue availability.<br />
              Zero lobby waiting.
            </h2>
          </div>
          <div>
            <p className="section-description" style={{ fontSize: '1.15rem' }}>
              Explore curated styling studios in your area with verified ratings, instant chair allocation, and second-by-second wait time telemetry.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '40px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '16px'
        }}>
          {[
            { id: 'all', label: 'All Salons (06)' },
            { id: 'haircut', label: 'Precision Haircut' },
            { id: 'beard', label: 'Beard & Shave' },
            { id: 'styling', label: 'Styling & Color' },
            { id: 'spa', label: 'Scalp & Spa' },
          ].map(f => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-pill)',
                  border: isActive ? '1px solid #0a0a0a' : '1px solid var(--border-subtle)',
                  background: isActive ? '#0a0a0a' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease'
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Salon Cards 3-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px'
        }}
        className="salons-grid"
        >
          {filteredSalons.map((salon) => {
            const isWishlisted = wishlist.includes(salon.id);

            return (
              <div
                key={salon.id}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-white)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s, border-color 0.22s'
                }}
                className="salon-card-hover"
              >
                {/* Salon Image with Overlay Controls */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '210px',
                  overflow: 'hidden',
                  background: '#18181b'
                }}>
                  <img
                    src={salon.image}
                    alt={salon.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(100%) contrast(1.06)',
                      transition: 'transform 0.4s ease'
                    }}
                    className="salon-image-zoom"
                  />

                  {/* Top Badges */}
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    right: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pointerEvents: 'none'
                  }}>
                    {/* Live Wait Pill */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(10, 10, 10, 0.85)',
                      color: '#ffffff',
                      padding: '5px 10px',
                      borderRadius: 'var(--radius-pill)',
                      backdropFilter: 'blur(8px)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em'
                    }}>
                      <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        animation: 'svg-pulse-dot 1.8s infinite ease-in-out'
                      }} />
                      <span>{salon.waitTime}</span>
                    </div>

                    {/* Wishlist Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(salon.id, e)}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: isWishlisted ? '#0a0a0a' : '#71717a',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        pointerEvents: 'auto',
                        transition: 'transform 0.15s, color 0.15s'
                      }}
                      title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <Heart size={16} fill={isWishlisted ? '#0a0a0a' : 'none'} strokeWidth={2} />
                    </button>
                  </div>

                  {/* Distance chip on bottom image */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '14px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(6px)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: '#0a0a0a',
                    letterSpacing: '0.04em'
                  }}>
                    {salon.distance}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{
                  padding: '22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}>
                  <div>
                    {/* Header line: Name + Rating */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: '6px'
                    }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)'
                      }}>
                        {salon.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)'
                      }}>
                        <Star size={13} fill="#0a0a0a" stroke="#0a0a0a" />
                        <span>{salon.rating}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>
                          ({salon.reviewsCount})
                        </span>
                      </div>
                    </div>

                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-tertiary)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '10px'
                    }}>
                      {salon.tagline}
                    </div>

                    {/* Short Description */}
                    <p style={{
                      fontSize: '0.86rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '20px'
                    }}>
                      {salon.description}
                    </p>
                  </div>

                  {/* Card Bottom: Queue Info + Book Action */}
                  <div style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}>
                        CURRENT INTAKE
                      </div>
                      <div style={{
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}>
                        {salon.currentQueue} clients in queue · {salon.waitTime}
                      </div>
                    </div>

                    <button
                      onClick={() => onBookSalon(salon.name)}
                      className="btn-primary btn-sm"
                      style={{
                        padding: '9px 18px',
                        fontSize: '0.82rem',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <span>Book Now</span>
                      <ArrowRight size={13} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .salon-card-hover:hover {
          border-color: #0a0a0a !important;
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.07);
        }
        .salon-card-hover:hover .salon-image-zoom {
          transform: scale(1.05);
        }
        @media (max-width: 1024px) {
          .salons-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .salons-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
