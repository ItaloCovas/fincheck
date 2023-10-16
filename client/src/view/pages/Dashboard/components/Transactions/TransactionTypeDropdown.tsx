import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { IncomeIcon } from '../../../../components/icons/IncomeIcon';
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon';

interface TransactionTypeDropdownProps {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;

  selectedType: 'INCOME' | 'EXPENSE' | undefined;

  theme: string | null;
}

export function TransactionTypeDropdown({
  onSelect,
  selectedType,
  theme
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
            {selectedType == 'EXPENSE' && 'Despesas'}
            {selectedType == 'INCOME' && 'Receitas'}
            {selectedType == undefined && 'Transações'}
          </span>
          <ChevronDownIcon className="text-gray-900 dark:text-gray-500" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-50 w-[279px] dark:bg-gray-700">
        <DropdownMenu.Item
          className="gap-2 dark:text-white dark:hover:!bg-gray-600"
          onSelect={() => onSelect('INCOME')}
        >
          <IncomeIcon selectedTheme={handleTheme} /> Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2 dark:text-white dark:hover:!bg-gray-600"
          onSelect={() => onSelect('EXPENSE')}
        >
          <ExpensesIcon selectedTheme={handleTheme} />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2 dark:text-white dark:hover:!bg-gray-600"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon selectedTheme={handleTheme} />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
