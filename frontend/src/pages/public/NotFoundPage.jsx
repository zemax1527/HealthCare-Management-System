import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
          <FileQuestion className="w-8 h-8" />
        </div>
        <span className="text-4xl font-extrabold text-blue-600 tracking-tight">404</span>
        <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The requested healthcare portal resource could not be found or has been moved to an updated clinical URL.
        </p>
        <div className="pt-4 flex justify-center">
          <Link to="/">
            <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

