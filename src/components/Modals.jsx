import React, { useState } from 'react';
import {
  X, Check, ArrowRight, ArrowLeft, Heart, Star, MapPin,
  Clock, Users, Scissors, Sparkles, User, Palette, Waves, Zap, ShieldCheck, QrCode
} from 'lucide-react';

/* Service Catalog for Step 01 */
const SERVICES = [
  {
    id: 'haircut',
    name: 'Precision Haircut',
    category: 'Haircut',
    duration: '30 min',
    basePrice: '₹450',
    description: 'Bespoke scissor work, consultation, wash and styled finish.',
    icon: Scissors
  },
  {
    id: 'beard',
    name: 'Beard Trim & Sculpting',
    category: 'Beard',
    duration: '25 min',
    basePrice: '₹350',
    description: 'Beard shaping, straight razor edge lineup and hot towel ritual.',
    icon: Sparkles
  },
  {
    id: 'facial',
    name: 'Executive Facial Therapy',
    category: 'Facial',
    duration: '45 min',
    basePrice: '₹850',
    description: 'Deep pore cleansing, exfoliation, herbal steam and soothing mask.',
    icon: User
  },
  {
    id: 'color',
    name: 'Couture Hair Coloring',
    category: 'Hair Color',
    duration: '60 min',
    basePrice: '₹1,400',
    description: 'Ammonia-free global color, root touch-up, or custom toner treatment.',
    icon: Palette
  },
  {
    id: 'spa',
    name: 'Nourishing Hair Spa',
    category: 'Hair Spa',
    duration: '45 min',
    basePrice: '₹1,100',
    description: 'Intense hydration therapy, essential oils, scalp massage & steam.',
    icon: Waves
  },
  {
    id: 'styling',
    name: 'Texture & Blowdry Styling',
    category: 'Styling',
    duration: '25 min',
    basePrice: '₹400',
    description: 'Shampoo wash, high-heat blowdry styling and matte clay hold.',
    icon: Zap
  }
];

/* Salons Catalog for Step 02 */
const SALONS_DATA = [
  {
    id: 'looks-co',
    name: 'Looks & Co. Studio',
    rating: '4.9',
    reviewsCount: '420',
    distance: '0.4 km · Indiranagar',
    address: '42 Downtown 100ft Road, Indiranagar',
    description: 'Flagship editorial studio known for precision scissors and modern fades.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    currentQueue: 3,
    waitTime: '~8 min wait',
    priceMap: {
      haircut: '₹550',
      beard: '₹400',
      facial: '₹950',
      color: '₹1,600',
      spa: '₹1,200',
      styling: '₹450'
    }
  },
  {
    id: 'fade-district',
    name: 'Fade District Atelier',
    rating: '4.8',
    reviewsCount: '310',
    distance: '0.9 km · 12th Main',
    address: '88 12th Main, HAL 2nd Stage, Indiranagar',
    description: 'Contemporary barber atelier focused on clean skin fades and beard lines.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80',
    currentQueue: 5,
    waitTime: '~16 min wait',
    priceMap: {
      haircut: '₹500',
      beard: '₹380',
      facial: '₹850',
      color: '₹1,400',
      spa: '₹1,100',
      styling: '₹400'
    }
  },
  {
    id: 'barber-republic',
    name: 'Barber Republic',
    rating: '4.9',
    reviewsCount: '520',
    distance: '1.4 km · 100 Feet Rd',
    address: '15 Highline Square, 100 Feet Road',
    description: 'Heritage barbershop pairing vintage razor craftsmanship with modern comfort.',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
    currentQueue: 8,
    waitTime: '~24 min wait',
    priceMap: {
      haircut: '₹450',
      beard: '₹350',
      facial: '₹800',
      color: '₹1,350',
      spa: '₹1,000',
      styling: '₹380'
    }
  },
  {
    id: 'toni-guy',
    name: 'Toni & Guy Atelier',
    rating: '4.9',
    reviewsCount: '680',
    distance: '1.8 km · Koramangala',
    address: '104 5th Block, Koramangala',
    description: 'Couture hair studio specializing in progressive coloring and scalp wellness.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    currentQueue: 2,
    waitTime: '~10 min wait',
    priceMap: {
      haircut: '₹850',
      beard: '₹600',
      facial: '₹1,400',
      color: '₹2,200',
      spa: '₹1,600',
      styling: '₹650'
    }
  }
];

