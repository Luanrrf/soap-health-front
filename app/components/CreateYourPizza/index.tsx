"use client";

import { useEffect, useState, startTransition } from "react";
import { usePageContext } from "../context";
import { fetchData } from "../utils/fetchData";
import { sizeData } from "./types";
import { usePizzaContext } from "./usePizzaContext";
import MountPizza from "./MountPizza";
import Summary from "./Summary";
import Ingredients from "./Ingredients";
import SendOrder from "./SendOrder";
import { placeOrder } from "./placeOrder";

export default function CreateYourPizza() {
  const {
    pageContext: { userName },
    setPageContext,
  } = usePageContext();

  const { pizzaContext, setPizzaContext } = usePizzaContext();

  const [sizes, setSizes] = useState<sizeData[]>([]);

  useEffect(() => {
    if (!userName) return;

    const loadData = async () => {
      const sizesData: sizeData[] = await fetchData("/sizes");

      startTransition(() => {
        setSizes(sizesData || []);
      });
    };

    loadData();
  }, [userName, setPizzaContext]);

  if (!userName)
    return (
      <div className="max-w-xl mx-auto mt-8 p-6 bg-amber-50 rounded-2xl shadow-lg border border-amber-200 text-center">
        <h2 className="text-2xl font-extrabold text-amber-700">
          🍕 Create Your Pizza
        </h2>
        <p className="mt-3 text-amber-600">
          Please enter your name to create your own pizza.
        </p>
      </div>
    );

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSizeId = e.target.value;

    const selectedSize = sizes.find((s) => s.id === selectedSizeId);

    if (selectedSize) {
      setPizzaContext((prev) => ({
        ...prev,
        size: selectedSize,
      }));
    }
  };

  return (
    <form onSubmit={(event)=> placeOrder(event, userName, pizzaContext.ingredients, setPizzaContext, setPageContext)}
    className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl shadow-lg">
      <div className="flex items-center justify-center">
        <MountPizza />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-amber-800">
          Make Your Pizza
        </h2>

        <div className="flex flex-col gap-2">
          <p className="text-amber-700 font-semibold">Size</p>
          <select
            className="border border-amber-300 rounded-lg px-3 py-2 bg-white text-amber-800 outline-none"
            onChange={handleSizeChange}
            defaultValue=""
            value={pizzaContext.size.id ?? ""}
            required
            name="sizeId"
            id="sizeId"
          >
            <option value="" disabled>
              Select a size
            </option>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name} - R${size.basePrice.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <Ingredients />

        <Summary />
      </div>
      
      <SendOrder />
    </form>
  );
}
