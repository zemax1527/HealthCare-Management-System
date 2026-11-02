import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserAvatar } from '../common/UserAvatar';
import { NotificationDropdown } from './NotificationDropdown';

export const Navbar = ({ onOpenMobileMenu, title, breadcrumbs = [] }) => {
  const { user, role, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu toggle + Breadcrumbs & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            {breadcrumbs.length > 0 && (
              <nav className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                {breadcrumbs.map((b, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span>/</span>}
                    {b.to ? (
                      <Link to={b.to} className="hover:text-blue-600">
                        {b.label}
                      </Link>
                    ) : (
                      <span className="text-slate-600 font-semibold">{b.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {title || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Right Side: Date, Notification, Profile Dropdown */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-xs font-medium text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-xl border border-slate-200/60">
            <span>{currentDate}</span>
          </div>

          <NotificationDropdown />

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
            >
              <UserAvatar src={user?.avatarUrl} alt={user?.fullName || 'User'} size="sm" status="online" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">
                  {user?.fullName?.split(' ')[0] || 'User'}
                </p>
                <p className="text-[10px] text-slate-400 capitalize mt-0.5">
                  {role?.replace('_', ' ') || 'Member'}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fade-in text-xs font-semibold text-slate-700">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="text-slate-900 font-bold truncate">{user?.fullName}</p>
                  <p className="text-[11px] text-slate-400 font-normal truncate">{user?.email}</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 text-slate-700"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  My Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 text-slate-700"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  Settings & Security
                </Link>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-rose-50 text-rose-600 text-left cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

