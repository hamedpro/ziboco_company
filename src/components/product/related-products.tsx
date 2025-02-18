"use client";

import Image from "next/image";
import { ProductResponse } from "@/API";
import Link from "next/link";

interface RelatedProductsProps {
  products: ProductResponse[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder-product.jpg"}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-500 mt-1">
                {product.price?.toLocaleString()} تومان
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 