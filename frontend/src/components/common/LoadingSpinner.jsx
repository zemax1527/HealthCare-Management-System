import React from 'react';

export const LoadingSpinner = ({ size = 'md', message = 'Loading...', fullScreen = false }) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div
        className={`animate-spin rounded-full border-slate-200 border-t-blue-600 ${sizeMap[size] || sizeMap.md}`}
      />
      {message && <p className="text-xs text-slate-500 font-medium">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xs">
        {spinner}
      </div>
    );
  }

  return spinner;
};

