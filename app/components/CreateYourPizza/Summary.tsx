import { usePizzaContext } from "./usePizzaContext";

export default function Summary() {
  const { pizzaContext } = usePizzaContext();

  const ingredientsTotal = pizzaContext.ingredients.reduce(
    (acc, ingredient) => {
      return acc + ingredient.extraPrice;
    },
    0
  );

  const sizePrice = pizzaContext.size ? pizzaContext.size.basePrice : 0;

  const total = sizePrice + ingredientsTotal;

  return (
    <div>
      <p className="text-amber-700 font-semibold">Total</p>
      <span className="text-2xl font-bold text-amber-800">
        ${total.toFixed(2)}
      </span>
    </div>
  );
}
