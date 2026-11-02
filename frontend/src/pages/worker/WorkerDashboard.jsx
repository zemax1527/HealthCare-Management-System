import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Users,
  CalendarDays,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { mockTasks, mockAppointments } from '../../data/mockData';

export const WorkerDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(mockTasks);

  const handleToggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const pendingTasks = tasks.filter((t) => t.status !== 'Completed');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Worker Greeting */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
            <span>Clinical Floor Operations Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {user?.fullName || 'Clara Soto, RN'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            {user?.jobTitle || 'Clinical Nurse Coordinator'} • {user?.assignedStation || 'Station 3 - Floor 2'}
          </p>
        </div>

        <Link to="/worker/tasks">
          <Button
            variant="primary"
            size="md"
            icon={<CheckSquare className="w-4 h-4" />}
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold"
          >
            All Assigned Tasks
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ClipboardList}
          label="Pending Tasks"
          value={pendingTasks.length}
          unit="Active"
          theme="amber"
          subtitle="Triage & specimen draws"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed Today"
          value={completedTasks.length}
          unit="Tasks"
          theme="emerald"
          subtitle="Shift progress: 67%"
        />
        <StatCard
          icon={CalendarDays}
          label="Today's Clinic Visits"
          value="8"
          unit="Patients"
          theme="blue"
          subtitle="Floor 2 Wing B"
        />
        <StatCard
          icon={Clock}
          label="Shift Status"
          value="On Duty"
          unit="Day Shift"
          theme="teal"
          subtitle="07:00 AM - 03:30 PM"
        />
      </div>

      {/* Main Grid: Operational Tasks & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Assigned Operational Tasks */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader
              action={
                <Link to="/worker/tasks">
                  <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    Manage Tasks <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              }
            >
              <CardTitle>Assigned Clinical & Operational Tasks</CardTitle>
              <CardDescription>Patient prep, vitals logging, and laboratory specimen delivery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border transition-all text-xs flex items-start justify-between gap-3 ${
                    task.status === 'Completed'
                      ? 'bg-slate-50/70 border-slate-200 text-slate-500'
                      : 'bg-white border-slate-200/90 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === 'Completed'}
                      onChange={() => handleToggleTaskStatus(task.id)}
                      className="mt-1 w-4 h-4 rounded text-teal-700 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold text-slate-900 ${task.status === 'Completed' ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </h4>
                        <StatusBadge status={task.status} size="sm" />
                        {task.priority === 'Urgent' && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 mt-1">{task.notes}</p>
                      <p className="text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due: {task.dueTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Today's Floor Schedule */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Floor Consultations Schedule</CardTitle>
              <CardDescription>Patients arriving for pre-screening triage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAppointments.slice(0, 3).map((apt) => (
                <div key={apt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900">{apt.patientName}</h5>
                    <StatusBadge status={apt.status} size="sm" />
                  </div>
                  <p className="text-slate-500">Doctor: {apt.doctorName}</p>
                  <p className="text-blue-700 font-semibold">{apt.time} • {apt.location}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

