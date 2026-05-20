import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-lg transition-colors';

  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-black disabled:bg-gray-200',
  };

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
};
