export interface PageContextProps {
  userName: string;
  request: {
    orders: Array<{
      id: number;
      customerName: string;
      sizeId: string;
      ingredientIds: string[];
      finalPrice: number;
      createdAt: string;
    }>;
    loading: boolean;
    error: string | null;
  };
}

export interface PageProviderProps {
  children: React.ReactNode;
}

export interface PageContextType {
  pageContext: PageContextProps;
  setPageContext: React.Dispatch<React.SetStateAction<PageContextProps>>;
}
