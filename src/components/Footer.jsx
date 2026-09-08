import React from 'react';

export const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-medium)',
      backgroundColor: 'var(--bg-white)',
      paddingTop: '80px',
      paddingBottom: '48px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '80px'
        }}
        className="footer-grid"
        >
          {/* Left Column: Brand & Tagline */}
          <div style={{ maxWidth: '360px' }}>
            <div className="brand-wordmark" style={{ marginBottom: '16px' }}>
              <span className="brand-icon">V</span>
              <span>VEXORA</span>
            </div>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Real-time salon discovery and management.
            </p>
            <div style={{
              marginTop: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--text-muted)'
            }}>
              LIVE QUEUES · SMART DISPATCH · INTEGRATED SAAS
            </div>
          </div>

          {/* Product Links */}
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '20px'
            }}>
              Product
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li>
                <a href="#customers" style={{ color: 'var(--text-secondary)' }}>Customers</a>
              </li>
              <li>
                <a href="#salons" style={{ color: 'var(--text-secondary)' }}>Salons</a>
              </li>
              <li>
                <a href="#how-it-works" style={{ color: 'var(--text-secondary)' }}>Features</a>
              </li>
              <li>
                <a href="#queue" style={{ color: 'var(--text-secondary)' }}>Live Queue Engine</a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '20px'
            }}>
              Company
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li>
                <a href="#about" style={{ color: 'var(--text-secondary)' }}>About</a>
              </li>
              <li>
                <a href="#contact" style={{ color: 'var(--text-secondary)' }}>Contact</a>
              </li>
              <li>
                <a href="#" style={{ color: 'var(--text-secondary)' }}>Careers</a>
              </li>
              <li>
                <a href="#" style={{ color: 'var(--text-secondary)' }}>Press Kit</a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '20px'
            }}>
              Legal
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li>
                <a href="#" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</a>
              </li>
              <li>
                <a href="#" style={{ color: 'var(--text-secondary)' }}>Terms of Service</a>
              </li>
              <li>
                <a href="#" style={{ color: 'var(--text-secondary)' }}>Security Architecture</a>
              </li>
              <li>
                <a href="#" style={{ color: 'var(--text-secondary)' }}>SLA Status</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}
        className="footer-bottom"
        >
          <div>
            © 2026 VEXORA. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>EN-US</span>
            <span>SYSTEMS NOMINAL</span>
            <span>AES-256 ENCRYPTED</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
};
