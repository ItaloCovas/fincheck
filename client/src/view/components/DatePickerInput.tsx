import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../shared/utils/cn';
import { useState } from 'react';
import { formatDate } from '../../shared/utils/formatDate';
import { Popover } from './Popover';
import { DatePicker } from './DatePicker';

interface DatePickerInputProps {
  error?: string;

  className?: string;

  value?: Date;

  onChange?(date: Date): void;
}
export function DatePickerInput({
  error,
  className,
  value,
  onChange
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'bg-white w-full pt-4 relative text-left rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none',
              error && '!border-red-900',
              className
            )}
          >
            <span className="text-gray-700 text-xs left-[13px] top-2 pointer-events-none absolute">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>
      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>{' '}
        </div>
      )}
    </div>
  );
}
