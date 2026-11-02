import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  FileText,
  Pill,
  Search,
  Plus,
  ShieldCheck,
  Video,
  Clock,
  ArrowRight,
  Activity,
  Heart,
  Droplet,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { UserAvatar } from '../../components/common/UserAvatar';
import { appointmentService } from '../../services/appointmentService';
import { medicalRecordService } from '../../services/medicalRecordService';
import { prescriptionService } from '../../services/prescriptionService';
import { Modal } from '../../components/common/Modal';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [cancelModalApt, setCancelModalApt] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [apts, recs, rxs] = await Promise.all([
          appointmentService.getAppointments({ patientId: user?.id }),
          medicalRecordService.getMedicalRecords({ patientId: user?.id }),
          prescriptionService.getPrescriptions({ patientId: user?.id }),
        ]);
        setAppointments(apts || []);
        setRecords(recs || []);
        setPrescriptions(rxs || []);
      } catch {
        // Handled by service
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const upcomingApts = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending');
  const completedApts = appointments.filter((a) => a.status === 'Completed');

  const handleConfirmCancel = async () => {
    if (!cancelModalApt) return;
    await appointmentService.cancelAppointment(cancelModalApt.id);
    setAppointments((prev) =>
      prev.map((a) => (a.id === cancelModalApt.id ? { ...a, status: 'Cancelled' } : a))
    );
    setCancelModalApt(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* A. Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 p-6 sm:p-8 text-white shadow-lg shadow-blue-900/10">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>Patient Health Status: Stable & Up-to-Date</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.fullName || 'Eleanor'}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              You have <strong className="text-blue-200 font-semibold">{upcomingApts.length} upcoming visits</strong>. Your latest metabolic panel from Oct 28 is verified and resting health indicators are normal.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-200/80">
              <span>MRN: <strong className="text-white">{user?.mrn || 'MRN-884210'}</strong></span>
              <span>•</span>
              <span>Blood Group: <strong className="text-white">{user?.bloodType || 'O+'}</strong></span>
              <span>•</span>
              <span>Primary: <strong className="text-white">{user?.primaryDoctor || 'Dr. Samantha Reed'}</strong></span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Link to="/patient/doctors">
              <Button
                variant="outline"
                size="md"
                icon={<Search className="w-4 h-4" />}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Find Doctors
              </Button>
            </Link>
            <Link to="/patient/appointments">
              <Button
                variant="primary"
                size="md"
                icon={<Plus className="w-4 h-4" />}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold"
              >
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* B. Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarDays}
          label="Upcoming Visits"
          value={upcomingApts.length}
          unit="Scheduled"
          theme="blue"
          subtitle="Next: Tomorrow, 10:30 AM"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed Visits"
          value={completedApts.length}
          unit="Records"
          theme="emerald"
          subtitle="Past 6 months"
        />
        <StatCard
          icon={FileText}
          label="Medical Records"
          value={records.length}
          unit="EHR Files"
          theme="teal"
          subtitle="Verified & Encrypted"
        />
        <StatCard
          icon={Pill}
          label="Active Prescriptions"
          value={prescriptions.length}
          unit="Therapies"
          theme="amber"
          subtitle="Pharmacy: Walgreens"
        />
      </div>

      {/* Two Column Layout: Upcoming Appointments & Clinical Records */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column (Appointments & Prescriptions) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* C. Upcoming Appointments Section */}
          <Card>
            <CardHeader
              action={
                <Link to="/patient/appointments">
                  <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View All <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              }
            >
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Scheduled medical consultations and telemedicine calls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {upcomingApts.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No upcoming appointments scheduled right now.
                </div>
              ) : (
                upcomingApts.slice(0, 3).map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 rounded-xl border border-slate-200/90 hover:border-blue-300 transition-all bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <UserAvatar src={apt.doctorAvatar} alt={apt.doctorName} size="md" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{apt.doctorName}</h4>
                            <StatusBadge status={apt.status} size="sm" />
                          </div>
                          <p className="text-xs text-blue-700 font-medium">{apt.doctorSpecialty}</p>
                          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {apt.date} • {apt.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {apt.type === 'Video Call' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-200">
                            <Video className="w-3 h-3" /> Video Call
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCancelModalApt(apt)}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Active Medications Quick Preview */}
          <Card>
            <CardHeader
              action={
                <Link to="/patient/prescriptions">
                  <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    Manage Rx <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              }
            >
              <CardTitle>Active Prescriptions</CardTitle>
              <CardDescription>Daily dosage schedule and refill tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {prescriptions.slice(0, 3).map((rx) => (
                <div key={rx.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-slate-900">{rx.medicineName}</h5>
                    <p className="text-slate-500">{rx.dosage} • {rx.frequency}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    {rx.refillsLeft} refills left
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Medical Records */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <Card>
            <CardHeader
              action={
                <Link to="/patient/records">
                  <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    All Records <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              }
            >
              <CardTitle>Recent Medical Records</CardTitle>
              <CardDescription>Verified laboratory tests and diagnostic summaries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {records.slice(0, 4).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-xl border border-slate-200/90 hover:border-blue-300 transition-colors bg-white space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {rec.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {rec.title}
                      </h4>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRecord(rec)}
                      icon={<Eye className="w-3 h-3" />}
                    >
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{rec.date}</span>
                    <span className="truncate max-w-[150px]">{rec.doctor}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={selectedRecord.title}
          description={`Category: ${selectedRecord.category} • Recorded: ${selectedRecord.date}`}
          maxWidth="lg"
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedRecord(null)}>
              Done
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p><strong>Physician:</strong> {selectedRecord.doctor}</p>
              <p><strong>Facility:</strong> {selectedRecord.facility}</p>
              <p><strong>Status:</strong> {selectedRecord.status}</p>
            </div>
            <div>
              <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                Clinical Findings & Summary
              </h5>
              <p className="text-slate-600 leading-relaxed bg-blue-50/40 p-3 rounded-xl border border-blue-100">
                {selectedRecord.summary}
              </p>
            </div>
            {selectedRecord.testResults && (
              <div>
                <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                  Biomarker Values
                </h5>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="p-2 text-left font-semibold">Test</th>
                        <th className="p-2 text-left font-semibold">Value</th>
                        <th className="p-2 text-left font-semibold">Target Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {selectedRecord.testResults.map((t, i) => (
                        <tr key={i}>
                          <td className="p-2 font-medium">{t.test}</td>
                          <td className="p-2 font-bold text-slate-800">{t.result}</td>
                          <td className="p-2 text-slate-500">{t.referenceRange}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Cancellation Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!cancelModalApt}
        onClose={() => setCancelModalApt(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel your upcoming visit with ${cancelModalApt?.doctorName}? You can reschedule at any time.`}
        confirmText="Confirm Cancellation"
        isDanger={true}
      />
    </div>
  );
};

