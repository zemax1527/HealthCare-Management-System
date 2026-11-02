import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, Check, X, Video, MapPin } from 'lucide-react';
import { appointmentService } from '../../services/appointmentService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { UserAvatar } from '../../components/common/UserAvatar';
import { SearchInput } from '../../components/common/SearchInput';

export const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchApts = async () => {
      try {
        const data = await appointmentService.getAppointments({
          status: statusFilter === 'All' ? undefined : statusFilter,
          search: search,
        });
        setAppointments(data || []);
      } catch {
        // Handled
      }
    };
    fetchApts();
  }, [statusFilter, search]);

  const handleUpdate = async (id, status) => {
    await appointmentService.updateAppointment(id, { status });
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const statuses = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by patient name..."
            onClear={() => setSearch('')}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === s
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {appointments.length === 0 ? (
          <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            No appointments match this filter.
          </div>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <UserAvatar alt={apt.patientName} size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{apt.patientName}</h4>
                    <StatusBadge status={apt.status} size="sm" />
                    {apt.type === 'Video Call' && (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 flex items-center gap-1">
                        <Video className="w-3 h-3" /> Telehealth
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{apt.reason}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{apt.date} • {apt.time}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {apt.status === 'Pending' && (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdate(apt.id, 'Confirmed')}
                      icon={<Check className="w-3.5 h-3.5" />}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpdate(apt.id, 'Cancelled')}
                      icon={<X className="w-3.5 h-3.5" />}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      Decline
                    </Button>
                  </>
                )}

                {apt.status === 'Confirmed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdate(apt.id, 'Completed')}
                  >
                    Mark Completed
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

