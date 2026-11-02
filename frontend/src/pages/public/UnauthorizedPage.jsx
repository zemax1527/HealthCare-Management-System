import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const UnauthorizedPage = () => {
  const { role } = useAuth();

  const getPermittedRoute = () => {
    if (role === 'doctor') return '/doctor';
    if (role === 'healthcare_worker') return '/worker';
    if (role === 'admin') return '/admin';
    return '/patient';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <ShieldX className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Access Restricted</h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          You do not have the clinical or administrative security permissions required to view this module. Unauthorized access attempts are monitored and logged.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link to={getPermittedRoute()}>
            <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
              Return to Your Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

