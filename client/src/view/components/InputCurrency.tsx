import { CrossCircledIcon } from '@radix-ui/react-icons';
import CurrencyInput from 'react-currency-input-field';

import { cn } from '../../shared/utils/cn';

interface InputCurrencyProps {
  error?: string;

  onChange?(value: string | undefined): void;

  value: number | string;
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <CurrencyInput
        decimalSeparator=","
        value={value}
        onValueChange={(value) => onChange?.(value)}
        className={cn(
          'text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full dark:bg-gray-700 dark:text-white',
          error && 'text-red-900'
        )}
      />

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
