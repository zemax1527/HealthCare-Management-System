import React, { useState } from 'react';
import { Users, Search, FileText, Phone, Mail, ShieldAlert } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { UserAvatar } from '../../components/common/UserAvatar';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Modal } from '../../components/common/Modal';

export const DoctorPatients = () => {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = mockUsers.filter((u) => u.role === 'patient');
  const filtered = patients.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.mrn?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search patient roster by name or MRN..."
            onClear={() => setSearch('')}
          />
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Total Assigned: <strong className="text-slate-800">{patients.length} Patients</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pt) => (
          <div
            key={pt.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <UserAvatar src={pt.avatarUrl} alt={pt.fullName} size="lg" status="online" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{pt.fullName}</h3>
                  <span className="text-[11px] font-mono text-slate-500">{pt.mrn}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <p><strong>Age / Gender:</strong> {pt.age} yrs • {pt.gender}</p>
                <p><strong>Blood Group:</strong> {pt.bloodType}</p>
                <p><strong>Allergies:</strong> {pt.allergies?.join(', ') || 'None noted'}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPatient(pt)}
                icon={<FileText className="w-3.5 h-3.5" />}
              >
                View Chart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          title={`Clinical Chart: ${selectedPatient.fullName}`}
          description={`Record #${selectedPatient.mrn}`}
          maxWidth="md"
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedPatient(null)}>
              Close Chart
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <p><strong>Contact:</strong> {selectedPatient.phone} • {selectedPatient.email}</p>
              <p><strong>Primary Doctor:</strong> {selectedPatient.primaryDoctor}</p>
              <p><strong>Known Allergies:</strong> <span className="text-rose-600 font-bold">{selectedPatient.allergies?.join(', ')}</span></p>
              <p><strong>Chronic Conditions:</strong> {selectedPatient.chronicConditions?.join(', ')}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-100 text-slate-700 leading-relaxed">
              Patient chart is encrypted and access is audited under hospital compliance protocols.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

