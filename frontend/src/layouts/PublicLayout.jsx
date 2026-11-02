import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, PhoneCall } from 'lucide-react';
import { Button } from '../components/common/Button';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-600/20">
              <HeartPulse className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              PulseCare <span className="text-blue-600">Health</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#security" className="hover:text-blue-600 transition-colors">Security & Privacy</a>
            <Link to="/patient/doctors" className="hover:text-blue-600 transition-colors">Doctor Directory</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-blue-400" />
                <span className="text-base font-bold text-white">PulseCare Health System</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Accredited digital healthcare platform connecting patients, clinical specialists, care workers, and health administrators.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                HIPAA, HITECH & SOC2 Type II Certified
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">Portals</h4>
              <ul className="space-y-2 text-[11px]">
                <li><Link to="/patient" className="hover:text-white">Patient Health Portal</Link></li>
                <li><Link to="/doctor" className="hover:text-white">Physician Clinical Console</Link></li>
                <li><Link to="/worker" className="hover:text-white">Clinical Worker Hub</Link></li>
                <li><Link to="/admin" className="hover:text-white">Hospital Administration</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-[11px]">
                <li><Link to="/patient/doctors" className="hover:text-white">Doctor Discovery</Link></li>
                <li><Link to="/patient/appointments" className="hover:text-white">Telehealth Appointments</Link></li>
                <li><Link to="/patient/records" className="hover:text-white">Electronic Health Records</Link></li>
                <li><Link to="/patient/prescriptions" className="hover:text-white">Prescription Refills</Link></li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase">
                <PhoneCall className="w-3.5 h-3.5" />
                Medical Emergencies
              </div>
              <p className="text-[11px] text-slate-300">
                If you are experiencing a life-threatening medical emergency, call <strong>911</strong> immediately or visit your local ER.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} PulseCare Health Systems, Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-white">Privacy Policy</a>
              <a href="#terms" className="hover:text-white">Terms of Care</a>
              <a href="#hipaa" className="hover:text-white">HIPAA Notice</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

