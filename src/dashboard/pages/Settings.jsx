import React, { useState } from "react";
import { Save, AlertTriangle } from "lucide-react";

const HOURS = Array.from({length: 24}, (_, i) => {
  const h = i % 12 || 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${h}:00 ${ampm}`;
});

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const defaultHours = {
  Monday: { open: true, from: "9:00 AM", to: "8:00 PM" },
  Tuesday: { open: true, from: "9:00 AM", to: "8:00 PM" },
  Wednesday: { open: true, from: "9:00 AM", to: "8:00 PM" },
  Thursday: { open: true, from: "9:00 AM", to: "8:00 PM" },
  Friday: { open: true, from: "9:00 AM", to: "9:00 PM" },
  Saturday: { open: true, from: "8:00 AM", to: "9:00 PM" },
  Sunday: { open: false, from: "10:00 AM", to: "6:00 PM" },
};

export const Settings = () => {
  const [profile, setProfile] = useState({ name: "Looks & Co. Studio", address: "12, Khan Market, New Delhi 110003", phone: "+91 98765 00000", email: "hello@looksandco.in", description: "Premium barbershop and salon in the heart of New Delhi. Specialists in precision cuts, beard artistry, and scalp treatments." });
  const [hours, setHours] = useState(defaultHours);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const InputField = ({ label, value, onChange, multiline }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", resize: "vertical", outline: "none", fontFamily: "var(--font-body)" }} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", outline: "none" }} />
      }
    </div>
  );

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Settings</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Manage your salon profile and preferences.</p>
      </div>

      {/* Salon Profile */}
      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 28, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 22, paddingBottom: 14, borderBottom: "1px solid var(--border-subtle)" }}>Salon Profile</div>
        <InputField label="Salon Name" value={profile.name} onChange={v => setProfile(p => ({ ...p, name: v }))} />
        <InputField label="Address" value={profile.address} onChange={v => setProfile(p => ({ ...p, address: v }))} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <InputField label="Phone" value={profile.phone} onChange={v => setProfile(p => ({ ...p, phone: v }))} />
          <InputField label="Email" value={profile.email} onChange={v => setProfile(p => ({ ...p, email: v }))} />
        </div>
        <InputField label="Description" value={profile.description} onChange={v => setProfile(p => ({ ...p, description: v }))} multiline />
      </div>

      {/* Operating Hours */}
      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 28, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 22, paddingBottom: 14, borderBottom: "1px solid var(--border-subtle)" }}>Operating Hours</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DAYS.map(day => (
            <div key={day} style={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={hours[day].open} onChange={() => setHours(h => ({ ...h, [day]: { ...h[day], open: !h[day].open } }))} id={`day-${day}`} style={{ cursor: "pointer" }} />
                <label htmlFor={`day-${day}`} style={{ fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>{day.slice(0, 3)}</label>
              </div>
              {hours[day].open ? (
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <select value={hours[day].from} onChange={e => setHours(h => ({ ...h, [day]: { ...h[day], from: e.target.value } }))} style={{ padding: "6px 10px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem", outline: "none" }}>
                    {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>to</span>
                  <select value={hours[day].to} onChange={e => setHours(h => ({ ...h, [day]: { ...h[day], to: e.target.value } }))} style={{ padding: "6px 10px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem", outline: "none" }}>
                    {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ) : <span style={{ fontSize: "0.82rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>Closed</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <button onClick={handleSave} className="btn-primary" style={{ borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: 8 }}>
          <Save size={15} strokeWidth={2} /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Danger Zone */}
      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-md)", padding: 24 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
          <AlertTriangle size={15} color="#dc2626" />
          <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#dc2626" }}>Danger Zone</span>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#7f1d1d", marginBottom: 14 }}>Permanently delete your salon account and all associated data. This action cannot be undone.</p>
        <button style={{ padding: "8px 18px", border: "1px solid #fecaca", background: "#fff", color: "#dc2626", borderRadius: "var(--radius-sm)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>Delete Salon Account</button>
      </div>
    </div>
  );
};
