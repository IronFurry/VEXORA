import React from "react";
import { useDashboard } from "../../context/DashboardContext";
import { Star, ThumbsUp } from "lucide-react";

const StarRow = ({ rating, size = 14 }) => (
  <span style={{ display: "inline-flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => <Star key={i} size={size} fill={i <= rating ? "#0a0a0a" : "none"} color={i <= rating ? "#0a0a0a" : "#d4d4d8"} strokeWidth={1.5} />)}
  </span>
);

export const Reviews = () => {
  const { reviews } = useDashboard();
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5,4,3,2,1].map(star => ({ star, count: reviews.filter(r => r.rating === star).length }));

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Reviews</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{reviews.length} reviews · {avg} average rating</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20, marginBottom: 28 }} className="reviews-top-grid">
        {/* Rating summary */}
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: "4rem", fontWeight: 800, fontFamily: "var(--font-heading)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 8 }}>{avg}</div>
          <StarRow rating={Math.round(avg)} size={18} />
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 8, fontFamily: "var(--font-mono)" }}>Based on {reviews.length} reviews</div>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {dist.map(d => (
              <div key={d.star} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", width: 12, textAlign: "right" }}>{d.star}</span>
                <Star size={11} fill="#0a0a0a" color="#0a0a0a" />
                <div style={{ flex: 1, height: 6, borderRadius: 9999, background: "var(--bg-surface)", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#0a0a0a", width: `${(d.count / reviews.length) * 100}%`, borderRadius: 9999, transition: "width 0.4s" }} />
                </div>
                <span style={{ fontSize: "0.76rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", width: 16 }}>{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Feedback Summary */}
        <div style={{ background: "#0a0a0a", border: "1px solid #27272a", borderRadius: "var(--radius-md)", padding: 24, color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#a1a1aa", letterSpacing: "0.14em", textTransform: "uppercase" }}>VEXORA AI — Feedback Summary</span>
          </div>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#d4d4d8", marginBottom: 14 }}>
            Customers consistently praise <strong style={{ color: "#fff" }}>Vikram Sharma's precision fade technique</strong> and the <strong style={{ color: "#fff" }}>seamless VEXORA booking experience</strong>. The hot towel shave service receives exceptionally high satisfaction scores.
          </p>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#d4d4d8", marginBottom: 14 }}>
            Common positive themes: <em>punctual service start times, clean ambience, staff expertise</em>. Minor friction noted: occasional <strong style={{ color: "#fff" }}>wait-time discrepancies</strong> for colour treatments.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid #27272a" }}>
            {["Precision", "Friendly Staff", "Clean Space", "Fast Queue", "Value"].map(tag => (
              <span key={tag} style={{ padding: "4px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid #3f3f46", borderRadius: 4, fontSize: "0.74rem", color: "#d4d4d8" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {reviews.map(r => (
          <div key={r.id} style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12, transition: "box-shadow 0.18s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--shadow-floating)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>{r.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem" }}>{r.customer}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{r.staff} · {r.date}</div>
                </div>
              </div>
              <StarRow rating={r.rating} size={13} />
            </div>
            <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{r.service}</div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>"{r.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 8, borderTop: "1px solid var(--border-ultra-subtle)" }}>
              <ThumbsUp size={12} strokeWidth={1.8} color="var(--text-tertiary)" />
              <span style={{ fontSize: "0.74rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>{r.helpful} found helpful</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:700px){.reviews-top-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};
