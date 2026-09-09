import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { useAuth } from "../../context/AuthContext";
import { Users, DollarSign, Clock, Activity, Calendar, Zap, RefreshCw, TrendingUp, CheckCircle2 } from "lucide-react";

const statusColor = { "in-service": "#16a34a", waiting: "#d97706", cancelled: "#dc2626" };
const statusLabel = { "in-service": "In Service", waiting: "Waiting", cancelled: "Cancelled" };

export const Overview = () => {
  const { queue, appointments, staff, completedToday, revenueToday, transactionsToday, notifications, isApiLoading, refreshData } = useDashboard();
  const { manager } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeQueue = queue.filter(q => q.status !== "cancelled" && q.status !== "completed").length;
  const inService = queue.filter(q => q.status === "in-service").length;
  const avgWait = queue.length ? Math.round(queue.reduce((s, q) => s + (q.eta || 0), 0) / queue.length) : 0;
  const todayApts = appointments.filter(a => a.date === "Today").length;
  const capacity = Math.round((inService / Math.max(staff.length, 1)) * 100);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const kpis = [
    {
      label: "Today's Customers",
      value: completedToday,
      sub: `+${inService} currently in service`,
      icon: Users,
      color: "#3b82f6",
      bg: "#eff6ff",
      border: "#bfdbfe"
    },
    {
      label: "Revenue Today",
      value: `₹${Number(revenueToday || 0).toLocaleString("en-IN")}`,
      sub: `${transactionsToday || 0} transactions completed`,
      icon: DollarSign,
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#bbf7d0",
      highlight: true
    },
    {
      label: "Avg Wait Time",
      value: `${avgWait} min`,
      sub: "Real-time queue average",
      icon: Clock,
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a"
    },
    {
      label: "Active Queue",
      value: activeQueue,
      sub: `${inService} in service right now`,
      icon: Activity,
      color: "#8b5cf6",
      bg: "#f5f3ff",
      border: "#ddd6fe"
    },
    {
      label: "Appointments",
      value: todayApts,
      sub: "Today's scheduled bookings",
      icon: Calendar,
      color: "#0891b2",
      bg: "#ecfeff",
      border: "#a5f3fc"
    },
    {
      label: "Salon Capacity",
      value: `${capacity}%`,
      sub: `${inService} of ${staff.length} chairs occupied`,
      icon: Zap,
      color: "#dc2626",
      bg: "#fef2f2",
      border: "#fecaca"
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>
            {greeting}, {manager?.salonName || manager?.name || "Partner Salon"} 👋
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Here's your salon performance for today · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing || isApiLoading}
          title="Refresh dashboard data"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 8,
            border: "1px solid var(--border-subtle)",
            background: "var(--bg-white)",
            color: "var(--text-secondary)",
            fontSize: "0.8rem", fontWeight: 600,
            cursor: isRefreshing ? "not-allowed" : "pointer",
            transition: "all 0.15s",
            opacity: isRefreshing ? 0.6 : 1
          }}
        >
          <RefreshCw size={14} style={{ animation: isRefreshing ? "spin 0.8s linear infinite" : "none" }} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Revenue Highlight Banner */}
      {Number(revenueToday) > 0 && (
        <div style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1c1c1e 100%)",
          borderRadius: "var(--radius-md)",
          padding: "20px 28px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={22} color="#22c55e" />
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "#6b7280", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                Total Revenue Generated Today
              </div>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}>
                ₹{Number(revenueToday).toLocaleString("en-IN")}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.68rem", color: "#6b7280", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 4 }}>Transactions</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>{transactionsToday || 0}</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.68rem", color: "#6b7280", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 4 }}>Customers Served</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>{completedToday}</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.68rem", color: "#6b7280", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 4 }}>Avg per Service</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>
                ₹{transactionsToday ? Math.round(revenueToday / transactionsToday).toLocaleString("en-IN") : 0}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }} className="kpi-grid">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              style={{
                background: k.highlight ? k.bg : "var(--bg-white)",
                border: `1px solid ${k.highlight ? k.border : "var(--border-subtle)"}`,
                borderRadius: "var(--radius-md)",
                padding: "20px 24px",
                transition: "box-shadow 0.18s, border-color 0.18s",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-floating)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  {k.label}
                </span>
                <div style={{ width: 32, height: 32, background: k.bg || "var(--bg-surface)", border: `1px solid ${k.border || "var(--border-subtle)"}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} strokeWidth={1.8} color={k.color} />
                </div>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.04em", marginBottom: 4, color: k.highlight ? k.color : "var(--text-primary)" }}>
                {isApiLoading ? <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>Loading…</span> : k.value}
              </div>
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
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {activeQueue > 0 && (
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
              )}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>{activeQueue} active</span>
            </div>
          </div>
          <div>
            {queue.filter(q => q.status !== "cancelled" && q.status !== "completed").slice(0, 6).map((q) => (
              <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: "1px solid var(--border-ultra-subtle)" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                  {q.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: 1 }}>{q.customer}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>{q.service}</div>
                </div>
                <span style={{ padding: "3px 8px", borderRadius: 9999, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: (statusColor[q.status] || "#71717a") + "18", color: statusColor[q.status] || "#71717a" }}>
                  {statusLabel[q.status] || q.status}
                </span>
                {q.eta > 0 && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--text-muted)", flexShrink: 0 }}>{q.eta}m</span>}
              </div>
            ))}
            {queue.filter(q => q.status !== "cancelled" && q.status !== "completed").length === 0 && (
              <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                <CheckCircle2 size={28} strokeWidth={1.5} style={{ marginBottom: 8, opacity: 0.4 }} />
                <div>Queue is clear right now</div>
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Recent Activity</span>
          </div>
          <div style={{ padding: "8px 0" }}>
            {notifications.slice(0, 8).map((n) => {
              const iconMap = { join: "•", start: "►", complete: "✓", appt: "📅", alert: "⚠" };
              const colorMap = { join: "#3b82f6", start: "#16a34a", complete: "#22c55e", appt: "#8b5cf6", alert: "#d97706" };
              return (
                <div key={n.id} style={{ display: "flex", gap: 10, padding: "10px 16px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.75rem", marginTop: 1, flexShrink: 0, color: colorMap[n.type] || "#6b7280" }}>{iconMap[n.type] || "·"}</span>
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 500, marginBottom: 2 }}>{n.text}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{n.time}</div>
                  </div>
                </div>
              );
            })}
            {notifications.length === 0 && (
              <div style={{ padding: "28px 16px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .kpi-grid { }
        @media(max-width:900px){.kpi-grid{grid-template-columns:1fr 1fr!important}.overview-bottom-grid{grid-template-columns:1fr!important}}
        @media(max-width:600px){.kpi-grid{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
};
