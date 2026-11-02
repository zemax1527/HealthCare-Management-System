import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, AlertCircle, CheckCircle2 } from 'lucide-react';
import { registerSchema } from '../../validators/schemas';
import { FormInput } from '../../components/forms/FormInput';
import { FormSelect } from '../../components/forms/FormSelect';
import { PasswordInput } from '../../components/forms/PasswordInput';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: 'patient',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);
    try {
      const user = await registerUser(data);
      if (user.role === 'doctor') navigate('/doctor');
      else if (user.role === 'healthcare_worker') navigate('/worker');
      else if (user.role === 'admin') navigate('/admin');
      else navigate('/patient');
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { label: 'Patient (Personal Healthcare)', value: 'patient' },
    { label: 'Physician / Doctor', value: 'doctor' },
    { label: 'Healthcare Worker / Nurse', value: 'healthcare_worker' },
  ];

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
            Create an account
          </h2>
          <p className="text-xs text-slate-500">
            Register to manage appointments, vitals, and electronic health records
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          {serverError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Full Name"
              placeholder="e.g. Eleanor Vance"
              required
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <FormInput
              label="Email Address"
              type="email"
              placeholder="eleanor@example.com"
              required
              error={errors.email?.message}
              {...register('email')}
            />

            <FormSelect
              label="Account Role"
              options={roleOptions}
              required
              error={errors.role?.message}
              {...register('role')}
            />

            <PasswordInput
              label="Password (min 8 chars, 1 uppercase, 1 number)"
              placeholder="••••••••"
              required
              error={errors.password?.message}
              {...register('password')}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="••••••••"
              required
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <div className="space-y-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  {...register('agreeTerms')}
                />
                <span>
                  I agree to the <a href="#terms" className="text-blue-600 font-semibold underline">Terms of Care</a> and acknowledge the <a href="#hipaa" className="text-blue-600 font-semibold underline">HIPAA Privacy Notice</a>.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-600 font-medium pl-6">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
            >
              Complete Registration
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

