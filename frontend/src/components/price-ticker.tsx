"use client";

import { useState } from "react";
import { getPersianValue } from "@/lib/utils";
import { fakeData } from "@/components/fakeData";

interface MetalPrice {
	name: string;
	price: number;
	change: number;
}

export default function PriceTicker() {
	const prices = fakeData.metalPrices;

	return (
		<div
			className="w-full bg-neutral-100 border-b border-neutral-200 border-opacity-50 py-2 px-4 text-sm overflow-x-auto relative items-center justify-center flex"
			style={{ scrollbarWidth: "none" }}
			dir="rtl"
		>
			{/* Scrollable content container */}
			<div
				className="overflow-x-auto"
				style={{ scrollbarWidth: "none" }}
			>
				<div className="flex items-center gap-x-4">
					{prices.map((metal) => (
						<div
							key={metal.name}
							className="flex items-center shrink-0 px-2 gap-x-2"
						>
							<span className="text-gray-600">{metal.name}:</span>
							<strong className="text-gray-600">
								{getPersianValue(metal.price.toString(), true)}
							</strong>
							<span
								className={
									metal.change >= 0
										? "text-green-600"
										: "text-red-600"
								}
								dir="ltr"
							>
								({metal.change >= 0 ? "+" : "-"}
								{getPersianValue(
									Math.abs(metal.change).toString(),
									true
								)}
								)
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Fade effect for mobile */}
			<div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-l from-white/0 to-white pointer-events-none" />
		</div>
	);
}
