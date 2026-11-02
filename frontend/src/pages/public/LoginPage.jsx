import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, Sparkles, AlertCircle } from 'lucide-react';
import { loginSchema } from '../../validators/schemas';
import { FormInput } from '../../components/forms/FormInput';
import { PasswordInput } from '../../components/forms/PasswordInput';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = () => {
  const { login, switchDemoRole } = useAuth();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'patient@healthcare.example',
      password: 'Password123!',
      rememberMe: true,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);
    try {
      const user = await login(data);
      // Route to appropriate dashboard based on user's role
      if (user.role === 'doctor') navigate('/doctor');
      else if (user.role === 'healthcare_worker') navigate('/worker');
      else if (user.role === 'admin') navigate('/admin');
      else navigate('/patient');
    } catch (err) {
      setServerError(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Instant demo logins for reviewers
  const handleDemoLogin = (role) => {
    switchDemoRole(role);
    if (role === 'doctor') navigate('/doctor');
    else if (role === 'healthcare_worker') navigate('/worker');
    else if (role === 'admin') navigate('/admin');
    else navigate('/patient');
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
            Sign in to your account
          </h2>
          <p className="text-xs text-slate-500">
            Enter your authorized clinical or patient credentials
          </p>
        </div>

        {/* Quick Demo Login shortcuts for Portfolio Reviewers */}
        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Instant Role Showcase (1-Click Login):</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleDemoLogin('patient')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-slate-800 font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('doctor')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-slate-800 font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('healthcare_worker')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-slate-800 font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Worker
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-slate-800 font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          {serverError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Email Address"
              type="email"
              placeholder="name@healthcare.example"
              required
              error={errors.email?.message}
              {...register('email')}
            />

            <PasswordInput
              label="Password"
              placeholder="••••••••"
              required
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  {...register('rememberMe')}
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

