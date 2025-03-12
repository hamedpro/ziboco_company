"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, X, Plus, Minus } from "lucide-react";
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
import axios from "axios";

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
      <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-xl">
          <div className="mb-6 text-red-600">
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
          <h2 className="text-2xl font-bold mb-4">خطا در دریافت اطلاعات</h2>
          <Button onClick={loadData} className="mt-4">
            تلاش مجدد
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen" dir="rtl">
      <AlertDialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              به زودی...
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              این بخش در حال توسعه است و به زودی در دسترس خواهد بود
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="mt-0">بستن</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <header className="mb-10 text-right mt-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          مدیریت سبد خرید
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          در این بخش می‌توانید محصولات انتخابی خود را بررسی نموده، تعداد آنها را تنظیم کنید
          و پس از اطمینان از صحت اطلاعات، فرایند خرید را تکمیل نمایید.
        </p>
        <div className="mt-4 border-b border-gray-200"></div>
      </header>
      
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 bg-gray-200 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : basketItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-6 text-gray-400">
            <svg
              className="w-24 h-24 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-600 mb-4">سبد خرید شما خالی است</p>
          <Link href="/products" className="text-blue-600 hover:underline">
            بازگشت به فروشگاه
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {basketItems.map((item) => {
            const product = products[item.productId];
            
            return (
              <div
                key={item.productId}
                className="bg-white rounded-lg shadow-sm p-4 border relative"
              >
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="absolute top-2 left-2 text-gray-400 hover:text-red-600"
                  disabled={isProcessing(item.productId)}
                >
                  {isActionProcessing(item.productId, 'delete') ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                </button>

                <div className="flex gap-4 items-center">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    {product?.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">
                      {product?.title || "محصول نامعلوم"}
                    </h3>
                    {product?.price && (
                      <p className="text-gray-600 mt-2">
                        قیمت واحد: {product.price.toLocaleString()} تومان
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, 'decrement')}
                      disabled={isProcessing(item.productId)}
                    >
                      {isActionProcessing(item.productId, 'decrement') ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Minus className="w-4 h-4" />
                      )}
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, 'increment')}
                      disabled={isProcessing(item.productId)}
                    >
                      {isActionProcessing(item.productId, 'increment') ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">جمع کل:</span>
              <span className="font-bold text-lg">
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
              className="w-full" 
              size="lg"
              onClick={() => setShowComingSoon(true)}
            >
              ادامه فرایند خرید
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasketPage;
