import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import {
  UserPlus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  X,
  Phone,
  Mail,
  Calendar,
  Sparkles,
} from "lucide-react";

const STATUS = {
  available: { label: "Available", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "in-service": { label: "In Service", bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  break: { label: "On Break", bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  inactive: { label: "Off Duty", bg: "#f4f4f5", color: "#71717a", border: "#e4e4e7" },
};

const ATTENDANCE_BADGES = {
  present: { label: "Present", bg: "#dcfce7", color: "#15803d", icon: CheckCircle2 },
  late: { label: "Late", bg: "#fef3c7", color: "#b45309", icon: Clock },
  half_day: { label: "Half Day", bg: "#f3e8ff", color: "#7e22ce", icon: AlertCircle },
  absent: { label: "Absent", bg: "#fee2e2", color: "#b91c1c", icon: XCircle },
  leave: { label: "On Leave", bg: "#f1f5f9", color: "#475569", icon: Calendar },
};

export const Staff = () => {
  const {
    staff,
    toggleStaffStatus,
    addStaff,
    removeStaff,
    markAttendance,
    attendanceMap = {},
    attendanceSummary = { total: 0, present: 0, late: 0, halfDay: 0, absent: 0 },
  } = useDashboard();

  const [activeTab, setActiveTab] = useState("cards"); // "cards" | "register"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  // Add staff form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "hair_stylist",
    specialization: "",
    shift: "09:00 AM - 06:00 PM",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Please enter both staff name and phone number.");
      return;
    }

    try {
      setIsSubmitting(true);
      const specs = formData.specialization
        ? formData.specialization.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      await addStaff({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        role: formData.role,
        specialization: specs,
        schedule: {
          monday: formData.shift,
          tuesday: formData.shift,
          wednesday: formData.shift,
          thursday: formData.shift,
          friday: formData.shift,
          saturday: formData.shift,
          sunday: "10:00-17:00",
        },
      });

      setIsAddModalOpen(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        role: "hair_stylist",
        specialization: "",
        shift: "09:00 AM - 06:00 PM",
      });
      showBanner("Staff member added successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || "Failed to add staff member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!staffToDelete) return;
    try {
      await removeStaff(staffToDelete.id || staffToDelete.staffId);
      setStaffToDelete(null);
      showBanner("Staff member removed.");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to remove staff member.");
    }
  };

  const handleMarkAttendance = async (staffId, status) => {
    try {
      await markAttendance(staffId, status);
      showBanner(`Attendance updated: ${status.replace("_", " ").toUpperCase()}`);
    } catch (err) {
      alert("Failed to record attendance: " + err.message);
    }
  };

  const showBanner = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(""), 3500);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>
            Staff & Attendance
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            {staff.length} team members registered · Manage stylists, shifts, and daily live check-ins
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Tab Switch */}
          <div style={{ display: "flex", background: "var(--bg-surface)", padding: 4, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <button
              onClick={() => setActiveTab("cards")}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                background: activeTab === "cards" ? "var(--bg-white)" : "transparent",
                color: activeTab === "cards" ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: activeTab === "cards" ? 700 : 500,
                fontSize: "0.82rem",
                cursor: "pointer",
                boxShadow: activeTab === "cards" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s"
              }}
            >
              Team Cards
            </button>
            <button
              onClick={() => setActiveTab("register")}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                background: activeTab === "register" ? "var(--bg-white)" : "transparent",
                color: activeTab === "register" ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: activeTab === "register" ? 700 : 500,
                fontSize: "0.82rem",
                cursor: "pointer",
                boxShadow: activeTab === "register" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s"
              }}
            >
              Attendance Register
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              background: "#0a0a0a",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "opacity 0.15s"
            }}
          >
            <UserPlus size={16} />
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {actionSuccess && (
        <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", padding: "10px 16px", borderRadius: 8, fontSize: "0.85rem", fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle2 size={16} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Attendance Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "16px 20px" }}>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Total Team</div>
          <div style={{ fontSize: "1.7rem", fontWeight: 800 }}>{staff.length}</div>
        </div>

        <div style={{ background: "var(--bg-white)", border: "1px solid #bbf7d0", borderRadius: "var(--radius-md)", padding: "16px 20px" }}>
          <div style={{ fontSize: "0.72rem", color: "#16a34a", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight: 700 }}>Present Today</div>
          <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "#15803d" }}>
            {attendanceSummary.present || staff.filter(s => s.status !== "inactive" && s.status !== "off").length}
          </div>
        </div>

        <div style={{ background: "var(--bg-white)", border: "1px solid #fde68a", borderRadius: "var(--radius-md)", padding: "16px 20px" }}>
          <div style={{ fontSize: "0.72rem", color: "#d97706", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight: 700 }}>Late Check-in</div>
          <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "#b45309" }}>{attendanceSummary.late || 0}</div>
        </div>

        <div style={{ background: "var(--bg-white)", border: "1px solid #fecaca", borderRadius: "var(--radius-md)", padding: "16px 20px" }}>
          <div style={{ fontSize: "0.72rem", color: "#dc2626", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight: 700 }}>Absent / Leave</div>
          <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "#b91c1c" }}>{attendanceSummary.absent || 0}</div>
        </div>
      </div>

      {/* VIEW 1: Cards View */}
      {activeTab === "cards" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
          {staff.map((s) => {
            const st = STATUS[s.status] || STATUS.available;
            const staffId = s.id || s.staffId;
            const currentAttendance = attendanceMap[staffId];
            const attStatus = currentAttendance?.status || "present";
            const attBadge = ATTENDANCE_BADGES[attStatus] || ATTENDANCE_BADGES.present;
            const AttIcon = attBadge.icon;

            // Formatted check-in time
            let checkInDisplay = "Not marked";
            if (currentAttendance?.checkIn) {
              const dt = new Date(currentAttendance.checkIn);
              checkInDisplay = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            } else if (attStatus === "present") {
              checkInDisplay = "09:00 AM";
            }

            return (
              <div
                key={staffId}
                style={{
                  background: "var(--bg-white)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "box-shadow 0.18s, border-color 0.18s",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-floating)";
                  e.currentTarget.style.borderColor = "var(--border-medium)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <div>
                  {/* Top row: Avatar, Info, Status & Remove */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{
                        width: 46, height: 46, borderRadius: "50%",
                        background: "#0a0a0a", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0
                      }}>
                        {s.initials || s.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.98rem" }}>{s.name}</div>
                        <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "capitalize" }}>
                          {s.role?.replace(/_/g, " ")}
                        </div>
                        {s.phone && (
                          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                            <Phone size={11} /> {s.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button
                        onClick={() => toggleStaffStatus(staffId)}
                        title="Click to toggle Available / Break status"
                        style={{
                          padding: "4px 10px",
                          borderRadius: "var(--radius-pill)",
                          border: `1px solid ${st.border}`,
                          background: st.bg,
                          color: st.color,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          cursor: "pointer"
                        }}
                      >
                        {st.label}
                      </button>

                      <button
                        onClick={() => setStaffToDelete(s)}
                        title="Remove staff member"
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#a1a1aa",
                          padding: 4,
                          borderRadius: 6,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "color 0.15s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#a1a1aa"}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Attendance Section */}
                  <div style={{
                    background: "var(--bg-surface)",
                    borderRadius: 8,
                    padding: "12px 14px",
                    marginBottom: 16,
                    border: "1px solid var(--border-subtle)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--text-muted)" }}>
                        Today's Attendance
                      </span>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "2px 8px",
                        borderRadius: 9999,
                        background: attBadge.bg,
                        color: attBadge.color,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "capitalize"
                      }}>
                        <AttIcon size={12} />
                        <span>{attBadge.label}</span>
                      </div>
                    </div>

                    {/* Attendance Quick Buttons */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                      {[
                        { key: "present", label: "Present", color: "#16a34a", bg: attStatus === "present" ? "#dcfce7" : "#fff" },
                        { key: "late", label: "Late", color: "#d97706", bg: attStatus === "late" ? "#fef3c7" : "#fff" },
                        { key: "half_day", label: "Half", color: "#7e22ce", bg: attStatus === "half_day" ? "#f3e8ff" : "#fff" },
                        { key: "absent", label: "Absent", color: "#dc2626", bg: attStatus === "absent" ? "#fee2e2" : "#fff" },
                      ].map((btn) => (
                        <button
                          key={btn.key}
                          onClick={() => handleMarkAttendance(staffId, btn.key)}
                          style={{
                            padding: "5px 0",
                            textAlign: "center",
                            fontSize: "0.7rem",
                            fontWeight: attStatus === btn.key ? 800 : 500,
                            borderRadius: 6,
                            border: `1px solid ${attStatus === btn.key ? btn.color : "var(--border-subtle)"}`,
                            background: btn.bg,
                            color: attStatus === btn.key ? btn.color : "var(--text-secondary)",
                            cursor: "pointer",
                            transition: "all 0.12s"
                          }}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>

                    {attStatus !== "absent" && (
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                        <span>Check-in:</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{checkInDisplay}</span>
                      </div>
                    )}
                  </div>

                  {/* Shift & Rating stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12, padding: "8px 0", borderTop: "1px solid var(--border-ultra-subtle)" }}>
                    <div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Shift Hours</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>{s.shift || "09:00 - 18:00"}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Rating</div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>★ {s.rating || 4.8}</div>
                    </div>
                  </div>
                </div>

                {/* Assigned Services Tags */}
                <div>
                  <div style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                    Specialization
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {(s.assignedServices && s.assignedServices.length > 0 ? s.assignedServices : ["Precision Haircut", "Beard Sculpting"]).slice(0, 3).map((sv, idx) => (
                      <span key={idx} style={{ padding: "2px 8px", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 4, fontSize: "0.72rem" }}>
                        {sv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Attendance Register Table */}
      {activeTab === "register" && (
        <div style={{ background: "var(--bg-white)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 120px 140px 180px 100px", padding: "12px 20px", background: "var(--bg-surface)", borderBottom: "1px solid var(--border-subtle)", fontWeight: 700, fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <span>Staff Member</span>
            <span>Role</span>
            <span>Shift</span>
            <span>Attendance Status</span>
            <span style={{ textAlign: "right" }}>Actions</span>
          </div>

          {staff.map((s, idx) => {
            const staffId = s.id || s.staffId;
            const currentAttendance = attendanceMap[staffId];
            const attStatus = currentAttendance?.status || "present";
            const attBadge = ATTENDANCE_BADGES[attStatus] || ATTENDANCE_BADGES.present;

            return (
              <div
                key={staffId}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 120px 140px 180px 100px",
                  padding: "14px 20px",
                  borderBottom: idx < staff.length - 1 ? "1px solid var(--border-ultra-subtle)" : "none",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                    {s.initials || s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{s.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{s.phone}</div>
                  </div>
                </div>

                <span style={{ fontSize: "0.82rem", textTransform: "capitalize", color: "var(--text-secondary)" }}>
                  {s.role?.replace(/_/g, " ")}
                </span>

                <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  {s.shift || "09:00-18:00"}
                </span>

                {/* Quick Toggle Dropdown / Buttons */}
                <div style={{ display: "flex", gap: 4 }}>
                  {["present", "late", "half_day", "absent"].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleMarkAttendance(staffId, st)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 4,
                        fontSize: "0.68rem",
                        fontWeight: attStatus === st ? 700 : 500,
                        border: `1px solid ${attStatus === st ? "#0a0a0a" : "var(--border-subtle)"}`,
                        background: attStatus === st ? "#0a0a0a" : "var(--bg-white)",
                        color: attStatus === st ? "#fff" : "var(--text-secondary)",
                        cursor: "pointer",
                        textTransform: "capitalize"
                      }}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={() => setStaffToDelete(s)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: 6, borderRadius: 6 }}
                    title="Remove staff"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: Add Staff Member */}
      {isAddModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 5000, background: "rgba(10,10,10,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: 480, borderRadius: 16, border: "1px solid var(--border-subtle)", padding: 28, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <UserPlus size={20} />
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>Add Team Member</h2>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={18} />
              </button>
            </div>

            {errorMsg && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: 8, fontSize: "0.82rem", marginBottom: 16 }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 5 }}>Full Name *</label>
                <input
                  required
                  placeholder="e.g. Ramesh Kadam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border-medium)", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 5 }}>Phone Number *</label>
                  <input
                    required
                    placeholder="+91 98000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border-medium)", fontSize: "0.88rem", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 5 }}>Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border-medium)", fontSize: "0.88rem", outline: "none", background: "#fff" }}
                  >
                    <option value="barber">Barber</option>
                    <option value="hair_stylist">Hair Stylist</option>
                    <option value="beautician">Beautician</option>
                    <option value="makeup_artist">Makeup Artist</option>
                    <option value="receptionist">Receptionist</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 5 }}>Email Address</label>
                <input
                  type="email"
                  placeholder="ramesh@vasaicuts.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border-medium)", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 5 }}>Shift Timing</label>
                  <input
                    placeholder="09:00 AM - 06:00 PM"
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border-medium)", fontSize: "0.88rem", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 5 }}>Specialization</label>
                  <input
                    placeholder="Fade, Beard, Color"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border-medium)", fontSize: "0.88rem", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ padding: "10px 18px", borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ padding: "10px 22px", borderRadius: 8, border: "none", background: "#0a0a0a", color: "#fff", fontWeight: 700, fontSize: "0.88rem", cursor: isSubmitting ? "not-allowed" : "pointer" }}
                >
                  {isSubmitting ? "Adding..." : "Save Staff Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Confirm Delete Staff */}
      {staffToDelete && (
        <div style={{ position: "fixed", inset: 0, zIndex: 5000, background: "rgba(10,10,10,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: 400, borderRadius: 16, border: "1px solid var(--border-subtle)", padding: 24, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 8px 0" }}>Remove Staff Member?</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: "0 0 20px 0" }}>
              Are you sure you want to remove <strong>{staffToDelete.name}</strong> from your salon roster? This will also remove their schedule.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setStaffToDelete(null)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#dc2626", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
