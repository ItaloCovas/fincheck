import { useState } from 'react';
import { useDashboard } from '../../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { areValuesVisible, toggleValueVisibility } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    toggleValueVisibility,
    isLoading: false,
    isInitialLoading: false,
    transactions: [1],
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen
  };
}