export const CustomerModal = ({
  isOpen,
  onClose,
  preselectedSalon = 'Looks & Co. Studio'
}) => {
  // Step flow: 1 (SERVICE) -> 2 (SALON) -> 3 (CONFIRM) -> 4 (TICKET)
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedSalon, setSelectedSalon] = useState(
    SALONS_DATA.find(s => s.name.includes(preselectedSalon)) || SALONS_DATA[0]
  );
  const [clientName, setClientName] = useState('Aryan Sharma');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [wishlist, setWishlist] = useState(['looks-co']);

  if (!isOpen) return null;

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const currentPrice = selectedSalon.priceMap[selectedService.id] || selectedService.basePrice;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: step === 2 ? '680px' : '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            color: 'var(--text-secondary)',
            background: 'transparent',
            border: 'none',
            padding: '6px',
            cursor: 'pointer',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <X size={20} />
        </button>

        {/* ── STEP PROGRESS BAR (Steps 1-3) ── */}
        {step < 4 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                letterSpacing: '0.12em',
                color: 'var(--text-tertiary)',
                fontWeight: 600
              }}>
                STEP 0{step} OF 03
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.06em'
              }}>
                {step === 1 && '01 SELECT SERVICE'}
                {step === 2 && '02 CHOOSE SALON'}
                {step === 3 && '03 CONFIRM BOOKING'}
              </span>
            </div>

            {/* Indicator Track */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              height: '3px'
            }}>
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  style={{
                    background: i <= step ? '#0a0a0a' : '#e4e4e7',
                    borderRadius: '2px',
                    transition: 'background 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 01: SELECT SERVICE
            ══════════════════════════════════════════════ */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}>
                Select a Service
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Choose the primary service you'd like to book. We'll match you with available chairs and wait times.
              </p>
            </div>

            {/* Services Grid */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '28px'
            }}>
              {SERVICES.map((s) => {
                const isSelected = selectedService.id === s.id;
                const IconComponent = s.icon;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    style={{
                      padding: '14px 18px',
                      border: isSelected ? '1.8px solid #0a0a0a' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isSelected ? '#fafafa' : '#ffffff',
                      transition: 'all 0.18s ease',
                      gap: '14px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--text-tertiary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: isSelected ? '#0a0a0a' : '#f4f4f5',
                        color: isSelected ? '#ffffff' : '#0a0a0a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.94rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)'
                        }}>
                          {s.name}
                        </div>
                        <div style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.3
                        }}>
                          {s.description}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: isSelected ? '#0a0a0a' : 'var(--text-secondary)',
                        background: isSelected ? '#ffffff' : '#f4f4f5',
                        border: '1px solid var(--border-subtle)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)'
                      }}>
                        {s.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setStep(2)}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                fontSize: '0.96rem'
              }}
            >
              <span>Continue to Choose Salon</span>
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 02: CHOOSE SALON
            ══════════════════════════════════════════════ */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--text-secondary)',
                    padding: '2px 0'
                  }}
                >
                  <ArrowLeft size={13} />
                  <span>CHANGE SERVICE ({selectedService.name})</span>
                </button>
              </div>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                Select Nearby Salon
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Salons verified for <strong>{selectedService.name}</strong> with live queue visibility.
              </p>
            </div>

            {/* Salons List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              marginBottom: '26px'
            }}>
              {SALONS_DATA.map((salon) => {
                const isSelected = selectedSalon.id === salon.id;
                const isWishlisted = wishlist.includes(salon.id);
                const salonPrice = salon.priceMap[selectedService.id] || selectedService.basePrice;

                return (
                  <div
                    key={salon.id}
                    onClick={() => setSelectedSalon(salon)}
                    style={{
                      border: isSelected ? '1.8px solid #0a0a0a' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      cursor: 'pointer',
                      background: isSelected ? '#fafafa' : '#ffffff',
                      transition: 'all 0.18s ease',
                      position: 'relative'
                    }}
                  >
                    {/* Salon Image */}
                    <div style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#e4e4e7'
                    }}>
                      <img
                        src={salon.image}
                        alt={salon.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'grayscale(100%) contrast(1.05)'
                        }}
                      />
                    </div>

                    {/* Salon Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {salon.name}
                        </div>
                        {/* Wishlist Heart */}
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(salon.id, e)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            color: isWishlisted ? '#0a0a0a' : 'var(--text-tertiary)',
                            transition: 'color 0.15s'
                          }}
                          title={isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                        >
                          <Heart size={16} fill={isWishlisted ? '#0a0a0a' : 'none'} strokeWidth={1.8} />
                        </button>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '6px'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                          <Star size={12} fill="#0a0a0a" stroke="#0a0a0a" /> {salon.rating}
                        </span>
                        <span>({salon.reviewsCount})</span>
                        <span>·</span>
                        <span>{salon.distance}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexWrap: 'wrap'
                      }}>
                        {/* Live queue badge */}
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: isSelected ? '#0a0a0a' : '#f4f4f5',
                          color: isSelected ? '#ffffff' : '#0a0a0a',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 600
                        }}>
                          <span style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: isSelected ? '#ffffff' : '#0a0a0a',
                            animation: 'svg-pulse-dot 1.8s infinite ease-in-out'
                          }} />
                          <span>{salon.waitTime} · {salon.currentQueue} in queue</span>
                        </div>

                        {/* Price for chosen service */}
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)'
                        }}>
                          {salonPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation row */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
                style={{ flex: '0 0 auto', padding: '14px 20px' }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '0.96rem' }}
              >
                <span>Continue with {selectedSalon.name.split(' ')[0]}</span>
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 03: CONFIRM BOOKING
            ══════════════════════════════════════════════ */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '22px' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--text-secondary)',
                  padding: '2px 0',
                  marginBottom: '4px'
                }}
              >
                <ArrowLeft size={13} />
                <span>CHANGE SALON</span>
              </button>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                Confirm Live Reservation
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Your position will be locked in the real-time queue immediately.
              </p>
            </div>

            {/* Booking Summary Card */}
            <div style={{
              background: '#0a0a0a',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              marginBottom: '22px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid #27272a',
                paddingBottom: '14px',
                marginBottom: '14px'
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: '#a1a1aa',
                    letterSpacing: '0.1em',
                    marginBottom: '4px'
                  }}>
                    SELECTED SALON
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    {selectedSalon.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>
                    {selectedSalon.address}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: '#a1a1aa',
                    letterSpacing: '0.1em',
                    marginBottom: '4px'
                  }}>
                    ESTIMATED SEAT
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.05rem',
                    fontWeight: 700
                  }}>
                    {selectedSalon.waitTime}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#a1a1aa' }}>
                    {selectedSalon.currentQueue} in line
                  </div>
                </div>
              </div>

              {/* Service Details Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                    {selectedService.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a1a1aa' }}>
                    Duration: {selectedService.duration}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700 }}>
                  {currentPrice}
                </div>
              </div>
            </div>

            {/* Client Details Form */}
            <form onSubmit={(e) => { e.preventDefault(); setStep(4); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                  }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      background: 'var(--bg-white)'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                  }}>
                    MOBILE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'var(--bg-white)'
                    }}
                  />
                </div>
              </div>

              {/* Notification opt-in checkbox */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={whatsappUpdates}
                  onChange={(e) => setWhatsappUpdates(e.target.checked)}
                  style={{ accentColor: '#0a0a0a', width: '16px', height: '16px' }}
                />
                <span>Send second-by-second live queue telemetry via WhatsApp &amp; SMS</span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '15px',
                  fontSize: '0.98rem'
                }}
              >
                <span>Confirm &amp; Generate Live Ticket</span>
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 04: LIVE DIGITAL TICKET ISSUED
            ══════════════════════════════════════════════ */}
        {step === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#0a0a0a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Check size={26} strokeWidth={2.5} />
            </div>

            <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
              RESERVATION CONFIRMED · TICKET ISSUED
            </span>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: '20px'
            }}>
              You are #{selectedSalon.currentQueue + 1} in queue.
            </h2>

            {/* Realistic Digital Physical Ticket Card */}
            <div style={{
              border: '1.5px solid #0a0a0a',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '380px',
              margin: '0 auto 24px auto',
              background: '#ffffff',
              position: 'relative',
              boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
            }}>
              {/* Ticket Top Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px dashed #d4d4d8',
                paddingBottom: '14px',
                marginBottom: '18px'
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em'
                }}>
                  VEXORA PASS
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)'
                }}>
                  TKT-07842
                </span>
              </div>

              {/* Big Ticket Number */}
              <div style={{ marginBottom: '14px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-tertiary)',
                  display: 'block'
                }}>
                  YOUR QUEUE NUMBER
                </span>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3.8rem',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  display: 'block',
                  color: '#0a0a0a',
                  margin: '4px 0'
                }}>
                  07
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  background: '#f4f4f5',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#0a0a0a',
                    animation: 'svg-pulse-dot 1.8s infinite ease-in-out'
                  }} />
                  Estimated seat: {selectedSalon.waitTime}
                </span>
              </div>

              {/* Salon and Service Summary */}
              <div style={{
                background: '#fafafa',
                borderRadius: '8px',
                padding: '12px 14px',
                textAlign: 'left',
                fontSize: '0.84rem',
                marginBottom: '16px'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  {selectedSalon.name}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                  {selectedService.name} · {currentPrice}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginTop: '4px' }}>
                  Guest: {clientName} (+91 {phoneNumber})
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)'
              }}>
                <ShieldCheck size={14} />
                <span>Verified GPS Queue Allocation</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '0.94rem' }}
            >
              Done · Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Salon Modal (for Operators) ─── */
