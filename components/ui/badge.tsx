'use client';

import type {HTMLAttributes} from 'react';

import {cn} from '../../src/lib/utils';

export function Badge({className, ...props}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium uppercase tracking-wide text-blue-700',
        className
      )}
      {...props}
    />
  );
}

