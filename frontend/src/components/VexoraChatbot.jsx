import React, { useState, useRef, useEffect } from "react";
import { customerApi } from "../api/customerApi";
import { useCustomerQueue } from "../context/CustomerQueueContext";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Ticket,
  Clock,
  Scissors,
  ChevronRight,
  RefreshCw,
  MapPin,
  CheckCircle2
} from "lucide-react";

export const VexoraChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! I am **VEXORA AI**, your intelligent salon concierge powered by Google Gemini. ✨\n\nI can book appointments at **Vasai Cuts & Co.**, check real-time queue wait times, or introduce you to top stylists.",
      booking: null,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { setActiveTicket, setIsTicketModalOpen } = useCustomerQueue();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, loading]);

  const handleSend = async (textToSend = null) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      booking: null,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await customerApi.chat({
        message: text,
        context,
      });

      const data = res.data;
      if (data) {
        if (data.context) {
          setContext((prev) => ({ ...prev, ...data.context }));
        }

        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.reply || "I have received your request.",
          booking: data.booking || null,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, botMsg]);

        // If an appointment was booked, activate the global queue ticket
        if (data.booking) {
          setActiveTicket(data.booking);
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "I experienced a temporary connection hiccup. Please try again or ask me to book your haircut at Vasai Cuts & Co!",
          booking: null,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleViewTicket = (ticket) => {
    setActiveTicket(ticket);
    setIsTicketModalOpen(true);
  };

  const suggestedPrompts = [
    "Book a haircut at Vasai Cuts & Co with Mahesh",
    "Who are the stylists at Vasai Cuts & Co?",
    "What is the wait time right now?",
    "Show me the service menu & prices",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 4999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "linear-gradient(135deg, #0a0a0a 0%, #1c1c1e 100%)",
            color: "#ffffff",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)",
            cursor: "pointer",
            fontFamily: "var(--font-body, system-ui, sans-serif)",
            fontWeight: 700,
            fontSize: "0.88rem",
            letterSpacing: "0.01em",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.45), 0 0 18px rgba(99,102,241,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)";
          }}
        >
          <div style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 10px rgba(139,92,246,0.5)"
          }}>
            <Sparkles size={15} color="#fff" />
          </div>
          <span>Book with AI</span>
          <span style={{
            fontSize: "0.68rem",
            padding: "2px 7px",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.15)",
            color: "#a5b4fc",
            fontWeight: 800,
            letterSpacing: "0.04em"
          }}>
            GEMINI
          </span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 5000,
            width: "380px",
            maxWidth: "calc(100vw - 32px)",
            height: "560px",
            maxHeight: "calc(100vh - 48px)",
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "var(--font-body, system-ui, sans-serif)",
            animation: "vexoraPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "linear-gradient(135deg, #0a0a0a 0%, #171717 100%)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 12px rgba(139,92,246,0.4)"
                }}
              >
                <Sparkles size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 6 }}>
                  VEXORA Concierge
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                </div>
                <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
                  Gemini AI · Vasai Cuts & Co.
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              background: "#f9fafb",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {messages.map((m) => {
              const isBot = m.sender === "bot";
              return (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isBot ? "flex-start" : "flex-end",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      maxWidth: "86%",
                      padding: "12px 16px",
                      borderRadius: isBot ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                      background: isBot ? "#ffffff" : "#0a0a0a",
                      color: isBot ? "#1f2937" : "#ffffff",
                      fontSize: "0.85rem",
                      lineHeight: "1.45",
                      boxShadow: isBot
                        ? "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)"
                        : "0 4px 12px rgba(0,0,0,0.15)",
                      border: isBot ? "1px solid #e5e7eb" : "none",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {m.text}

                    {/* Booking Ticket Card */}
                    {m.booking && (
                      <div
                        style={{
                          marginTop: "12px",
                          background: "#0a0a0a",
                          color: "#fff",
                          borderRadius: "12px",
                          padding: "14px",
                          border: "1px solid rgba(255,255,255,0.15)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
                          <span style={{ fontSize: "0.7rem", fontFamily: "monospace", letterSpacing: "0.1em", color: "#a5b4fc" }}>
                            PASS #{m.booking.ticketNumber}
                          </span>
                          <span style={{ background: "#22c55e", color: "#000", fontSize: "0.65rem", fontWeight: 800, padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>
                            CONFIRMED
                          </span>
                        </div>

                        <div style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: 4 }}>
                          {m.booking.salonName}
                        </div>

                        <div style={{ fontSize: "0.75rem", color: "#d1d5db", marginBottom: 2 }}>
                          ✂️ {m.booking.serviceNames}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: 8 }}>
                          💈 Stylist: {m.booking.stylistName}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", background: "rgba(255,255,255,0.08)", padding: "6px 10px", borderRadius: 6, marginBottom: 10 }}>
                          <span>Queue: <strong>#{m.booking.queuePosition}</strong></span>
                          <span>Wait: <strong>~{m.booking.estimatedWaitTime}m</strong></span>
                          <span>Arrive: <strong>{m.booking.arriveBy}</strong></span>
                        </div>

                        <button
                          onClick={() => handleViewTicket(m.booking)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            background: "#ffffff",
                            color: "#0a0a0a",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#f3f4f6"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "#ffffff"}
                        >
                          <Ticket size={13} />
                          <span>View Full Digital Ticket Pass</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: "0.65rem", color: "#9ca3af", padding: "0 4px" }}>
                    {m.timestamp}
                  </span>
                </div>
              );
            })}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px 16px 16px 4px", width: "fit-content", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <Sparkles size={14} color="#8b5cf6" className="animate-spin" />
                <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>VEXORA is thinking…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div
            style={{
              padding: "8px 12px",
              background: "#ffffff",
              borderTop: "1px solid #f3f4f6",
              display: "flex",
              gap: 6,
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                style={{
                  padding: "5px 11px",
                  borderRadius: "9999px",
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  color: "#374151",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e5e7eb";
                  e.currentTarget.style.color = "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f3f4f6";
                  e.currentTarget.style.color = "#374151";
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div
            style={{
              padding: "12px 14px",
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or book appointment..."
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                fontSize: "0.85rem",
                outline: "none",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0a0a0a")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              style={{
                width: 38,
                height: 38,
                borderRadius: "12px",
                background: !input.trim() || loading ? "#e5e7eb" : "#0a0a0a",
                color: !input.trim() || loading ? "#9ca3af" : "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                transition: "all 0.15s",
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes vexoraPop {
          0% { opacity: 0; transform: scale(0.92) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default VexoraChatbot;
