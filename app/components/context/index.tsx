"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PageContextProps, PageContextType, PageProviderProps } from "./types";
import { fetchData } from "../utils/fetchData";

const PageContext = createContext<PageContextType | null>(null);

export const PageProvider = ({ children }: PageProviderProps) => {
  const [pageContext, setPageContext] = useState<PageContextProps>({
    userName: "",
    request: {
      orders: [],
      loading: false,
      error: null,
    },
  });

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (!name) return;

    const loadOrders = async () => {
      startTransition(() => {
        setPageContext((prev) => ({
          ...prev,
          userName: name,
          request: {
            ...prev.request,
            loading: true,
            error: null,
          },
        }));
      });

      try {
        const data = (await fetchData(
          `/pizzas?customerName=${name}`
        )) as PageContextProps["request"]["orders"];

        startTransition(() => {
          setPageContext((prev) => ({
            ...prev,
            request: {
              orders: data,
              loading: false,
              error: null,
            },
          }));
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch orders";

        startTransition(() => {
          setPageContext((prev) => ({
            ...prev,
            request: {
              orders: [],
              loading: false,
              error: errorMessage || "Failed to fetch orders",
            },
          }));
        });
      }
    };

    loadOrders();
  }, []);

  const contextValue = useMemo(
    () => ({ pageContext, setPageContext }),
    [pageContext]
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);

  if (!context)
    throw new Error("usePageContext must be used within a PageProvider");
  return context;
};
