import { Category } from '../../../../shared/entities/category';
import { iconsMap } from './iconsMap';

interface CategoryIconProps {
  type: 'income' | 'expense';

  category?: Category;
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  if (!category?.iconKey && !category?.iconUrl) {
    const Icon =
      iconsMap[type][
        category?.icon as keyof (
          | typeof iconsMap.expense
          | typeof iconsMap.income
        )
      ] ?? iconsMap[type].default;

    return <Icon />;
  } else {
    return (
      <img
        src={category.iconUrl}
        alt="Transaction icon"
        className="w-11 h-11"
      />
    );
  }
}
