"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { TradeIcon } from "./TradeIcon";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { useState, useEffect } from "react";

interface TradeCardProps {
	name: string;
	amount: number;
	unit: string;
	price: number;
	currency: string;
	change: number;
}

export function TradeCard({
	name,
	amount,
	unit,
	price,
	currency,
	change,
}: TradeCardProps) {
	const isPositive = change >= 0;
	const [chartData, setChartData] = useState<{ value: number }[]>(
		Array(20)
			.fill(0)
			.map(() => ({ value: price }))
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setChartData((prevData) => {
				const newData = [...prevData.slice(1), { value: price }];
				return newData;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [price]);

	return (
		<Card className="min-w-[300px] max-w-[400px] flex-grow bg-gradient-to-br from-amber-50 to-yellow-100 text-gray-800 overflow-hidden border-2 border-amber-200">
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-4">
					<TradeIcon
						name={name}
						className="w-10 h-10"
					/>
					<div
						className={`text-sm font-semibold ${
							isPositive ? "text-green-600" : "text-red-600"
						} flex items-center`}
					>
						{isPositive ? (
							<ArrowUpIcon size={16} />
						) : (
							<ArrowDownIcon size={16} />
						)}
						<span className="ml-1 text-lg">
							{Math.abs(change).toFixed(2)}%
						</span>
					</div>
				</div>
				<h3 className="font-bold text-2xl mb-2 text-gray-900">
					{name}
				</h3>
				<p className="text-gray-600 mb-4 text-lg">
					{amount} {unit}
				</p>
				<div className="mb-4">
					<ResponsiveContainer
						width="100%"
						height={60}
					>
						<LineChart data={chartData}>
							<YAxis
								hide
								domain={["dataMin", "dataMax"]}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#4F46E5"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
				<div className="flex justify-between items-end">
					<div>
						<p className="text-sm text-gray-500">قیمت فعلی</p>
						<p className="text-2xl font-semibold text-gray-900">
							{currency}
							{price.toLocaleString("fa-IR", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 3,
							})}
						</p>
					</div>
					<button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold py-2 px-6 rounded-full transition duration-300 shadow-md">
						معامله
					</button>
				</div>
			</CardContent>
		</Card>
	);
}
