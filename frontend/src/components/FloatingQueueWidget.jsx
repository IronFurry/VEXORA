import React, { useState } from "react";
import { useCustomerQueue } from "../context/CustomerQueueContext";
import { customerApi } from "../api/customerApi";
import { Clock, MapPin, Scissors, X, ChevronUp, Bell, CheckCircle2, AlertCircle } from "lucide-react";

export const FloatingQueueWidget = ({ onOpenTicket }) => {
  const {
    activeTicket,
    clearActiveTicket,
    leaveQueue,
    toastMessage,
    setToastMessage,
    isTravelReminderDue,
    travelTimeMinutes,
  } = useCustomerQueue();

  const [minimized, setMinimized] = useState(false);

  const handleLeaveQueue = (e) => {
    if (e) e.stopPropagation();
    leaveQueue();
  };

  if (!activeTicket) return null;

  const isStarted = activeTicket.status === "in_service";
  const isCompleted = activeTicket.status === "completed";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9990,
        fontFamily: "var(--font-body, system-ui, sans-serif)",
      }}
    >
      {/* ── WhatsApp Simulation Toast ── */}
      {toastMessage && (
        <div
          style={{
            marginBottom: "12px",
            background: "#0a0a0a",
            color: "#ffffff",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            animation: "fadeIn 0.3s ease",
            maxWidth: "340px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span style={{ fontSize: "0.82rem", fontWeight: 500 }}>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
              padding: "2px",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Travel Reminder Banner ── */}
      {isTravelReminderDue && !isStarted && !isCompleted && (
        <div
          style={{
            marginBottom: "12px",
            background: "#fffbeb",
            border: "1px solid #fde68a",
            color: "#92400e",
            borderRadius: "12px",
            padding: "10px 14px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            fontSize: "0.8rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            maxWidth: "340px",
          }}
        >
          <AlertCircle size={16} color="#d97706" style={{ shrink: 0 }} />
          <div>
            <strong>Time to Leave!</strong>
            <div style={{ fontSize: "0.74rem", color: "#b45309" }}>
              Queue ETA is ~{activeTicket.estimatedWaitTime} min. Travel time is ~{travelTimeMinutes} min.
            </div>
          </div>
        </div>
      )}

      {/* ── Main Floating Card ── */}
      {minimized ? (
        <div
          style={{
            background: "#0a0a0a",
            color: "#ffffff",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
            fontFamily: "inherit",
          }}
        >
          <div
            onClick={() => setMinimized(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isStarted ? "#3b82f6" : "#22c55e",
                boxShadow: "0 0 8px #22c55e",
              }}
            />
            <span style={{ fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.02em" }}>
              #{activeTicket.ticketNumber} · {isStarted ? "In Service" : `Position #${activeTicket.queuePosition}`}
            </span>
            <ChevronUp size={16} />
          </div>

          <button
            onClick={handleLeaveQueue}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "#ffffff",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
            title="Leave Queue"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            width: "320px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
            overflow: "hidden",
            transition: "all 0.2s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0a0a0a",
              color: "#ffffff",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: isStarted ? "#3b82f6" : "#22c55e",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                VEXORA LIVE
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  fontWeight: 600,
                }}
              >
                #{activeTicket.ticketNumber}
              </span>
              <button
                onClick={() => setMinimized(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "2px",
                }}
                title="Minimize"
              >
                —
              </button>
              <button
                onClick={handleLeaveQueue}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Leave Queue"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "16px" }}>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0a0a0a" }}>
                {activeTicket.salonName}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "2px" }}>
                {activeTicket.serviceNames || "Salon Service"}
              </div>
            </div>

            {/* Position & ETA Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                background: "#f9fafb",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #f3f4f6",
                marginBottom: "14px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "#9ca3af",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    display: "block",
                  }}
                >
                  Status / Position
                </span>
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: isStarted ? "#2563eb" : "#0a0a0a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {isCompleted
                    ? "Done"
                    : isStarted
                    ? "In Chair"
                    : `You're #${activeTicket.queuePosition}`}
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "#9ca3af",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    display: "block",
                  }}
                >
                  Est. Wait
                </span>
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "#0a0a0a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {isStarted
                    ? "In Service"
                    : isCompleted
                    ? "0 min"
                    : `~${activeTicket.estimatedWaitTime} min`}
                </span>
              </div>
            </div>

            {/* Stylist & Distance */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.76rem",
                color: "#4b5563",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Scissors size={13} color="#6b7280" />
                <span>{activeTicket.stylistName || "Any Stylist"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={13} color="#6b7280" />
                <span>{activeTicket.distanceKm ? `${activeTicket.distanceKm} km` : "Nearby"}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={onOpenTicket}
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  background: "#0a0a0a",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                Open Ticket Pass
              </button>

              <button
                onClick={handleLeaveQueue}
                style={{
                  padding: "9px 12px",
                  background: isCompleted ? "#f3f4f6" : "#fef2f2",
                  color: isCompleted ? "#374151" : "#dc2626",
                  border: `1px solid ${isCompleted ? "#e5e7eb" : "#fee2e2"}`,
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {isCompleted ? "Dismiss" : "Leave Queue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingQueueWidget;
