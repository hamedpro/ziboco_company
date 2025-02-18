"use client";

import { useState, useEffect } from "react";
import { TradeCard } from "./TradeCard";

// Simulating real-time data
const getRandomPrice = (base: number) =>
	base + (Math.random() - 0.5) * base * 0.1;
const getRandomChange = () => (Math.random() - 0.5) * 10;

const initialAssets = [
	{ name: "طلا", basePrice: 1800, unit: "اونس" },
	{ name: "نقره", basePrice: 25, unit: "اونس" },
	{ name: "پلاتین", basePrice: 1000, unit: "اونس" },
	{ name: "پالادیوم", basePrice: 2200, unit: "اونس" },
	{ name: "رودیوم", basePrice: 10000, unit: "اونس" },
	{ name: "بیت‌کوین", basePrice: 30000, unit: "BTC" },
	{ name: "اتریوم", basePrice: 2000, unit: "ETH" },
	{ name: "تتر", basePrice: 1, unit: "USDT" },
];

export default function TradeDashboard() {
	const [assets, setAssets] = useState(
		initialAssets.map((asset) => ({
			...asset,
			amount: Math.floor(Math.random() * 100),
			price: getRandomPrice(asset.basePrice),
			change: getRandomChange(),
		}))
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setAssets((prevAssets) =>
				prevAssets.map((asset) => ({
					...asset,
					price: getRandomPrice(asset.basePrice),
					change: getRandomChange(),
				}))
			);
		}, 3000); // Update every 5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="p-8 bg-neutral-800">
			{/* <h2
				className="text-4xl font-bold mb-8 text-neutral-300 text-center"
				style={{ fontFamily: "Vazirmatn, sans-serif" }}
			>
				داشبورد معاملات
			</h2> */}
			<div className="flex flex-wrap gap-6 justify-center">
				{assets.toReversed().map((asset, index) => (
					<TradeCard
						key={index}
						{...asset}
						currency="﷼"
					/>
				))}
			</div>
		</section>
	);
}
