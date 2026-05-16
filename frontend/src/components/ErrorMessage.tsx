import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
}

export function ErrorMessage({ title = 'Error', message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-800 rounded-lg">
      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <h3 className="font-semibold text-red-200">{title}</h3>}
        <p className="text-sm text-red-100">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-300 flex-shrink-0"
          aria-label="Dismiss error"
        >
          ✕
        </button>
      )}
    </div>
  );
}
