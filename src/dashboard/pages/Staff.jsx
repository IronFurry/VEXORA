import React from "react";
import { useDashboard } from "../../context/DashboardContext";

const STATUS = {
  available: { label: "Available", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "in-service": { label: "In Service", bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  break: { label: "On Break", bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
};

export const Staff = () => {
  const { staff, toggleStaffStatus } = useDashboard();
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Staff Management</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{staff.length} team members · {staff.filter(s => s.status === "available").length} available now</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {staff.map(s => {
          const st = STATUS[s.status];
          return (
            <div key={s.id} style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px", transition: "box-shadow 0.18s, border-color 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-floating)"; e.currentTarget.style.borderColor = "var(--border-medium)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.85rem" }}>{s.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{s.name}</div>
                    <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>{s.role}</div>
                  </div>
                </div>
                <button onClick={() => toggleStaffStatus(s.id)} style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", border: `1px solid ${st.border}`, background: st.bg, color: st.color, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>{st.label}</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14, padding: "12px 0", borderTop: "1px solid var(--border-ultra-subtle)", borderBottom: "1px solid var(--border-ultra-subtle)" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.3rem", fontFamily: "var(--font-heading)", letterSpacing: "-0.04em" }}>{s.todayClients}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Clients Today</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.3rem", fontFamily: "var(--font-heading)", letterSpacing: "-0.04em" }}>{s.rating}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Rating</div>
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Shift</div>
                <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>{s.shift}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Services</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {s.assignedServices.slice(0, 3).map(sv => (
                    <span key={sv} style={{ padding: "2px 8px", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 4, fontSize: "0.72rem" }}>{sv}</span>
                  ))}
                  {s.assignedServices.length > 3 && <span style={{ padding: "2px 8px", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 4, fontSize: "0.72rem", color: "var(--text-muted)" }}>+{s.assignedServices.length - 3}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
