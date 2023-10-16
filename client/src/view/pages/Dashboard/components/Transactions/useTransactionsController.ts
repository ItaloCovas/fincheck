import { useEffect, useState } from 'react';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { useTransactions } from '../../../../../shared/hooks/useTransactions';
import { TransactionsFilters } from '../../../../../shared/services/transactionsService/getAll';
import { Transaction } from '../../../../../shared/entities/transaction';
import { useCategories } from '../../../../../shared/hooks/useCategories';
import { useTranslation } from 'react-i18next';

export function useTransactionsController() {
  const { areValuesVisible, toggleValueVisibility } = useDashboard();
  const { t } = useTranslation();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [isEditTransactionsModalOpen, setIsEditTransactionsModalOpen] =
    useState(false);

  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<null | Transaction>(null);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  const { categories } = useCategories();

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  // Using currying just to practice
  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value == filters[filter]) return;
      setFilters((prevState) => ({
        ...prevState,
        [filter]: value
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditTransactionsModal(transaction: Transaction) {
    setIsEditTransactionsModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditTransactionsModal() {
    setIsEditTransactionsModalOpen(false);
    setTransactionBeingEdited(null);
  }

  return {
    areValuesVisible,
    toggleValueVisibility,
    isLoading,
    isInitialLoading,
    transactions: transactions,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    filters,
    setFilters,
    handleChangeFilters,
    handleApplyFilters,
    isEditTransactionsModalOpen,
    transactionBeingEdited,
    handleOpenEditTransactionsModal,
    handleCloseEditTransactionsModal,
    categories,
    t
  };
}
