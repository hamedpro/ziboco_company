"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, X, Plus, Minus } from "lucide-react";
import { fetchBasket, fetchDeleteCartItem, fetchUpdateBasket } from "@/API";
import type { CartItemResponse } from "@/API";
import { toast } from "sonner";
import axios from "axios";

function BasketPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [basketItems, setBasketItems] = useState<CartItemResponse[]>([]);
	const [productDetails, setProductDetails] = useState<Record<string, any>>({});

	const loadBasket = async () => {
		try {
			setLoading(true);
			setError(null);
			const items = await fetchBasket();
			setBasketItems(items);
			
			// Load product details for each item
			const details = await Promise.all(
				items.map(async (item) => {
					try {
						const response = await axios.get(`/api/products/${item.productId}`);
						return { [item.productId]: response.data };
					} catch {
						return { [item.productId]: null };
					}
				})
			);
			
			setProductDetails(Object.assign({}, ...details));
		} catch (err) {
			setError("خطا در دریافت سبد خرید");
			console.error("Error loading basket:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleRemoveItem = async (productId: string) => {
		try {
			await fetchDeleteCartItem(productId);
			setBasketItems(prev => prev.filter(item => item.productId !== productId));
			toast.success("محصول با موفقیت حذف شد");
		} catch (err) {
			toast.error("خطا در حذف محصول");
		}
	};

	const updateQuantity = async (productId: string, newQuantity: number) => {
		if (newQuantity < 1) return;
		
		try {
			await fetchUpdateBasket({ productId, quantity: newQuantity });
			setBasketItems(prev => 
				prev.map(item => 
					item.productId === productId 
						? { ...item, quantity: newQuantity } 
						: item
				)
			);
		} catch (err) {
			toast.error("خطا در بروزرسانی تعداد");
		}
	};

	useEffect(() => {
		loadBasket();
	}, []);

	if (error) {
		return (
			<div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
				<div className="text-center bg-red-50 p-8 rounded-xl">
					<div className="mb-6 text-red-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-16 w-16 mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h2 className="text-2xl font-bold mb-4">خطا در دریافت سبد خرید</h2>
					<Button onClick={loadBasket} className="mt-4">
						تلاش مجدد
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-4 min-h-screen" dir="rtl">
			<h1 className="text-3xl font-bold mb-8 text-center">سبد خرید شما</h1>
			
			{loading ? (
				<div className="space-y-6">
					{[1, 2, 3].map((i) => (
						<div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
							<div className="flex gap-4 items-center">
								<div className="w-24 h-24 bg-gray-200 rounded" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-gray-200 rounded w-3/4" />
									<div className="h-4 bg-gray-200 rounded w-1/2" />
								</div>
							</div>
						</div>
					))}
				</div>
			) : basketItems.length === 0 ? (
				<div className="text-center py-12">
					<div className="mb-6 text-gray-400">
						<svg
							className="w-24 h-24 mx-auto"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</div>
					<p className="text-xl text-gray-600 mb-4">سبد خرید شما خالی است</p>
					<Link href="/products" className="text-blue-600 hover:underline">
						بازگشت به فروشگاه
					</Link>
				</div>
			) : (
				<div className="space-y-6">
					{basketItems.map((item) => {
						const product = productDetails[item.productId];
						
						return (
							<div
								key={item.productId}
								className="bg-white rounded-lg shadow-sm p-4 border relative"
							>
								<button
									onClick={() => handleRemoveItem(item.productId)}
									className="absolute top-2 left-2 text-gray-400 hover:text-red-600"
								>
									<X className="w-5 h-5" />
								</button>

								<div className="flex gap-4 items-center">
									<div className="relative w-24 h-24 flex-shrink-0">
										{product?.image ? (
											<Image
												src={product.image}
												alt={product.title}
												fill
												className="object-contain rounded"
											/>
										) : (
											<div className="w-full h-full bg-gray-100 rounded" />
										)}
									</div>

									<div className="flex-1">
										<h3 className="font-medium text-lg">
											{product?.title || "محصول نامعلوم"}
										</h3>
										{product?.price && (
											<p className="text-gray-600 mt-2">
												قیمت واحد: {product.price.toLocaleString()} تومان
											</p>
										)}
									</div>

									<div className="flex items-center gap-3">
										<Button
											variant="outline"
											size="sm"
											onClick={() => updateQuantity(item.productId, item.quantity - 1)}
										>
											<Minus className="w-4 h-4" />
										</Button>
										<span className="w-8 text-center">{item.quantity}</span>
										<Button
											variant="outline"
											size="sm"
											onClick={() => updateQuantity(item.productId, item.quantity + 1)}
										>
											<Plus className="w-4 h-4" />
										</Button>
									</div>
								</div>
							</div>
						);
					})}

					<div className="bg-white rounded-lg shadow-sm p-6 border">
						<div className="flex justify-between items-center mb-4">
							<span className="font-medium">جمع کل:</span>
							<span className="font-bold text-lg">
								{basketItems
									.reduce((total, item) => {
										const product = productDetails[item.productId];
										return total + (product?.price || 0) * item.quantity;
									}, 0)
									.toLocaleString()}{" "}
								تومان
							</span>
						</div>
						<Button className="w-full" size="lg">
							ادامه فرایند خرید
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default BasketPage;
