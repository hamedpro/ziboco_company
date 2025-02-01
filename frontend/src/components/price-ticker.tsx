"use client";

import { useState } from "react";
import { getPersianValue } from "@/lib/utils";

interface MetalPrice {
	name: string;
	price: number;
	change: number;
}

export default function PriceTicker() {
	const [prices] = useState<MetalPrice[]>([
		{ name: "سکه تمام بهار آزادی", price: 116_838_312, change: -500_000 }, // Full Bahar Azadi Coin
		{ name: "نیم سکه بهار آزادی", price: 58_419_156, change: -250_000 }, // Half Bahar Azadi Coin
		{ name: "ربع سکه بهار آزادی", price: 29_209_578, change: -125_000 }, // Quarter Bahar Azadi Coin
		{ name: "سکه گرمی", price: 14_604_789, change: -62_500 }, // One Gram Coin
		{ name: "طلای 24 عیار", price: 3_753_102, change: -16_000 }, // 24K Gold per Gram
		{ name: "طلای 18 عیار", price: 2_817_644, change: -12_000 }, // 18K Gold per Gram
		{ name: "نقره 925", price: 47_000, change: -500 }, // 925 Silver per Gram
	]);

	return (
		<div
			className="w-full bg-gray-100 py-2 px-4 text-sm overflow-x-auto relative items-center justify-center flex"
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
