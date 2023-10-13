import { PlusIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { BankAccountIcon } from '../../../../components/icons/BankAccountIcon';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { NewCategoryIcon } from '../../../../components/icons/NewCategoryIcon';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal, openNewCategoryModal } =
    useDashboard();

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className=" text-white h-12 w-12 bg-teal-900 rounded-full flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content side="top">
          <DropdownMenu.Item className="gap-2" onSelect={openNewCategoryModal}>
            <NewCategoryIcon />
            Nova Categoria
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('EXPENSE')}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('INCOME')}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
