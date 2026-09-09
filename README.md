# ✨ VEXORA

## Smart Salon Management & Customer Experience Platform

VEXORA is a full-stack salon management platform designed to improve salon operations and customer experience. It provides features such as appointment booking, live queue management, staff management, payments, inventory tracking, customer management, analytics, reviews, coupons, and real-time updates.

The platform helps salons efficiently manage their daily operations while allowing customers to book appointments, track queues, and manage their salon experience.

---

## 🚀 Features

### 👤 Customer Features

* Customer registration and authentication
* Browse salons and services
* Book salon appointments
* Live queue tracking
* Digital ticket/pass system
* Appointment history
* Customer profile management
* Payment tracking
* Salon reviews and feedback
* Real-time queue updates

### 💇 Salon Management Features

* Salon dashboard
* Appointment management
* Customer management
* Staff management
* Service management
* Queue management
* Payment management
* Coupon management
* Inventory management
* Reviews management
* Analytics and revenue tracking

### ⚡ Real-Time Features

* Real-time queue updates using Socket.IO
* Salon-specific real-time communication
* Ticket-specific updates
* Live dashboard synchronization

### 🤖 Additional Features

* AI-powered chatbot
* Customer experience management
* Salon discovery
* Live queue widget
* Notifications
* WhatsApp notification integration

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* TypeScript
* Framer Motion
* Socket.IO Client
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO
* bcryptjs

### Notification Service

* Twilio
* WhatsApp API

---

## 📁 Project Structure

```text
VEXORA/
│
├── frontend/                    # React + Vite Frontend
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── dashboard/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── server/                      # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── SALON_WHATSAPP/              # WhatsApp Notification Service
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
```

Navigate to the project folder:

```bash
cd VEXORA
```

---

# 🖥️ Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

# 🖥️ Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

CLIENT_ORIGIN=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

# 🌱 Database Seeding

The project includes seed scripts for populating the MongoDB database.

Run:

```bash
npm run seed
```

To reset and seed the database:

```bash
npm run seed:reset
```

---

# 📡 API Modules

VEXORA provides APIs for the following modules:

| Module           | API Route           |
| ---------------- | ------------------- |
| Authentication   | `/api/auth`         |
| Customer Booking | `/api/customer`     |
| Dashboard        | `/api/dashboard`    |
| Salon            | `/api/salon`        |
| Services         | `/api/services`     |
| Staff            | `/api/staff`        |
| Appointments     | `/api/appointments` |
| Queue            | `/api/queue`        |
| Customers        | `/api/customers`    |
| Payments         | `/api/payments`     |
| Reviews          | `/api/reviews`      |
| Coupons          | `/api/coupons`      |
| Inventory        | `/api/inventory`    |

---

# 🔐 Authentication

VEXORA uses JWT-based authentication.

The authentication flow includes:

1. User Registration
2. User Login
3. JWT Token Generation
4. Protected API Routes
5. Authorization Middleware

Passwords are securely hashed using:

```text
bcryptjs
```

---

# ⚡ Real-Time Queue System

VEXORA uses Socket.IO for real-time communication.

### Supported Events

#### Join Salon

```javascript
socket.emit("join:salon", salonId);
```

#### Join Ticket

```javascript
socket.emit("join:ticket", ticketId);
```

This enables:

* Live queue updates
* Ticket status updates
* Real-time salon dashboard synchronization
* Customer queue tracking

---

# 💬 WhatsApp Notification Service

The project includes a separate WhatsApp notification service using Twilio.

Navigate to:

```bash
cd SALON_WHATSAPP
```

Install dependencies:

```bash
npm install
```

Start the service:

```bash
npm start
```

The service can be used to send notifications related to:

* Appointment confirmations
* Payment notifications
* Booking updates
* Customer notifications

---

# 📦 Backend Dependencies

Main backend dependencies include:

```text
express
mongoose
jsonwebtoken
bcryptjs
cors
dotenv
socket.io
```

Development dependency:

```text
nodemon
```

---

# 🎨 Frontend Dependencies

Main frontend dependencies include:

```text
react
react-dom
vite
framer-motion
lucide-react
socket.io-client
```

---

# 📊 Core Modules

## 🏪 Salon Management

Salon owners can manage:

* Salon information
* Services
* Staff
* Customers
* Appointments
* Inventory
* Coupons

---

## 📅 Appointment Management

The appointment system allows:

* Creating appointments
* Managing appointment status
* Assigning staff
* Tracking customer bookings
* Managing appointment history

---

## 👥 Staff Management

Salon administrators can manage:

* Staff profiles
* Staff roles
* Staff attendance
* Staff performance
* Service assignments

---

## 🕒 Queue Management

The queue system provides:

* Live queue status
* Customer ticket management
* Queue position tracking
* Real-time updates
* Salon-specific queues

---

## 💳 Payment Management

Payment functionality includes:

* Payment records
* Payment tracking
* Revenue monitoring
* Customer payment history

---

## 📦 Inventory Management

The inventory module helps salons manage:

* Products
* Stock levels
* Inventory records
* Product availability

---

## 🎟️ Coupon Management

Salon administrators can:

* Create coupons
* Manage discounts
* Track coupon usage

---

## ⭐ Review System

Customers can:

* Submit reviews
* Rate salon services
* Provide feedback

Salon owners can monitor customer satisfaction.

---

# 🤖 AI Features

VEXORA includes AI-powered features such as:

* VEXORA Chatbot
* Customer assistance
* Smart interaction
* AI-based salon support

---

# 🔗 System Architecture

```text
                    ┌─────────────────┐
                    │     React       │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                             │ REST API
                             │
                    ┌────────▼────────┐
                    │    Express.js   │
                    │     Backend     │
                    └────────┬────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
          MongoDB       Socket.IO      Services
                         Real-Time
```

---

# 🔮 Future Improvements

Some potential future improvements include:

* Online payment gateway integration
* Advanced AI recommendations
* Salon recommendation system
* Mobile application
* Advanced analytics
* Multi-branch salon support
* Automated appointment reminders
* Enhanced WhatsApp notifications
* AI-based customer insights

---

# 🧪 Development Scripts

### Frontend

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Create a production build.

```bash
npm run preview
```

Preview the production build.

---

### Backend

```bash
npm run dev
```

Run the backend using Nodemon.

```bash
npm start
```

Run the backend normally.

```bash
npm run seed
```

Seed the database.

```bash
npm run seed:reset
```

Reset and seed the database.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to the branch

```bash
git push origin feature/new-feature
```

5. Create a Pull Request

---

# 👨‍💻 Authors

Developed as a full-stack salon management and customer experience platform.

---

# 📄 License

This project is developed for educational and development purposes.

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---

## ✨ VEXORA

**Smart Salon Management. Better Customer Experience. Real-Time Operations.**
