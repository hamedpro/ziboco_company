"use client";

import { AlertCircle, LucideIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

interface ErrorDisplayProps {
  title: string;
  description: string;
  className?: string;
  button?: {
    text: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
}

export function ErrorDisplayComponent({
  title,
  description,
  className,
  button,
}: ErrorDisplayProps) {
  return (
    <Card className="w-full p-6">
      <CardContent>
        <div className={cn("flex flex-col items-center justify-center text-center gap-4", className)}>
          <AlertCircle className="h-16 w-16 text-destructive" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {button && (
            <Button 
              variant="outline" 
              onClick={button.onClick}
              className="mt-2"
            >
              {button.icon && <button.icon className="mr-2 h-4 w-4" />}
              {button.text}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 