import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
}

export const Card = ({
  children,
  title,
  variant = 'default',
  className = '',
}: CardProps) => {
  const baseStyles = 'rounded-lg p-4';

  const variantStyles = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'border-2 border-blue-500 bg-transparent',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
      {children}
    </div>
  );
};
