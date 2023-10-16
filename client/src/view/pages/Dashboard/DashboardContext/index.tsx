import { createContext, useCallback, useState } from 'react';
import { BankAccount } from '../../../../shared/entities/bankAccount';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useLanguage } from '../../../../shared/hooks/useLanguage';

interface DashboardContextProps {
  areValuesVisible: boolean;

  isNewAccountModalOpen: boolean;

  isNewTransactionModalOpen: boolean;

  isEditAccountModalOpen: boolean;

  isNewCategoryModalOpen: boolean;

  accountBeingEdited: BankAccount | null;

  newTransactionType: 'INCOME' | 'EXPENSE' | null;

  t: TFunction<'translation', undefined>;

  currentLanguage: string;

  toggleValueVisibility(): void;

  openNewAccountModal(): void;

  closeNewAccountModal(): void;

  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;

  closeNewTransactionModal(): void;

  openEditAccountModal(bankAccount: BankAccount): void;

  closeEditAccountModal(): void;

  openNewCategoryModal(): void;

  closeNewCategoryModal(): void;
}

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<BankAccount | null>(null);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);

  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

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

  const openNewCategoryModal = useCallback(() => {
    setIsNewCategoryModalOpen(true);
  }, []);

  const closeNewCategoryModal = useCallback(() => {
    setIsNewCategoryModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValueVisibility,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        isNewCategoryModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        openEditAccountModal,
        closeEditAccountModal,
        openNewCategoryModal,
        closeNewCategoryModal,
        newTransactionType,
        isEditAccountModalOpen,
        accountBeingEdited,
        t,
        currentLanguage
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
