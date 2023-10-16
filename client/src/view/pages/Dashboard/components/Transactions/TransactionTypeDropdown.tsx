import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { IncomeIcon } from '../../../../components/icons/IncomeIcon';
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon';
import { TFunction } from 'i18next';

interface TransactionTypeDropdownProps {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;

  selectedType: 'INCOME' | 'EXPENSE' | undefined;

  theme: string | null;

  t: TFunction<'translation', undefined>;
}

export function TransactionTypeDropdown({
  onSelect,
  selectedType,
  theme,
  t
}: TransactionTypeDropdownProps) {
  const handleTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectedType == 'EXPENSE' && (
            <ExpensesIcon selectedTheme={handleTheme} />
          )}
          {selectedType == 'INCOME' && (
            <IncomeIcon selectedTheme={handleTheme} />
          )}
          {selectedType == undefined && (
            <TransactionsIcon selectedTheme={handleTheme} />
          )}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium dark:text-gray-500">
            {selectedType == 'EXPENSE' && t('transactions.dropdown.expenses')}
            {selectedType == 'INCOME' && t('transactions.dropdown.incomes')}
            {selectedType == undefined &&
              t('transactions.dropdown.transactions')}
          </span>
          <ChevronDownIcon className="text-gray-900 dark:text-gray-500" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-50 w-[279px] dark:bg-gray-700">
        <DropdownMenu.Item
          className="gap-2 dark:text-white dark:hover:!bg-gray-600"
          onSelect={() => onSelect('INCOME')}
        >
          <IncomeIcon selectedTheme={handleTheme} />{' '}
          {t('transactions.dropdown.incomes')}
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2 dark:text-white dark:hover:!bg-gray-600"
          onSelect={() => onSelect('EXPENSE')}
        >
          <ExpensesIcon selectedTheme={handleTheme} />
          {t('transactions.dropdown.expenses')}
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2 dark:text-white dark:hover:!bg-gray-600"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon selectedTheme={handleTheme} />
          {t('transactions.dropdown.transactions')}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
