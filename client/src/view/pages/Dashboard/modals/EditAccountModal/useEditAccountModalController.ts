import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useDashboard } from '../../DashboardContext/useDashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccountsService } from '../../../../../shared/services/bankAccountsService';
import { currencyStringToNumber } from '../../../../../shared/utils/currencyStringToNumber';
import toast from 'react-hot-toast';
import { useState } from 'react';

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number()
  ]),
  name: z.string().nonempty('Nome da Conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória')
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited,
    t,
    currentLanguage
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance.toFixed(2)
    }
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountsService.update
  );
  const { isLoading: isLoadingRemove, mutateAsync: removeAccount } =
    useMutation(bankAccountsService.remove);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(t('toastMessages.accounts.editAccountSuccess'));
      closeEditAccountModal();
    } catch {
      toast.error(t('toastMessages.accounts.editAccountError'));
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(t('toastMessages.accounts.deleteAccountSuccess'));
      closeEditAccountModal();
    } catch {
      toast.error(t('toastMessages.accounts.deleteAccountError'));
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    accountBeingEdited,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingRemove,
    t,
    currentLanguage
  };
}
