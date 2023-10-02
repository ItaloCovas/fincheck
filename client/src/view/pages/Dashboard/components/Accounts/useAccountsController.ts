import { useState } from 'react';
import { useWindowWidth } from '../../../../../shared/hooks/useWindowWidth';
import { useDashboard } from '../../DashboardContext/useDashboard';

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

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
    isLoading: false,
    accounts: [1]
  };
}
