import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Calendar,
  FileText,
  ShieldCheck,
  Video,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { mockDoctorsList } from '../../data/mockData';
import { UserAvatar } from '../../components/common/UserAvatar';

export const LandingPage = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Next-Generation Healthcare Management System</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
            Integrated Patient Care & <span className="text-blue-600">Hospital Operations</span> in One Unified Platform
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connecting patients, accredited medical doctors, clinical nursing staff, and hospital administrators with secure records, intuitive scheduling, and instant telehealth.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Create Free Patient Account
              </Button>
            </Link>
            <Link to="/patient">
              <Button variant="outline" size="lg">
                Explore Demo Portal
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> HIPAA Compliant
            </span>
            <span className="flex items-center gap-1.5 text-blue-700">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> 256-Bit Encrypted EHR
            </span>
            <span className="flex items-center gap-1.5 text-teal-800">
              <Clock className="w-4 h-4 text-teal-700" /> 24/7 Access to Care
            </span>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Comprehensive Medical Disciplines
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Specialized Care for Every Life Stage
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Access board-certified specialists with seamless appointment scheduling and digital test delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Primary & Family Care', desc: 'Preventive wellness, annual blood panels, and chronic illness monitoring.', icon: HeartPulse },
            { title: 'Cardiovascular Care', desc: 'Holter monitoring, ECG evaluation, and blood pressure optimization.', icon: Stethoscope },
            { title: 'Neurology & Sleep', desc: 'Migraine care, sleep disorder diagnosis, and neurological testing.', icon: FileText },
            { title: 'Virtual Telehealth', desc: 'HD video visits, e-prescriptions, and continuous follow-up care.', icon: Video },
          ].map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{srv.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Role-Specific Interfaces
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Tailored Workflows for the Whole Healthcare Ecosystem
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700">For Patients</span>
              <h4 className="text-base font-bold text-slate-900">Patient Health Portal</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book visits, view verified lab reports, check vital indicators, and request prescription refills with one click.
              </p>
              <Link to="/patient" className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 hover:gap-1.5 transition-all">
                View Patient Experience →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-teal-700">For Physicians</span>
              <h4 className="text-base font-bold text-slate-900">Doctor Clinical Console</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review assigned patient schedules, confirm or reschedule bookings, write e-prescriptions, and evaluate EHRs.
              </p>
              <Link to="/doctor" className="text-xs font-bold text-teal-700 inline-flex items-center gap-1 hover:gap-1.5 transition-all">
                View Doctor Console →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">For Administrators</span>
              <h4 className="text-base font-bold text-slate-900">Hospital Admin Center</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track clinic volume, manage staff credentials, review audit compliance logs, and view interactive operational analytics.
              </p>
              <Link to="/admin" className="text-xs font-bold text-slate-800 inline-flex items-center gap-1 hover:gap-1.5 transition-all">
                View Admin System →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security & HIPAA Section */}
      <section id="security" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" /> High-Assurance Data Protection
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Enterprise Grade Privacy & Security
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              PulseCare strictly adheres to the Health Insurance Portability and Accountability Act (HIPAA). All electronic protected health information (ePHI) is encrypted at rest and in transit via TLS 1.3 cryptographic protocols.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span>✓ Role-Based Access Control</span>
              <span>✓ Immutable Audit Logs</span>
              <span>✓ Zero-Knowledge Backup Storage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Meet Our Medical Team</h3>
            <p className="text-xs text-slate-500 mt-1">Certified physicians available for in-person clinic and telehealth consultations</p>
          </div>
          <Link to="/patient/doctors">
            <Button variant="outline" size="sm">
              Browse All Doctors
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockDoctorsList.map((doc) => (
            <div key={doc.id} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <UserAvatar src={doc.avatar} alt={doc.name} size="lg" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                <p className="text-xs text-blue-600 font-semibold">{doc.specialty}</p>
                <p className="text-[11px] text-slate-500 mt-1">{doc.hospital}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Rating: ★ {doc.rating}</span>
                <span className="font-bold text-blue-600">{doc.consultationFee}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

