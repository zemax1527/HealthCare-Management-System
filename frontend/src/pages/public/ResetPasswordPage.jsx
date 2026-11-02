import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, CheckCircle2 } from 'lucide-react';
import { resetPasswordSchema } from '../../validators/schemas';
import { PasswordInput } from '../../components/forms/PasswordInput';
import { Button } from '../../components/common/Button';

export const ResetPasswordPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setIsSuccess(true);
      setLoading(false);
      setTimeout(() => navigate('/login'), 2000);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
              <HeartPulse className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-xl font-bold text-slate-900">PulseCare</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Set New Password
          </h2>
          <p className="text-xs text-slate-500">
            Create a secure password meeting hospital security policy
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
          {isSuccess ? (
            <div className="text-center space-y-3 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Password Updated</h3>
              <p className="text-xs text-slate-500">Redirecting you to the sign-in page...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                loading={loading}
              >
                Save New Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

