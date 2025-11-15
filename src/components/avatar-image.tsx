'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import {cn} from '../lib/utils';

type AvatarImageProps = {
  src: string;
  alt: string;
  size: number;
  className?: string;
  imageClassName?: string;
};

export function AvatarImage({src, alt, size, className, imageClassName}: AvatarImageProps) {
  const fallbackSrc = '/images/avatar-fallback.svg';
  const [showFallback, setShowFallback] = useState(!src);

  useEffect(() => {
    setShowFallback(!src);
  }, [src]);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full border border-border bg-muted shadow-inner',
        className
      )}
      style={{width: size, height: size}}
    >
      <Image
        src={showFallback ? fallbackSrc : src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className={cn('object-cover', imageClassName)}
        onError={() => setShowFallback(true)}
      />
    </div>
  );
}

