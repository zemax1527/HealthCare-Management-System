import React from 'react';

const badgeThemes = {
  // Common healthcare statuses
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200/80 dot-blue-500',
  pending: 'bg-amber-50 text-amber-700 border-amber-200/80 dot-amber-500',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dot-emerald-500',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200/80 dot-rose-500',
  rejected: 'bg-rose-50 text-rose-700 border-rose-200/80 dot-rose-500',
  urgent: 'bg-rose-100 text-rose-800 border-rose-300 dot-rose-600',
  active: 'bg-teal-50 text-teal-700 border-teal-200/80 dot-teal-500',
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dot-emerald-500',
  in_progress: 'bg-sky-50 text-sky-700 border-sky-200/80 dot-sky-500',
  default: 'bg-slate-100 text-slate-700 border-slate-200 dot-slate-400',
};

export const StatusBadge = ({
  status = 'default',
  children,
  dot = true,
  size = 'md',
  className = '',
}) => {
  const normalizedKey = status.toLowerCase().replace(/[\s-]/g, '_');
  const theme = badgeThemes[normalizedKey] || badgeThemes.default;

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${theme} ${sizeClass} ${className}`}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
          aria-hidden="true"
        />
      )}
      {children || status}
    </span>
  );
};

