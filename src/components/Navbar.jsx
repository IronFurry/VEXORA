import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, UserCircle2 } from 'lucide-react';

export const Navbar = ({ currentRole, onSelectRole, onOpenCustomerModal, onOpenSalonModal, onOpenProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSalon = currentRole === 'salon';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggle = () => {
    onSelectRole(isSalon ? 'customer' : 'salon');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-inner">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '24px'
        }}>
          {/* Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="brand-wordmark"
            style={{ textDecoration: 'none' }}
          >
            <span className="brand-icon">V</span>
            <span>VEXORA</span>
          </a>

          {/* Center Nav Links (Desktop) */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: isScrolled ? '20px' : '28px',
            fontSize: '0.86rem',
            fontWeight: 500,
            color: 'var(--text-secondary)'
          }} className="desktop-nav">
            <a href="#why-vexora" onClick={(e) => { e.preventDefault(); scrollTo('why-vexora'); }}
              style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              Why Vexora
            </a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}
              style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              How it works
            </a>
            <a href="#live-queue" onClick={(e) => { e.preventDefault(); scrollTo('live-queue'); }}
              style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              Live Queue
            </a>
            <a href="#salons" onClick={(e) => { e.preventDefault(); scrollTo('salons'); }}
              style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              Salons
            </a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
              style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              Features
            </a>
          </nav>

          {/* Right side: Toggle + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

            {/* ── Segmented Role Toggle ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f0f0f2',
                borderRadius: 'var(--radius-pill)',
                padding: '3px',
                gap: '2px',
                cursor: 'pointer',
              }}
            >
              {/* Customer segment */}
              <div
                onClick={() => { onSelectRole('customer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-pill)',
                  background: !isSalon ? '#0a0a0a' : 'transparent',
                  color: !isSalon ? '#ffffff' : 'var(--text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  transition: 'background 0.22s cubic-bezier(0.4,0,0.2,1), color 0.22s',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                Customer
              </div>
              {/* Salon segment */}
              <div
                onClick={() => { onSelectRole('salon'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-pill)',
                  background: isSalon ? '#0a0a0a' : 'transparent',
                  color: isSalon ? '#ffffff' : 'var(--text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  transition: 'background 0.22s cubic-bezier(0.4,0,0.2,1), color 0.22s',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                Salon
              </div>
            </div>

            {/* CTA Button */}
            {!isSalon ? (
              <button
                onClick={onOpenCustomerModal}
                className="btn-primary btn-sm"
                style={{
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 20px',
                  fontSize: '0.84rem'
                }}
              >
                <span>Book Now</span>
                <ArrowRight size={13} strokeWidth={2} />
              </button>
            ) : (
              <button
                onClick={onOpenSalonModal}
                className="btn-primary btn-sm"
                style={{
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 20px',
                  fontSize: '0.84rem'
                }}
              >
                <span>Salon Portal</span>
                <ArrowRight size={13} strokeWidth={2} />
              </button>
            )}

            {/* Profile Avatar Button */}
            {!isSalon && (
              <button
                onClick={onOpenProfile}
                aria-label="Open customer profile"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#0a0a0a',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  border: '2px solid #0a0a0a',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                AR
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              style={{ display: 'none', padding: '6px', color: 'var(--text-primary)' }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: 'var(--bg-white)',
            borderRadius: 'var(--radius-sm)'
          }}>
            <a href="#why-vexora" onClick={(e) => { e.preventDefault(); scrollTo('why-vexora'); }}
              style={{ padding: '6px 0', fontWeight: 500 }}>Why Vexora</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}
              style={{ padding: '6px 0', fontWeight: 500 }}>How it works</a>
            <a href="#live-queue" onClick={(e) => { e.preventDefault(); scrollTo('live-queue'); }}
              style={{ padding: '6px 0', fontWeight: 500 }}>Live Queue</a>
            <a href="#salons" onClick={(e) => { e.preventDefault(); scrollTo('salons'); }}
              style={{ padding: '6px 0', fontWeight: 500 }}>Discover Salons</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
              style={{ padding: '6px 0', fontWeight: 500 }}>Features</a>

            {/* Mobile Segmented Role Toggle */}
            <div style={{ padding: '8px 0' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: 'var(--text-tertiary)',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                Experience Mode
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#f0f0f2',
                borderRadius: 'var(--radius-pill)',
                padding: '4px',
                gap: '4px',
                width: '100%',
                maxWidth: '260px'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectRole('customer');
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-pill)',
                    background: !isSalon ? '#0a0a0a' : 'transparent',
                    color: !isSalon ? '#ffffff' : 'var(--text-tertiary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                    textAlign: 'center'
                  }}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectRole('salon');
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-pill)',
                    background: isSalon ? '#0a0a0a' : 'transparent',
                    color: isSalon ? '#ffffff' : 'var(--text-tertiary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                    textAlign: 'center'
                  }}
                >
                  Salon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .role-toggle-pill:hover {
          border-color: var(--text-tertiary) !important;
        }
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
          .navbar-inner {
            padding: 14px 20px;
          }
        }
      `}</style>
    </header>
  );
};
