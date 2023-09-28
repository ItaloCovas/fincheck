import { ComponentProps } from 'react';
import { cn } from '../../shared/utils/cn';
import { Spinner } from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}
export function Button({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 flex items-center justify-center disabled:bg-gray-100 px-6 h-12 rounded-2xl text-white  font-semibold disabled:text-gray-400 disabled:cursor-not-allowed transition-all active:bg-teal-900',
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
}
