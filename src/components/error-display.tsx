"use client";

import { AlertTriangle, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  title: string;
  description: string;
  variant?: "generic" | "network";
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplayComponent({
  title,
  description,
  variant = "generic",
  onRetry,
  className
}: ErrorDisplayProps) {
  const config = {
    generic: {
      icon: AlertTriangle,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    network: {
      icon: WifiOff,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  };

  const { icon: Icon, iconColor, bgColor } = config[variant];

  return (
    <div className={cn("rounded-xl p-6 text-center", bgColor, className)}>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={cn("p-3 rounded-full", bgColor)}>
          <Icon className={cn("w-12 h-12", iconColor)} />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 max-w-prose mx-auto">{description}</p>
        </div>

        {onRetry && (
          <Button
            variant={variant === "network" ? "outline" : "default"}
            size="lg"
            className="mt-4 gap-2"
            onClick={onRetry}
          >
            {variant === "network" ? (
              <>
                <WifiOff className="w-5 h-5" />
                تلاش مجدد برای اتصال
              </>
            ) : (
              "تلاش مجدد"
            )}
          </Button>
        )}
      </div>
    </div>
  );
} 