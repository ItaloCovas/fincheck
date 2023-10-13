export function currencyStringToNumber(value: string | number) {
  if (typeof value === 'number') {
    return value;
  }

  // Using RegExp for better browser compatibility. replaceAll is not with good compatibility today.
  const sanitizedString = value!.replace(/\./g, ',').replace(',', '.');

  return Number(sanitizedString);
}
