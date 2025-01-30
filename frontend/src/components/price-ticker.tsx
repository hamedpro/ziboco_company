"use client"

import { useState, useEffect } from "react"

interface MetalPrice {
  name: string
  price: number
  change: number
}

export default function PriceTicker() {
  const [prices, setPrices] = useState<MetalPrice[]>([
    { name: "طلا", price: 2771.15, change: -0.45 },
    { name: "نقره", price: 31.07, change: -0.01 },
    { name: "پلاتین", price: 966.2, change: -0.6 },
    { name: "پالادیوم", price: 1004.3, change: 2.5 },
    { name: "رودیوم", price: 4750.0, change: 0.0 },
    { name: "مس", price: 4.29, change: 0.0 },
  ])

  return (
		<div className="w-full bg-gray-100 py-2 px-4 text-sm overflow-x-auto">
			<div className="max-w-7xl mx-auto flex items-center justify-between flex-row-reverse overflow-x-auto">
				{prices.map((metal) => (
					<div
						key={metal.name}
						className="flex items-center space-x-2 flex-row-reverse"
					>
						<span
							className="font-medium"
							dir="rtl"
						>
							{metal.name}:
						</span>
						<span>${metal.price.toFixed(2)}</span>
						<span
							className={`${
								metal.change >= 0
									? "text-green-600"
									: "text-red-600"
							}`}
						>
							{metal.change >= 0 ? "+" : ""}
							{metal.change.toFixed(2)}
						</span>
					</div>
				))}
				<div className="flex items-center">
					<span className="font-medium">بیشتر</span>
					<span className="ml-2">▼</span>
				</div>
			</div>
		</div>
  );
}

