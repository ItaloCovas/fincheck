import * as RdxSelect from '@radix-ui/react-select';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon,
  Pencil2Icon
} from '@radix-ui/react-icons';
import { cn } from '../../shared/utils/cn';
import { useState } from 'react';
import { TrashIcon } from './icons/TrashIcon';
import { Category } from '../../shared/entities/category';

interface SelectProps {
  className?: string;

  error?: string;

  placeholder?: string;

  options: { value: string; label: string; category?: Category }[];

  onChange(value: string): void;

  value?: string;

  isCategory?: boolean;

  handleOpenEditCategoriesModal?(category: Category): void;
}

export function Select({
  className,
  error,
  placeholder,
  options,
  onChange,
  value,
  isCategory,
  handleOpenEditCategoriesModal
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none',
            selectedValue &&
              'text-xs left-[13px] top-2 transition-all translate-y-0'
          )}
        >
          {placeholder}
        </label>
        <RdxSelect.Root onValueChange={handleSelect} value={value}>
          <RdxSelect.Trigger
            className={cn(
              'bg-white w-full pt-4 relative text-left rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none',
              error && '!border-red-900',
              className
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800 " />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content className="overflow-hidden z-[999] bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2 relative">
                {options.map((option) => {
                  return (
                    <div className="relative" key={option.value}>
                      {isCategory && (
                        <div>
                          <RdxSelect.Icon
                            className="text-red-900 z-[999] absolute right-0 top-2 cursor-pointer"
                            onClick={() => console.log('excluir')}
                          >
                            <TrashIcon className="w-4 h-4 text-red-900" />
                          </RdxSelect.Icon>
                          <RdxSelect.Icon
                            className="text-red-900 z-[999] absolute right-5 top-2 cursor-pointer"
                            onClick={() => {
                              if (handleOpenEditCategoriesModal) {
                                handleOpenEditCategoriesModal(option.category!);
                              }
                            }}
                          >
                            <Pencil2Icon className="w-4 h-4 text-black" />
                          </RdxSelect.Icon>
                        </div>
                      )}
                      <RdxSelect.Item
                        className="flex justify-between p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                        value={option.value}
                        key={option.value}
                      >
                        <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                      </RdxSelect.Item>
                    </div>
                  );
                })}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>
      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>{' '}
        </div>
      )}
    </div>
  );
}
