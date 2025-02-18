"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { CartItemResponse } from "@/API";
import { toast } from "sonner";

interface BasketWidgetProps {
  productId: string;
  cartItem: CartItemResponse | null;
  onIncrease: () => Promise<void>;
  onDecrease: () => Promise<void>;
  onAdd: () => Promise<void>;
  isUpdating: boolean;
  error?: string | null;
}

export function BasketWidget({
  productId,
  cartItem,
  onIncrease,
  onDecrease,
  onAdd,
  isUpdating,
  error
}: BasketWidgetProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {cartItem ? (
          <div className="flex items-center gap-1 border border-gray-200 rounded-full px-4 py-2">
            <Button
              variant="ghost"
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-600"
              disabled={isUpdating || !!error}
              onClick={onDecrease}
            >
              {isUpdating ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <span className="text-xl">−</span>
              )}
            </Button>
            
            <span className="min-w-[2rem] text-center font-medium text-gray-900">
              {cartItem.quantity}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-600"
              disabled={isUpdating || !!error}
              onClick={onIncrease}
            >
              {isUpdating ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <span className="text-xl">+</span>
              )}
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="flex-1 gap-2 bg-primary hover:bg-primary/90"
            disabled={isUpdating || !!error}
            onClick={onAdd}
          >
            {isUpdating ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : error ? (
              <span className="text-sm">{error}</span>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                افزودن به سبد خرید
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
} 