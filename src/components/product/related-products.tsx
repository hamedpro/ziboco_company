"use client";

import { ProductResponse } from "@/API";
import ProductCard from "@/components/ProductCard";
import { Card } from "@/components/ui/card";

interface RelatedProductsProps {
  products: ProductResponse[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null;
  
  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-800">محصولات مرتبط</h2>
        <p className="text-sm text-neutral-500">{products.length} محصول</p>
      </div>
      
      <Card className="bg-white border-0 shadow-sm rounded-[20px] p-6">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                title: product.title,
                price: product.price || 0,
                priceWithDiscount: product.priceWithDiscount,
                description: product.description || null,
                image: product.image,
                tag: product.tag,
                onSale: product.onSale,
                purity: product.categoryId || ""
              }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
} 