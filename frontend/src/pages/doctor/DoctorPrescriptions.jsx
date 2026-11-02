import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pill, Plus, CheckCircle2 } from 'lucide-react';
import { prescriptionSchema } from '../../validators/schemas';
import { prescriptionService } from '../../services/prescriptionService';
import { FormInput } from '../../components/forms/FormInput';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';

export const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patientId: 'Eleanor Vance',
      medicineName: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
    },
  });

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await prescriptionService.getPrescriptions();
        setPrescriptions(data || []);
      } catch {
        // Handled
      }
    };
    fetchPrescriptions();
  }, []);

  const onSubmit = async (data) => {
    const newRx = await prescriptionService.createPrescription({
      patientName: data.patientId,
      doctorName: 'Dr. Samantha Reed, MD',
      medicineName: data.medicineName,
      dosage: data.dosage,
      frequency: data.frequency,
      duration: data.duration,
      instructions: data.instructions,
    });
    setPrescriptions((prev) => [newRx, ...prev]);
    setIsModalOpen(false);
    reset();
    setToastMessage(`Prescription for ${data.medicineName} created and transmitted!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Physician Prescription Manager</h2>
          <p className="text-xs text-slate-500 mt-0.5">Author and transmit digital e-prescriptions to verified retail pharmacies</p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          New Prescription (Rx)
        </Button>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {toastMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{rx.medicineName}</h4>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {rx.dosage}
                  </span>
                </div>
              </div>
              <StatusBadge status={rx.status || 'Active'} size="sm" />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <p><strong>Patient:</strong> {rx.patientName}</p>
              <p><strong>Frequency:</strong> {rx.frequency}</p>
              <p><strong>Duration:</strong> {rx.duration}</p>
              <p><strong>Instructions:</strong> {rx.instructions}</p>
            </div>
          </div>
        ))}
      </div>

      {/* New Prescription Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Author New Electronic Prescription"
        description="Prescriptions are encrypted and transmitted directly to retail pharmacies"
        maxWidth="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-xs">
          <FormInput
            label="Patient Name"
            placeholder="e.g. Eleanor Vance"
            required
            error={errors.patientId?.message}
            {...register('patientId')}
          />

          <FormInput
            label="Medicine / Compound Name"
            placeholder="e.g. Amoxicillin Trihydrate"
            required
            error={errors.medicineName?.message}
            {...register('medicineName')}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Dosage"
              placeholder="e.g. 500 mg"
              required
              error={errors.dosage?.message}
              {...register('dosage')}
            />
            <FormInput
              label="Frequency"
              placeholder="e.g. Twice daily"
              required
              error={errors.frequency?.message}
              {...register('frequency')}
            />
          </div>

          <FormInput
            label="Duration"
            placeholder="e.g. 10 days"
            required
            error={errors.duration?.message}
            {...register('duration')}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Clinical Instructions *
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Take with food. Complete entire course."
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
              {...register('instructions')}
            />
            {errors.instructions && (
              <p className="text-xs text-rose-600">{errors.instructions.message}</p>
            )}
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Authorize & Sign Prescription
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

