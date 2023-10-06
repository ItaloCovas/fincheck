import { useMemo, useState } from 'react';
import { useWindowWidth } from '../../../../../shared/hooks/useWindowWidth';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { useQuery } from '@tanstack/react-query';
import { bankAccountsService } from '../../../../../shared/services/bankAccountsService';

interface SliderProps {
  isBeginning: boolean;

  isEnd: boolean;
}

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValueVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState<SliderProps>({
    isBeginning: false,
    isEnd: false
  });

  const { data, isFetched } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: () => bankAccountsService.getAll()
  });

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
    isLoading: isFetched,
    accounts: data ?? [],
    currentBalance
  };
}
