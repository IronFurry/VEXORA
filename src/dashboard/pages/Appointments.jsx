import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { Clock, User, Scissors } from "lucide-react";

const STATUS_STYLE = {
  confirmed: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", label: "Confirmed" },
  pending: { bg: "#fffbeb", color: "#d97706", border: "#fde68a", label: "Pending" },
  completed: { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb", label: "Completed" },
  cancelled: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", label: "Cancelled" },
};

const days = ["Today", "Tomorrow", "Sep 10", "Sep 11", "Sep 12", "Sep 13", "Sep 14"];

export const Appointments = () => {
  const { appointments } = useDashboard();
  const [selectedDay, setSelectedDay] = useState("Today");

  const filtered = appointments.filter(a => a.date === selectedDay);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Appointments</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Manage upcoming and today's bookings.</p>
      </div>

      {/* Day Strip */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, overflowX: "auto", scrollbarWidth: "none" }}>
        {days.map(d => (
          <button key={d} onClick={() => setSelectedDay(d)} style={{ padding: "8px 18px", borderRadius: "var(--radius-pill)", border: "1px solid", borderColor: selectedDay === d ? "#0a0a0a" : "var(--border-subtle)", background: selectedDay === d ? "#0a0a0a" : "transparent", color: selectedDay === d ? "#fff" : "var(--text-secondary)", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>
            {d}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>No appointments for {selectedDay}</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(a => {
            const s = STATUS_STYLE[a.status] || STATUS_STYLE.pending;
            return (
              <div key={a.id} style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 20, transition: "box-shadow 0.18s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--shadow-floating)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>{a.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.98rem", marginBottom: 4 }}>{a.customer}</div>
                  <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.8rem", color: "var(--text-muted)" }}><Scissors size={12} strokeWidth={1.8} />{a.service}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.8rem", color: "var(--text-muted)" }}><User size={12} strokeWidth={1.8} />{a.staff}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.8rem", color: "var(--text-muted)" }}><Clock size={12} strokeWidth={1.8} />{a.duration} min</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 6, fontFamily: "var(--font-mono)" }}>{a.time}</div>
                  <span style={{ padding: "3px 10px", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
