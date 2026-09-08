import React, { useState } from "react";
import {
  X, Star, Heart, Clock, CreditCard, MessageSquare,
  Calendar, User, Scissors, MapPin, CheckCircle, ArrowUpRight,
  Award, RotateCcw
} from "lucide-react";

const BOOKING_HISTORY = [
  { id: "BK-1041", salon: "Looks & Co. Studio", service: "Classic Fade + Beard Trim", date: "Sep 04, 2026", time: "2:30 PM", status: "completed", worker: "Marcus Reid", workerAvatar: "MR", duration: "55 min" },
  { id: "BK-0998", salon: "The Grooming Lab", service: "Scalp Treatment + Trim", date: "Aug 22, 2026", time: "11:00 AM", status: "completed", worker: "Priya Nair", workerAvatar: "PN", duration: "40 min" },
  { id: "BK-0971", salon: "Monochrome Cuts", service: "Hair Colour & Style", date: "Aug 10, 2026", time: "4:00 PM", status: "cancelled", worker: "Jamie Lee", workerAvatar: "JL", duration: "90 min" },
  { id: "BK-0934", salon: "Looks & Co. Studio", service: "Premium Shave", date: "Jul 28, 2026", time: "10:15 AM", status: "completed", worker: "Marcus Reid", workerAvatar: "MR", duration: "30 min" },
  { id: "BK-0887", salon: "The Grooming Lab", service: "Signature Cut", date: "Jul 05, 2026", time: "3:45 PM", status: "completed", worker: "Sofia Alvarez", workerAvatar: "SA", duration: "45 min" },
];

const WISHLIST = [
  { id: 1, salon: "Studio Null", location: "Connaught Place, Delhi", rating: 4.9, reviews: 312, waitTime: "8 min", tags: ["Precision Cut", "Beard Design"], tagline: "Minimalist studio, maximum craft." },
  { id: 2, salon: "The Dark Room Barbershop", location: "Hauz Khas Village, Delhi", rating: 4.8, reviews: 478, waitTime: "12 min", tags: ["Classic Shave", "Hot Towel"], tagline: "Vintage ritual, modern precision." },
  { id: 3, salon: "Form & Function", location: "Bandra West, Mumbai", rating: 4.7, reviews: 194, waitTime: "5 min", tags: ["Texture Work", "Scalp Treatment"], tagline: "Where structure meets artistry." },
];

const FAV_WORKERS = [
  { id: 1, name: "Marcus Reid", initials: "MR", salon: "Looks & Co. Studio", specialty: "Classic Fade & Beard Artistry", bookings: 12, rating: 5.0, nextAvailable: "Today, 5:30 PM" },
  { id: 2, name: "Priya Nair", initials: "PN", salon: "The Grooming Lab", specialty: "Scalp Health & Texture Cuts", bookings: 5, rating: 4.9, nextAvailable: "Tomorrow, 10:00 AM" },
  { id: 3, name: "Sofia Alvarez", initials: "SA", salon: "The Grooming Lab", specialty: "Colour Technique & Style", bookings: 3, rating: 4.8, nextAvailable: "Sep 12, 2:00 PM" },
];

const PAYMENTS = [
  { id: "PAY-7731", salon: "Looks & Co. Studio", service: "Classic Fade + Beard Trim", date: "Sep 04, 2026", amount: "750", method: "UPI", status: "paid" },
  { id: "PAY-7698", salon: "The Grooming Lab", service: "Scalp Treatment + Trim", date: "Aug 22, 2026", amount: "550", method: "Card", status: "paid" },
  { id: "PAY-7644", salon: "Looks & Co. Studio", service: "Premium Shave", date: "Jul 28, 2026", amount: "350", method: "UPI", status: "paid" },
  { id: "PAY-7601", salon: "The Grooming Lab", service: "Signature Cut", date: "Jul 05, 2026", amount: "480", method: "Wallet", status: "paid" },
];

const REVIEWS = [
  { id: 1, salon: "Looks & Co. Studio", worker: "Marcus Reid", date: "Sep 04, 2026", rating: 5, text: "Marcus absolutely nailed it. The fade was surgical, the beard trim immaculate. VEXORA made booking effortless.", service: "Classic Fade + Beard Trim", helpful: 24 },
  { id: 2, salon: "The Grooming Lab", worker: "Priya Nair", date: "Aug 22, 2026", rating: 5, text: "Priya understood exactly what I needed. The scalp treatment was deeply relaxing. Will definitely rebook.", service: "Scalp Treatment + Trim", helpful: 18 },
  { id: 3, salon: "The Grooming Lab", worker: "Sofia Alvarez", date: "Jul 05, 2026", rating: 4, text: "Clean cut, great conversation. Queue time was minimal thanks to VEXORA. Would have given 5 stars but the colour shade was slightly off.", service: "Signature Cut", helpful: 9 },
];

