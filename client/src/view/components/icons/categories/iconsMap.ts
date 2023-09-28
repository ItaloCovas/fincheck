import { Clothes } from "./expense/Clothes";
import { Education } from "./expense/Education";
import { Expense } from "./expense/Expense";
import { Food } from "./expense/Food";
import { Fun } from "./expense/Fun";
import { Grocery } from "./expense/Grocery";
import { Home } from "./expense/Home";
import { Transport } from "./expense/Transport";
import { Travel } from "./expense/Travel";
import { Income } from "./income/Income";

export const iconsMap = {
  income: {
    default: Income,
  },
  expense: {
    default: Expense,
    food: Food,
    fun: Fun,
    grocery: Grocery,
    home: Home,
    education: Education,
    clothes: Clothes,
    transport: Transport,
    travel: Travel,
  },
};
