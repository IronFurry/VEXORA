import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "../context/NavigationContext";

const DEMO_CREDENTIALS = [
  { email: "arjun@luxeaura.com", role: "Owner — Luxe Aura Salon" },
  { email: "neha@urbanglow.com", role: "Owner — Urban Glow Studio" },
  { email: "vikram@gentlemensclub.com", role: "Owner — The Gentlemen's Club" },
  { email: "priya@luxeaura.com", role: "Manager — Luxe Aura Salon" },
];

export const LoginPage = () => {
  const { login, isLoading, error } = useAuth();
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!email || !password) {
      setLocalError("Please enter your email and password.");
      return;
    }
    const result = await login(email.trim(), password);
    if (result.success) {
      navigate("dashboard");
    } else {
      setLocalError(result.message);
    }
  };

  const fillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("Vexora@123");
    setLocalError("");
  };

  const displayError = localError || error;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f9fafb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "var(--font-body, system-ui, sans-serif)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "440px",
      }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "48px", height: "48px",
            background: "#0a0a0a", borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            fontFamily: "monospace", fontWeight: 800,
            fontSize: "1.1rem", color: "#fff", letterSpacing: "0.05em"
          }}>
            VX
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", margin: 0 }}>
            VEXORA
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "6px" }}>
            Salon Partner OS — Sign in to your dashboard
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)"
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@salon.com"
                autoComplete="email"
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "10px 14px", border: "1px solid #d1d5db",
                  borderRadius: "8px", fontSize: "0.9rem",
                  outline: "none", transition: "border-color 0.15s",
                  fontFamily: "inherit"
                }}
                onFocus={(e) => e.target.style.borderColor = "#0a0a0a"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "10px 14px", border: "1px solid #d1d5db",
                  borderRadius: "8px", fontSize: "0.9rem",
                  outline: "none", transition: "border-color 0.15s",
                  fontFamily: "inherit"
                }}
                onFocus={(e) => e.target.style.borderColor = "#0a0a0a"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
            </div>

            {displayError && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca",
                color: "#dc2626", borderRadius: "8px",
                padding: "10px 14px", fontSize: "0.83rem",
                marginBottom: "16px", fontWeight: 500
              }}>
                {displayError}
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%", padding: "11px",
                background: isLoading ? "#6b7280" : "#0a0a0a",
                color: "#fff", border: "none", borderRadius: "8px",
                fontSize: "0.9rem", fontWeight: 700, cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background 0.15s", letterSpacing: "0.01em",
                fontFamily: "inherit"
              }}
            >
              {isLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Back to landing */}
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button
              onClick={() => navigate("landing")}
              style={{
                background: "none", border: "none", color: "#6b7280",
                fontSize: "0.82rem", cursor: "pointer",
                textDecoration: "underline", fontFamily: "inherit"
              }}
            >
              ← Back to VEXORA website
            </button>
          </div>
        </div>

        {/* Demo credentials */}
        <div style={{
          marginTop: "24px",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "20px"
        }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#374151", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Demo Accounts (password: Vexora@123)
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {DEMO_CREDENTIALS.map((d) => (
              <button
                key={d.email}
                onClick={() => fillDemo(d.email)}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 12px", background: "#f9fafb",
                  border: "1px solid #e5e7eb", borderRadius: "8px",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "background 0.12s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f3f4f6"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#f9fafb"}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0a0a0a", fontFamily: "monospace" }}>{d.email}</span>
                <span style={{ fontSize: "0.72rem", color: "#6b7280" }}>{d.role}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
