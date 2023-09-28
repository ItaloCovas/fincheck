import { cn } from '../../../../../shared/utils/cn';
import { formatCurrency } from '../../../../../shared/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import { useAccountsController } from './useAccountsController';

interface AccountCardProps {
  color: string;

  name: string;

  balance: number;

  type: 'CASH' | 'INVESTMENT' | 'CHECKING';
}

export function AccountCard({ balance, color, name, type }: AccountCardProps) {
  const { areValuesVisible } = useAccountsController();

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
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
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
