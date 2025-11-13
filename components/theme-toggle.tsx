'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import {MoonStar, SunMedium} from 'lucide-react';

import {useTheme} from './providers/theme-provider';
import {cn} from '../src/lib/utils';

export function ThemeToggle() {
  const {isDark, toggleTheme, ready} = useTheme();

  return (
    <TogglePrimitive.Root
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground shadow-sm transition hover:border-blue-400 hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 data-[state=on]:bg-blue-600 data-[state=on]:text-white dark:data-[state=on]:bg-blue-500'
      )}
      pressed={ready ? isDark : false}
      aria-label="Toggle theme"
      onPressedChange={() => toggleTheme()}
    >
      {ready ? (
        isDark ? (
          <MoonStar className="h-4 w-4" />
        ) : (
          <SunMedium className="h-4 w-4" />
        )
      ) : (
        <SunMedium className="h-4 w-4 animate-pulse" />
      )}
    </TogglePrimitive.Root>
  );
}

