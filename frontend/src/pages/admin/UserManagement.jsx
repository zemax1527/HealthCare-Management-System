import React, { useState } from 'react';
import { Users, Search, Filter, ShieldCheck, UserCheck, Plus } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { UserAvatar } from '../../components/common/UserAvatar';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { FilterDropdown } from '../../components/common/FilterDropdown';
import { StatusBadge } from '../../components/common/StatusBadge';

export const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleOptions = [
    { label: 'All Roles', value: 'All' },
    { label: 'Patients', value: 'patient' },
    { label: 'Doctors', value: 'doctor' },
    { label: 'Healthcare Workers', value: 'healthcare_worker' },
    { label: 'Administrators', value: 'admin' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users by name or email..."
            onClear={() => setSearch('')}
          />
        </div>

        <div className="flex items-center gap-3">
          <FilterDropdown
            value={roleFilter}
            onChange={setRoleFilter}
            options={roleOptions}
          />
          <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Identifier / Title</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar src={u.avatarUrl} alt={u.fullName} size="sm" />
                      <div>
                        <h4 className="font-bold text-slate-900">{u.fullName}</h4>
                        <span className="text-slate-400 text-[11px]">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 capitalize font-semibold text-slate-700">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] ${
                      u.role === 'admin'
                        ? 'bg-rose-50 text-rose-700 font-bold'
                        : u.role === 'doctor'
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : u.role === 'healthcare_worker'
                        ? 'bg-teal-50 text-teal-700 font-bold'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{u.phone}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {u.mrn || u.specialty || u.jobTitle || 'Administrator'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

