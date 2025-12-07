"use client";

import { useState, useCallback } from "react";
import { fetchData, HttpError } from "../components/utils/fetchData";
import { Order } from "../components/Orders"; 

export default function SearchOrderPage() {
  const [searchId, setSearchId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchOrderDetails = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    setOrder(null);
    setNotFound(false);

    if (!id.trim()) {
      setLoading(false);
      return;
    }

    try {
      const data = await fetchData<Order>(`/pizzas/${id}`);
      
      if (!data || Object.keys(data).length === 0) {
        setNotFound(true);
      } else {
        setOrder(data);
      }
    } catch (e) {
      if (e instanceof HttpError && e.status === 404) {
        setNotFound(true);
      } else {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = () => {
    setHasSearched(true);
    fetchOrderDetails(searchId);
  };

  const renderOrderDetails = () => {
    if (loading) {
      return (
        <p className="mt-6 text-amber-600">Searching for order {searchId}...</p>
      );
    }
    
    if (error) {
      return (
        <p className="mt-6 text-red-600">
          ❌ Error: {error}
        </p>
      );
    }

    if (notFound || !order) {
      return (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg text-center">
          <p className="font-bold text-red-700">❌ Pizza not found</p>
        </div>
      );
    }

    return (
      <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200 shadow-md">
        <h3 className="text-2xl font-bold text-green-700 mb-4">✅ Order Found: #{order.id}</h3>
        
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <p>
            Customer: {order.customerName}
          </p>
          <p>
            Size: {order.sizeId}
          </p>
          <p>
            Price: <span className="font-bold text-green-800">${order.finalPrice.toFixed(2)}</span>
          </p>
          <p>
            Placed At: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        
        <div className="mt-4">
          <p className="font-semibold text-green-700 mb-2">Ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {order.ingredientIds.map((id) => (
              <span
                key={id}
                className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h1 className="text-3xl font-extrabold text-red-700 mb-6">
        🔍 Search Pizza by ID
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter Pizza ID (e.g., 4, 5)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="flex-grow border rounded-lg px-4 py-2 text-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !searchId.trim()}
          className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200 disabled:bg-gray-400"
        >
          Search
        </button>
      </div>

      {hasSearched && renderOrderDetails()}
    </div>
  );
}