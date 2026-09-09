import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "/");

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("[Socket.IO] Connected to VEXORA Real-Time Server:", socket.id);
});

socket.on("connect_error", (err) => {
  console.warn("[Socket.IO] Connection error:", err.message);
});

export const joinSalonRoom = (salonId) => {
  if (salonId) {
    socket.emit("join:salon", salonId);
  }
};

export const joinTicketRoom = (ticketId) => {
  if (ticketId) {
    socket.emit("join:ticket", ticketId);
  }
};

export default socket;