const TABS = [
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "workers", label: "Fav Workers", icon: User },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "reviews", label: "Reviews", icon: MessageSquare },
];

const StatusBadge = ({ status }) => {
  const map = {
    completed: { label: "Completed", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
    cancelled: { label: "Cancelled", bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
    paid: { label: "Paid", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  };
  const s = map[status] || map.completed;
  return (
    <span style={{ padding: "2px 9px", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", background: s.bg, color: s.color, border: `1px solid ${s.border}`, textTransform: "uppercase" }}>
      {s.label}
    </span>
  );
};

const StarRow = ({ rating, size = 13 }) => (
  <span style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>
    {[1,2,3,4,5].map((i) => (
      <Star key={i} size={size} fill={i <= rating ? "#0a0a0a" : "none"} color={i <= rating ? "#0a0a0a" : "#d4d4d8"} strokeWidth={1.5} />
    ))}
  </span>
);

const Avatar = ({ initials, size = 40 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: size > 36 ? "0.85rem" : "0.72rem", fontWeight: 700, letterSpacing: "0.06em", flexShrink: 0 }}>
    {initials}
  </div>
);

const BookingsTab = ({ onRebook }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {BOOKING_HISTORY.map((b) => (
      <div key={b.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "18px 20px", background: "var(--bg-white)", transition: "box-shadow 0.18s, border-color 0.18s", display: "flex", flexDirection: "column", gap: "12px" }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-floating)"; e.currentTarget.style.borderColor = "var(--border-medium)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <Avatar initials={b.workerAvatar} size={40} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "2px" }}>{b.service}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{b.salon} · <span style={{ fontFamily: "var(--font-mono)" }}>{b.worker}</span></div>
            </div>
          </div>
          <StatusBadge status={b.status} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", gap: "18px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}><Calendar size={12} strokeWidth={1.8} /> {b.date} · {b.time}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}><Clock size={12} strokeWidth={1.8} /> {b.duration}</span>
          </div>
          {b.status === "completed" && (
            <button onClick={() => onRebook(b.salon)} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "6px", padding: "5px 12px", cursor: "pointer", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#0a0a0a"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-subtle)"}>
              <RotateCcw size={11} strokeWidth={2} /> Rebook
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
);

const WishlistTab = ({ onBook }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {WISHLIST.map((s) => (
      <div key={s.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "20px", background: "var(--bg-white)", display: "flex", flexDirection: "column", gap: "14px", transition: "box-shadow 0.18s, border-color 0.18s" }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-floating)"; e.currentTarget.style.borderColor = "var(--border-medium)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "4px" }}>{s.salon}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={11} strokeWidth={1.8} /> {s.location}</div>
          </div>
          <Heart size={18} fill="#0a0a0a" color="#0a0a0a" style={{ cursor: "pointer", flexShrink: 0 }} />
        </div>
        <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", fontStyle: "italic" }}>"{s.tagline}"</div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <StarRow rating={Math.round(s.rating)} size={12} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 600 }}>{s.rating}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({s.reviews})</span>
          </div>
          <span style={{ width: 1, height: 14, background: "var(--border-subtle)", display: "inline-block" }} />
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-mono)" }}><Clock size={11} strokeWidth={1.8} /> {s.waitTime} wait</span>
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {s.tags.map((t) => (<span key={t} style={{ padding: "3px 9px", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 500 }}>{t}</span>))}
        </div>
        <button onClick={() => onBook(s.salon)} className="btn-primary btn-sm" style={{ alignSelf: "flex-start", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", padding: "8px 18px", display: "flex", alignItems: "center", gap: "6px" }}>
          Book Now <ArrowUpRight size={12} strokeWidth={2} />
        </button>
      </div>
    ))}
  </div>
);

const WorkersTab = ({ onBook }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {FAV_WORKERS.map((w, idx) => (
      <div key={w.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "20px", background: "var(--bg-white)", display: "flex", gap: "16px", alignItems: "flex-start", transition: "box-shadow 0.18s, border-color 0.18s" }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-floating)"; e.currentTarget.style.borderColor = "var(--border-medium)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}>
        <div style={{ position: "relative" }}>
          <Avatar initials={w.initials} size={48} />
          {idx === 0 && (
            <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, background: "#0a0a0a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>
              <Award size={9} color="#fff" fill="#fff" />
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.98rem" }}>{w.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}><Star size={12} fill="#0a0a0a" color="#0a0a0a" /><span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 600 }}>{w.rating}</span></div>
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" }}>{w.salon}</div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "10px" }}>{w.specialty}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}><span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{w.bookings}</span> visits · Next: {w.nextAvailable}</div>
            <button onClick={() => onBook(w.salon)} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", fontWeight: 600, color: "#fff", background: "#0a0a0a", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer" }}>
              <Scissors size={11} strokeWidth={2} /> Book
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const PaymentsTab = () => {
  const total = PAYMENTS.reduce((sum, p) => sum + parseInt(p.amount), 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "20px", background: "var(--bg-black)", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", letterSpacing: "0.14em", color: "var(--text-white-dim)", marginBottom: "6px", textTransform: "uppercase" }}>Total Spent</div>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.04em" }}>&#8377;{total.toLocaleString()}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", letterSpacing: "0.14em", color: "var(--text-white-dim)", marginBottom: "6px", textTransform: "uppercase" }}>Transactions</div>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.04em" }}>{PAYMENTS.length}</div>
        </div>
      </div>
      <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {PAYMENTS.map((p, i) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 18px", borderBottom: i < PAYMENTS.length - 1 ? "1px solid var(--border-ultra-subtle)" : "none", background: "var(--bg-white)", transition: "background 0.15s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-subtle)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "var(--bg-white)"}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: "8px", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CreditCard size={16} strokeWidth={1.5} color="var(--text-secondary)" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.service}</div>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{p.salon} · {p.date}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>{p.method}</span>
              <StatusBadge status={p.status} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", fontFamily: "var(--font-mono)", letterSpacing: "-0.02em" }}>&#8377;{p.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewsTab = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
    {REVIEWS.map((r) => (
      <div key={r.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "20px", background: "var(--bg-white)", display: "flex", flexDirection: "column", gap: "12px", transition: "box-shadow 0.18s, border-color 0.18s" }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-floating)"; e.currentTarget.style.borderColor = "var(--border-medium)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "3px" }}>{r.salon}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>with {r.worker} · {r.date}</div>
          </div>
          <StarRow rating={r.rating} size={13} />
        </div>
        <div style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", color: "var(--text-tertiary)", textTransform: "uppercase" }}>{r.service}</div>
        <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>"{r.text}"</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px", borderTop: "1px solid var(--border-ultra-subtle)" }}>
          <CheckCircle size={13} strokeWidth={1.8} color="var(--text-tertiary)" />
          <span style={{ fontSize: "0.74rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>{r.helpful} people found this helpful</span>
        </div>
      </div>
    ))}
  </div>
);

export const CustomerProfile = ({ isOpen, onClose, onBookSalon }) => {
  const [activeTab, setActiveTab] = useState("bookings");
  if (!isOpen) return null;
  const completedBookings = BOOKING_HISTORY.filter((b) => b.status === "completed").length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(10,10,10,0.55)", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", animation: "profile-backdrop-in 0.28s ease forwards" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: "100%", maxWidth: "680px", height: "100vh", background: "var(--bg-white)", display: "flex", flexDirection: "column", overflow: "hidden", animation: "profile-slide-in 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards", boxShadow: "-20px 0 60px rgba(0,0,0,0.12)" }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 0", borderBottom: "1px solid var(--border-subtle)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <Avatar initials="AR" size={52} />
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.03em" }}>Aryan</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>aryan@vexora.in · Member since Jul 2026</div>
              </div>
            </div>
            <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-surface-elevated)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--bg-surface)"}
              aria-label="Close profile">
              <X size={16} strokeWidth={2} />
            </button>
          </div>
          <div style={{ display: "flex", gap: "0", marginBottom: "20px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            {[{ label: "Bookings", value: BOOKING_HISTORY.length }, { label: "Completed", value: completedBookings }, { label: "Wishlisted", value: WISHLIST.length }, { label: "Reviews", value: REVIEWS.length }].map((stat, i, arr) => (
              <div key={stat.label} style={{ flex: 1, padding: "12px 14px", borderRight: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none", textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: "1.4rem", fontFamily: "var(--font-heading)", letterSpacing: "-0.04em", marginBottom: "2px" }}>{stat.value}</div>
                <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0", overflowX: "auto", scrollbarWidth: "none" }}>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 18px", border: "none", background: "none", cursor: "pointer", whiteSpace: "nowrap", fontWeight: active ? 600 : 500, fontSize: "0.82rem", color: active ? "var(--text-primary)" : "var(--text-muted)", borderBottom: active ? "2px solid #0a0a0a" : "2px solid transparent", transition: "color 0.15s, border-color 0.15s", marginBottom: "-1px" }}>
                  <Icon size={14} strokeWidth={1.8} />{tab.label}
                </button>
              );
            })}
          </div>
        </div>
        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", scrollbarWidth: "thin" }}>
          {activeTab === "bookings" && <BookingsTab onRebook={(n) => { onClose(); onBookSalon(n); }} />}
          {activeTab === "wishlist" && <WishlistTab onBook={(n) => { onClose(); onBookSalon(n); }} />}
          {activeTab === "workers" && <WorkersTab onBook={(n) => { onClose(); onBookSalon(n); }} />}
          {activeTab === "payments" && <PaymentsTab />}
          {activeTab === "reviews" && <ReviewsTab />}
        </div>
      </div>
      <style>{`
        @keyframes profile-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes profile-slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
};
