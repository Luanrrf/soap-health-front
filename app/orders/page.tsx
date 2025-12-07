"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { fetchData } from "../components/utils/fetchData";
import { Order } from "../components/Orders";
import Link from "next/link";

type SortKey = "price_asc" | "price_desc" | "date_desc" | "date_asc" | "";

export default function PizzaList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    setOrders([]);

    try {
      const data = await fetchData<Order[]>("/pizzas");
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
    fetchOrders();
  }, [fetchOrders]);

  const filteredAndSortedList = useMemo(() => {
    let list = orders;

    if (search.trim()) {
      list = list.filter((p) =>
        p.customerName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "price_asc") {
      return [...list].sort((a, b) => a.finalPrice - b.finalPrice);
    }

    if (sort === "price_desc") {
      return [...list].sort((a, b) => b.finalPrice - a.finalPrice);
    }

    if (sort === "date_desc") {
      return [...list].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    if (sort === "date_asc") {
      return [...list].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return list;
  }, [search, sort, orders]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-700 mb-4">🍕 Pizzas Orders</h1>

      <div className="flex gap-4 mb-6">
        <input
          placeholder="Filter by customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-60 border-red-300 focus:border-red-600"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="border rounded px-3 py-2 border-red-300 focus:border-red-600"
        >
          <option value="" disabled>
            Sort by
          </option>
          <option value="price_asc">Price (Asc)</option>
          <option value="price_desc">Price (Desc)</option>
          <option value="date_desc">Date (Newest)</option>
          <option value="date_asc">Date (Oldest)</option>
        </select>
      </div>

      {loading && <p className="text-red-500 mt-4">Loading pizza data...</p>}

      {error && (
        <p className="text-red-700 mt-4">Error loading data: {error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>

            <tbody>
              {filteredAndSortedList.map((p) => (
                <Link
                  href={`/orders/${p.id}`}
                  key={p.id}
                  passHref
                  legacyBehavior
                >
                  <tr className="border-b hover:bg-red-50 transition cursor-pointer">
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2">{p.customerName}</td>
                    <td className="px-4 py-2">${p.finalPrice.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                  </tr>
                </Link>
              ))}

              {filteredAndSortedList.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No pizzas found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
