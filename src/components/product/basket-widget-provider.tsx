"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartItemResponse, fetchBasket, fetchUpdateBasket, fetchDeleteCartItem } from "@/API";
import { BasketWidget } from "./basket-widget";
import { ErrorDisplayComponent } from "../error-display";
import { toast } from "sonner";

interface BasketWidgetProviderProps {
  productId: string;
}

export function BasketWidgetProvider({ productId }: BasketWidgetProviderProps) {
  const router = useRouter();
  const [cartItem, setCartItem] = useState<CartItemResponse | null>(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBasket = async () => {
      try {
        setLoading(true);
        const basketItems = await fetchBasket();
        const item = basketItems.find((i: CartItemResponse) => i.productId === productId);
        setCartItem(item || null);
        setError(null);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          // Don't set error for 401, allow adding to cart
        } else {
          setError("خطا در دریافت سبد خرید");
          toast.error("خطا در دریافت سبد خرید");
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadBasket();
  }, [productId]);

  const handleAddToCart = async () => {
    setUpdating(true);
    try {
      await fetchUpdateBasket({ productId, quantity: 1 });
      setCartItem({ productId, quantity: 1 });
      toast.success("محصول به سبد خرید اضافه شد");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/auth/entry");
        return;
      }
      toast.error("خطا در اضافه کردن محصول به سبد خرید");
    } finally {
      setUpdating(false);
    }
  };

  const handleIncreaseQuantity = async () => {
    if (!cartItem) return;
    setUpdating(true);
    try {
      const newQuantity = cartItem.quantity + 1;
      await fetchUpdateBasket({ productId, quantity: newQuantity });
      setCartItem(prev => prev ? { ...prev, quantity: newQuantity } : prev);
      toast.success("تعداد محصول افزایش یافت");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/auth/entry");
        return;
      }
      toast.error("خطا در افزایش تعداد محصول");
    } finally {
      setUpdating(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (!cartItem) return;
    setUpdating(true);
    try {
      if (cartItem.quantity === 1) {
        await fetchDeleteCartItem(productId);
        setCartItem(null);
        toast.success("محصول از سبد خرید حذف شد");
      } else {
        const newQuantity = cartItem.quantity - 1;
        await fetchUpdateBasket({ productId, quantity: newQuantity });
        setCartItem(prev => prev ? { ...prev, quantity: newQuantity } : prev);
        toast.success("تعداد محصول کاهش یافت");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/auth/entry");
        return;
      }
      toast.error("خطا در کاهش تعداد محصول");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-full w-full" />
      </div>
    );
  }

  return (
    <BasketWidget
      productId={productId}
      cartItem={cartItem}
      onIncrease={handleIncreaseQuantity}
      onDecrease={handleDecreaseQuantity}
      onAdd={handleAddToCart}
      isUpdating={updating}
      error={error}
    />
  );
} 