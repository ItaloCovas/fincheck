import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';

interface SliderProps {
  isBeginning: boolean;

  isEnd: boolean;
}

export function useAccountsController() {
  const windowWidth = useWindowWidth();

  const [sliderState, setSliderState] = useState<SliderProps>({
    isBeginning: false,
    isEnd: false
  });

  return { sliderState, setSliderState, windowWidth };
}
