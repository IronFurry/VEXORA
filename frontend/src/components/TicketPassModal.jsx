import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  X, Printer, Download, Scissors, MapPin, Clock, Users,
  CheckCircle2, AlertCircle, ChevronUp, ChevronDown, RefreshCw, Trash2
} from "lucide-react";
import { useCustomerQueue } from "../context/CustomerQueueContext";
import { customerApi } from "../api/customerApi";

import { downloadReceiptPng } from "../utils/receiptGenerator";

/**
 * TicketPassModal
 * Opens when the user clicks "Open Ticket Pass" on the FloatingQueueWidget.
 * Shows the digital ticket, live queue position (auto-refreshes every 20s), and a download receipt button.
 */
export const TicketPassModal = ({ isOpen, onClose }) => {
  const { activeTicket, setActiveTicket, clearActiveTicket, leaveQueue } = useCustomerQueue();
  const [liveTicket, setLiveTicket] = useState(null);
  const [liveQueue, setLiveQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const printRef = useRef();

  const fetchLiveStatus = useCallback(async () => {
    if (!activeTicket?.ticketNumber) return;
    setLoading(true);
    setError("");
    try {
      const res = await customerApi.getTicket(activeTicket.ticketNumber);
      if (res.data?.ticket) {
        if (res.data.ticket.status === "cancelled") {
          clearActiveTicket();
          onClose();
          return;
        }
        setLiveTicket(res.data.ticket);
        setActiveTicket(res.data.ticket); // sync context
      }
      if (res.data?.liveQueue) {
        setLiveQueue(res.data.liveQueue);
      }
      setLastRefresh(new Date());
    } catch (e) {
      setError("Could not refresh live queue. Check network.");
    } finally {
      setLoading(false);
    }
  }, [activeTicket?.ticketNumber, setActiveTicket, clearActiveTicket, onClose]);

  // Fetch on mount and every 20s
  useEffect(() => {
    if (!isOpen || !activeTicket) return;
    setLiveTicket(activeTicket);
    fetchLiveStatus();
    const interval = setInterval(fetchLiveStatus, 20000);
    return () => clearInterval(interval);
  }, [isOpen, activeTicket?.ticketNumber]);

  // ── Download Receipt in PNG Format ─────────────────────────────────────────
  const handleDownloadReceipt = () => {
    const ticket = liveTicket || activeTicket;
    if (!ticket) return;
    downloadReceiptPng(ticket);
  };

  // ── Cancel / Delete Ticket ────────────────────────────────────────────────
  const handleCancelTicket = async () => {
    setCancelling(true);
    try {
      await leaveQueue();
    } catch (err) {
      console.warn("[Cancel Ticket Error]", err);
    } finally {
      setCancelling(false);
      onClose();
    }
  };

  if (!isOpen || !activeTicket) return null;

  const ticket = liveTicket || activeTicket;
  const isInService = ticket.status === "in_service";
  const isCompleted = ticket.status === "completed";
  const isCancelled = ticket.status === "cancelled";

  const statusColor = isCompleted ? "#16a34a" : isInService ? "#2563eb" : isCancelled ? "#dc2626" : "#0a0a0a";
  const statusLabel = isCompleted ? "Service Complete" : isInService ? "In Chair" : isCancelled ? "Cancelled" : "Waiting";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9995,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{
          background: "#0a0a0a",
          color: "#fff",
          borderRadius: "20px 20px 0 0",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.14em", color: "#9ca3af", marginBottom: "4px" }}>
              VEXORA LIVE TICKET PASS
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.06em" }}>
              #{ticket.ticketNumber}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {loading && (
              <RefreshCw size={16} color="#9ca3af" style={{ animation: "spin 1s linear infinite" }} />
            )}
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", padding: "4px" }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {/* Status Banner */}
          <div style={{
            background: isCompleted ? "#f0fdf4" : isInService ? "#eff6ff" : "#fafafa",
            border: `1px solid ${isCompleted ? "#bbf7d0" : isInService ? "#bfdbfe" : "#e5e7eb"}`,
            borderRadius: "12px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: statusColor,
              boxShadow: `0 0 8px ${statusColor}80`,
            }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: statusColor }}>{statusLabel}</div>
              <div style={{ fontSize: "0.76rem", color: "#6b7280", marginTop: "2px" }}>
                {isCompleted ? "Your service is done. See you next time!" :
                 isInService ? "You are currently in the chair!" :
                 `Position #${ticket.queuePosition} · ~${ticket.estimatedWaitTime} mins wait`}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 14px", fontSize: "0.8rem", color: "#dc2626", marginBottom: "16px" }}>
              {error}
            </div>
          )}

          {/* Ticket Info Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            {[
              { label: "Queue Position", value: isCompleted ? "Done" : isInService ? "In Chair" : `#${ticket.queuePosition}` },
              { label: "Est. Wait", value: isCompleted ? "—" : `~${ticket.estimatedWaitTime} min` },
              { label: "Arrive By", value: ticket.arriveBy || "—" },
              { label: "Total Price", value: `₹${ticket.totalPrice || "—"}` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "#f9fafb", borderRadius: "10px", padding: "12px 14px" }}>
                <div style={{ fontSize: "0.66rem", fontFamily: "monospace", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{label}</div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.02em" }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Salon & Stylist */}
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px 18px", marginBottom: "20px" }}>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0a0a0a", marginBottom: "6px" }}>{ticket.salonName}</div>
            {ticket.salonAddress && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: "#6b7280", marginBottom: "6px" }}>
                <MapPin size={12} /> {ticket.salonAddress}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", color: "#6b7280", marginBottom: "4px" }}>
              <Scissors size={12} /> Stylist: <strong>{ticket.stylistName || "Auto-assigned"}</strong>
            </div>
            <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>
              Services: {ticket.serviceNames}
            </div>
          </div>

          {/* Live Queue from this Salon */}
          {liveQueue.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
                Live Queue — {ticket.salonName}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {liveQueue.map((entry, idx) => {
                  const isMe = entry.ticketNumber === ticket.ticketNumber;
                  return (
                    <div
                      key={entry.appointmentId || idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: isMe ? "#0a0a0a" : "#f9fafb",
                        border: isMe ? "none" : "1px solid #f3f4f6",
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                        background: isMe ? "#ffffff" : entry.status === "in_service" ? "#2563eb" : "#e5e7eb",
                        color: isMe ? "#0a0a0a" : entry.status === "in_service" ? "#ffffff" : "#6b7280",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "monospace", fontWeight: 700, fontSize: "0.78rem",
                      }}>
                        {entry.queuePosition}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.84rem", fontWeight: isMe ? 700 : 500, color: isMe ? "#ffffff" : "#0a0a0a" }}>
                          {isMe ? "You" : `Guest`} {entry.status === "in_service" && !isMe ? "· In Chair" : ""}
                          {isMe && <span style={{ fontSize: "0.68rem", marginLeft: "8px", background: "#ffffff20", padding: "2px 6px", borderRadius: "4px" }}>YOU</span>}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: isMe ? "#9ca3af" : "#6b7280" }}>
                          #{entry.ticketNumber} · {entry.staffId || "—"}
                        </div>
                      </div>
                      <div style={{ fontSize: "0.72rem", fontFamily: "monospace", color: isMe ? "#9ca3af" : "#6b7280", textAlign: "right" }}>
                        {entry.status === "in_service" ? "In Service" : entry.status === "completed" ? "Done" : `~${entry.estimatedWaitTime || "?"}m`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Last refresh */}
          {lastRefresh && (
            <div style={{ fontSize: "0.7rem", color: "#9ca3af", textAlign: "center", marginBottom: "16px", fontFamily: "monospace" }}>
              Last updated: {lastRefresh.toLocaleTimeString("en-IN")} · Auto-refreshes every 20s
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={fetchLiveStatus}
              disabled={loading}
              style={{
                flex: 1,
                padding: "11px 16px",
                border: "1.5px solid #e5e7eb",
                borderRadius: "10px",
                background: "#ffffff",
                color: "#0a0a0a",
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <RefreshCw size={14} style={loading ? { animation: "spin 1s linear infinite" } : {}} />
              Refresh
            </button>
            <button
              onClick={handleDownloadReceipt}
              style={{
                flex: 2,
                padding: "11px 16px",
                border: "none",
                borderRadius: "10px",
                background: "#0a0a0a",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.82rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Download size={14} />
              Download Receipt (PNG)
            </button>
          </div>

          {/* Cancel / Delete Ticket */}
          <div style={{ marginTop: "12px" }}>
            <button
              onClick={handleCancelTicket}
              disabled={cancelling}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #fee2e2",
                borderRadius: "10px",
                background: "#fef2f2",
                color: "#dc2626",
                fontWeight: 600,
                fontSize: "0.8rem",
                cursor: cancelling ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.15s ease",
              }}
            >
              <Trash2 size={14} />
              {cancelling ? "Cancelling Ticket..." : "Cancel & Delete Ticket"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default TicketPassModal;
