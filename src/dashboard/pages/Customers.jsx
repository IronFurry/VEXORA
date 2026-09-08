import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { Search, X } from "lucide-react";

export const Customers = () => {
  const { customers } = useDashboard();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Customers</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{customers.length} registered customers · {customers.filter(c => c.type === "returning").length} returning</p>
      </div>

      <div style={{ position: "relative", marginBottom: 20 }}>
        <Search size={16} strokeWidth={1.8} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." style={{ width: "100%", padding: "10px 14px 10px 40px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", background: "var(--bg-white)" }} />
      </div>

      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 100px 120px 90px", padding: "10px 20px", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
          {["Customer", "Visits", "Last Visit", "Spent", "Fav Service", "Type"].map(h => (
            <span key={h} style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {filtered.map((c, i) => (
          <div key={c.id} onClick={() => setSelected(c)} style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 100px 120px 90px", padding: "14px 20px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border-ultra-subtle)" : "none", alignItems: "center", cursor: "pointer", transition: "background 0.12s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-subtle)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>{c.initials}</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{c.name}</div>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600 }}>{c.visits}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{c.lastVisit.split(",")[0]}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600 }}>?{c.totalSpent.toLocaleString()}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{c.favService}</span>
            <span style={{ padding: "3px 9px", borderRadius: 9999, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", background: c.type === "returning" ? "#f0fdf4" : "#eff6ff", color: c.type === "returning" ? "#16a34a" : "#2563eb", border: c.type === "returning" ? "1px solid #bbf7d0" : "1px solid #bfdbfe", width: "fit-content" }}>{c.type}</span>
          </div>
        ))}
      </div>

      {/* Side Drawer */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, zIndex: 4000, background: "rgba(10,10,10,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setSelected(null)}>
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 360, background: "var(--bg-white)", borderLeft: "1px solid var(--border-subtle)", padding: 28, overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontWeight: 800, fontSize: "1rem" }}>Customer Profile</span>
              <button onClick={() => setSelected(null)} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} /></button>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "1rem" }}>{selected.initials}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{selected.name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{selected.phone}</div>
              </div>
            </div>
            {[["Total Visits", selected.visits], ["Total Spent", `?${selected.totalSpent.toLocaleString()}`], ["Last Visit", selected.lastVisit], ["Favorite Service", selected.favService], ["Customer Type", selected.type]].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border-ultra-subtle)" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{label}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, textTransform: "capitalize" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
