"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImageProps, "onError" | "onLoad" | "onLoadingComplete"> {
  fallback?: React.ReactNode;
  wrapperClassName?: string;
  loadingPlaceholder?: React.ReactNode;
}

export function LazyImage({
  alt,
  src,
  className,
  wrapperClassName,
  fallback,
  loadingPlaceholder,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Default fallback UI if none provided
  const defaultFallback = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-500">
      <ImageOff className="h-12 w-12 mb-2" />
      <p className="text-sm font-medium">تصویر قابل نمایش نیست</p>
    </div>
  );

  // Default loading placeholder
  const defaultLoadingPlaceholder = (
    <div className="absolute inset-0 z-0 bg-neutral-200 animate-pulse" />
  );

  if (error) {
    return (
      <div className={cn("relative", wrapperClassName)}>
        {fallback || defaultFallback}
      </div>
    );
  }

  return (
    <div className={cn("relative", wrapperClassName)}>
      {isLoading && (loadingPlaceholder || defaultLoadingPlaceholder)}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300 z-10",
          isLoading && "opacity-0",
          className
        )}
        onError={() => setError(true)}
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          if (img.complete) {
            setIsLoading(false);
          }
        }}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
} 