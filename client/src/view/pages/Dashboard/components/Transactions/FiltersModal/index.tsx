import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Modal } from '../../../../../components/Modal';
import { Button } from '../../../../../components/Button';
import { useFiltersModalController } from './useFiltersModalController';
import { cn } from '../../../../../../shared/utils/cn';

interface FiltersModalProps {
  open: boolean;

  onClose(): void;
}

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  const {
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
    accounts
  } = useFiltersModalController();

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>
      </div>
      <div className="space-y-2 mt-2">
        {accounts.map((account) => {
          return (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left  text-gray-800 hover:bg-gray-50 transition-colors',
                account.id === selectedBankAccountId && '!bg-gray-200'
              )}
            >
              {account.name}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Ano
        </span>
      </div>
      <div className="mt-2 w-52 flex items-center justify-between">
        <button
          className="h-12 w-12 flex justify-center items-center text-gray-800"
          onClick={() => handleChangeYear(-1)}
        >
          <ChevronLeftIcon className="w-6 h-6 " />
        </button>
        <div className="flex-1 text-center">
          <span className="text-sm font-medium tracking-[-0.5px]">
            {selectedYear}
          </span>
        </div>
        <button
          onClick={() => handleChangeYear(1)}
          className="h-12 w-12 flex justify-center items-center text-gray-800"
        >
          <ChevronRightIcon className="w-6 h-6 " />
        </button>
      </div>

      <Button className="w-full mt-10">Aplicar Filtros</Button>
    </Modal>
  );
}
