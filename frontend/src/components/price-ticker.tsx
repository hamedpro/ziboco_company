"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getPersianValue } from "@/lib/utils";
import { fetchMetalPrices } from "@/API";

interface MetalPrice {
	name: string;
	price: number;
	change: number;
}

export default function PriceTicker() {
	const [prices, setPrices] = useState<MetalPrice[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadPrices = async () => {
			try {
				const data = await fetchMetalPrices();
				setPrices(data.map(item => ({
					name: item.title,
					price: item.price,
					change: item.change
				})));
				setError(null);
			} catch (err) {
				setError("خطا در دریافت اطلاعات قیمت فلزات");
				console.error("Error fetching prices:", err);
			} finally {
				setLoading(false);
			}
		};

		loadPrices();
	}, []);

	if (error) {
		return (
			<div className="w-full bg-neutral-100 border-b border-neutral-200 border-opacity-50 py-2 px-4 text-sm text-center text-red-600">
				{error}
			</div>
		);
	}

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
					{loading ? (
						// Skeleton loader
						Array(6).fill(0).map((_, i) => (
							<div key={i} className="flex items-center shrink-0 px-2 gap-x-2">
								<span className="bg-gray-300 animate-pulse h-4 w-20 rounded" />
								<span className="bg-gray-300 animate-pulse h-4 w-24 rounded" />
								<span className="bg-gray-300 animate-pulse h-4 w-16 rounded" />
							</div>
						))
					) : (
						prices.map((metal) => (
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
						))
					)}
				</div>
			</div>

			{/* Fade effect for mobile */}
			<div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-l from-white/0 to-white pointer-events-none" />
		</div>
	);
}
