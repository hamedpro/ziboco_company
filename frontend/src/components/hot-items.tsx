"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fakeData } from "./fakeData";
import ProductCard from "./ProductCard";
import ComingSoon from "./ComingSoon";

const tabs = [
	{ id: "hot", label: "محصولات داغ" },
	{ id: "new", label: "محصولات جدید" },
	{ id: "deals", label: "بهترین معاملات" },
	{ id: "sale", label: "حراج" },
];

export default function HotItems() {
	const [activeTab, setActiveTab] = useState("hot");

	return (
		<div
			className="max-w-7xl mx-auto py-8 px-4"
			dir="rtl"
		>
			<div className="flex overflow-x-auto border-b mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={cn(
							"px-4 py-2 text-sm font-medium whitespace-nowrap",
							activeTab === tab.id
								? "text-blue-600 border-b-2 border-blue-600"
								: "text-gray-500 hover:text-gray-700"
						)}
					>
						{tab.label}
					</button>
				))}
			</div>

			{activeTab === "hot" && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
					{fakeData.products
						.filter((product) => product.hot)
						.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								variant="hot"
							/>
						))}
				</div>
			)}

			{activeTab === "new" && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
					{fakeData.products
						.slice()
						.sort(
							(a, b) =>
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
						)
						.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								variant="default"
							/>
						))}
				</div>
			)}

			{(activeTab === "deals" || activeTab === "sale") && (
				<div className="flex justify-center items-center h-64">
					<ComingSoon />
				</div>
			)}
		</div>
	);
}
