'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import {cn} from '../lib/utils';

const FALLBACK_AVATAR = '/images/avatar-fallback.svg';

type AvatarImageProps = {
  src: string;
  alt: string;
  size: number;
  className?: string;
  imageClassName?: string;
};

export function AvatarImage({src, alt, size, className, imageClassName}: AvatarImageProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_AVATAR);

  useEffect(() => {
    setImageSrc(src || FALLBACK_AVATAR);
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
        src={imageSrc}
        alt={alt}
        fill
        sizes={`${size}px`}
        className={cn('object-cover', imageClassName)}
        onError={() => setImageSrc(FALLBACK_AVATAR)}
      />
    </div>
  );
}

