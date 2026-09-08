import React from "react";

const REVENUE = [12400, 15800, 11200, 18400, 14600, 16900, 20100];
const CUSTOMERS = [18, 22, 16, 28, 21, 25, 32];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SERVICES = [
  { name: "Precision Fade", pct: 82 },
  { name: "Hot Towel Shave", pct: 61 },
  { name: "Hair Colour", pct: 48 },
  { name: "Scalp Treatment", pct: 34 },
  { name: "Premium Facial", pct: 27 },
  { name: "Beard Trim", pct: 55 },
];
const PEAK = [2,5,8,12,14,10,7,4,6,3,1,0];
const HOURS = ["8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm"];
const AVG_WAIT = [8.2, 7.4, 9.1, 6.8, 7.2, 6.5, 5.9];

const maxRevenue = Math.max(...REVENUE);
const maxCustomers = Math.max(...CUSTOMERS);
const maxPeak = Math.max(...PEAK);
const maxWait = Math.max(...AVG_WAIT);

export const Analytics = () => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Analytics</h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Last 7 days performance overview</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="analytics-grid-2">
      {/* Revenue Chart */}
      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>Revenue</div>
          <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>7-day trend · ?{REVENUE.reduce((a,b)=>a+b,0).toLocaleString()} total</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
          {REVENUE.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", background: i === 6 ? "#0a0a0a" : "var(--bg-surface)", borderRadius: "4px 4px 0 0", height: `${(v / maxRevenue) * 100}%`, minHeight: 4, transition: "height 0.4s" }} />
              <span style={{ fontSize: "0.64rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customers Chart */}
      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>Customers</div>
          <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Daily visits · {CUSTOMERS.reduce((a,b)=>a+b,0)} this week</div>
        </div>
        <svg viewBox="0 0 260 100" style={{ width: "100%", height: 120 }}>
          <polyline points={CUSTOMERS.map((v, i) => `${(i / (CUSTOMERS.length - 1)) * 250 + 5},${95 - (v / maxCustomers) * 85}`).join(" ")} fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {CUSTOMERS.map((v, i) => (
            <circle key={i} cx={(i / (CUSTOMERS.length - 1)) * 250 + 5} cy={95 - (v / maxCustomers) * 85} r="3" fill="#0a0a0a" />
          ))}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {DAYS.map(d => <span key={d} style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{d}</span>)}
        </div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="analytics-grid-2">
      {/* Popular Services */}
      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
        <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 20 }}>Popular Services</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SERVICES.sort((a,b) => b.pct-a.pct).map(s => (
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
          {DAYS.map(d => <span key={d} style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{d}</span>)}
        </div>
      </div>
    </div>

    {/* Peak Hours */}
    <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "22px 24px" }}>
      <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 20 }}>Peak Hours <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 400, marginLeft: 8 }}>Avg customers per hour</span></div>
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
