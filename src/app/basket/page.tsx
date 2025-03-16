"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, X, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { 
  fetchBasket, 
  fetchDeleteCartItem, 
  fetchUpdateBasket,
  fetchAllProducts
} from "@/API";
import type { CartItemResponse } from "@/API";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ProcessingAction = {
  productId: string;
  action: 'delete' | 'increment' | 'decrement';
};

function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [basketItems, setBasketItems] = useState<CartItemResponse[]>([]);
  const [products, setProducts] = useState<Record<string, any>>({});
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [processingActions, setProcessingActions] = useState<ProcessingAction[]>([]);

  const isProcessing = (productId: string) => processingActions.some(item => item.productId === productId);
  const isActionProcessing = (productId: string, action: 'delete' | 'increment' | 'decrement') => 
    processingActions.some(item => item.productId === productId && item.action === action);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load products first
      const allProducts = await fetchAllProducts();
      const productMap = allProducts.reduce((acc, product) => ({
        ...acc,
        [product.id]: product
      }), {});
      setProducts(productMap);

      // Then load basket
      const basket = await fetchBasket();
      setBasketItems(basket);
    } catch (err) {
      setError("خطا در دریافت اطلاعات");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    setProcessingActions(prev => [...prev, { productId, action: 'delete' }]);
    try {
      await fetchDeleteCartItem(productId);
      setBasketItems(prev => prev.filter(item => item.productId !== productId));
      toast.success("محصول با موفقیت حذف شد", {
        position: "top-right",
        duration: 2000,
      });
    } catch (err) {
      toast.error("خطا در حذف محصول", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setProcessingActions(prev => prev.filter(item => !(item.productId === productId && item.action === 'delete')));
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number, action: 'increment' | 'decrement') => {
    if (newQuantity < 1) return;
    
    setProcessingActions(prev => [...prev, { productId, action }]);
    try {
      await fetchUpdateBasket({ productId, quantity: newQuantity });
      setBasketItems(prev => 
        prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );
      toast.success("تعداد با موفقیت بروزرسانی شد", {
        position: "top-right",
        duration: 2000,
      });
    } catch (err) {
      toast.error("خطا در بروزرسانی تعداد", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setProcessingActions(prev => prev.filter(item => !(item.productId === productId && item.action === action)));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return (
      <section className="bg-neutral-100 min-h-screen" dir="rtl">
        <div className="px-6 pt-8 lg:px-10 2xl:px-[170px] pb-12 max-w-4xl mx-auto">
          <div className="text-center bg-white p-8 rounded-[20px] shadow-sm">
            <div className="mb-6 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-900">خطا در دریافت اطلاعات</h2>
            <Button onClick={loadData} className="mt-4 rounded-full">
              تلاش مجدد
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-neutral-100 min-h-screen" dir="rtl">
      <div className="px-6 pt-8 lg:px-10 2xl:px-[170px] pb-12 max-w-4xl mx-auto">
        <AlertDialog open={showComingSoon} onOpenChange={setShowComingSoon}>
          <AlertDialogContent className="rounded-[16px]" dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-right">
                به زودی...
              </AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                این بخش در حال توسعه است و به زودی در دسترس خواهد بود
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="mt-0 rounded-full">بستن</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <header className="mb-8">
          <h1 className="text-xl font-semibold text-neutral-800 mb-2">
            سبد خرید
          </h1>
          <p className="text-neutral-500 text-sm leading-relaxed">
            در این بخش می‌توانید محصولات انتخابی خود را بررسی نموده، تعداد آنها را تنظیم کنید
            و پس از اطمینان از صحت اطلاعات، فرایند خرید را تکمیل نمایید.
          </p>
        </header>
        
        {loading ? (
          <Card className="bg-white border-0 shadow-sm rounded-[20px] p-6">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex gap-4 items-center">
                    <div className="w-24 h-24 bg-neutral-200 rounded-[16px]" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-3/4" />
                      <div className="h-4 bg-neutral-200 rounded w-1/2" />
                    </div>
                    <div className="w-24 h-8 bg-neutral-200 rounded-full" />
                  </div>
                  {i < 3 && <Separator className="my-4 bg-neutral-200" />}
                </div>
              ))}
            </div>
          </Card>
        ) : basketItems.length === 0 ? (
          <Card className="bg-white border-0 shadow-sm rounded-[20px] p-8 text-center">
            <div className="mb-6 text-neutral-400">
              <ShoppingBag className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-lg text-neutral-700 mb-4">سبد خرید شما خالی است</p>
            <Button asChild variant="outline" className="rounded-full gap-2 mt-2">
              <Link href="/products">
                <ArrowLeft className="w-4 h-4" />
                بازگشت به فروشگاه
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-sm rounded-[20px] p-6">
              <div className="space-y-4">
                {basketItems.map((item, index) => {
                  const product = products[item.productId];
                  const isLast = index === basketItems.length - 1;
                  
                  return (
                    <div key={item.productId}>
                      <div className="flex gap-4 items-center">
                        <div className="relative w-20 h-20 flex-shrink-0 bg-neutral-100 rounded-[16px] p-2">
                          {product?.image ? (
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-contain p-2"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-200 rounded-[16px]" />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-900">
                            {product?.title || "محصول نامعلوم"}
                          </h3>
                          {product?.price && (
                            <p className="text-sm text-neutral-500 mt-1">
                              قیمت واحد: {product.price.toLocaleString()} تومان
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 border border-neutral-200 rounded-full px-2 py-1">
                            <Button
                              variant="ghost"
                              size="icon" 
                              className="h-7 w-7 rounded-full hover:bg-neutral-100 text-neutral-600"
                              disabled={isProcessing(item.productId)}
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, 'decrement')}
                            >
                              {isActionProcessing(item.productId, 'decrement') ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Minus className="w-3 h-3" />
                              )}
                            </Button>
                            
                            <span className="min-w-[1.5rem] text-center text-sm font-medium text-neutral-900">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full hover:bg-neutral-100 text-neutral-600"
                              disabled={isProcessing(item.productId)}
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, 'increment')}
                            >
                              {isActionProcessing(item.productId, 'increment') ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Plus className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-neutral-400 hover:text-red-500 hover:bg-red-50"
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={isProcessing(item.productId)}
                          >
                            {isActionProcessing(item.productId, 'delete') ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      {!isLast && <Separator className="my-4 bg-neutral-200" />}
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="bg-white border-0 shadow-sm rounded-[20px] p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">تعداد محصولات:</span>
                  <span className="font-medium">
                    {basketItems.reduce((total, item) => total + item.quantity, 0)} عدد
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">مجموع قیمت:</span>
                  <span className="font-medium">
                    {basketItems
                      .reduce((total, item) => {
                        const product = products[item.productId];
                        return total + (product?.price || 0) * item.quantity;
                      }, 0)
                      .toLocaleString()}{" "}
                    تومان
                  </span>
                </div>
                
                <Separator className="bg-neutral-200" />
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg text-neutral-900">مبلغ قابل پرداخت:</span>
                  <span className="font-bold text-lg text-primary">
                    {basketItems
                      .reduce((total, item) => {
                        const product = products[item.productId];
                        return total + (product?.price || 0) * item.quantity;
                      }, 0)
                      .toLocaleString()}{" "}
                    تومان
                  </span>
                </div>
                
                <Button 
                  className="w-full rounded-full mt-2" 
                  size="lg"
                  onClick={() => setShowComingSoon(true)}
                >
                  ادامه فرایند خرید
                </Button>
                
                <div className="text-center">
                  <Button asChild variant="link" className="text-neutral-500 hover:text-primary">
                    <Link href="/products">
                      بازگشت به فروشگاه
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}

export default BasketPage;
