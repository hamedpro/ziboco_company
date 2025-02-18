"use client";

import { LucideIcon, SearchX, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoDataProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function NoData({ 
  title, 
  description, 
  icon: Icon = SearchX,
  className 
}: NoDataProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-8 text-center", className)}>
      <Icon className="w-12 h-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
} 