import {LoadingOverlay} from './loading-overlay';

export default function LocaleLoading() {
  return (
    <div className="fixed inset-0 z-50">
      <div className="relative h-full w-full" dir='ltr'>
        <LoadingOverlay label="Loading..." />
      </div>
    </div>
  );
}
