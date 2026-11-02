import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, Save } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';

export const DoctorAvailability = () => {
  const [saved, setSaved] = useState(false);
  const [schedule, setSchedule] = useState({
    monday: { active: true, start: '09:00 AM', end: '05:00 PM', maxPatients: 16 },
    tuesday: { active: true, start: '09:00 AM', end: '05:00 PM', maxPatients: 16 },
    wednesday: { active: true, start: '09:00 AM', end: '01:00 PM', maxPatients: 8 },
    thursday: { active: true, start: '09:00 AM', end: '05:00 PM', maxPatients: 16 },
    friday: { active: true, start: '09:00 AM', end: '04:00 PM', maxPatients: 12 },
    saturday: { active: false, start: '10:00 AM', end: '02:00 PM', maxPatients: 6 },
    sunday: { active: false, start: '10:00 AM', end: '02:00 PM', maxPatients: 0 },
  });

  const handleToggle = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], active: !prev[day].active },
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Physician Availability & Roster</h2>
          <p className="text-xs text-slate-500 mt-0.5">Control daily clinic shifts and maximum patient consultation slots</p>
        </div>
        {saved ? (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Shift Hours Synchronized!
          </span>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            icon={<Save className="w-4 h-4" />}
          >
            Save Schedule
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Working Hours & Slot Limits</CardTitle>
          <CardDescription>Patients will only be able to book within approved hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {days.map(({ key, label }) => {
            const dayConfig = schedule[key];
            return (
              <div
                key={key}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
                  dayConfig.active ? 'bg-white border-slate-200' : 'bg-slate-50/60 border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={dayConfig.active}
                    onChange={() => handleToggle(key)}
                    className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                  />
                  <span className="font-bold text-slate-900 w-24">{label}</span>
                </div>

                {dayConfig.active ? (
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-slate-700">
                      {dayConfig.start} – {dayConfig.end}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-md">
                      Max: {dayConfig.maxPatients} consultations
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-400 font-medium">Off Duty / Clinic Closed</span>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

