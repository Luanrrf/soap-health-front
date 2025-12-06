import { Dispatch, FormEvent, SetStateAction } from "react";
import { ingredientData, PizzaContextProps } from "./types";
import { fetchData } from "../utils/fetchData";
import { PageContextProps } from "../context/types";

export const placeOrder = async (
  event: FormEvent<HTMLFormElement>,
  customerName: string,
  ingredientIds: ingredientData[],
  setPizzaContext: Dispatch<SetStateAction<PizzaContextProps>>,
  setPageContext: Dispatch<SetStateAction<PageContextProps>>,
) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const data = Object.fromEntries(formData.entries());

  const ingredients = ingredientIds.map((i) => i.id);

  const body = {
    ...data,
    customerName,
    ingredientIds: ingredients,
  };

  const createOrder = await fetchData(`/pizzas?customerName=${name}`, {
    method: "POST",
    body,
  });

  setPizzaContext((prev) => ({
    ...prev,
    size: {
      id: "",
      name: "",
      basePrice: 0
    },
    ingredients: [],
  }))

  setPageContext((prev) => ({
    ...prev,
    request: {
      orders: [],
      loading: false,
      error: null,
    },
  }));

  console.log('createOrder', createOrder);
  
};
