import { startTransition, useEffect, useState } from "react";
import { ingredientData } from "./types";
import { usePizzaContext } from "./usePizzaContext";
import { usePageContext } from "../context";
import { fetchData } from "../utils/fetchData";

export default function Ingredients() {
  const {
    pageContext: { userName },
  } = usePageContext();
  const { pizzaContext, setPizzaContext } = usePizzaContext();
  const [ingredients, setIngredients] = useState<ingredientData[]>([]);

  useEffect(() => {
    if (!userName) return;

    const loadData = async () => {
      const ingredientsData: ingredientData[] = await fetchData("/ingredients");

      startTransition(() => {
        setIngredients(ingredientsData || []);
      });
    };

    loadData();
  }, [userName, setPizzaContext]);

  const toggleIngredient = (id: string) => {
    const isSelected = pizzaContext.ingredients.some((i) => i.id === id);

    setPizzaContext((prev) => {
      if (isSelected) {
        return {
          ...prev,
          ingredients: prev.ingredients.filter((i) => i.id !== id),
        };
      } else {
        const ingredientToAdd = ingredients.find((i) => i.id === id);
        if (!ingredientToAdd) return prev;

        return {
          ...prev,
          ingredients: [...prev.ingredients, ingredientToAdd],
        };
      }
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-amber-700 font-semibold">Ingredients</p>
      <div className="grid grid-cols-2 gap-3">
        {ingredients.map((ingredient) => (
          <label
            key={ingredient.id}
            className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg p-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={pizzaContext.ingredients.some(
                (i) => i.id === ingredient.id
              )}
              onChange={() => toggleIngredient(ingredient.id)}
            />
            <span className="text-amber-800">{ingredient.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
