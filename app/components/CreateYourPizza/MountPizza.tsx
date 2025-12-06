import Image from "next/image";
import { usePizzaContext } from "./usePizzaContext";

export default function MountPizza() {
  const { pizzaContext } = usePizzaContext();

  if (!pizzaContext.size.name || pizzaContext.size.name === "")
    return (
      <span className="text-amber-700 text-xl font-semibold">
        Select a size to mount your pizza
      </span>
    );

  const scaleBySize: Record<string, number> = {
    Small: 0.8,
    Medium: 1,
    Large: 1.2,
  };

  return (
    <div
      className="relative"
      style={{ scale: scaleBySize[pizzaContext.size.name] }}
    >
      <Image src="/create-pizza.png" alt="" width={500} height={500} />
      <div className="absolute transform scale-80 z-10 w-full h-full top-0 left-0">
        {pizzaContext.ingredients.map((ingredient) => (
          <Image
            key={ingredient.name}
            src={`/${ingredient.name.replace(" ", "-")}.png`}
            alt={ingredient.name}
            width={500}
            height={500}
            className="absolute top-0 left-0"
          />
        ))}
      </div>
    </div>
  );
}
