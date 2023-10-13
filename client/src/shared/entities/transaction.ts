export interface Transaction {
  id: string;

  categoryId: string;

  bankAccountId: string;

  name: string;

  value: number;

  date: string;

  type: 'INCOME' | 'EXPENSE';

  category?: {
    id: string;
    name: string;
    icon: string;
  };
}
