export interface Category {
  id: string;

  userId: string;

  name: string;

  icon: string;

  type: 'INCOME' | 'EXPENSE';
}
