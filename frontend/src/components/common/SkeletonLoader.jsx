import React from 'react';

export const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  if (type === 'table') {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-10 bg-slate-200/70 rounded-xl" />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-32 bg-slate-100 rounded-2xl p-4 space-y-3">
          <div className="h-4 bg-slate-200/80 rounded-md w-1/3" />
          <div className="h-8 bg-slate-200/60 rounded-md w-2/3" />
          <div className="h-3 bg-slate-200/50 rounded-md w-1/2" />
        </div>
      ))}
    </div>
  );
};

