import { NumericFormat } from 'react-number-format';

export function InputCurrency() {
  return (
    <NumericFormat
      className="w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
      thousandSeparator="."
      decimalSeparator=","
      defaultValue={0}
    />
  );
}
