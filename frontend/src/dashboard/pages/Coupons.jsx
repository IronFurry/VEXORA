import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { Plus, X, Tag } from "lucide-react";

export const Coupons = () => {
  const { coupons, toggleCoupon, addCoupon } = useDashboard();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: "", couponType: "percentage", value: 10, minOrder: 0, expiry: "", description: "" });

  const handleCreate = () => {
    if (!form.code.trim() || !form.expiry) return;
    addCoupon(form);
    setShowModal(false);
    setForm({ code: "", couponType: "percentage", value: 10, minOrder: 0, expiry: "", description: "" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Coupons</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{coupons.length} coupons · {coupons.filter(c => c.active).length} active</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: 6, borderRadius: "var(--radius-sm)" }}>
          <Plus size={14} /> Create Coupon
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {coupons.map(c => (
          <div key={c.id} style={{ background: "var(--bg-white)", border: "1px solid", borderColor: c.active ? "var(--border-subtle)" : "var(--border-ultra-subtle)", borderRadius: "var(--radius-md)", padding: "22px", opacity: c.active ? 1 : 0.6, transition: "box-shadow 0.18s, border-color 0.18s" }}
            onMouseEnter={e => { if (c.active) e.currentTarget.style.boxShadow = "var(--shadow-floating)"; }}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: c.active ? "#0a0a0a" : "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Tag size={16} color={c.active ? "#fff" : "var(--text-muted)"} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.06em" }}>{c.code}</div>
                  <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>{c.description}</div>
                </div>
              </div>
              <button onClick={() => toggleCoupon(c.id)} style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", border: "1px solid", borderColor: c.active ? "#bbf7d0" : "var(--border-subtle)", background: c.active ? "#f0fdf4" : "var(--bg-surface)", color: c.active ? "#16a34a" : "var(--text-muted)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>{c.active ? "Active" : "Inactive"}</button>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-ultra-subtle)" }}>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.04em", lineHeight: 1 }}>{c.type === "percentage" ? `${c.value}%` : `?${c.value}`}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginTop: 2 }}>{c.type === "percentage" ? "Percentage Off" : "Flat Discount"}</div>
              </div>
              <div style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: 20 }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 4 }}>Min. Order: <strong>?{c.minOrder}</strong></div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 4 }}>Expires: <strong>{c.expiry}</strong></div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Used: <strong>{c.used}×</strong></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 4000, background: "rgba(10,10,10,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowModal(false)}>
          <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 32, width: "100%", maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span style={{ fontWeight: 800 }}>Create Coupon</span>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[["Coupon Code", "code", "text"], ["Discount Value", "value", "number"]].map(([label, key, type]) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" }}>{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: type === "number" ? parseInt(e.target.value) || 0 : e.target.value.toUpperCase() }))} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", outline: "none" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" }}>Type</label>
                <select value={form.couponType} onChange={e => setForm(f => ({ ...f, couponType: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", outline: "none" }}>
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" }}>Min Order (?)</label>
                <input type="number" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: parseInt(e.target.value) || 0 }))} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", outline: "none" }} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" }}>Expiry Date</label>
              <input type="text" placeholder="e.g. Dec 31, 2026" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", outline: "none" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" }}>Description</label>
              <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", outline: "none" }} />
            </div>
            <button onClick={handleCreate} className="btn-primary" style={{ width: "100%", borderRadius: "var(--radius-sm)" }}>Create Coupon</button>
          </div>
        </div>
      )}
    </div>
  );
};
