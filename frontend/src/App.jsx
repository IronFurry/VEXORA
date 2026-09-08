import React, { useState } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { Introduction } from './components/Introduction.jsx';
import { HowItWorks } from './components/HowItWorks.jsx';
import { LiveQueue } from './components/LiveQueue.jsx';
import { DiscoverSalons } from './components/DiscoverSalons.jsx';
import { ForCustomers } from './components/ForCustomers.jsx';
import { ForSalons } from './components/ForSalons.jsx';
import { Features } from './components/Features.jsx';
import { FinalCta } from './components/FinalCta.jsx';
import { Footer } from './components/Footer.jsx';
import { CustomerModal, SalonModal } from './components/Modals.jsx';
import { CustomerProfile } from './components/CustomerProfile.jsx';
import { FloatingQueueWidget } from './components/FloatingQueueWidget.jsx';
import { TicketPassModal } from './components/TicketPassModal.jsx';
import { VexoraChatbot } from './components/VexoraChatbot.jsx';

export const App = () => {
  const [currentRole, setCurrentRole] = useState('customer');
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [salonModalOpen, setSalonModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [ticketPassOpen, setTicketPassOpen] = useState(false);
  const [selectedSalonForModal, setSelectedSalonForModal] = useState('Looks & Co. Studio');
  const [roleFlash, setRoleFlash] = useState(null);

  const handleSelectRole = (role) => {
    if (role === currentRole) return;
    setCurrentRole(role);
    setRoleFlash(role === 'customer' ? 'Customer' : 'Salon');
    setTimeout(() => setRoleFlash(null), 1050);
  };

  const handleOpenCustomerModalWithSalon = (salonName) => {
    setSelectedSalonForModal(salonName);
    setCustomerModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-white)' }}>
      {/* ── Role Transition Flash with Aggressive Background Blur ── */}
      {roleFlash && (
        <div
          className="role-flash-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              letterSpacing: '0.24em',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              marginBottom: '14px',
              fontWeight: 600,
            }}
          >
            SWITCHING TO
          </div>
          <span
            className="role-flash-text"
            style={{
              fontSize: 'clamp(4.5rem, 13vw, 10rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#0a0a0a',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {roleFlash}
          </span>
        </div>
      )}

      {/* ── Transforming Floating Navbar ── */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        onOpenCustomerModal={() => handleOpenCustomerModalWithSalon('Looks & Co. Studio')}
        onOpenSalonModal={() => setSalonModalOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
      />

      {/* ── Main Page Flow in Exact Required Order ── */}
      <main>
        {/* 1. Hero with Role-Tailored Headline, CTAs, and Normal Phone Animation */}
        <Hero
          currentRole={currentRole}
          onOpenCustomerModal={() => handleOpenCustomerModalWithSalon('Looks & Co. Studio')}
          onOpenSalonModal={() => setSalonModalOpen(true)}
        />

        {/* 2. Why VEXORA */}
        <Introduction currentRole={currentRole} />

        {/* 3. How It Works */}
        <HowItWorks currentRole={currentRole} />

        {/* 4. Live Queue Telemetry Simulation */}
        <LiveQueue />

        {/* 5. Discover Nearby Salons (with cards, ratings, wait times, wishlist) */}
        <DiscoverSalons
          onBookSalon={(name) => handleOpenCustomerModalWithSalon(name)}
        />

        {/* 6. For Customers */}
        <ForCustomers />

        {/* 7. For Salons */}
        <ForSalons
          onOpenSalonModal={() => setSalonModalOpen(true)}
        />

        {/* 8. Features Architectural Grid */}
        <Features />

        {/* 9. Final Get Started CTA */}
        <FinalCta
          currentRole={currentRole}
          onOpenCustomerModal={() => handleOpenCustomerModalWithSalon('Looks & Co. Studio')}
          onOpenSalonModal={() => setSalonModalOpen(true)}
        />
      </main>

      {/* ── Minimalist Editorial Footer ── */}
      <Footer />

      {/* ── Customer Profile Panel ── */}
      <CustomerProfile
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onBookSalon={(name) => {
          setProfileOpen(false);
          handleOpenCustomerModalWithSalon(name);
        }}
      />

      {/* ── 3-Step Interactive Booking Flow Modal ── */}
      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        preselectedSalon={selectedSalonForModal}
      />

      {/* ── Salon Operator Partner Modal ── */}
      <SalonModal
        isOpen={salonModalOpen}
        onClose={() => setSalonModalOpen(false)}
      />

      {/* ── Fixed Floating Real-Time Queue Widget (Bottom Right) ── */}
      <FloatingQueueWidget onOpenTicket={() => setTicketPassOpen(true)} />

      {/* ── Ticket Pass Modal (Live Queue + Receipt Download) ── */}
      <TicketPassModal
        isOpen={ticketPassOpen}
        onClose={() => setTicketPassOpen(false)}
      />

      {/* ── VEXORA AI Booking Chatbot Concierge ── */}
      <VexoraChatbot />
    </div>
  );
};

export default App;
