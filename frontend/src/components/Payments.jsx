import React, { useState } from 'react';
import { Tag, Check, CreditCard, Smartphone } from 'lucide-react';

export const Payments = () => {
  const [couponCode, setCouponCode] = useState('FIRSTVISIT');
  const [couponApplied, setCouponApplied] = useState(true);

  return (
    <section className="section-spacing">
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '64px' }}>
          <span className="eyebrow">SIMPLE CHECKOUT</span>
          <h2 className="section-headline">
            Book. Pay. Done.
          </h2>
          <p className="section-description">
            Zero friction payments integrated directly into the queue lifecycle. Pay upfront to lock express seating or settle seamlessly at completion.
          </p>
        </div>

        {/* Clean Monochrome Checkout Sheet */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-white)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          {/* Checkout Header */}
          <div style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.12em' }}>
              RESERVATION SUMMARY
            </span>
            <span className="badge-mono">EXPRESS CHECKOUT</span>
          </div>

          <div style={{ padding: '32px 28px' }}>
            {/* Service & Salon Specs */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  SERVICE
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                  Signature Fade + Beard Sculpting
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Looks & Co. · Stylist Vikram
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  BASE PRICE
                </span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                  ₹750
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div style={{
              padding: '20px 0',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <Tag size={16} strokeWidth={1.5} color="var(--text-secondary)" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="ENTER PROMO CODE"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    width: '180px',
                    letterSpacing: '0.08em'
                  }}
                />
                <button
                  onClick={() => setCouponApplied(!couponApplied)}
                  className="btn-secondary btn-sm"
                  style={{ padding: '7px 14px' }}
                >
                  {couponApplied ? 'Remove' : 'Apply'}
                </button>
              </div>

              {couponApplied && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    -₹150 (WELCOME20)
                  </span>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div style={{ padding: '24px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
                PAYMENT METHOD
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{
                  border: '1px solid var(--border-strong)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}>
                  <Smartphone size={16} strokeWidth={1.5} />
                  <span>UPI Autopay</span>
                </div>
                <div style={{
                  border: '1px solid var(--border-subtle)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)'
                }}>
                  <CreditCard size={16} strokeWidth={1.5} />
                  <span>Credit Card</span>
                </div>
                <div style={{
                  border: '1px solid var(--border-subtle)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)'
                }}>
                  <Check size={16} strokeWidth={1.5} />
                  <span>Pay at Salon</span>
                </div>
              </div>
            </div>

            {/* Total Due & Confirmation */}
            <div style={{
              paddingTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '28px'
            }}>
              <div>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Total Authorized Amount
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {couponApplied ? '₹600' : '₹750'}
                </div>
              </div>

              <button className="btn-primary" style={{ padding: '14px 28px' }}>
                Authorize & Confirm
              </button>
            </div>

            {/* Reassurance Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              textAlign: 'center'
            }}>
              <div>SECURE 256-BIT SSL</div>
              <div>COUPON SUPPORT</div>
              <div>FREE CANCELLATION</div>
              <div>INSTANT REFUNDS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
