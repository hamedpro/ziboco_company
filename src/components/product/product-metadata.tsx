"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Folder, Tag, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductDetailResponse } from "@/API";
import { BasketWidgetProvider } from "./basket-widget-provider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getPersianValue } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

interface ProductMetadataProps {
  product: ProductDetailResponse;
}

export function ProductMetadata({ product }: ProductMetadataProps) {
  const router = useRouter();

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("لینک محصول کپی شد");
    } catch (error) {
      toast.error("خطا در کپی کردن لینک");
      console.error("Error copying to clipboard:", error);
    }
  };

  const handleAddToFavorites = () => {
    toast.info("این قابلیت به زودی اضافه خواهد شد");
  };

  // Extract purity from product tag or use a default value
  const purity = product.tag?.includes("عیار") ? product.tag : null;
  
  // Check if product has discount
  const hasDiscount = product.priceWithDiscount !== undefined && product.priceWithDiscount < product.price;

  return (
    <div className="mb-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-neutral-500">
        <Button 
          variant="link" 
          className="px-0 text-neutral-500"
          onClick={() => router.push("/products")}
        >
          محصولات
        </Button>
        <span className="mx-2">/</span>
        <span className="font-medium text-primary">{product?.categoryId}</span>
        <span className="mx-2">/</span>
        <span className="truncate">{product?.title}</span>
      </div>

      <Card className="bg-white border-0 shadow-sm rounded-[20px] p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-neutral-100 rounded-[16px] overflow-hidden">
              <Image
                src={product.image || "/placeholder-product.jpg"}
                alt={product.title}
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-neutral-900">
                {product.title}
              </h1>
              
              {product.tag && (
                <Badge className="bg-primary-light text-primary font-medium">
                  {product.tag}
                </Badge>
              )}
            </div>

            {/* Price Section */}
            <div className="bg-neutral-100 p-4 rounded-[16px]">
              {hasDiscount ? (
                <>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-neutral-900">
                      {getPersianValue((product.priceWithDiscount || 0).toString(), true)} ریال
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      تخفیف ویژه
                    </Badge>
                  </div>
                  <div className="mt-2 text-neutral-500 line-through">
                    {getPersianValue(product.price.toString(), true)} ریال
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-neutral-900">
                    {getPersianValue(product.price.toString(), true)} ریال
                  </span>
                  {product.onSale && (
                    <Badge variant="destructive" className="text-sm">
                      تخفیف ویژه
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Product Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-neutral-100 rounded-[16px]">
                <Folder className="w-5 h-5 text-neutral-500" />
                <div>
                  <p className="text-sm text-neutral-500">دسته بندی</p>
                  <p className="font-medium">{product.categoryId}</p>
                </div>
              </div>
              {purity && (
                <div className="flex items-center gap-2 p-3 bg-neutral-100 rounded-[16px]">
                  <Tag className="w-5 h-5 text-neutral-500" />
                  <div>
                    <p className="text-sm text-neutral-500">خلوص</p>
                    <p className="font-medium">{purity}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-neutral-200" />

            {/* Product Description */}
            {product.description && (
              <div className="prose max-w-none">
                <h2 className="text-lg font-semibold mb-2">توضیحات محصول</h2>
                <p className="text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <Separator className="bg-neutral-200" />

            {/* Basket Widget */}
            <div className="space-y-4">
              <BasketWidgetProvider productId={product.id} />

              {/* Additional Actions */}
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="gap-2 rounded-full" onClick={handleAddToFavorites}>
                        <Heart className="w-5 h-5" />
                        افزودن به علاقه‌مندی‌ها
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>به زودی</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button variant="outline" className="gap-2 rounded-full" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                  اشتراک گذاری
                </Button>
              </div>
            </div>

            {/* Product Specifications */}
            {product.content && (
              <div className="bg-neutral-100 p-4 rounded-[16px]">
                <h3 className="font-semibold text-lg mb-2">مشخصات فنی</h3>
                <div 
                  dangerouslySetInnerHTML={{ __html: product.content }} 
                  className="text-neutral-600 leading-relaxed"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
} 