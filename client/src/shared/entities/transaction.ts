import { Category } from './category';

export interface Transaction {
  id: string;

  categoryId: string;

  bankAccountId: string;

  name: string;

  value: number;

  date: string;

  type: 'INCOME' | 'EXPENSE';

  category?: Category;
}
