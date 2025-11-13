'use client';

import Image from 'next/image';
import {useEffect, useMemo, useState} from 'react';

import {cn} from '../lib/utils';

type AvatarImageProps = {
  src: string;
  alt: string;
  size: number;
  className?: string;
  imageClassName?: string;
};

export function AvatarImage({src, alt, size, className, imageClassName}: AvatarImageProps) {
  const [showInitials, setShowInitials] = useState(!src);

  useEffect(() => {
    setShowInitials(!src);
  }, [src]);

  const initials = useMemo(() => {
    if (!alt) {
      return '?';
    }

    const parts = alt.trim().split(/\s+/).filter(Boolean);

    if (!parts.length) {
      return '?';
    }

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    const first = parts[0].charAt(0);
    const last = parts[parts.length - 1].charAt(0);

    return `${first}${last}`.toUpperCase();
  }, [alt]);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full border border-border bg-muted shadow-inner',
        className
      )}
      style={{width: size, height: size}}
    >
      {showInitials ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/20 via-blue-400/30 to-cyan-400/20 text-lg font-semibold uppercase text-blue-900 dark:text-blue-100">
          <span aria-hidden="true">{initials}</span>
          <span className="sr-only">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className={cn('object-cover', imageClassName)}
          onError={() => setShowInitials(true)}
        />
      )}
    </div>
  );
}

