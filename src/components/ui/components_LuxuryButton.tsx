import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps extends ButtonProps {
	themeVariant:
		| "classic"
		| "modern"
		| "elegant"
		| "bold"
		| "royal"
		| "sunset"
		| "bronze"
		| "antique"
		| "champagne";
}

const LuxuryButton = React.forwardRef<HTMLButtonElement, LuxuryButtonProps>(
	({ themeVariant, className, children = "Enter", ...props }, ref) => {
		const baseStyle =
			"w-full py-6 text-white text-lg font-semibold transition-all duration-300 ease-in-out";

		const variants = {
			// Original variants
			classic:
				"bg-gradient-to-b from-[#D4AF37] to-[#FFF8DC] hover:from-[#C5A028] hover:to-[#FFFACD]",
			modern: "bg-gradient-to-b from-[#B8860B] to-[#F0E68C] hover:from-[#A97A0A] hover:to-[#EEE8AA]",
			elegant:
				"bg-gradient-to-b from-[#DAA520] via-[#F0E68C] to-[#FFFACD] hover:from-[#CD9B1D] hover:via-[#EEE8AA] hover:to-[#FAFAD2]",
			bold: "bg-gradient-to-b from-[#996515] to-[#FEE5AC] hover:from-[#8B5A00] hover:to-[#FFDAB9]",
			// New variants
			royal: "bg-gradient-to-b from-[#8B4513] to-[#FFD700] hover:from-[#8B4500] hover:to-[#FFC125]",
			sunset: "bg-gradient-to-b from-[#B8860B] to-[#FFDF00] hover:from-[#A67B00] hover:to-[#FFD700]",
			bronze: "bg-gradient-to-b from-[#8B4513] to-[#CD7F32] hover:from-[#7C3912] hover:to-[#B87333]",
			antique:
				"bg-gradient-to-b from-[#704214] to-[#C19A6B] hover:from-[#5C3811] hover:to-[#B38B6D]",
			champagne:
				"bg-gradient-to-b from-[#78622E] to-[#F9E4B7] hover:from-[#6B572A] hover:to-[#F4D279]",
		};

		return (
			<Button
				ref={ref}
				className={cn(baseStyle, variants[themeVariant], className)}
				{...props}
			>
				{children}
			</Button>
		);
	}
);

LuxuryButton.displayName = "LuxuryButton";

export default LuxuryButton;
