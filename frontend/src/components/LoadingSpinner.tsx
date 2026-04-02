import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export function LoadingSpinner({ size = 'medium', message = 'Loading...' }: LoadingSpinnerProps) {
  const sizeMap = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className={`${sizeMap[size]} animate-spin`} />
      {message && <span className="text-sm text-white/70">{message}</span>}
    </div>
  );
}
