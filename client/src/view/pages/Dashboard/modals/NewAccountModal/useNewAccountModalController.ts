import { useDashboard } from '../../DashboardContext/useDashboard';

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return { isNewAccountModalOpen, closeNewAccountModal };
}
