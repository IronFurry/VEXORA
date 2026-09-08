import React from "react";
import { useDashboard } from "../../context/DashboardContext";
import { useAuth } from "../../context/AuthContext";
import { Users, DollarSign, Clock, Activity, Calendar, Zap } from "lucide-react";

const statusColor = { "in-service": "#16a34a", waiting: "#d97706", cancelled: "#dc2626" };
const statusLabel = { "in-service": "In Service", waiting: "Waiting", cancelled: "Cancelled" };

export const Overview = () => {
  const { queue, appointments, staff, completedToday, revenueToday, notifications } = useDashboard();
  const { manager } = useAuth();
  const activeQueue = queue.filter(q => q.status !== "cancelled").length;
  const inService = queue.filter(q => q.status === "in-service").length;
  const avgWait = queue.length ? Math.round(queue.reduce((s, q) => s + q.eta, 0) / queue.length) : 0;
  const todayApts = appointments.filter(a => a.date === "Today").length;
  const capacity = Math.round((inService / Math.max(staff.length, 1)) * 100);

  const kpis = [
    { label: "Today's Customers", value: completedToday, sub: `+${inService} in service`, icon: Users },
    { label: "Revenue Today", value: `₹${revenueToday.toLocaleString()}`, sub: "38 transactions", icon: DollarSign },
    { label: "Avg Wait Time", value: `${avgWait} min`, sub: "-2.1 vs yesterday", icon: Clock },
    { label: "Active Queue", value: activeQueue, sub: `${inService} in service`, icon: Activity },
    { label: "Appointments", value: todayApts, sub: "Today's bookings", icon: Calendar },
    { label: "Salon Capacity", value: `${capacity}%`, sub: `${inService}/${staff.length} chairs`, icon: Zap },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>
          Good afternoon, {manager?.salonName || manager?.name || 'Partner Salon'}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Here's what's happening at your salon today.</p>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }} className="kpi-grid">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px", transition: "box-shadow 0.18s, border-color 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-floating)"; e.currentTarget.style.borderColor = "var(--border-medium)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase" }}>{k.label}</span>
                <div style={{ width: 32, height: 32, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} strokeWidth={1.8} color="var(--text-secondary)" />
                </div>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.04em", marginBottom: 4 }}>{k.value}</div>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{k.sub}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }} className="overview-bottom-grid">
        {/* Live Queue Preview */}
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Live Queue</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>{activeQueue} active</span>
          </div>
          <div>
            {queue.slice(0, 5).map((q) => (
              <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: "1px solid var(--border-ultra-subtle)" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, fontFamily: "var(--font-mono)", flexShrink: 0 }}>{q.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: 1 }}>{q.customer}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>{q.service}</div>
                </div>
                <span style={{ padding: "3px 8px", borderRadius: 9999, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: statusColor[q.status] + "18", color: statusColor[q.status] }}>{statusLabel[q.status]}</span>
                {q.eta > 0 && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--text-muted)", flexShrink: 0 }}>{q.eta}m</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Activity</span>
          </div>
          <div style={{ padding: "8px 0" }}>
            {notifications.slice(0, 8).map((n) => {
              const iconMap = { join: "•", start: "►", complete: "✓", appt: "📅", alert: "!" };
              return (
                <div key={n.id} style={{ display: "flex", gap: 10, padding: "10px 16px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.75rem", marginTop: 1, flexShrink: 0 }}>{iconMap[n.type]}</span>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 500, marginBottom: 2 }}>{n.text}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{n.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`.kpi-grid { } @media(max-width:900px){.kpi-grid{grid-template-columns:1fr 1fr!important}.overview-bottom-grid{grid-template-columns:1fr!important}} @media(max-width:600px){.kpi-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};
