"use client";

import { cn } from "@/lib/utils";

interface HatchedBackgroundProps {
  className?: string;
  color?: string;
  backgroundColor?: string;
  size?: number;
}

const HatchedBackground = ({
  className,
  color = "rgba(0,0,0,0.05)",
  backgroundColor = "#f8fafc",
  size = 20,
}: HatchedBackgroundProps) => {
  return (
    <div
      className={cn("w-full h-full", className)}
      style={{
        backgroundColor,
        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, ${backgroundColor} 1px, ${backgroundColor} ${size}px)`,
      }}
    />
  );
};

export default HatchedBackground; 