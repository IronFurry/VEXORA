import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { socket, joinSalonRoom, joinTicketRoom } from "../api/socket";
import { customerApi } from "../api/customerApi";

const CustomerQueueContext = createContext(null);
const STORAGE_KEY = "vexora_active_ticket";

export const CustomerQueueProvider = ({ children }) => {
  const [activeTicket, setActiveTicketState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const setActiveTicket = useCallback((ticket) => {
    if (ticket) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ticket));
      setActiveTicketState(ticket);
      if (ticket.salonId) joinSalonRoom(ticket.salonId);
      if (ticket.appointmentId) joinTicketRoom(ticket.appointmentId);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setActiveTicketState(null);
    }
  }, []);

  const clearActiveTicket = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setActiveTicketState(null);
  }, []);

  const leaveQueue = useCallback(async () => {
    const ticketToCancel = activeTicket;
    // 1. Immediately remove from local state and storage so widget closes instantly
    localStorage.removeItem(STORAGE_KEY);
    setActiveTicketState(null);
    setToastMessage(null);

    // 2. Notify backend to cancel the ticket & broadcast to salon
    if (ticketToCancel) {
      try {
        const id = ticketToCancel.appointmentId || ticketToCancel.ticketNumber;
        if (id) {
          await customerApi.cancelTicket(id);
        }
      } catch (err) {
        console.warn("[Leave Queue] Server cancel failed:", err);
      }
    }
  }, [activeTicket]);

  // Poll / refresh ticket from MongoDB
  const refreshTicket = useCallback(async () => {
    if (!activeTicket?.appointmentId) return;
    try {
      const res = await customerApi.getTicket(activeTicket.appointmentId);
      if (res.data?.ticket) {
        if (res.data.ticket.status === "cancelled") {
          localStorage.removeItem(STORAGE_KEY);
          setActiveTicketState(null);
          return;
        }
        const updated = { ...activeTicket, ...res.data.ticket };
        setActiveTicket(updated);
        if (res.data.notifications) {
          setNotifications(res.data.notifications);
        }
      }
    } catch (err) {
      console.warn("[VEXORA Queue] Could not refresh ticket:", err.message);
    }
  }, [activeTicket, setActiveTicket]);

  // Join rooms and listen to Socket.IO events
  useEffect(() => {
    if (!activeTicket) return;

    if (activeTicket.salonId) joinSalonRoom(activeTicket.salonId);
    if (activeTicket.appointmentId) joinTicketRoom(activeTicket.appointmentId);

    // Initial fetch to get latest status
    refreshTicket();

    // Socket listeners
    const handleQueueUpdated = (data) => {
      console.log("[Socket.IO] queue:updated received:", data);
      if (!data) return;

      // If specific to our ticket or salon
      if (data.salonId === activeTicket.salonId) {
        refreshTicket();
      }
    };

    const handleQueueStarted = (data) => {
      console.log("[Socket.IO] queue:started received:", data);
      if (data?.appointmentId === activeTicket.appointmentId) {
        setActiveTicketState((prev) => ({
          ...prev,
          status: "in_service",
          queuePosition: 1,
          estimatedWaitTime: 0,
        }));
        setToastMessage("✂️ Your service has started! Take your seat.");
      } else {
        refreshTicket();
      }
    };

    const handleQueueCompleted = (data) => {
      console.log("[Socket.IO] queue:completed received:", data);
      if (data?.appointmentId === activeTicket.appointmentId) {
        setActiveTicketState((prev) => ({
          ...prev,
          status: "completed",
        }));
        setToastMessage("✅ Your service is completed! Thank you for visiting.");
      } else {
        // Someone ahead finished, queue advances!
        refreshTicket();
      }
    };

    socket.on("queue:updated", handleQueueUpdated);
    socket.on("queue:started", handleQueueStarted);
    socket.on("queue:completed", handleQueueCompleted);

    return () => {
      socket.off("queue:updated", handleQueueUpdated);
      socket.off("queue:started", handleQueueStarted);
      socket.off("queue:completed", handleQueueCompleted);
    };
  }, [activeTicket?.appointmentId, activeTicket?.salonId, refreshTicket]);

  // Travel time alert calculation
  const travelTimeMinutes = activeTicket?.travelTimeMinutes || 10;
  const isTravelReminderDue =
    activeTicket &&
    activeTicket.status === "waiting" &&
    activeTicket.estimatedWaitTime <= travelTimeMinutes + 4;

  return (
    <CustomerQueueContext.Provider
      value={{
        activeTicket,
        setActiveTicket,
        clearActiveTicket,
        leaveQueue,
        refreshTicket,
        isTicketModalOpen,
        setIsTicketModalOpen,
        notifications,
        toastMessage,
        setToastMessage,
        isTravelReminderDue,
        travelTimeMinutes,
      }}
    >
      {children}
    </CustomerQueueContext.Provider>
  );
};

export const useCustomerQueue = () => {
  const ctx = useContext(CustomerQueueContext);
  if (!ctx) {
    throw new Error("useCustomerQueue must be used within CustomerQueueProvider");
  }
  return ctx;
};
