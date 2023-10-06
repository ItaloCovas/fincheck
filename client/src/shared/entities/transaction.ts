export interface Transaction {
  id: string;

  bankAccountId: string;

  categoryId: string;

  name: string;

  value: number;

  date: Date;

  type: 'INCOME' | 'EXPENSE';
}
