import { TFunction } from 'i18next';

export function formatCurrency(
  value: number,
  t: TFunction<'translation', undefined>
) {
  return Intl.NumberFormat(t('formatCurrency.country'), {
    style: 'currency',
    currency: t('formatCurrency.currency')
  }).format(value);
}
