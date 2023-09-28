import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

export function AccountsSliderNavigation() {
  const swiper = useSwiper();

  return (
    <div>
      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>
      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
