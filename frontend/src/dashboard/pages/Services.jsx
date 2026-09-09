import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { Plus, X } from "lucide-react";

const CATS = ["Hair", "Beard", "Colour", "Treatment", "Skin"];

export const Services = () => {
  const { services, toggleService, addService } = useDashboard();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Hair", duration: 30, price: 0 });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addService(form);
    setShowModal(false);
    setForm({ name: "", category: "Hair", duration: 30, price: 0 });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Services</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{services.length} services · {services.filter(s => s.available).length} available</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: 6, borderRadius: "var(--radius-sm)" }}>
          <Plus size={14} strokeWidth={2} /> Add Service
        </button>
      </div>

      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 80px 80px 100px", padding: "10px 20px", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
          {["Service", "Category", "Duration", "Price", "Status"].map(h => (
            <span key={h} style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {services.map((s, i) => (
          <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 80px 80px 100px", padding: "14px 20px", borderBottom: i < services.length - 1 ? "1px solid var(--border-ultra-subtle)" : "none", alignItems: "center", transition: "background 0.12s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-subtle)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{s.name}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{s.category}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>{s.duration}m</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600 }}>?{s.price}</span>
            <button onClick={() => toggleService(s.id)} style={{ padding: "4px 12px", borderRadius: "var(--radius-pill)", border: "1px solid", borderColor: s.available ? "#bbf7d0" : "var(--border-subtle)", background: s.available ? "#f0fdf4" : "var(--bg-surface)", color: s.available ? "#16a34a" : "var(--text-muted)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", width: "fit-content" }}>{s.available ? "Active" : "Inactive"}</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 4000, background: "rgba(10,10,10,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowModal(false)}>
          <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 32, width: "100%", maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span style={{ fontWeight: 800, fontSize: "1rem" }}>Add New Service</span>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>
            {[["Service Name", "name", "text"], ["Price (?)", "price", "number"], ["Duration (min)", "duration", "number"]].map(([label, key, type]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: type === "number" ? parseInt(e.target.value) || 0 : e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", outline: "none" }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6, color: "var(--text-secondary)" }}>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", outline: "none" }}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={handleAdd} className="btn-primary" style={{ width: "100%", borderRadius: "var(--radius-sm)" }}>Add Service</button>
          </div>
        </div>
      )}
    </div>
  );
};
