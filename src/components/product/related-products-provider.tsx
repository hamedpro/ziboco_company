"use client";

import { useState, useEffect } from "react";
import { ProductResponse, fetchLatestProducts } from "@/API";
import { RelatedProducts } from "./related-products";
import { ErrorDisplayComponent } from "../error-display";
import { RefreshCcw } from "lucide-react";

interface RelatedProductsProviderProps {
  currentProductId: string;
}

export function RelatedProductsProvider({ currentProductId }: RelatedProductsProviderProps) {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLatestProducts();
      // Filter out current product and limit to 4 items
      setProducts(data.filter(p => p.id !== currentProductId).slice(0, 4));
    } catch (err) {
      setError("خطا در دریافت محصولات مرتبط");
      console.error("Related products load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentProductId]);

  if (error) {
    return (
      <ErrorDisplayComponent
        title="خطا در دریافت محصولات مرتبط"
        description="در دریافت لیست محصولات مرتبط مشکلی پیش آمده است"
        button={{
          text: "تلاش مجدد",
          icon: RefreshCcw,
          onClick: loadProducts
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg" />
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products.length) return null;

  return <RelatedProducts products={products} />;
} 