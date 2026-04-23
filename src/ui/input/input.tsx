import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
        <input
          ref={ref}
          className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all 
            ${error ? 'border-red-500' : 'border-gray-300'} 
            ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input'; 