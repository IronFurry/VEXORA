import React, { useState, useEffect } from 'react';
import {
  X, Check, ArrowRight, ArrowLeft, Heart, Star, MapPin,
  Clock, Users, Scissors, Sparkles, User, Palette, Waves, Zap, ShieldCheck, QrCode,
  Compass, AlertCircle, Navigation, Download
} from 'lucide-react';
import { useCustomerQueue } from '../context/CustomerQueueContext';
import { customerApi } from '../api/customerApi';
import { downloadReceiptPng } from '../utils/receiptGenerator';

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

/* 'Any Stylist' sentinel always available */
const ANY_STYLIST = {
  id: 'any',
  staffId: 'any',
  name: 'Any Available Stylist',
  role: 'Fastest Queue Allocation',
  rating: 4.9,
  status: 'available',
  specialization: ['Auto-assigned by workload for the shortest waiting time'],
  badge: 'Fastest'
};

export const CustomerModal = ({
  isOpen,
  onClose,
  preselectedSalon = 'Looks & Co. Studio'
}) => {
  const { setActiveTicket, activeTicket } = useCustomerQueue();

  // Step flow: 1 (SERVICES) -> 2 (SALON & GEO) -> 3 (STYLIST from salon) -> 4 (CONFIRM) -> 5 (TICKET)
  const [step, setStep] = useState(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState(['haircut']);
  const [selectedStylist, setSelectedStylist] = useState(ANY_STYLIST);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [salonsList, setSalonsList] = useState(SALONS_DATA);
  const [salonStylists, setSalonStylists] = useState([ANY_STYLIST]);
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [geoStatus, setGeoStatus] = useState('detecting');
  const [salonSort, setSalonSort] = useState('recommended');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [createdTicket, setCreatedTicket] = useState(null);

  // Logged-in manager's salonId (to boost in recommended)
  const managerSalonId = React.useMemo(() => {
    try {
      const token = localStorage.getItem('vexora_token');
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.salonId || null;
    } catch { return null; }
  }, []);

  // Request browser geolocation on modal mount
  useEffect(() => {
    if (!isOpen) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          };
          setUserCoords(coords);
          setGeoStatus('located');
          fetchPublicSalons(coords, salonSort);
        },
        (err) => {
          console.warn('[VEXORA Geo] Geolocation denied or unavailable:', err.message);
          // Default to Bengaluru central coordinates
          const defaultCoords = { latitude: 12.9716, longitude: 77.5946 };
          setUserCoords(defaultCoords);
          setGeoStatus('default');
          fetchPublicSalons(defaultCoords, salonSort);
        },
        { timeout: 6000 }
      );
    } else {
      const defaultCoords = { latitude: 12.9716, longitude: 77.5946 };
      setUserCoords(defaultCoords);
      setGeoStatus('unsupported');
      fetchPublicSalons(defaultCoords, salonSort);
    }
  }, [isOpen]);

  const fetchPublicSalons = async (coords, sortType) => {
    try {
      const res = await customerApi.getPublicSalons({
        lat: coords?.latitude,
        lng: coords?.longitude,
        sort: sortType
      });
      if (res.data?.salons && res.data.salons.length > 0) {
        let salons = res.data.salons;
        // Boost manager's own salon to top in recommended mode
        if (managerSalonId && (sortType === 'recommended' || !sortType)) {
          const managerSalon = salons.find(s => s.salonId === managerSalonId);
          if (managerSalon) {
            salons = [managerSalon, ...salons.filter(s => s.salonId !== managerSalonId)];
          }
        }
        setSalonsList(salons);
        if (!selectedSalon) {
          setSelectedSalon(salons[0]);
          loadStylistsForSalon(salons[0]);
        }
      }
    } catch (e) {
      console.warn('[VEXORA] Could not fetch public salons from API, using fallback data:', e.message);
    }
  };

  const loadStylistsForSalon = (salon) => {
    if (!salon) return;
    const staff = salon.staff || [];
    const stylistOptions = [ANY_STYLIST, ...staff.map(st => ({
      id: st.staffId || st._id,
      staffId: st.staffId || st._id,
      name: st.name,
      role: st.role || 'Stylist',
      rating: st.rating || 4.7,
      specialization: st.specialization || [],
      status: st.status || 'active',
      badge: st.status === 'active' ? 'Available' : 'Busy',
    }))];
    setSalonStylists(stylistOptions);
    setSelectedStylist(ANY_STYLIST); // reset to 'any' when salon changes
  };

  const handleSortChange = (newSort) => {
    setSalonSort(newSort);
    fetchPublicSalons(userCoords, newSort);
  };

  if (!isOpen) return null;

  // Multi-service toggler
  const toggleService = (id) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // At least one service required
        return prev.filter((sId) => sId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Compute selected services list, total duration & total price
  const selectedServicesObjects = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalDurationMinutes = selectedServicesObjects.reduce((acc, s) => {
    return acc + parseInt(s.duration.replace(/[^\d]/g, '') || 30);
  }, 0);

  const calculateTotalPrice = () => {
    return selectedServicesObjects.reduce((sum, s) => {
      let price = parseInt(s.basePrice.replace(/[^\d]/g, '') || 400);
      if (selectedSalon?.priceMap && selectedSalon.priceMap[s.id]) {
        price = parseInt(selectedSalon.priceMap[s.id].replace(/[^\d]/g, '') || price);
      }
      return sum + price;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();
  const serviceNamesSummary = selectedServicesObjects.map((s) => s.name).join(' + ');

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleClose = () => {
    setStep(1);
    setBookingError('');
    onClose();
  };

  // Submit Booking to MongoDB API
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingError('');

    try {
      const salonIdentifier = selectedSalon?.salonId || selectedSalon?.id || 'SAL-004';
      const stylistId = selectedStylist?.staffId === 'any' || selectedStylist?.id === 'any' ? null : (selectedStylist?.staffId || selectedStylist?.id || null);
      const payload = {
        customerName: clientName.trim(),
        phone: phoneNumber.trim(),
        salonId: salonIdentifier,
        serviceIds: selectedServiceIds,
        preferredStylistId: stylistId,
        customerCoords: userCoords
      };

      const res = await customerApi.createBooking(payload);
      const ticket = res.data.ticket;

      setCreatedTicket(ticket);
      setActiveTicket(ticket); // Store in real-time context & activate floating widget
      setStep(5); // Show digital ticket
    } catch (err) {
      console.error('[VEXORA Booking Failed]', err);
      setBookingError(err.message || 'Failed to create live booking. Please verify details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: step === 3 ? '720px' : '580px',
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

        {/* ── STEP PROGRESS BAR (Steps 1-4) ── */}
        {step <= 4 && (
          <div style={{ marginBottom: '26px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                color: 'var(--text-tertiary)',
                fontWeight: 600
              }}>
                STEP 0{step} OF 04
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.06em'
              }}>
                {step === 1 && '01 SELECT SERVICES (MULTI)'}
                {step === 2 && '02 CHOOSE SALON'}
                {step === 3 && '03 CHOOSE STYLIST'}
                {step === 4 && '04 CONFIRM QUEUE'}
              </span>
            </div>

            {/* Indicator Track */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              height: '3px'
            }}>
              {[1, 2, 3, 4].map(i => (
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
            STEP 01: SELECT MULTIPLE SERVICES
            ══════════════════════════════════════════════ */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                Select Services
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Choose one or multiple services. We calculate combined duration and chair allocations in real time.
              </p>
            </div>

            {/* Services List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '20px'
            }}>
              {SERVICES.map((s) => {
                const isSelected = selectedServiceIds.includes(s.id);
                const IconComponent = s.icon;
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    style={{
                      padding: '12px 16px',
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
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
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
                        <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {s.name}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {s.description}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700, color: '#0a0a0a' }}>
                        {s.basePrice}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {s.duration}
                      </div>
                    </div>

                    {/* Checkbox indicator */}
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      border: isSelected ? '2px solid #0a0a0a' : '1.5px solid #d4d4d8',
                      background: isSelected ? '#0a0a0a' : 'transparent',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isSelected && <Check size={13} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Duration & Price Bar */}
            <div style={{
              background: '#f4f4f5',
              borderRadius: '10px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#71717a', textTransform: 'uppercase', display: 'block' }}>
                  Selected: {selectedServiceIds.length} service{selectedServiceIds.length > 1 ? 's' : ''}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#09090b' }}>
                  Total Duration: ~{totalDurationMinutes} mins
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#71717a', textTransform: 'uppercase', display: 'block' }}>
                  Combined Total
                </span>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#0a0a0a' }}>
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setStep(2)}
              className="btn-primary"
              disabled={selectedServiceIds.length === 0}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                fontSize: '0.94rem'
              }}
            >
              <span>Find Nearby Salons</span>
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 02: GEOLOCATION & SALON SELECTION (moved before stylist)
            ══════════════════════════════════════════════ */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '18px' }}>
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
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  padding: '2px 0',
                  marginBottom: '6px'
                }}
              >
                <ArrowLeft size={13} />
                <span>BACK TO SERVICES</span>
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    Nearby Salons with Live Queues
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Sorted by GPS distance and live waiting times for <strong>{serviceNamesSummary}</strong>.
                  </p>
                </div>

                {/* GPS Indicator Pill */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#166534'
                }}>
                  <Navigation size={12} />
                  <span>GPS Active</span>
                </div>
              </div>
            </div>

            {/* Sorting Tabs */}
            <div style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '16px',
              background: '#f4f4f5',
              padding: '4px',
              borderRadius: '8px'
            }}>
              {[
                { id: 'recommended', label: 'Recommended' },
                { id: 'nearest', label: 'Nearest' },
                { id: 'rating', label: 'Top Rated' },
                { id: 'wait', label: 'Shortest Wait' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleSortChange(tab.id)}
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: salonSort === tab.id ? 700 : 500,
                    background: salonSort === tab.id ? '#0a0a0a' : 'transparent',
                    color: salonSort === tab.id ? '#ffffff' : '#52525b',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Salons List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '22px',
              maxHeight: '380px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {salonsList.map((salon) => {
                const salonIdVal = salon.salonId || salon.id;
                const isSelected = selectedSalon && (selectedSalon.salonId || selectedSalon.id) === salonIdVal;
                const isWishlisted = wishlist.includes(salonIdVal);
                const isManagerSalon = managerSalonId && salonIdVal === managerSalonId;
                const distanceDisplay = salon.distance || '—';
                const queueDisplay = salon.currentQueue ?? 0;
                const waitDisplay = salon.waitTime || (queueDisplay === 0 ? 'Available now' : `~${Math.max(8, queueDisplay * 18)} min wait`);
                const ratingDisplay = salon.rating || 4.8;
                const reviewsDisplay = salon.reviewsCount || 340;
                const salonImg = salon.images?.[0] || salon.image || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80';

                return (
                  <div
                    key={salonIdVal}
                    onClick={() => { setSelectedSalon(salon); loadStylistsForSalon(salon); }}
                    style={{
                      border: isSelected ? '1.8px solid #0a0a0a' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      cursor: 'pointer',
                      background: isSelected ? '#fafafa' : '#ffffff',
                      transition: 'all 0.18s ease',
                      position: 'relative'
                    }}
                  >
                    {/* Manager's salon badge */}
                    {isManagerSalon && (
                      <div style={{
                        position: 'absolute', top: 8, left: 8,
                        background: '#0a0a0a', color: '#ffffff',
                        fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
                        padding: '2px 6px', borderRadius: '4px', fontWeight: 700,
                        letterSpacing: '0.06em'
                      }}>RECOMMENDED</div>
                    )}

                    {/* Salon Image */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#e4e4e7',
                      marginTop: isManagerSalon ? '16px' : '0'
                    }}>
                      <img
                        src={salonImg}
                        alt={salon.salonName || salon.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'grayscale(100%) contrast(1.05)'
                        }}
                      />
                    </div>

                    {/* Salon Info */}
                    <div style={{ flex: 1, minWidth: 0, marginTop: isManagerSalon ? '16px' : '0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {salon.salonName || salon.name}
                        </div>
                        {/* Wishlist Heart */}
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(salonIdVal, e)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            color: isWishlisted ? '#0a0a0a' : 'var(--text-tertiary)'
                          }}
                        >
                          <Heart size={16} fill={isWishlisted ? '#0a0a0a' : 'none'} />
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
                          <Star size={12} fill="#0a0a0a" stroke="#0a0a0a" /> {ratingDisplay}
                        </span>
                        <span>({reviewsDisplay})</span>
                        <span>·</span>
                        <span style={{ fontWeight: 600, color: '#0a0a0a' }}>{distanceDisplay}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                            background: isSelected ? '#ffffff' : '#22c55e'
                          }} />
                          <span>{waitDisplay} · {queueDisplay} in queue</span>
                        </div>

                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)'
                        }}>
                          ₹{totalPrice}
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
                onClick={() => { if (selectedSalon) setStep(3); }}
                disabled={!selectedSalon}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '0.96rem' }}
              >
                <span>{selectedSalon ? `Choose Stylist at ${(selectedSalon.salonName || selectedSalon.name).split(' ')[0]}` : 'Select a Salon'}</span>
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 03: PREFERRED STYLIST (from selected salon)
            ══════════════════════════════════════════════ */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '20px' }}>
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
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  padding: '2px 0',
                  marginBottom: '6px'
                }}
              >
                <ArrowLeft size={13} />
                <span>BACK TO SALONS</span>
              </button>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                Choose a Stylist
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Stylists at <strong>{selectedSalon?.salonName || selectedSalon?.name}</strong>. Pick one or choose <strong>Any Stylist</strong> for the shortest wait.
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '24px'
            }}>
              {salonStylists.map((stylist) => {
                const isSelected = selectedStylist.id === stylist.id || selectedStylist.staffId === stylist.staffId;
                return (
                  <div
                    key={stylist.id || stylist.staffId}
                    onClick={() => setSelectedStylist(stylist)}
                    style={{
                      padding: '14px 16px',
                      border: isSelected ? '1.8px solid #0a0a0a' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isSelected ? '#fafafa' : '#ffffff',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isSelected ? '#0a0a0a' : '#f4f4f5',
                        color: isSelected ? '#ffffff' : '#0a0a0a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '0.85rem'
                      }}>
                        {stylist.id === 'any' ? <Scissors size={18} /> : stylist.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0a0a0a' }}>
                            {stylist.name}
                          </span>
                          <span style={{
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '2px 6px',
                            background: isSelected ? '#0a0a0a' : '#f4f4f5',
                            color: isSelected ? '#ffffff' : '#52525b',
                            borderRadius: '4px',
                            fontWeight: 600
                          }}>
                            {stylist.badge || 'Available'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#71717a', marginTop: '2px' }}>
                          {stylist.role} · ★ {stylist.rating}
                          {stylist.specialization?.length > 0 && ` · ${stylist.specialization.slice(0, 2).join(', ')}`}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #0a0a0a' : '1.5px solid #d4d4d8',
                      background: '#ffffff'
                    }} />
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setStep(2)}
                className="btn-secondary"
                style={{ flex: '0 0 auto', padding: '14px 20px' }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => setStep(4)}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '0.96rem' }}
              >
                <span>Review Booking Details</span>
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 04: CONFIRM BOOKING & DETAILS
            ══════════════════════════════════════════════ */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '18px' }}>
              <button
                onClick={() => setStep(3)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  padding: '2px 0',
                  marginBottom: '6px'
                }}
              >
                <ArrowLeft size={13} />
                <span>BACK TO STYLIST</span>
              </button>
              <h2 style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                Confirm Queue Reservation
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Your ticket will be stored in MongoDB and updated in real time as chairs advance.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div style={{
              background: '#0a0a0a',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid #27272a',
                paddingBottom: '12px',
                marginBottom: '12px'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#a1a1aa', letterSpacing: '0.1em' }}>
                    SALON &amp; STYLIST
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                    {selectedSalon?.salonName || selectedSalon?.name || '—'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#d4d4d8' }}>
                    Stylist: {selectedStylist?.name || 'Any Stylist'}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#a1a1aa', letterSpacing: '0.1em' }}>
                    ESTIMATED SEAT
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700 }}>
                    {selectedSalon?.waitTime || '~18 min wait'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    {serviceNamesSummary}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#a1a1aa' }}>
                    Duration: ~{totalDurationMinutes} mins
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800 }}>
                  ₹{totalPrice}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {bookingError && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.82rem',
                marginBottom: '16px'
              }}>
                {bookingError}
              </div>
            )}

            {/* Customer Inputs Form */}
            <form onSubmit={handleConfirmBooking}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '4px'
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
                      padding: '10px 12px',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      background: 'var(--bg-white)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '4px'
                  }}>
                    MOBILE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'var(--bg-white)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Notification opt-in checkbox */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginBottom: '20px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={whatsappUpdates}
                  onChange={(e) => setWhatsappUpdates(e.target.checked)}
                  style={{ accentColor: '#0a0a0a', width: '16px', height: '16px' }}
                />
                <span>Send WhatsApp notifications with travel time alerts when it's time to leave</span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '15px',
                  fontSize: '0.98rem'
                }}
              >
                <span>{isSubmitting ? 'Reserving in MongoDB Live Queue…' : 'Confirm & Generate Live Queue Pass'}</span>
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STEP 05: DIGITAL QUEUE TICKET (CREATED)
            ══════════════════════════════════════════════ */}
        {step === 5 && (
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
              margin: '0 auto 14px auto'
            }}>
              <Check size={26} strokeWidth={2.5} />
            </div>

            <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
              MONGODB RESERVATION CONFIRMED · LIVE TICKET ISSUED
            </span>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '16px'
            }}>
              You are #{createdTicket?.queuePosition || 2} in line.
            </h2>

            {/* Realistic Digital Ticket Card */}
            <div style={{
              border: '1.5px solid #0a0a0a',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '380px',
              margin: '0 auto 20px auto',
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
                paddingBottom: '12px',
                marginBottom: '16px'
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
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#0a0a0a'
                }}>
                  #{createdTicket?.ticketNumber || 'VXR-104'}
                </span>
              </div>

              {/* Big Ticket Number */}
              <div style={{ marginBottom: '14px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-tertiary)',
                  display: 'block'
                }}>
                  YOUR QUEUE NUMBER
                </span>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3.6rem',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  display: 'block',
                  color: '#0a0a0a',
                  margin: '4px 0'
                }}>
                  #{createdTicket?.queuePosition || 2}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: '#f4f4f5',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#22c55e'
                  }} />
                  Estimated wait: ~{createdTicket?.estimatedWaitTime || 18} mins (Arrive by {createdTicket?.arriveBy || '1:45 PM'})
                </span>
              </div>

              {/* Salon and Service Summary */}
              <div style={{
                background: '#fafafa',
                borderRadius: '8px',
                padding: '12px 14px',
                textAlign: 'left',
                fontSize: '0.84rem',
                marginBottom: '14px'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  {createdTicket?.salonName || selectedSalon.salonName || selectedSalon.name}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                  Stylist: <strong>{createdTicket?.stylistName || selectedStylist.name}</strong>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '2px' }}>
                  {serviceNamesSummary} · ₹{totalPrice}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginTop: '4px' }}>
                  Guest: {clientName} (+91 {phoneNumber})
                </div>
              </div>

              {/* WhatsApp notification pill */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '0.74rem',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'left',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '1rem' }}>💬</span>
                <div>
                  <strong>WhatsApp Notification Delivered</strong>
                  <div style={{ fontSize: '0.7rem', color: '#15803d' }}>
                    We'll message you when your travel time matches the queue ETA.
                  </div>
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
                <span>Verified GPS Queue Allocation · Real-Time Socket Active</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => downloadReceiptPng(createdTicket || activeTicket)}
                style={{
                  padding: '13px 22px',
                  borderRadius: '10px',
                  border: '1.5px solid #0a0a0a',
                  background: '#ffffff',
                  color: '#0a0a0a',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Download size={16} />
                <span>Download Receipt (PNG)</span>
              </button>

              <button
                onClick={handleClose}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: '0.94rem' }}
              >
                Done · Floating Pass Active
              </button>
            </div>
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
