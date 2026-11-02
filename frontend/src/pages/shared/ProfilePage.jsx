import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, Mail, Shield, CheckCircle2, Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { profileSchema } from '../../validators/schemas';
import { UserAvatar } from '../../components/common/UserAvatar';
import { FormInput } from '../../components/forms/FormInput';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';

export const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phone: user?.phone || '+1 (555) 234-5678',
      bloodType: user?.bloodType || 'O+',
      emergencyContactName: 'David Vance',
      emergencyContactPhone: '+1 (555) 987-6543',
    },
  });

  const onSubmit = (data) => {
    updateUserProfile({
      fullName: data.fullName,
      phone: data.phone,
      bloodType: data.bloodType,
    });
    setIsEditing(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Personal Profile & Medical Chart Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">Verified credentials and contact channels associated with your healthcare chart</p>
        </div>

        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            icon={<Edit3 className="w-3.5 h-3.5" />}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Profile updated successfully!
        </div>
      )}

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <UserAvatar src={user?.avatarUrl} alt={user?.fullName || 'User'} size="xl" status="online" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{user?.fullName}</h3>
              <p className="text-xs font-semibold text-blue-600 capitalize">
                {user?.role?.replace('_', ' ')} • {user?.email}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Identifier: {user?.mrn || user?.licenseNumber || user?.jobTitle || 'ADMIN-001'}
              </p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Full Name"
                  required
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />
                <FormInput
                  label="Phone Number"
                  required
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Emergency Contact Name"
                  error={errors.emergencyContactName?.message}
                  {...register('emergencyContactName')}
                />
                <FormInput
                  label="Emergency Contact Phone"
                  error={errors.emergencyContactPhone?.message}
                  {...register('emergencyContactPhone')}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                <span className="font-semibold text-slate-800">{user?.phone || '+1 (555) 234-5678'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Blood Group</span>
                <span className="font-semibold text-slate-800">{user?.bloodType || 'O+'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Physician</span>
                <span className="font-semibold text-slate-800">{user?.primaryDoctor || 'Dr. Samantha Reed'}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

