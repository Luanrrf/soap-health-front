"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Order } from "@/app/components/Orders";
import { fetchData } from "@/app/components/utils/fetchData";

export default function OrderDetails() {
  const params = useParams();
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchOrderDetails = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    setOrder(null);
    setNotFound(false);

    if (!id) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    try {
      const data = await fetchData<Order>(`/pizzas/${id}`);

      console.log("data", data);

      if (!data || Object.keys(data).length === 0) {
        setNotFound(true);
      } else {
        setOrder(data);
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);

      if (e && typeof e === "object" && "status" in e && e.status === 404) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrderDetails(orderId as string);
  }, [orderId, fetchOrderDetails]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-8 p-6 bg-amber-50 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-extrabold text-amber-700">
          🍕 Order Details
        </h2>
        <p className="mt-3 text-amber-600">Loading order {orderId}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-8 p-6 bg-red-100 rounded-2xl shadow-lg border border-red-300 text-center">
        <h2 className="text-2xl font-extrabold text-red-700">❌ Error</h2>
        <p className="mt-3 text-red-600">
          There was an error loading the order: {error}
        </p>
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="max-w-xl mx-auto mt-8 p-6 bg-red-100 rounded-2xl shadow-lg border border-red-300 text-center">
        <h2 className="text-2xl font-extrabold text-red-700">
          ❌ Pizza not found
        </h2>
        <p className="mt-3 text-red-600">
          The order with ID {orderId} could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-amber-50 rounded-2xl shadow-xl border border-amber-200">
      <h1 className="text-4xl font-extrabold text-amber-800 mb-6 border-b pb-2">
        🍕 Order #{order.id} Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            Customer Information
          </h3>
          <p className="text-lg text-amber-900">
            Name: {order.customerName}
          </p>
          <p className="text-lg text-amber-900">
            Total Price:{" "}
            <span className="font-bold text-emerald-700">
              ${order.finalPrice.toFixed(2)}
            </span>
          </p>
          <p className="text-lg text-amber-900">Size: {order.sizeId}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            Order Status
          </h3>
          <p className="text-lg text-amber-900">
            Placed At: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-amber-700 mb-3 border-t pt-4">
          Ingredients
        </h3>
        <div className="flex flex-wrap gap-2">
          {order.ingredientIds.map((id) => (
            <span
              key={id}
              className="text-base px-3 py-1 bg-amber-100 text-amber-800 rounded-md shadow-sm"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
