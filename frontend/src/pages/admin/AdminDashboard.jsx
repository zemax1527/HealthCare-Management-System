import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CalendarDays,
  Activity,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  UserCheck,
  Building,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  mockAdminStats,
  mockAppointments,
  mockAuditLogs,
} from '../../data/mockData';

export const AdminDashboard = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Admin Greeting */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <span>Hospital Administration System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            System Operations & Health Metrics
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            High-level oversight of registered medical users, clinical volume, and HIPAA audit trails
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/analytics">
            <Button
              variant="outline"
              size="md"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              Detailed Analytics
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button
              variant="primary"
              size="md"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              User Management
            </Button>
          </Link>
        </div>
      </div>

      {/* A. Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Registered Users"
          value={mockAdminStats.totalUsers}
          unit="Accounts"
          theme="blue"
          trend="up"
          trendValue="+12% this month"
        />
        <StatCard
          icon={UserCheck}
          label="Active Patients"
          value={mockAdminStats.totalPatients}
          unit="Patients"
          theme="teal"
          trend="up"
          trendValue="+8% active"
        />
        <StatCard
          icon={Building}
          label="Accredited Doctors"
          value={mockAdminStats.totalDoctors}
          unit="Physicians"
          theme="emerald"
          subtitle="4 departments"
        />
        <StatCard
          icon={CalendarDays}
          label="Total Appointments"
          value={mockAdminStats.totalAppointments}
          unit="Completed"
          theme="amber"
          trend="up"
          trendValue="94.2% completion"
        />
      </div>

      {/* B. Appointment Analytics & Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Monthly Appointment Volume Chart */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader
              action={
                <span className="text-xs font-semibold text-slate-500">
                  Last 6 Months
                </span>
              }
            >
              <CardTitle>Appointment Volume & Fulfillment Trends</CardTitle>
              <CardDescription>Monthly completed vs. cancelled patient visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAdminStats.monthlyAppointmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="completed" name="Completed Visits" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cancelled" name="Cancelled / No-show" fill="#DC2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Status Distribution Pie Chart */}
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Visit Status Distribution</CardTitle>
              <CardDescription>Overall operational breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockAdminStats.appointmentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {mockAdminStats.appointmentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        fontSize: '11px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* D. Recent Appointments Table & E. Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Recent Appointments */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader
              action={
                <Link to="/admin/appointments">
                  <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    All Visits <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              }
            >
              <CardTitle>Recent Hospital Appointments</CardTitle>
              <CardDescription>Live consultation intake stream</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Patient</th>
                      <th className="py-2.5 px-3">Physician</th>
                      <th className="py-2.5 px-3">Time & Date</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockAppointments.slice(0, 4).map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/70">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{a.patientName}</td>
                        <td className="py-2.5 px-3 text-slate-600">{a.doctorName}</td>
                        <td className="py-2.5 px-3 text-slate-500">{a.date} ({a.time.split(' - ')[0]})</td>
                        <td className="py-2.5 px-3 text-right">
                          <StatusBadge status={a.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader
              action={
                <Link to="/admin/audit-logs">
                  <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    Audit Center <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              }
            >
              <CardTitle>System Audit Logs</CardTitle>
              <CardDescription>HIPAA-mandated security event tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {mockAuditLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                  <p className="text-[10px] text-slate-400">Actor: {log.user} • IP: {log.ip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

