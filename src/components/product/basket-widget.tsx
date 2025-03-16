"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, Minus, Plus } from "lucide-react";
import { CartItemResponse } from "@/API";
import { toast } from "sonner";

interface BasketWidgetProps {
  productId: string;
  cartItem: CartItemResponse | null;
  onIncrease: () => void;
  onDecrease: () => void;
  onAdd: () => void;
  isIncreasing: boolean;
  isDecreasing: boolean;
  isAdding: boolean;
  error: string | null;
}

export function BasketWidget({
  productId,
  cartItem,
  onIncrease,
  onDecrease,
  onAdd,
  isIncreasing,
  isDecreasing,
  isAdding,
  error
}: BasketWidgetProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {cartItem ? (
          <div className="flex items-center gap-1 border border-neutral-200 rounded-full px-4 py-2 w-full justify-between">
            <Button
              variant="outline"
              size="icon" 
              className="h-9 w-9 rounded-full hover:bg-neutral-100 text-neutral-600 border-neutral-200"
              disabled={isIncreasing || isDecreasing || !!error}
              onClick={onDecrease}
            >
              {isDecreasing ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Minus className="w-4 h-4" />
              )}
            </Button>
            
            <span className="min-w-[2rem] text-center font-medium text-neutral-900">
              {cartItem.quantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-neutral-100 text-neutral-600 border-neutral-200"
              disabled={isIncreasing || isDecreasing || !!error}
              onClick={onIncrease}
            >
              {isIncreasing ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="flex-1 gap-2 rounded-full"
            disabled={isAdding || !!error}
            onClick={onAdd}
          >
            {isAdding ? (
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