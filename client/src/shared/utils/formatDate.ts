export function formatDate(date: Date) {
  return Intl.DateTimeFormat('pt-br').format(date);
}
