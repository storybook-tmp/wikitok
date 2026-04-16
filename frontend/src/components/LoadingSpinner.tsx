import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export const LoadingSpinner = ({
  size = 'medium',
  label,
}: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 4,
    medium: 6,
    large: 8,
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`w-${spinnerSize} h-${spinnerSize} animate-spin text-blue-500`} />
      {label && <p className="text-gray-600">{label}</p>}
    </div>
  );
};
