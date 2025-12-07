export interface sizeData {
  id: string;
  name: string;
  basePrice: number;
}

export interface ingredientData {
  id: string;
  name: string;
  extraPrice: number;
}

export interface PizzaContextProps {
  size: sizeData;
  ingredients: ingredientData[];
}

export interface PizzaProviderProps {
  children: React.ReactNode;
}

export interface PizzaContextType {
  pizzaContext: PizzaContextProps;
  setPizzaContext: React.Dispatch<React.SetStateAction<PizzaContextProps>>;
}
