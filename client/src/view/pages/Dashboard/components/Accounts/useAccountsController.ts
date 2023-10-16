import { useMemo, useState } from 'react';
import { useWindowWidth } from '../../../../../shared/hooks/useWindowWidth';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { useBankAccounts } from '../../../../../shared/hooks/useBankAccounts';
import { useTranslation } from 'react-i18next';

interface SliderProps {
  isBeginning: boolean;

  isEnd: boolean;
}

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValueVisibility, openNewAccountModal } =
    useDashboard();
  const { t } = useTranslation();

  const [sliderState, setSliderState] = useState<SliderProps>({
    isBeginning: false,
    isEnd: false
  });

  const { accounts, isFetched } = useBankAccounts();

  const currentBalance = useMemo(() => {
    if (!accounts) return 0;

    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0
    );
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
    isLoading: isFetched,
    accounts: accounts,
    currentBalance,
    t
  };
}
