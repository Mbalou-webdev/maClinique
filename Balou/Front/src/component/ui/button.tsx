import React from 'react';
import { cn } from '../lib/outils'; // Assure-toi que cette fonction existe bien

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        // button.tsx (extrait corrigé)
          className={cn(
            'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : undefined,
            variant === 'secondary' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : undefined,
            variant === 'outline' ? 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100' : undefined,
            variant === 'destructive' ? 'bg-red-600 text-white hover:bg-red-700' : undefined,
            size === 'sm' ? 'h-9 px-3 text-sm' : undefined,
            size === 'md' ? 'h-10 px-5 text-base' : undefined,
            size === 'lg' ? 'h-11 px-6 text-lg' : undefined,
            className
          )}

        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
