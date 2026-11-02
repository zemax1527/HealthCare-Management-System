import React, { useState } from 'react';
import { ShieldAlert, Search, Download, Clock } from 'lucide-react';
import { mockAuditLogs } from '../../data/mockData';
import { SearchInput } from '../../components/common/SearchInput';
import { Button } from '../../components/common/Button';

export const AuditLogs = () => {
  const [search, setSearch] = useState('');
  const [logs, setLogs] = useState(mockAuditLogs);

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search audit actions, user actors, or IPs..."
            onClear={() => setSearch('')}
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => alert('Exporting encrypted compliance audit log CSV...')}
          icon={<Download className="w-3.5 h-3.5" />}
        >
          Export CSV Audit Log
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Action Details</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-blue-700">{log.action}</td>
                  <td className="py-3 px-4 font-sans text-slate-700">{log.details}</td>
                  <td className="py-3 px-4 font-sans text-slate-800 font-medium">{log.user}</td>
                  <td className="py-3 px-4 text-slate-500">{log.ip}</td>
                  <td className="py-3 px-4 text-slate-500 text-right">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

