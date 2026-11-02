import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Pill,
  Users,
  Search,
  CheckSquare,
  BarChart3,
  ShieldAlert,
  Settings,
  User,
  LogOut,
  Bell,
  Clock,
  HeartPulse,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserAvatar } from '../common/UserAvatar';

export const Sidebar = ({ isOpenMobile, onCloseMobile }) => {
  const { user, role, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Role-specific navigation items per requirement specification
  const getNavItems = () => {
    switch (role) {
      case 'doctor':
        return [
          { label: 'Overview', to: '/doctor', icon: LayoutDashboard },
          { label: 'Appointments', to: '/doctor/appointments', icon: CalendarDays },
          { label: 'Patients', to: '/doctor/patients', icon: Users },
          { label: 'Medical Records', to: '/doctor/records', icon: FileText },
          { label: 'Prescriptions', to: '/doctor/prescriptions', icon: Pill },
          { label: 'Availability', to: '/doctor/availability', icon: Clock },
          { label: 'Notifications', to: '/notifications', icon: Bell },
          { label: 'My Profile', to: '/profile', icon: User },
          { label: 'Settings', to: '/settings', icon: Settings },
        ];
      case 'healthcare_worker':
        return [
          { label: 'Overview', to: '/worker', icon: LayoutDashboard },
          { label: 'Patients', to: '/worker/patients', icon: Users },
          { label: 'Appointments', to: '/worker/appointments', icon: CalendarDays },
          { label: 'Assigned Tasks', to: '/worker/tasks', icon: CheckSquare },
          { label: 'Notifications', to: '/notifications', icon: Bell },
          { label: 'My Profile', to: '/profile', icon: User },
          { label: 'Settings', to: '/settings', icon: Settings },
        ];
      case 'admin':
        return [
          { label: 'Overview', to: '/admin', icon: LayoutDashboard },
          { label: 'User Management', to: '/admin/users', icon: Users },
          { label: 'Appointments', to: '/admin/appointments', icon: CalendarDays },
          { label: 'Reports & Analytics', to: '/admin/analytics', icon: BarChart3 },
          { label: 'Audit Logs', to: '/admin/audit-logs', icon: ShieldAlert },
          { label: 'Notifications', to: '/notifications', icon: Bell },
          { label: 'Settings', to: '/settings', icon: Settings },
        ];
      case 'patient':
      default:
        return [
          { label: 'Overview', to: '/patient', icon: LayoutDashboard },
          { label: 'Find Doctors', to: '/patient/doctors', icon: Search },
          { label: 'Appointments', to: '/patient/appointments', icon: CalendarDays },
          { label: 'Medical Records', to: '/patient/records', icon: FileText },
          { label: 'Prescriptions', to: '/patient/prescriptions', icon: Pill },
          { label: 'Notifications', to: '/notifications', icon: Bell },
          { label: 'My Profile', to: '/profile', icon: User },
          { label: 'Settings', to: '/settings', icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  const roleLabels = {
    patient: 'Patient Portal',
    doctor: 'Doctor Console',
    healthcare_worker: 'Clinical Worker',
    admin: 'System Admin',
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-68 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-4 py-5">
          {/* Header & Logo */}
          <div className="flex items-center justify-between px-2 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                <HeartPulse className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  PulseCare <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-sm border border-blue-200">OS</span>
                </span>
                <p className="text-[11px] text-slate-400 font-medium">Healthcare Management</p>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="mt-4 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-3">
              <UserAvatar
                src={user?.avatarUrl}
                alt={user?.fullName || 'User'}
                size="md"
                status="online"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {user?.fullName || 'Guest User'}
                </h4>
                <p className="text-[11px] text-blue-600 font-semibold truncate capitalize">
                  {roleLabels[role] || 'Patient'}
                </p>
              </div>
            </div>

            {/* Quick Demo Role Switcher for Portfolio Demonstration */}
            <div className="mt-3 pt-2.5 border-t border-slate-200/60">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Demo Switcher
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => switchDemoRole('patient')}
                  className={`px-2 py-1 rounded-md text-left transition-colors cursor-pointer ${
                    role === 'patient'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => switchDemoRole('doctor')}
                  className={`px-2 py-1 rounded-md text-left transition-colors cursor-pointer ${
                    role === 'doctor'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                  }`}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => switchDemoRole('healthcare_worker')}
                  className={`px-2 py-1 rounded-md text-left transition-colors cursor-pointer ${
                    role === 'healthcare_worker'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                  }`}
                >
                  Worker
                </button>
                <button
                  type="button"
                  onClick={() => switchDemoRole('admin')}
                  className={`px-2 py-1 rounded-md text-left transition-colors cursor-pointer ${
                    role === 'admin'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Menu Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/patient' || item.to === '/doctor' || item.to === '/worker' || item.to === '/admin'}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

