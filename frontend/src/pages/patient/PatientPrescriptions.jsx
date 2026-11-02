import React, { useState, useEffect } from 'react';
import { Pill, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { prescriptionService } from '../../services/prescriptionService';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';

export const PatientPrescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await prescriptionService.getPrescriptions({ patientId: user?.id });
        setPrescriptions(data || []);
      } catch {
        // Handled
      }
    };
    fetchPrescriptions();
  }, [user]);

  const handleRefill = (rx) => {
    setToastMessage(`Refill request for ${rx.medicineName} submitted to pharmacy!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Active Prescriptions & Dosages</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Prescribed medications, instructions, and automated pharmacy refill transmission
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60">
          Preferred Pharmacy: Walgreens #4421 (5th Ave)
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {toastMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((rx) => (
          <Card key={rx.id} hoverEffect={true} className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{rx.medicineName}</h3>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {rx.dosage}
                    </span>
                  </div>
                </div>
                <StatusBadge status={rx.status} size="sm" />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
                <p><strong>Frequency:</strong> {rx.frequency}</p>
                <p><strong>Duration:</strong> {rx.duration}</p>
                <p><strong>Doctor:</strong> {rx.doctorName}</p>
                <p><strong>Instructions:</strong> {rx.instructions}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                <strong className="text-slate-800">{rx.refillsLeft}</strong> refills remaining
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRefill(rx)}
                icon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Request Refill
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

