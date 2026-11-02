import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { ForgotPasswordPage } from '../pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/public/ResetPasswordPage';
import { UnauthorizedPage } from '../pages/public/UnauthorizedPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Patient Pages
import { PatientDashboard } from '../pages/patient/PatientDashboard';
import { FindDoctors } from '../pages/patient/FindDoctors';
import { PatientAppointments } from '../pages/patient/PatientAppointments';
import { PatientRecords } from '../pages/patient/PatientRecords';
import { PatientPrescriptions } from '../pages/patient/PatientPrescriptions';

// Doctor Pages
import { DoctorDashboard } from '../pages/doctor/DoctorDashboard';
import { DoctorAppointments } from '../pages/doctor/DoctorAppointments';
import { DoctorPatients } from '../pages/doctor/DoctorPatients';
import { DoctorPrescriptions } from '../pages/doctor/DoctorPrescriptions';
import { DoctorAvailability } from '../pages/doctor/DoctorAvailability';

// Worker Pages
import { WorkerDashboard } from '../pages/worker/WorkerDashboard';
import { WorkerTasks } from '../pages/worker/WorkerTasks';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { UserManagement } from '../pages/admin/UserManagement';
import { ReportsAnalytics } from '../pages/admin/ReportsAnalytics';
import { AuditLogs } from '../pages/admin/AuditLogs';

// Shared Pages
import { NotificationsPage } from '../pages/shared/NotificationsPage';
import { ProfilePage } from '../pages/shared/ProfilePage';
import { SettingsPage } from '../pages/shared/SettingsPage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/* Authenticated Dashboard Pages */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Patient Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/doctors"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <FindDoctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/records"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/prescriptions"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientPrescriptions />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorPatients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/records"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <PatientRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/prescriptions"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorPrescriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/availability"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorAvailability />
            </ProtectedRoute>
          }
        />

        {/* Healthcare Worker Routes */}
        <Route
          path="/worker"
          element={
            <ProtectedRoute allowedRoles={['healthcare_worker']}>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker/tasks"
          element={
            <ProtectedRoute allowedRoles={['healthcare_worker']}>
              <WorkerTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker/patients"
          element={
            <ProtectedRoute allowedRoles={['healthcare_worker']}>
              <DoctorPatients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker/appointments"
          element={
            <ProtectedRoute allowedRoles={['healthcare_worker']}>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ReportsAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/audit-logs"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AuditLogs />
            </ProtectedRoute>
          }
        />

        {/* Shared Authenticated Routes */}
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

