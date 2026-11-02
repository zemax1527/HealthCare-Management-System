import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Bell, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { resetPasswordSchema } from '../../validators/schemas';
import { PasswordInput } from '../../components/forms/PasswordInput';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';

export const SettingsPage = () => {
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [prefSuccess, setPrefSuccess] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onPasswordSubmit = () => {
    setPasswordSuccess(true);
    reset();
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const onSavePrefs = () => {
    setPrefSuccess(true);
    setTimeout(() => setPrefSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <h2 className="text-base font-bold text-slate-900">Account Security & Preferences</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage login credentials, multi-factor settings, and delivery channels</p>
      </div>

      {/* Change Password Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <CardTitle>Change Password</CardTitle>
          </div>
          <CardDescription>Must contain at least 8 characters, 1 number, and 1 uppercase letter</CardDescription>
        </CardHeader>
        <CardContent>
          {passwordSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Password updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4 max-w-md">
            <PasswordInput
              label="New Password"
              placeholder="••••••••"
              required
              error={errors.password?.message}
              {...register('password')}
            />

            <PasswordInput
              label="Confirm New Password"
              placeholder="••••••••"
              required
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" size="sm">
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-teal-700" />
            <CardTitle>Clinical Notification Channels</CardTitle>
          </div>
          <CardDescription>Select which notifications trigger outbound messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {prefSuccess && (
            <div className="mb-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Preferences saved!
            </div>
          )}

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
            <div>
              <p className="font-bold text-slate-800">Email Notifications</p>
              <p className="text-slate-500">Receive verified lab results, doctor messages, and visit confirmations via email</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
            <div>
              <p className="font-bold text-slate-800">SMS / Text Alerts</p>
              <p className="text-slate-500">Receive appointment reminders 24h prior to scheduled visit</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>

          <div className="pt-2 flex justify-end">
            <Button variant="outline" size="sm" onClick={onSavePrefs}>
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

