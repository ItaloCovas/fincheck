/* eslint-disable prettier/prettier */
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../shared/config/constants/months';
import { SliderOption } from './SliderOption';
import { SliderNavigation } from './SliderNavigation';
import { formatCurrency } from '../../../../../shared/utils/formatCurrency';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { cn } from '../../../../../shared/utils/cn';
import { useTransactionsController } from './useTransactionsController';
import { Spinner } from '../../../../components/Spinner';
import emptyState from '../../../../../assets/empty.svg';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { FiltersModal } from './FiltersModal';
import { formatDate } from '../../../../../shared/utils/formatDate';
import { EditTransactionModal } from '../../modals/EditTransactionModal';

export function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    isInitialLoading,
    transactions,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleCloseEditTransactionsModal,
    handleOpenEditTransactionsModal,
    isEditTransactionsModalOpen,
    transactionBeingEdited
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl h-full w-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {!isInitialLoading && (
        <>
          <header>
            <FiltersModal
              open={isFiltersModalOpen}
              onClose={handleCloseFiltersModal}
              onApplyFilters={handleApplyFilters}
            />

            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}
            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyState} alt="Empty transactions" />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    isModalOpen={isEditTransactionsModalOpen}
                    onClose={handleCloseEditTransactionsModal}
                    transaction={transactionBeingEdited}
                  />
                )}
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    role="button"
                    onClick={() => handleOpenEditTransactionsModal(transaction)}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === 'EXPENSE' ? 'expense' : 'income'
                        }
                        category={transaction.category?.icon}
                      />

                      <div className="">
                        <strong className="tracking-[-0.5px] font-bold block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'text-red-800 font-medium tracking-[-0.5px]',
                        transaction.type === 'EXPENSE'
                          ? 'text-red-800'
                          : 'text-green-800',
                        !areValuesVisible && 'blur-sm'
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '-' : '+'}{' '}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
