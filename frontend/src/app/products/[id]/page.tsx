"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { 
	fetchAllProducts, 
	fetchBasket, 
	fetchUpdateBasket, 
	fetchDeleteCartItem 
} from "@/API";
import type { CartItemResponse } from "@/API";

function ProductDetailPage() {
	const { id } = useParams();

	// Assert that id is a valid string; if not, show a validation error UI.
	if (!id || Array.isArray(id)) {
		return (
			<div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
				<div className="p-8 bg-red-50 rounded-xl text-center">
					<h2 className="text-2xl font-bold text-red-600">
						شناسه محصول نامعتبر است
					</h2>
				</div>
			</div>
		);
	}

	const router = useRouter();

	const [product, setProduct] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// New state for the cart item specific to this product
	const [cartItem, setCartItem] = useState<CartItemResponse | null>(null);
	// New state to show spinner and disable buttons while updating
	const [updating, setUpdating] = useState(false);

	// Load product details
	const loadProduct = async () => {
		try {
			setLoading(true);
			setError(null);

			const products = await fetchAllProducts();
			const foundProduct = products.find(p => p.id === id);

			if (!foundProduct) {
				router.replace("/404");
				return;
			}

			setProduct(foundProduct);
		} catch (err) {
			setError("خطا در دریافت اطلاعات محصول");
			console.error("Product load error:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProduct();
	}, [id]);

	// Fetch basket data once for the current product
	useEffect(() => {
		const loadBasket = async () => {
			try {
				const basketItems = await fetchBasket();
				const item = basketItems.find((i: CartItemResponse) => i.productId === id);
				setCartItem(item || null);
			} catch (err) {
				console.error("Failed to fetch basket", err);
				toast.error("خطا در دریافت سبد خرید");
			}
		};
		loadBasket();
	}, [id]);

	// Handler to add product to cart with quantity 1
	const handleAddToCart = async () => {
		setUpdating(true);
		try {
			await fetchUpdateBasket({ productId: id, quantity: 1 });
			setCartItem({ productId: id, quantity: 1 });
			toast.success("محصول به سبد خرید اضافه شد");
		} catch (err: any) {
			console.error("Error adding to cart:", err);
			if (err?.response?.status === 401) {
				router.push("/auth/entry");
				return;
			}
			toast.error("خطا در اضافه کردن محصول به سبد خرید");
		} finally {
			setUpdating(false);
		}
	};

	// Handler to increase quantity
	const handleIncreaseQuantity = async () => {
		if (!cartItem) return;
		setUpdating(true);
		try {
			const newQuantity = cartItem.quantity + 1;
			await fetchUpdateBasket({ productId: id, quantity: newQuantity });
			setCartItem(prev => prev ? { ...prev, quantity: newQuantity } : prev);
			toast.success("تعداد محصول افزایش یافت");
		} catch (err: any) {
			console.error("Error increasing quantity:", err);
			if (err?.response?.status === 401) {
				router.push("/auth/entry");
				return;
			}
			toast.error("خطا در افزایش تعداد محصول");
		} finally {
			setUpdating(false);
		}
	};

	// Handler to decrease quantity or remove it from the basket
	const handleDecreaseQuantity = async () => {
		if (!cartItem) return;
		setUpdating(true);
		try {
			if (cartItem.quantity === 1) {
				await fetchDeleteCartItem(id);
				setCartItem(null);
				toast.success("محصول از سبد خرید حذف شد");
			} else {
				const newQuantity = cartItem.quantity - 1;
				await fetchUpdateBasket({ productId: id, quantity: newQuantity });
				setCartItem(prev => prev ? { ...prev, quantity: newQuantity } : prev);
				toast.success("تعداد محصول کاهش یافت");
			}
		} catch (err: any) {
			console.error("Error decreasing quantity:", err);
			if (err?.response?.status === 401) {
				router.push("/auth/entry");
				return;
			}
			toast.error("خطا در کاهش تعداد محصول");
		} finally {
			setUpdating(false);
		}
	};

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
					<h2 className="text-2xl font-bold mb-4">{error}</h2>
					<Button onClick={loadProduct} className="mt-4">
						تلاش مجدد
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto p-4 min-h-screen" dir="rtl">
			<Button
				variant="ghost"
				className="mb-8"
				onClick={() => router.push("/products")}
			>
				<ArrowRight className="ml-2 w-4 h-4" />
				بازگشت به محصولات
			</Button>

			{loading ? (
				<div className="animate-pulse space-y-8">
					<div className="grid md:grid-cols-2 gap-8 px-4">
						<div className="aspect-square bg-gray-200 rounded-xl" />
						<div className="space-y-4">
							<div className="h-8 bg-gray-200 rounded w-3/4" />
							<div className="h-4 bg-gray-200 rounded w-1/2" />
							<div className="h-12 bg-gray-200 rounded w-1/3" />
							<div className="h-32 bg-gray-200 rounded" />
							<div className="h-12 bg-gray-200 rounded w-full" />
						</div>
					</div>
				</div>
			) : product ? (
				<div className="grid md:grid-cols-2 gap-8 px-4">
					{/* Image Gallery */}
					<div className="aspect-square relative bg-gray-50 rounded-xl overflow-hidden">
						<Image
							src={product.image || "/placeholder-product.jpg"}
							alt={product.title}
							fill
							className="object-contain p-8"
						/>
					</div>

					{/* Product Details */}
					<div className="space-y-6">
						<h1 className="text-3xl font-bold text-gray-900">
							{product.title}
						</h1>
						
						<div className="flex items-center gap-4">
							<span className="text-2xl font-bold text-blue-600">
								{product.price?.toLocaleString() || "ناموجود"} تومان
							</span>
							{product.onSale && (
								<span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
									تخفیف ویژه
								</span>
							)}
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<span className="font-medium">دسته بندی:</span>
								<span className="text-gray-600">{product.categoryId}</span>
							</div>
							{product.tag && (
								<div className="flex items-center gap-2">
									<span className="font-medium">برچسب:</span>
									<span className="text-gray-600">{product.tag}</span>
								</div>
							)}
						</div>

						{product.content && (
							<div className="prose max-w-none">
								<h2 className="text-xl font-bold mb-4">توضیحات محصول</h2>
								<div 
									dangerouslySetInnerHTML={{ __html: product.content }} 
									className="text-gray-600"
								/>
							</div>
						)}

						{/* Cart Controls */}
						<div className="flex gap-4">
							{cartItem ? (
								<div className="flex items-center gap-1 border border-gray-200 rounded-full px-4 py-2">
									<Button
										variant="ghost"
										size="icon" 
										className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-600"
										disabled={updating}
										onClick={handleDecreaseQuantity}
									>
										{updating ? (
											<Loader2 className="animate-spin w-4 h-4" />
										) : (
											<span className="text-xl">−</span>
										)}
									</Button>
									
									<span className="min-w-[2rem] text-center font-medium text-gray-900">
										{cartItem.quantity}
									</span>
									
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-600"
										disabled={updating}
										onClick={handleIncreaseQuantity}
									>
										{updating ? (
											<Loader2 className="animate-spin w-4 h-4" />
										) : (
											<span className="text-xl">+</span>
										)}
									</Button>
								</div>
							) : (
								<Button
									size="lg"
									className="flex-1 gap-2 bg-primary hover:bg-primary/90"
									disabled={updating}
									onClick={handleAddToCart}
								>
									{updating ? (
										<Loader2 className="animate-spin w-5 h-5" />
									) : (
										<>
											<ShoppingCart className="w-5 h-5" />
											افزودن به سبد خرید
										</>
									)}
								</Button>
							)}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default ProductDetailPage;
