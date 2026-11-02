import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { appointmentService } from '../../services/appointmentService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { UserAvatar } from '../../components/common/UserAvatar';
import { SearchInput } from '../../components/common/SearchInput';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { Modal } from '../../components/common/Modal';
import { Link } from 'react-router-dom';

export const PatientAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [cancelModalApt, setCancelModalApt] = useState(null);
  const [selectedAptDetails, setSelectedAptDetails] = useState(null);

  useEffect(() => {
    const fetchApts = async () => {
      try {
        const data = await appointmentService.getAppointments({
          patientId: user?.id,
          status: filterStatus === 'All' ? undefined : filterStatus,
          search: search,
        });
        setAppointments(data || []);
      } catch {
        // Handled
      }
    };
    fetchApts();
  }, [user, filterStatus, search]);

  const handleCancel = async () => {
    if (!cancelModalApt) return;
    await appointmentService.cancelAppointment(cancelModalApt.id);
    setAppointments((prev) =>
      prev.map((a) => (a.id === cancelModalApt.id ? { ...a, status: 'Cancelled' } : a))
    );
    setCancelModalApt(null);
  };

  const statuses = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search appointments..."
            onClear={() => setSearch('')}
          />
        </div>

        <Link to="/patient/doctors">
          <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
            New Appointment
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-3 overflow-x-auto">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterStatus === st
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3.5">
        {appointments.length === 0 ? (
          <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            <CalendarDays className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
            <p className="mt-2 text-sm font-semibold text-slate-700">No appointments found</p>
            <p className="text-xs text-slate-400">There are no matching appointments in this category.</p>
          </div>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <UserAvatar src={apt.doctorAvatar} alt={apt.doctorName} size="md" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900">{apt.doctorName}</h4>
                    <StatusBadge status={apt.status} size="sm" />
                    {apt.type === 'Video Call' && (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 flex items-center gap-1">
                        <Video className="w-3 h-3" /> Video Telehealth
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-700 font-semibold">{apt.doctorSpecialty}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{apt.location || apt.clinic}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
                  <span className="flex items-center gap-1 text-blue-900 font-bold">
                    <CalendarDays className="w-3.5 h-3.5 text-blue-600" /> {apt.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-500 font-normal">
                    <Clock className="w-3.5 h-3.5" /> {apt.time}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAptDetails(apt)}
                  >
                    Details
                  </Button>
                  {(apt.status === 'Confirmed' || apt.status === 'Pending') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCancelModalApt(apt)}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedAptDetails && (
        <Modal
          isOpen={!!selectedAptDetails}
          onClose={() => setSelectedAptDetails(null)}
          title="Appointment Consultation Details"
          description={`Reference ID: #${selectedAptDetails.id.toUpperCase()}`}
          maxWidth="md"
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedAptDetails(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <UserAvatar src={selectedAptDetails.doctorAvatar} alt={selectedAptDetails.doctorName} size="lg" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedAptDetails.doctorName}</h4>
                <p className="text-xs text-blue-600 font-semibold">{selectedAptDetails.doctorSpecialty}</p>
                <p className="text-slate-500 mt-1">{selectedAptDetails.clinic}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Date & Time</span>
                <span className="font-semibold text-slate-800">{selectedAptDetails.date} ({selectedAptDetails.time})</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Status & Type</span>
                <span className="font-semibold text-slate-800">{selectedAptDetails.status} • {selectedAptDetails.type}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Chief Reason</span>
              <p className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 text-slate-700 leading-relaxed">
                {selectedAptDetails.reason || 'Routine follow-up consultation'}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Cancel Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!cancelModalApt}
        onClose={() => setCancelModalApt(null)}
        onConfirm={handleCancel}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel your appointment with ${cancelModalApt?.doctorName}?`}
        confirmText="Confirm Cancellation"
        isDanger={true}
      />
    </div>
  );
};

