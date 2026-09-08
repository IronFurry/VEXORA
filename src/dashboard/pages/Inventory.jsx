import React from "react";
import { useDashboard } from "../../context/DashboardContext";
import { AlertTriangle, Plus, Minus } from "lucide-react";

export const Inventory = () => {
  const { inventory, updateStock } = useDashboard();
  const lowStock = inventory.filter(i => i.stock <= i.reorderAt);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Inventory</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{inventory.length} products · {lowStock.length} low stock alerts</p>
      </div>

      {lowStock.length > 0 && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "var(--radius-md)", padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <AlertTriangle size={16} color="#d97706" />
          <span style={{ fontSize: "0.85rem", color: "#92400e", fontWeight: 500 }}>{lowStock.length} item{lowStock.length > 1 ? "s are" : " is"} below reorder level: {lowStock.map(i => i.name).join(", ")}</span>
        </div>
      )}

      <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 100px 90px 120px", padding: "10px 20px", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
          {["Product", "Category", "In Stock", "Used Today", "Reorder At", "Actions"].map(h => (
            <span key={h} style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {inventory.map((item, i) => {
          const isLow = item.stock <= item.reorderAt;
          return (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 100px 90px 120px", padding: "14px 20px", borderBottom: i < inventory.length - 1 ? "1px solid var(--border-ultra-subtle)" : "none", alignItems: "center", background: isLow ? "#fffbeb08" : "transparent", transition: "background 0.12s" }}
              onMouseEnter={e => !isLow && (e.currentTarget.style.background = "var(--bg-subtle)")}
              onMouseLeave={e => e.currentTarget.style.background = isLow ? "#fffbeb08" : "transparent"}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.name}</div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{item.unit}</div>
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.category}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.92rem", color: isLow ? "#d97706" : "var(--text-primary)" }}>{item.stock}</span>
                {isLow && <AlertTriangle size={13} color="#d97706" />}
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)" }}>{item.usedToday}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: isLow ? "#d97706" : "var(--text-muted)" }}>{item.reorderAt}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => updateStock(item.id, -1)} disabled={item.stock === 0} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={12} /></button>
                <button onClick={() => updateStock(item.id, 10)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={12} /></button>
                <button onClick={() => updateStock(item.id, 1)} style={{ padding: "0 10px", height: 28, borderRadius: 6, border: "1px solid #0a0a0a", background: "#0a0a0a", color: "#fff", cursor: "pointer", fontSize: "0.68rem", fontWeight: 700 }}>+1</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
