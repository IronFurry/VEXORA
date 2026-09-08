import React, { useState, useEffect } from "react";
import { dashboardApi } from "../../api/dashboardApi";

const DEFAULT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_REVENUE = [1800, 2150, 2500, 2850, 3200, 3550, 3400];
const CUSTOMERS = [6, 8, 9, 11, 12, 14, 10];
const SERVICES = [
  { name: "Precision Haircut", pct: 85 },
  { name: "Beard Trim & Sculpting", pct: 65 },
  { name: "Executive Facial Therapy", pct: 42 },
  { name: "Nourishing Hair Spa", pct: 38 },
  { name: "Couture Hair Coloring", pct: 30 },
  { name: "Texture & Blowdry Styling", pct: 25 },
];
const PEAK = [1, 3, 5, 8, 10, 7, 5, 3, 4, 2, 1, 0];
const HOURS = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];
const AVG_WAIT = [8.2, 7.4, 6.1, 5.8, 7.2, 6.5, 4.9];

export const Analytics = () => {
  const [revenueData, setRevenueData] = useState(DEFAULT_REVENUE);
  const [dayLabels, setDayLabels] = useState(DEFAULT_DAYS);
  const [totalRevenue, setTotalRevenue] = useState(24800);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await dashboardApi.getPaymentSummary(7);
        if (res.data?.summary && res.data.summary.length > 0) {
          const revs = res.data.summary.map(item => item.revenue);
          const days = res.data.summary.map(item => {
            const d = new Date(item._id);
            return d.toLocaleDateString([], { weekday: "short" });
          });
          setRevenueData(revs);
          setDayLabels(days);
          setTotalRevenue(res.data.totalRevenue || revs.reduce((a, b) => a + b, 0));
        }
      } catch (err) {
        console.warn("Could not load dynamic payment summary:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const maxRevenue = Math.max(...revenueData, 100);
  const maxCustomers = Math.max(...CUSTOMERS);
  const maxPeak = Math.max(...PEAK);
  const maxWait = Math.max(...AVG_WAIT);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Analytics</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Last 7 days performance and revenue overview</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="analytics-grid-2">
        {/* Revenue Chart */}
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>Revenue</div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              7-day trend · ₹{totalRevenue.toLocaleString()} total revenue
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
            {revenueData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div
                  title={`₹${v.toLocaleString()}`}
                  style={{
                    width: "100%",
                    background: i === revenueData.length - 1 ? "#0a0a0a" : "var(--bg-surface)",
                    borderRadius: "4px 4px 0 0",
                    height: `${Math.max(6, (v / maxRevenue) * 100)}%`,
                    transition: "height 0.4s",
                    cursor: "pointer"
                  }}
                />
                <span style={{ fontSize: "0.64rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  {dayLabels[i] || DEFAULT_DAYS[i % 7]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customers Chart */}
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>Customers</div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Daily visits · {CUSTOMERS.reduce((a, b) => a + b, 0)} this week
            </div>
          </div>
          <svg viewBox="0 0 260 100" style={{ width: "100%", height: 120 }}>
            <polyline
              points={CUSTOMERS.map((v, i) => `${(i / (CUSTOMERS.length - 1)) * 250 + 5},${95 - (v / maxCustomers) * 85}`).join(" ")}
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {CUSTOMERS.map((v, i) => (
              <circle key={i} cx={(i / (CUSTOMERS.length - 1)) * 250 + 5} cy={95 - (v / maxCustomers) * 85} r="3" fill="#0a0a0a" />
            ))}
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {DEFAULT_DAYS.map(d => <span key={d} style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{d}</span>)}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="analytics-grid-2">
        {/* Popular Services */}
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 20 }}>Popular Services</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SERVICES.sort((a, b) => b.pct - a.pct).map(s => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700 }}>{s.pct}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 9999, background: "var(--bg-surface)", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#0a0a0a", width: `${s.pct}%`, borderRadius: 9999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avg Wait Time */}
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>Avg Wait Time</div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Minutes · 7-day trend</div>
          </div>
          <svg viewBox="0 0 260 80" style={{ width: "100%", height: 100 }}>
            <polyline points={AVG_WAIT.map((v, i) => `${(i / (AVG_WAIT.length - 1)) * 250 + 5},${75 - (v / maxWait) * 65}`).join(" ")} fill="none" stroke="#0a0a0a" strokeWidth="2" strokeDasharray="0" strokeLinejoin="round" strokeLinecap="round" />
            {AVG_WAIT.map((v, i) => (
              <g key={i}>
                <circle cx={(i / (AVG_WAIT.length - 1)) * 250 + 5} cy={75 - (v / maxWait) * 65} r="3" fill="#0a0a0a" />
                <text x={(i / (AVG_WAIT.length - 1)) * 250 + 5} y={75 - (v / maxWait) * 65 - 8} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#71717a">{v}m</text>
              </g>
            ))}
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {DEFAULT_DAYS.map(d => <span key={d} style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{d}</span>)}
          </div>
        </div>
      </div>

      {/* Peak Hours */}
      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
        <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 20 }}>
          Peak Hours <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 400, marginLeft: 8 }}>Avg customers per hour</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 80 }}>
          {PEAK.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: v === maxPeak ? "#0a0a0a" : v > maxPeak * 0.6 ? "#52525b" : "var(--bg-surface-elevated)", height: `${Math.max(8, (v / maxPeak) * 70)}px`, transition: "height 0.4s" }} />
              <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{HOURS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:800px){.analytics-grid-2{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};

export default Analytics;
