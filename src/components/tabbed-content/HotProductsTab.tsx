"use client";

import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { fetchBestSellingProducts } from "@/API";
import type { ProductResponse } from "@/API";

export default function HotProductsTab() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      const data = await fetchBestSellingProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("خطا در دریافت محصولات پرفروش");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-orange-50 rounded-lg p-8 text-center">
        <div className="mb-4 text-orange-600">
          <svg className="h-16 w-16 mx-auto" /* Add error icon */ />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          خطا در دریافت محصولات پرفروش
        </h3>
        <button 
          onClick={loadProducts}
          className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {loading
        ? Array(5).fill(0).map((_, i) => (
            <ProductCard
              key={i}
              skeletonMode
              product={{ id: i, title: "", description: "", price: 0 }}
            />
          ))
        : products.slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="hot"
            />
          ))}
    </div>
  );
} 