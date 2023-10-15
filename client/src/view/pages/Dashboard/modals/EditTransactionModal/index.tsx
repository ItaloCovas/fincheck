import { Controller } from 'react-hook-form';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditTransactionModalController } from './useEditTransactionModalController';
import { Button } from '../../../../components/Button';
import { Transaction } from '../../../../../shared/entities/transaction';
import { DeleteModal } from '../../../../components/DeleteModal';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { EditCategoryModal } from '../EditCategoryModal';

interface EditTransactionModalProps {
  isModalOpen: boolean;

  onClose(): void;

  transaction: Transaction | null;
}

export function EditTransactionModal({
  transaction,
  isModalOpen,
  onClose
}: EditTransactionModalProps) {
  const {
    control,
    handleSubmit,
    errors,
    register,
    categories,
    isLoading,
    accounts,
    isDeleteModalOpen,
    isLoadingRemove,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    categoryBeingEdited,
    isEditCategoriesModalOpen,
    handleCloseEditCategoriesModal,
    handleOpenEditCategoriesModal,
    isDeleteCategoryModalOpen,
    handleOpenDeleteCategoryModal,
    handleCloseDeleteCategoryModal,
    isLoadingCategoryRemove,
    handleDeleteCategory
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        title={`Tem certeza de que deseja excluir esta ${
          isExpense ? 'despesa' : 'receita'
        }?`}
        isLoading={isLoadingRemove}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
      />
    );
  }

  if (isDeleteCategoryModalOpen) {
    return (
      <DeleteModal
        title="Tem certeza de que deseja excluir esta categoria?"
        isLoading={isLoadingCategoryRemove}
        onConfirm={handleDeleteCategory}
        onClose={handleCloseDeleteCategoryModal}
      />
    );
  }

  if (categoryBeingEdited) {
    return (
      <EditCategoryModal
        isModalOpen={isEditCategoriesModalOpen}
        onClose={handleCloseEditCategoriesModal}
        category={categoryBeingEdited}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={isModalOpen}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 w-6 h-6" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-sm tracking-[-0.5px]">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$ </span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da despesa' : 'Nome da Receita'}
            {...register('name')}
            error={errors.name?.message}
          />
          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                placeholder="Categoria"
                isCategory
                handleOpenEditCategoriesModal={handleOpenEditCategoriesModal}
                handleOpenRemoveCategoriesModal={handleOpenDeleteCategoryModal}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                  category: category
                }))}
              />
            )}
          />
          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />
          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
