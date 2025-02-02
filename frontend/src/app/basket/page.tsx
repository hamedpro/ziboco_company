"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fakeData } from "@/components/fakeData";

function BasketPage() {
	// Get basket items from fakeData
	const basketItems = fakeData.basket;
	const items = basketItems
		.map((item) => {
			const product = fakeData.products.find(
				(p) => p.id === item.productId
			);
			if (!product) throw new Error("Product not found");
			return { product, quantity: item.quantity };
		})
		.filter((item) => item.product); // remove any with no matching product

	return (
		<div
			className="max-w-4xl mx-auto p-4"
			dir="rtl"
		>
			<h1 className="text-3xl font-bold mb-4 text-center">سبد خرید</h1>
			{items.length === 0 ? (
				<p className="text-center">سبد خرید شما خالی است.</p>
			) : (
				<div className="space-y-4">
					{items.map(({ product, quantity }) => (
						<div
							key={product.id}
							className="border rounded p-4 flex flex-col md:flex-row justify-between items-center"
						>
							<ProductCard product={product} />
							<span className="text-lg font-semibold mt-2 md:mt-0">
								تعداد: {quantity}
							</span>
						</div>
					))}
				</div>
			)}
			<div className="mt-4 text-center">
				<Link
					href="/products"
					className="text-blue-600 hover:underline"
				>
					بازگشت به محصولات
				</Link>
			</div>
		</div>
	);
}

export default BasketPage;
