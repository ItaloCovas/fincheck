import { useTranslation } from 'react-i18next';
import { BankAccount } from '../../../../../shared/entities/bankAccount';
import { cn } from '../../../../../shared/utils/cn';
import { formatCurrency } from '../../../../../shared/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import { useDashboard } from '../../DashboardContext/useDashboard';

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();

  const { t } = useTranslation();

  const { color, type, currentBalance, name } = data;

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            'text-gray-800 font-medium tracking-[-0.5px] mt-4 block',
            !areValuesVisible && 'blur-sm select-none'
          )}
        >
          {formatCurrency(currentBalance, t)}
        </span>
        <small className="text-gray-600 text-sm">
          {t('accounts.currentBalance')}
        </small>
      </div>
    </div>
  );
}
