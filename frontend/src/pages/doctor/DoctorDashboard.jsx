import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Video,
  FileText,
  AlertCircle,
  Plus,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { UserAvatar } from '../../components/common/UserAvatar';
import { appointmentService } from '../../services/appointmentService';
import { Modal } from '../../components/common/Modal';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filterTab, setFilterTab] = useState('All');
  const [selectedApt, setSelectedApt] = useState(null);

  useEffect(() => {
    const fetchApts = async () => {
      try {
        const data = await appointmentService.getAppointments();
        setAppointments(data || []);
      } catch {
        // Handled
      }
    };
    fetchApts();
  }, []);

  const todayApts = appointments.filter((a) => a.date.includes('Tomorrow') || a.date.includes('Nov 03') || a.status === 'Confirmed');
  const pendingApts = appointments.filter((a) => a.status === 'Pending');
  const completedApts = appointments.filter((a) => a.status === 'Completed');

  const handleUpdateStatus = async (id, newStatus) => {
    await appointmentService.updateAppointment(id, { status: newStatus });
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const filteredAppointments = appointments.filter((a) => {
    if (filterTab === 'All') return true;
    return a.status.toLowerCase() === filterTab.toLowerCase();
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <span>Clinical Schedule Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {user?.fullName || 'Dr. Samantha Reed, MD'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            {user?.specialty || 'Internal Medicine'} • {user?.hospital || 'Metropolitan Health'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/doctor/availability">
            <Button
              variant="outline"
              size="md"
              icon={<Clock className="w-4 h-4" />}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              Availability Hours
            </Button>
          </Link>
          <Link to="/doctor/appointments">
            <Button
              variant="primary"
              size="md"
              icon={<CalendarDays className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              Full Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* A. Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarDays}
          label="Today's Schedule"
          value={todayApts.length}
          unit="Visits"
          theme="blue"
          subtitle="4 in clinic, 2 telehealth"
        />
        <StatCard
          icon={Clock}
          label="Pending Requests"
          value={pendingApts.length}
          unit="Review"
          theme="amber"
          subtitle="Awaiting physician sign-off"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed Consults"
          value={completedApts.length}
          unit="Done"
          theme="emerald"
          subtitle="Past 30 days"
        />
        <StatCard
          icon={Users}
          label="Assigned Patients"
          value="42"
          unit="Charts"
          theme="teal"
          subtitle="Active roster"
        />
      </div>

      {/* Main Grid: Today's Schedule & Appointment Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left: Today's Clinical Schedule */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader
              action={
                <Link to="/doctor/appointments">
                  <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    Manage Schedule <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              }
            >
              <CardTitle>Today's Patient Consultations</CardTitle>
              <CardDescription>Scheduled appointments for today's clinic hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              {todayApts.slice(0, 4).map((apt) => (
                <div
                  key={apt.id}
                  className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <UserAvatar alt={apt.patientName} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{apt.patientName}</h4>
                        <StatusBadge status={apt.status} size="sm" />
                      </div>
                      <p className="text-slate-500 mt-0.5">{apt.reason}</p>
                      <p className="text-blue-700 font-semibold mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {apt.time} ({apt.type})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedApt(apt)}
                    >
                      Details
                    </Button>
                    {apt.status === 'Pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUpdateStatus(apt.id, 'Confirmed')}
                      >
                        Accept
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Quick Actions & Recent Clinical Activity */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Physician Actions</CardTitle>
              <CardDescription>Clinical workflows and document generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <Link to="/doctor/appointments" className="block">
                <div className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>View Calendar & Shift Schedule</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </Link>
              <Link to="/doctor/prescriptions" className="block">
                <div className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                    <Pill className="w-4 h-4 text-teal-700" />
                    <span>Write Electronic Prescription (Rx)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </Link>
              <Link to="/doctor/patients" className="block">
                <div className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>Review Assigned Patient Charts</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedApt && (
        <Modal
          isOpen={!!selectedApt}
          onClose={() => setSelectedApt(null)}
          title="Consultation Details"
          description={`Patient: ${selectedApt.patientName}`}
          maxWidth="md"
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedApt(null)}>
              Done
            </Button>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <p><strong>Patient:</strong> {selectedApt.patientName}</p>
              <p><strong>Time & Date:</strong> {selectedApt.date} ({selectedApt.time})</p>
              <p><strong>Consultation Format:</strong> {selectedApt.type}</p>
              <p><strong>Status:</strong> {selectedApt.status}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Reason / Symptoms</span>
              <p className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 text-slate-700 leading-relaxed">
                {selectedApt.reason}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

