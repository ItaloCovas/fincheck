import { z } from 'zod';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../shared/hooks/useBankAccounts';
import { useCategories } from '../../../../../shared/hooks/useCategories';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../shared/services/transactionsService';
import toast from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../shared/utils/currencyStringToNumber';
import { Category } from '../../../../../shared/entities/category';
import { categoriesService } from '../../../../../shared/services/categoriesService';

const schema = z.object({
  value: z.string().nonempty('Valor é obrigatório'),
  categoryId: z.string().nonempty('Categoria é obrigatória'),
  bankAccountId: z.string().nonempty('Conta é obrigatória'),
  name: z.string().nonempty('Nome é obrigatório'),
  date: z.date()
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    t
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      value: '0',
      date: new Date()
    }
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isLoading, mutateAsync } = useMutation(transactionsService.create);
  const { isLoading: isLoadingCategoryRemove, mutateAsync: removeCategory } =
    useMutation(categoriesService.remove);

  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const [isEditCategoriesModalOpen, setIsEditCategoriesModalOpen] =
    useState(false);

  const [categoryBeingDeleted, setCategoryBeingDeleted] = useState<
    null | string
  >(null);

  const [categoryBeingEdited, setCategoryBeingEdited] =
    useState<null | Category>(null);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString()
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        newTransactionType === 'EXPENSE'
          ? t('toastMessages.transactions.createExpenseSuccess')
          : t('toastMessages.transactions.createIncomeSuccess')
      );
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? t('toastMessages.transactions.createExpenseError')
          : t('toastMessages.transactions.createIncomeError')
      );
    }
  });

  async function handleDeleteCategory() {
    try {
      await removeCategory(categoryBeingDeleted!);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast.success(t('toastMessages.categories.deleteCategorySuccess'));
      closeNewTransactionModal();
    } catch {
      toast.error(t('toastMessages.categories.deleteCategoryError'));
    }
  }

  function handleOpenDeleteCategoryModal(categoryId: string) {
    setIsDeleteCategoryModalOpen(true);
    setCategoryBeingDeleted(categoryId);
  }

  function handleCloseDeleteCategoryModal() {
    setIsDeleteCategoryModalOpen(false);
  }

  function handleOpenEditCategoriesModal(category: Category) {
    setIsEditCategoriesModalOpen(true);
    setCategoryBeingEdited(category);
  }

  function handleCloseEditCategoriesModal() {
    setIsEditCategoriesModalOpen(false);
    setCategoryBeingEdited(null);
  }

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    reset,
    t,
    handleOpenDeleteCategoryModal,
    handleCloseEditCategoriesModal,
    handleOpenEditCategoriesModal,
    isLoadingCategoryRemove,
    handleDeleteCategory,
    categoryBeingEdited,
    isDeleteCategoryModalOpen,
    isEditCategoriesModalOpen,
    handleCloseDeleteCategoryModal
  };
}
