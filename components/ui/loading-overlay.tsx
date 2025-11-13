'use client';

type LoadingOverlayProps = {
  label: string;
  className?: string;
};

export function LoadingOverlay({label, className}: LoadingOverlayProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`absolute inset-0 z-10 flex items-center justify-center bg-white/70 p-6 text-sm font-medium text-muted-foreground backdrop-blur-sm dark:bg-slate-900/70 ${className ?? ''}`}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-500/70 border-t-transparent"
        />
        <span>{label}</span>
      </div>
    </div>
  );
}


