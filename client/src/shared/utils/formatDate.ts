import { TFunction } from 'i18next';

export function formatDate(date: Date, t: TFunction<'translation', undefined>) {
  return Intl.DateTimeFormat(t('formatCurrency.country')).format(date);
}