export const SalonModal = ({ isOpen, onClose }) => {
  const [salonName, setSalonName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [chairs, setChairs] = useState('4');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '520px', padding: '36px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            color: 'var(--text-secondary)',
            background: 'transparent',
            border: 'none',
            padding: '6px',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <span className="eyebrow">SALON PARTNER NETWORK</span>
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: '8px'
            }}>
              List Your Salon on VEXORA
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Eliminate walk-in chaos, fill idle chairs, and sync lobby operations with sub-second telemetry.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                  }}>
                    SALON / STUDIO NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Atelier Barber Studio"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      background: 'var(--bg-white)'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      marginBottom: '6px'
                    }}>
                      OPERATOR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        background: 'var(--bg-white)'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      marginBottom: '6px'
                    }}>
                      NUMBER OF CHAIRS
                    </label>
                    <select
                      value={chairs}
                      onChange={(e) => setChairs(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        background: 'var(--bg-white)'
                      }}
                    >
                      <option value="1-2">1 – 2 Chairs</option>
                      <option value="3-5">3 – 5 Chairs</option>
                      <option value="6-10">6 – 10 Chairs</option>
                      <option value="10+">10+ Chairs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                  }}>
                    DIRECT PHONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'var(--bg-white)'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.96rem' }}
              >
                <span>Request Onboarding Access</span>
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#0a0a0a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Check size={26} strokeWidth={2.5} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
              Onboarding Initiated
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Our operations engineering team will reach out via WhatsApp at {phone} to configure your station sensors and live catalog.
            </p>
            <button
              onClick={handleClose}
              className="btn-primary"
              style={{ padding: '12px 28px' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
