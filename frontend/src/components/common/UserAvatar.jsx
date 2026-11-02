import React, { useState } from 'react';
import { getInitials } from '../../utils/formatters';

const sizeMap = {
  xs: 'w-7 h-7 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const statusColors = {
  online: 'bg-emerald-500 ring-white',
  busy: 'bg-amber-500 ring-white',
  offline: 'bg-slate-400 ring-white',
};

export const UserAvatar = ({
  src,
  alt = 'User',
  size = 'md',
  status,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className={`${sizeMap[size] || sizeMap.md} rounded-full object-cover ring-2 ring-slate-100 shadow-xs`}
        />
      ) : (
        <div
          className={`${sizeMap[size] || sizeMap.md} rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center ring-2 ring-slate-100 shadow-xs select-none`}
        >
          {getInitials(alt)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ${
            statusColors[status] || statusColors.online
          }`}
        />
      )}
    </div>
  );
};

