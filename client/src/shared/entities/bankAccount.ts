export interface BankAccount {
  id: string;

  userId: string;

  name: string;

  initialBalance: number;

  type: 'CASH' | 'INVESTMENT' | 'CHECKING';

  color: string;

  currentBalance: number;
}
