import { createContext, useCallback, useState } from 'react';
import { BankAccount } from '../../../../shared/entities/bankAccount';

interface DashboardContextProps {
  areValuesVisible: boolean;

  isNewAccountModalOpen: boolean;

  isNewTransactionModalOpen: boolean;

  isEditAccountModalOpen: boolean;

  accountBeingEdited: BankAccount | null;

  newTransactionType: 'INCOME' | 'EXPENSE' | null;

  toggleValueVisibility(): void;

  openNewAccountModal(): void;

  closeNewAccountModal(): void;

  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;

  closeNewTransactionModal(): void;

  openEditAccountModal(bankAccount: BankAccount): void;

  closeEditAccountModal(): void;
}

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<BankAccount | null>(null);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null);
    setIsEditAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValueVisibility,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        openEditAccountModal,
        closeEditAccountModal,
        newTransactionType,
        isEditAccountModalOpen,
        accountBeingEdited
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
