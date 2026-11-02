import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 ${
        hoverEffect ? 'hover:shadow-md hover:border-slate-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = '',
  action,
}) => {
  return (
    <div className={`flex items-start justify-between gap-4 pb-4 border-b border-slate-100 ${className}`}>
      <div className="space-y-1">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export const CardTitle = ({
  children,
  className = '',
  as: Tag = 'h3',
}) => {
  return (
    <Tag className={`text-base font-semibold tracking-tight text-slate-900 ${className}`}>
      {children}
    </Tag>
  );
};

export const CardDescription = ({
  children,
  className = '',
}) => {
  return <p className={`text-xs text-slate-500 ${className}`}>{children}</p>;
};

export const CardContent = ({
  children,
  className = '',
}) => {
  return <div className={`pt-4 ${className}`}>{children}</div>;
};

export const CardFooter = ({
  children,
  className = '',
}) => {
  return (
    <div className={`mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 ${className}`}>
      {children}
    </div>
  );
};

