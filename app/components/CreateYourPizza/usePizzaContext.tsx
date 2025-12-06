"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { PizzaContextType, PizzaProviderProps, PizzaContextProps } from "./types";

const PizzaContext = createContext<PizzaContextType | null>(null);

export const PizzaProvider = ({ children }: PizzaProviderProps) => {
  const [pizzaContext, setPizzaContext] = useState<PizzaContextProps>({
    size: { 
      id: "",
      name: "",
      basePrice: 0,
     },
    ingredients: [],
  });

  const contextValue = useMemo(
    () => ({ pizzaContext, setPizzaContext }),
    [pizzaContext]
  );

  return (
    <PizzaContext.Provider value={contextValue}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzaContext = () => {
  const context = useContext(PizzaContext);
  if (!context)
    throw new Error("usePizzaContext must be used within a PizzaProvider");
  return context;
};
