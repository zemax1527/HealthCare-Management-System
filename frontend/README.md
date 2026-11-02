# PulseCare - Modern Healthcare Management System (Frontend)

A complete, professional, responsive healthcare management web application built with **React**, **Vite**, **JavaScript (ES6+)**, **React Router v7**, **Tailwind CSS**, **React Hook Form**, **Zod**, and **Recharts**.

Designed with clean SaaS UI/UX standards, multi-role access control, and complete readiness for REST API backend integration (Node.js, Express, MongoDB, Mongoose).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 2. Environment Setup
Copy the sample environment variables:
```bash
cp .env.example .env
```
Default configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENABLE_MOCK_FALLBACK=true
```
- When `VITE_ENABLE_MOCK_FALLBACK=true`, the application operates with comprehensive, realistic sample data so all 4 role portals (Patient, Doctor, Worker, Admin) can be previewed immediately.
- When `VITE_ENABLE_MOCK_FALLBACK=false`, the client delegates requests strictly to your Express backend.

### 3. Installation
```bash
cd frontend
npm install
```

### 4. Running Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 5. Production Build
```bash
npm run build
```
Generates an optimized, production-ready static bundle in `frontend/dist`.

---

## 🎭 Multi-Role Portals & 1-Click Demo Switcher

The application features role-based access control and navigation for four distinct user archetypes:

1. **Patient Portal (`/patient`)**
   - Vitals & health overview
   - Upcoming & completed visits
   - Find Doctors directory with specialty filter & direct booking
   - Medical records inspection with quantitative biomarker tables
   - Prescription refills tracking

2. **Doctor Console (`/doctor`)**
   - Today's appointment schedule & consultation triage
   - Appointment confirmation / rejection / completion actions
   - Assigned patient chart review
   - Electronic prescription (Rx) authoring modal
   - Weekly working hours & availability management

3. **Healthcare Worker Hub (`/worker`)**
   - Pre-consultation triage & operational checklists
   - Phlebotomy & specimen collection task tracking
   - Task creation and priority indicators (Normal / Urgent)
   - Clinic floor appointment schedule

4. **Hospital Administration Control Panel (`/admin`)**
   - Real-time operational KPI metrics
   - Interactive Recharts analytics (monthly appointment volume & patient registration trends)
   - System user directory across all 4 roles
   - HIPAA compliance audit log review with IP tracking and timestamps

> **Portfolio Evaluator Feature:** Both the **Login Page (`/login`)** and the **Sidebar** feature a **1-Click Demo Role Switcher**, allowing instant switching between Patient, Doctor, Healthcare Worker, and Administrator accounts without re-registering.

---

## 📁 Final Folder Structure

```
frontend/
├── public/                     # Static assets and favicon
├── src/
│   ├── assets/                 # SVGs and images
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Button.jsx              # Polymorphic accessible buttons with variants
│   │   │   ├── Card.jsx                # Modular card wrapper (Header, Title, Content, Footer)
│   │   │   ├── ConfirmationDialog.jsx  # Reusable modal for destructive/critical confirmations
│   │   │   ├── DataTable.jsx           # Responsive data table with customizable column renderers
│   │   │   ├── EmptyState.jsx          # Illustrated empty state for zero-record views
│   │   │   ├── ErrorState.jsx          # Error feedback state with retry trigger
│   │   │   ├── FilterDropdown.jsx      # Generic filter select component
│   │   │   ├── LoadingSpinner.jsx      # Animated spinner with fullScreen option
│   │   │   ├── Modal.jsx               # Accessible dialog with backdrop and escape dismiss
│   │   │   ├── Pagination.jsx          # Numbered pagination bar
│   │   │   ├── SearchInput.jsx         # Debounce-ready search input with clear trigger
│   │   │   ├── SkeletonLoader.jsx      # Shimmer placeholder loader
│   │   │   ├── StatCard.jsx            # KPI metric cards with trends and icons
│   │   │   ├── StatusBadge.jsx         # Color-coded badges (Confirmed, Pending, Cancelled, etc.)
│   │   │   └── UserAvatar.jsx          # User avatar with fallback initials & status dots
│   │   ├── forms/              # Form input primitives
│   │   │   ├── FormInput.jsx           # Text/email/number input with validation error display
│   │   │   ├── FormSelect.jsx          # Form select dropdown with validation bindings
│   │   │   └── PasswordInput.jsx       # Password input with show/hide toggle
│   │   └── layout/             # Shell navigation components
│   │       ├── Navbar.jsx              # Sticky header with breadcrumbs, date, and user dropdown
│   │       ├── NotificationDropdown.jsx# Bell popover with unread counter & quick action
│   │       └── Sidebar.jsx             # Role-adaptive sidebar & mobile slide-out drawer
│   ├── constants/
│   │   └── index.js            # Roles, appointment statuses, record categories, and task priorities
│   ├── context/
│   │   └── AuthContext.jsx     # User authentication, role persistence, and session management
│   ├── data/
│   │   └── mockData.js         # Decoupled fictional sample data (HIPAA-compliant)
│   ├── layouts/
│   │   ├── DashboardLayout.jsx # Authenticated application shell with dynamic route metadata
│   │   └── PublicLayout.jsx    # Public header, navigation, and hospital footer
│   ├── pages/
│   │   ├── admin/              # Administrator pages
│   │   │   ├── AdminDashboard.jsx      # KPI statistics, Recharts analytics, audit logs
│   │   │   ├── AuditLogs.jsx           # HIPAA security audit log table
│   │   │   ├── ReportsAnalytics.jsx    # Throughput and registration charts
│   │   │   └── UserManagement.jsx      # Roster of all platform users with role filters
│   │   ├── doctor/             # Physician pages
│   │   │   ├── DoctorAppointments.jsx  # Appointment status manager (Accept/Decline/Complete)
│   │   │   ├── DoctorAvailability.jsx  # Clinic hours & shift slot configuration
│   │   │   ├── DoctorDashboard.jsx     # Doctor schedule and quick action shortcuts
│   │   │   ├── DoctorPatients.jsx      # Assigned patient charts
│   │   │   └── DoctorPrescriptions.jsx # E-Prescription creator with Zod validation
│   │   ├── patient/            # Patient pages
│   │   │   ├── FindDoctors.jsx         # Doctor discovery directory with booking dialog
│   │   │   ├── PatientAppointments.jsx # Patient appointments calendar & cancellation dialog
│   │   │   ├── PatientDashboard.jsx    # Patient vitals, appointments, and record feed
│   │   │   ├── PatientPrescriptions.jsx# Active medication cards & refill requests
│   │   │   └── PatientRecords.jsx      # EHR diagnostic reports with biomarker tables
│   │   ├── public/             # Public unauthenticated pages
│   │   │   ├── ForgotPasswordPage.jsx  # Password recovery dispatch
│   │   │   ├── LandingPage.jsx         # Modern SaaS healthcare landing page
│   │   │   ├── LoginPage.jsx           # Login form with 1-click role testing buttons
│   │   │   ├── NotFoundPage.jsx        # Professional 404 page
│   │   │   ├── RegisterPage.jsx        # Multi-role registration with Zod validation
│   │   │   ├── ResetPasswordPage.jsx   # Password reset interface
│   │   │   └── UnauthorizedPage.jsx    # 403 Access Denied interface
│   │   ├── shared/             # Shared authenticated views
│   │   │   ├── NotificationsPage.jsx   # Comprehensive notification center
│   │   │   ├── ProfilePage.jsx         # Patient/Doctor profile & edit form
│   │   │   └── SettingsPage.jsx        # Security settings & notification channel toggles
│   │   └── worker/             # Healthcare worker pages
│   │       ├── WorkerDashboard.jsx     # Clinical triage floor operations
│   │       └── WorkerTasks.jsx         # Task manager with urgent priority flags
│   ├── routes/
│   │   ├── AppRouter.jsx       # Complete route definitions across public & protected zones
│   │   └── ProtectedRoute.jsx  # Role-based route guard
│   ├── services/
│   │   ├── apiClient.js        # Centralized Axios instance with request/response interceptors
│   │   ├── appointmentService.js
│   │   ├── authService.js
│   │   ├── doctorService.js
│   │   ├── medicalRecordService.js
│   │   ├── notificationService.js
│   │   ├── prescriptionService.js
│   │   └── userService.js
│   ├── utils/
│   │   └── formatters.js       # Date, time, name initials, and text truncators
│   ├── validators/
│   │   └── schemas.js          # Zod validation schemas for forms
│   ├── App.css                 # Base animations
│   ├── App.jsx                 # Provider wrapper
│   ├── index.css               # Tailwind CSS imports & base theme
│   └── main.jsx                # DOM entry point
├── .env.example
├── package.json
└── vite.config.js              # Vite bundler configuration
```

---

## 📦 Installed Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react` & `react-dom` | `^19.3.1` | Modern React user interface engine |
| `vite` | `^8.3.5` | Fast next-generation frontend bundler |
| `react-router-dom` | `^7.18.5` | Declarative routing & nested layouts |
| `tailwindcss` & `@tailwindcss/vite` | `^4.3.3` | Utility-first CSS framework (v4 engine) |
| `axios` | `^1.21.0` | Promise-based HTTP client for REST APIs |
| `react-hook-form` | `^7.91.0` | Performant form state management |
| `zod` | `^4.6.7` | TypeScript-first schema validation with static type inference |
| `@hookform/resolvers` | `^7.0.1` | Zod resolver adapter for React Hook Form |
| `lucide-react` | `^1.50.0` | Accessible healthcare and UI iconography |
| `recharts` | `^3.10.1` | Composable charting library for analytics |

