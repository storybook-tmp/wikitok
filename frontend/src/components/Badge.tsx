import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold';

  const variantStyles = {
    default: 'bg-gray-200 text-gray-800',
    success: 'bg-green-200 text-green-800',
    warning: 'bg-yellow-200 text-yellow-800',
    error: 'bg-red-200 text-red-800',
    info: 'bg-blue-200 text-blue-800',
  };

  const sizeStyles = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
};
