"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductDetailResponse, fetchAllProducts } from "@/API";
import { ProductMetadata } from "./product-metadata";
import { ErrorDisplayComponent } from "../error-display";

interface ProductMetadataProviderProps {
  productId: string;
}

export function ProductMetadataProvider({ productId }: ProductMetadataProviderProps) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await fetchAllProducts();
      const foundProduct = products.find(p => p.id === productId);

      if (!foundProduct) {
        setError("محصول مورد نظر یافت نشد");
        return; 
      }
      setProduct(foundProduct);
    } catch (err) {
      setError("خطا در دریافت اطلاعات محصول");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="grid md:grid-cols-2 gap-8 p-4">
          <div className="aspect-square bg-gray-200 rounded-xl" />
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-32 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplayComponent
        title="خطا در دریافت اطلاعات"
        description="در دریافت اطلاعات محصول مشکلی پیش آمده است"
        onRetry={loadProduct}
      />
    );
  }

  if (!product) return null;

  return <ProductMetadata product={product} />;
} 