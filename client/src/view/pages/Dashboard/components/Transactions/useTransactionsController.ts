import { useDashboard } from '../../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { areValuesVisible, toggleValueVisibility } = useDashboard();

  return {
    areValuesVisible,
    toggleValueVisibility,
    isLoading: false,
    isInitialLoading: false,
    transactions: []
  };
}
