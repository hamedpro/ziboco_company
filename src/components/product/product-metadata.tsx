"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Folder, Tag, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductDetailResponse } from "@/API";
import { BasketWidgetProvider } from "./basket-widget-provider";
import { useRouter } from "next/navigation";

interface ProductMetadataProps {
  product: ProductDetailResponse;
}

export function ProductMetadata({ product }: ProductMetadataProps) {
  const router = useRouter();

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      {/* Image Gallery Section */}
      <div className="space-y-4">
        <div className="aspect-square relative bg-gray-50 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={product.image || "/placeholder-product.jpg"}
            alt={product.title}
            fill
            className="object-contain p-8 hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1,2,3,4].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg cursor-pointer border-2 border-transparent hover:border-primary transition-colors" />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-sm text-gray-500">
          <Button 
            variant="link" 
            className="px-0 text-gray-500"
            onClick={() => router.push("/products")}
          >
            محصولات
          </Button>
          <span className="mx-2">/</span>
          <span className="font-medium text-primary">{product?.categoryId}</span>
          <span className="mx-2">/</span>
          <span className="truncate">{product?.title}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.title}
          </h1>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-gray-600">۴.۸ (۱۲۸ نظر)</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-blue-600">
              {product.price?.toLocaleString() || "ناموجود"} تومان
            </span>
            {product.onSale && (
              <Badge variant="destructive" className="text-sm">
                %۱۵ تخفیف ویژه
              </Badge>
            )}
          </div>
          {product.onSale && (
            <div className="mt-2 text-gray-500 line-through">
              {(product.price * 1.15).toLocaleString()} تومان
            </div>
          )}
        </div>

        {/* Product Meta */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Folder className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">دسته بندی</p>
              <p className="font-medium">{product.categoryId}</p>
            </div>
          </div>
          {product.tag && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Tag className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">برچسب</p>
                <p className="font-medium">{product.tag}</p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Product Description */}
        {product.content && (
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-4">جزئیات محصول</h2>
            <div 
              dangerouslySetInnerHTML={{ __html: product.content }} 
              className="text-gray-600 leading-relaxed"
            />
          </div>
        )}

        <Separator />

        {/* Basket Widget */}
        <div className="space-y-4">
          <BasketWidgetProvider productId={product.id} />

          {/* Additional Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Heart className="w-5 h-5" />
              افزودن به علاقه‌مندی‌ها
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-5 h-5" />
              اشتراک گذاری
            </Button>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">مشخصات فنی</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-500">وزن</span>
              <span className="font-medium">۲۵۰ گرم</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ابعاد</span>
              <span className="font-medium">۱۰x۱۵x۳ سانتیمتر</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">جنس</span>
              <span className="font-medium">طلا ۱۸ عیار</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 