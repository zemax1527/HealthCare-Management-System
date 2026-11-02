import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';

export const DashboardLayout = ({ title: propTitle, breadcrumbs: propBreadcrumbs }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const location = useLocation();

  // Dynamic titles and breadcrumbs based on route if not explicitly passed
  const getRouteMeta = () => {
    const path = location.pathname;
    if (path.includes('/patient/doctors')) return { title: 'Find Accredited Doctors', crumbs: [{ label: 'Patient', to: '/patient' }, { label: 'Doctors' }] };
    if (path.includes('/appointments')) return { title: 'Appointment Management', crumbs: [{ label: 'Dashboard', to: '/' }, { label: 'Appointments' }] };
    if (path.includes('/records')) return { title: 'Medical Records & EHR', crumbs: [{ label: 'Dashboard', to: '/' }, { label: 'Medical Records' }] };
    if (path.includes('/prescriptions')) return { title: 'Active Prescriptions', crumbs: [{ label: 'Dashboard', to: '/' }, { label: 'Prescriptions' }] };
    if (path.includes('/notifications')) return { title: 'Notifications Center', crumbs: [{ label: 'Dashboard', to: '/' }, { label: 'Notifications' }] };
    if (path.includes('/profile')) return { title: 'My Profile', crumbs: [{ label: 'Account', to: '/' }, { label: 'Profile' }] };
    if (path.includes('/settings')) return { title: 'Account Settings & Security', crumbs: [{ label: 'Account', to: '/' }, { label: 'Settings' }] };
    if (path.includes('/doctor/availability')) return { title: 'Manage Availability', crumbs: [{ label: 'Doctor', to: '/doctor' }, { label: 'Availability' }] };
    if (path.includes('/doctor/patients')) return { title: 'Assigned Patients', crumbs: [{ label: 'Doctor', to: '/doctor' }, { label: 'Patients' }] };
    if (path.includes('/worker/tasks')) return { title: 'Assigned Clinical Tasks', crumbs: [{ label: 'Worker', to: '/worker' }, { label: 'Tasks' }] };
    if (path.includes('/admin/users')) return { title: 'User Management', crumbs: [{ label: 'Admin', to: '/admin' }, { label: 'Users' }] };
    if (path.includes('/admin/analytics')) return { title: 'Reports & Clinical Analytics', crumbs: [{ label: 'Admin', to: '/admin' }, { label: 'Analytics' }] };
    if (path.includes('/admin/audit-logs')) return { title: 'System Audit Logs', crumbs: [{ label: 'Admin', to: '/admin' }, { label: 'Audit Logs' }] };
    if (path.startsWith('/doctor')) return { title: 'Doctor Console', crumbs: [{ label: 'Overview' }] };
    if (path.startsWith('/worker')) return { title: 'Healthcare Worker Hub', crumbs: [{ label: 'Overview' }] };
    if (path.startsWith('/admin')) return { title: 'Administrator Control Panel', crumbs: [{ label: 'Overview' }] };
    return { title: 'Patient Health Portal', crumbs: [{ label: 'Overview' }] };
  };

  const meta = getRouteMeta();

  return (
    <div className="min-h-screen bg-slate-50 flex antialiased">
      <Sidebar
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          onOpenMobileMenu={() => setIsOpenMobile(true)}
          title={propTitle || meta.title}
          breadcrumbs={propBreadcrumbs || meta.crumbs}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

