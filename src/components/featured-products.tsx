"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import { fetchLatestProducts } from "@/API";
import type { ProductResponse } from "@/API";

export default function FeaturedProducts() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(true);
	const [products, setProducts] = useState<ProductResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadProducts = async () => {
		try {
			const data = await fetchLatestProducts();
			setProducts(data.slice(0, 5)); // Show max 5 featured products
			setError(null);
		} catch (err) {
			setError("خطا در دریافت محصولات ویژه");
			console.error("Error fetching products:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
	}, []);

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setShowLeftButton(scrollLeft > 0);
			setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			scrollContainer.addEventListener("scroll", handleScroll);
			handleScroll(); // Check initial state
			return () =>
				scrollContainer.removeEventListener("scroll", handleScroll);
		}
	}, []);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const scrollAmount = scrollContainerRef.current.clientWidth / 2;
			scrollContainerRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	if (error) {
		return (
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center bg-purple-50 rounded-xl p-8 text-center">
					<div className="mb-6 text-purple-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-24 w-24 mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 className="text-2xl font-bold text-gray-900 mb-3">
						خطا در دریافت محصولات
					</h3>
					<p className="text-gray-600 max-w-md mx-auto text-lg mb-6">
						متاسفانه در دریافت لیست محصولات ویژه مشکلی پیش آمده است
					</p>
					<Button
						onClick={loadProducts}
						className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
					>
						تلاش مجدد
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
			dir="rtl"
		>
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-2xl font-bold text-gray-900">
					محصولات ویژه
				</h2>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="icon"
						onClick={() => scroll("right")}
						disabled={!showRightButton}
						className={cn(
							"hidden md:flex",
							!showRightButton && "opacity-50 cursor-not-allowed"
						)}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => scroll("left")}
						disabled={!showLeftButton}
						className={cn(
							"hidden md:flex",
							!showLeftButton && "opacity-50 cursor-not-allowed"
						)}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="relative">
				<div
					ref={scrollContainerRef}
					className="flex gap-4 overflow-x-auto scroll-smooth py-4"
					style={{ scrollbarWidth: "none" }}
				>
					{loading ? (
						Array(5).fill(0).map((_, i) => (
							<div key={i} className="flex-none w-[280px] sm:w-[320px]">
								<ProductCard
									skeletonMode
									product={{ id: i, title: "", description: "", price: 0 }}
									variant="featured"
								/>
							</div>
						))
					) : (
						products.map((product) => (
							<div
								key={product.id}
								className="flex-none w-[280px] sm:w-[320px]"
							>
								<ProductCard
									product={{ ...product, onSale: product.onSale }}
									variant="featured"
								/>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

