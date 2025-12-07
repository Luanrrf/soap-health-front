"use client";

import { usePageContext } from "../context";
import { fetchData } from "../utils/fetchData";
import { useEffect, useState, useCallback } from "react";

export interface Order {
  id: number;
  customerName: string;
  sizeId: string;
  ingredientIds: string[];
  finalPrice: number;
  createdAt: string;
}

export default function Orders() {
  const {
    pageContext,
  } = usePageContext();

  const { userName } = pageContext;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (name: string) => {
    if (!name) return;

    setLoading(true);
    setError(null);
    setOrders([]);

    try {
      const data = await fetchData<Order[]>(`/pizzas?customerName=${name}`);
      setOrders(data);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userName) {
      fetchOrders(userName);
    } else {
      setOrders([]);
      setError(null);
    }
  }, [pageContext, fetchOrders, userName]);

  if (!userName) {
    return (
      <div className="max-w-xl mx-auto mt-8 p-6 bg-amber-50 rounded-2xl shadow-lg border border-amber-200 text-center">
        <h2 className="text-2xl font-extrabold text-amber-700">🍕 Orders</h2>
        <p className="mt-3 text-amber-600">
          Please enter your name to see your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-amber-50 rounded-2xl shadow-lg border border-amber-200">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-amber-800 flex items-center gap-3">
          <span className="text-3xl">🍕</span>
          My Orders
        </h2>
      </header>

      {loading && <p className="mt-6 text-amber-600">Loading orders...</p>}
      {error && (
        <p className="mt-6 text-red-600">
          There was an error, please try again later: {error}
        </p>
      )}

      {!loading && orders.length === 0 && (
        <p className="mt-6 text-amber-600">No orders found.</p>
      )}

      {orders.length > 0 && (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <p className="mt-2 text-sm text-amber-500">
                  Created at{" "}
                  <span className="text-amber-700 font-medium">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </p>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    Size: {order.sizeId}
                  </span>
                  <span className="mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">
                    ${order.finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-amber-500 mb-2">Ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {order.ingredientIds.map((id) => (
                    <span
                      key={id}
                      className="text-sm px-2 py-1 bg-amber-100 text-amber-800 rounded-md"
                    >
                      {id}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
