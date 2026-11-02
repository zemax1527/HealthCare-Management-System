import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const themeMap = {
  blue: {
    bg: 'bg-blue-50 text-blue-600 border-blue-100',
    accent: 'text-blue-600',
  },
  teal: {
    bg: 'bg-teal-50 text-teal-700 border-teal-100',
    accent: 'text-teal-700',
  },
  emerald: {
    bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    accent: 'text-emerald-600',
  },
  amber: {
    bg: 'bg-amber-50 text-amber-600 border-amber-100',
    accent: 'text-amber-600',
  },
  rose: {
    bg: 'bg-rose-50 text-rose-600 border-rose-100',
    accent: 'text-rose-600',
  },
};

export const StatCard = ({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  trendValue,
  theme = 'blue',
  subtitle,
  onClick,
}) => {
  const selectedTheme = themeMap[theme] || themeMap.blue;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-slate-300 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        {Icon && (
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-105 ${selectedTheme.bg}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-semibold text-slate-500">
            {unit}
          </span>
        )}
      </div>

      {(trendValue || subtitle) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          {trendValue && (
            <div className="flex items-center gap-1 font-medium">
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-600" />}
              {trend === 'stable' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
              <span className={trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-500'}>
                {trendValue}
              </span>
            </div>
          )}
          {subtitle && (
            <span className="text-slate-400 text-[11px] truncate">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};

