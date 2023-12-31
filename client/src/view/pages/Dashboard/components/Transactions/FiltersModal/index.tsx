import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Modal } from '../../../../../components/Modal';
import { Button } from '../../../../../components/Button';
import { useFiltersModalController } from './useFiltersModalController';
import { cn } from '../../../../../../shared/utils/cn';

interface FiltersModalProps {
  open: boolean;

  onClose(): void;

  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }): void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters
}: FiltersModalProps) {
  const {
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
    accounts,
    t
  } = useFiltersModalController();

  return (
    <Modal
      open={open}
      title={t('transactions.filtersModal.title')}
      onClose={onClose}
    >
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800 dark:text-gray-500">
          {t('transactions.filtersModal.account')}
        </span>
      </div>
      <div className="space-y-2 mt-2 ">
        {accounts.map((account) => {
          return (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left  text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors',
                account.id === selectedBankAccountId && '!bg-gray-200'
              )}
            >
              {account.name}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800 dark:text-gray-500">
          {t('transactions.filtersModal.year')}
        </span>
      </div>
      <div className="mt-2 w-52 flex items-center justify-between">
        <button
          className="h-12 w-12 flex justify-center items-center text-gray-800"
          onClick={() => handleChangeYear(-1)}
        >
          <ChevronLeftIcon className="w-6 h-6 dark:text-white" />
        </button>
        <div className="flex-1 text-center">
          <span className="text-sm font-medium tracking-[-0.5px] text-black dark:text-white">
            {selectedYear}
          </span>
        </div>
        <button
          onClick={() => handleChangeYear(1)}
          className="h-12 w-12 flex justify-center items-center text-gray-800 "
        >
          <ChevronRightIcon className="w-6 h-6 dark:text-white" />
        </button>
      </div>

      <Button
        className="w-full mt-10"
        onClick={() =>
          onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear
          })
        }
      >
        {t('transactions.filtersModal.submit')}
      </Button>
    </Modal>
  );
}
