import { useEffect, useState } from 'react';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { useTransactions } from '../../../../../shared/hooks/useTransactions';
import { TransactionsFilters } from '../../../../../shared/services/transactionsService/getAll';
export function useTransactionsController() {
  const { areValuesVisible, toggleValueVisibility } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

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

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
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
    handleChangeFilters
  };
}
