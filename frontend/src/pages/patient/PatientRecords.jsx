import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Printer,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { medicalRecordService } from '../../services/medicalRecordService';
import { SearchInput } from '../../components/common/SearchInput';
import { FilterDropdown } from '../../components/common/FilterDropdown';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';

export const PatientRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await medicalRecordService.getMedicalRecords({
          patientId: user?.id,
          category: category === 'All' ? undefined : category,
          search: search,
        });
        setRecords(data || []);
      } catch {
        // Handled
      }
    };
    fetchRecords();
  }, [user, category, search]);

  const handleDownload = (rec) => {
    setToastMessage(`Exporting signed PDF: ${rec.title}...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = [
    { label: 'All Categories', value: 'All' },
    { label: 'Laboratory', value: 'Laboratory' },
    { label: 'Radiology', value: 'Radiology' },
    { label: 'Cardiology', value: 'Cardiology' },
  ];

  return (
    <div className="space-y-6">
      {/* Header filter bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search records, diagnoses, or clinics..."
            onClear={() => setSearch('')}
          />
        </div>

        <div className="flex items-center gap-3">
          <FilterDropdown
            value={category}
            onChange={setCategory}
            options={categories}
          />
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {toastMessage}
        </div>
      )}

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {rec.category} Report
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{rec.title}</h3>
                </div>
                <StatusBadge status={rec.status} size="sm" />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                <p><strong>Physician:</strong> {rec.doctor}</p>
                <p><strong>Facility:</strong> {rec.facility}</p>
                <p><strong>Date:</strong> {rec.date}</p>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {rec.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">{rec.fileSize}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRecord(rec)}
                  icon={<Eye className="w-3.5 h-3.5" />}
                >
                  Inspect
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(rec)}
                  icon={<Download className="w-3.5 h-3.5" />}
                  title="Download PDF"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={selectedRecord.title}
          description={`Ref #${selectedRecord.id.toUpperCase()} • ${selectedRecord.category}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Clinical Record</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  icon={<Printer className="w-3.5 h-3.5" />}
                >
                  Print
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDownload(selectedRecord)}
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Attending Doctor</span>
                <span className="font-semibold text-slate-800">{selectedRecord.doctor}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Facility</span>
                <span className="font-semibold text-slate-800">{selectedRecord.facility}</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Diagnosis & Impression</h5>
              <p className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 text-slate-700 leading-relaxed">
                {selectedRecord.diagnosis || selectedRecord.summary}
              </p>
            </div>

            {selectedRecord.treatment && (
              <div>
                <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Recommended Treatment</h5>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                  {selectedRecord.treatment}
                </p>
              </div>
            )}

            {selectedRecord.testResults && (
              <div>
                <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Biomarker Findings</h5>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-50 text-slate-700">
                      <tr>
                        <th className="p-2 font-semibold">Test</th>
                        <th className="p-2 font-semibold">Result</th>
                        <th className="p-2 font-semibold">Target Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {selectedRecord.testResults.map((t, i) => (
                        <tr key={i}>
                          <td className="p-2 font-medium">{t.test}</td>
                          <td className="p-2 font-bold text-slate-800">{t.result}</td>
                          <td className="p-2 text-slate-500 font-mono">{t.referenceRange}</td>
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
    </div>
  );
};

