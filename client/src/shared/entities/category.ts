export interface Category {
  id: string;

  userId: string;

  name: string;

  icon: string;

  iconUrl?: string;

  iconKey?: string;

  type: 'INCOME' | 'EXPENSE';
}