---

## 🌐 Expected Backend REST API Contract

The frontend `apiClient.js` is structured to communicate with an Express/MongoDB backend at `VITE_API_BASE_URL` (`http://localhost:5000/api`):

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register` - Creates user account `{ fullName, email, role, password }`
- `POST /api/auth/login` - Authenticates user `{ email, password }` and returns `{ user, token }`
- `POST /api/auth/logout` - Invalidates session or clears cookies
- `GET  /api/auth/me` - Validates Bearer token / session and returns current user profile

### 2. User & Profiles (`/api/users`)
- `GET  /api/users/profile` - Fetches authenticated user's demographics
- `PUT  /api/users/profile` - Updates personal details & emergency contacts
- `POST /api/users/change-password` - Updates security password
- `GET  /api/users` - Admin endpoint to list all platform users

### 3. Doctor Directory (`/api/doctors`)
- `GET /api/doctors` - Lists accredited physicians (supports `?search=&specialty=`)
- `GET /api/doctors/:id` - Fetches detailed physician profile and reviews

### 4. Appointments (`/api/appointments`)
- `GET    /api/appointments` - Lists appointments (filters: `?status=&patientId=&doctorId=&search=`)
- `GET    /api/appointments/:id` - Consultation details
- `POST   /api/appointments` - Creates appointment `{ doctorId, date, timeSlot, type, reason }`
- `PUT    /api/appointments/:id` - Doctor or Admin update status (`Confirmed`, `Rejected`, `Completed`)
- `DELETE /api/appointments/:id/cancel` - Patient cancels appointment

### 5. Medical Records / EHR (`/api/medical-records`)
- `GET /api/medical-records` - Lists accessible medical records (filters: `?category=&patientId=`)
- `GET /api/medical-records/:id` - Fetches record with biomarker findings and attachments

### 6. Prescriptions (`/api/prescriptions`)
- `GET  /api/prescriptions` - Lists prescriptions
- `GET  /api/prescriptions/:id` - Prescription details
- `POST /api/prescriptions` - Doctor authors new Rx `{ patientId, medicineName, dosage, frequency, duration, instructions }`

### 7. Notifications (`/api/notifications`)
- `GET  /api/notifications` - Fetches notifications
- `PUT  /api/notifications/:id/read` - Marks notification as read
- `POST /api/notifications/mark-all-read` - Marks all notifications as read

---

## 🛠️ Features Requiring Backend Implementation
1. **Database Persistence:** Real MongoDB models for Users, Appointments, EHR Records, and Audit Logs.
2. **JWT / HTTP-Only Cookies:** Issuing cryptographically signed tokens on login and verifying them in middleware.
3. **Role-Based Authorization Middleware:** Ensuring only doctors can write prescriptions and only admins can view audit logs.
4. **File Storage:** AWS S3 or GridFS for uploading actual medical PDF and DICOM imaging scans.
5. **WebSockets / Server-Sent Events:** Real-time push notifications for appointment updates.

---

## 🛡️ Security Best Practices Enforced
- **Zero Sensitive Data in Storage:** Passwords are never stored in `localStorage`.
- **Role Verification:** UI guards route navigation, but full authorization is delegated to the backend.
- **Client Validation:** React Hook Form + Zod ensures pristine data submission before hitting network endpoints.
