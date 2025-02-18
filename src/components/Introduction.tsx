"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import ProductCard from "./ProductCard";
import { fetchLatestProducts, ProductResponse } from "@/API";

export const Introduction = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [products, setProducts] = useState<ProductResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		try {
			const data = await fetchLatestProducts();
			setProducts(data);
			setError(null);
		} catch (err) {
			setError("خطا در دریافت محصولات");
			console.error("Error fetching products:", err);
		} finally {
			setLoading(false);
		}
	};

	if (error) {
		return (
			<div className="max-w-7xl mx-auto py-8 px-6">
				<div className="flex flex-col items-center justify-center bg-red-50 rounded-lg p-8 text-center">
					<div className="mb-4 text-red-600">
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
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						خطا در دریافت اطلاعات
					</h3>
					<p className="text-gray-600 mb-4 max-w-md mx-auto">
						متاسفانه در دریافت لیست محصولات مشکلی پیش آمده است. لطفاً مجدداً تلاش
						کنید.
					</p>
					<button
						onClick={() => {
							setError(null);
							setLoading(true);
							loadProducts();
						}}
						className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
								clipRule="evenodd"
							/>
						</svg>
						تلاش مجدد
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="max-w-7xl mx-auto py-8 px-6"
			dir="rtl"
		>
			<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
				<span className="text-blue-800">امن‌ترین</span> راه برای{" "}
				<span className="text-blue-800">سرمایه‌گذاری</span> در فلزات
				گرانبها
			</h1>
			<p className="text-xl text-gray-600 mx-auto mb-8 leading-relaxed">
				با بیش از یک دهه تجربه در بازار طلا و جواهر، ما به شما کمک
				می‌کنیم تا با اطمینان و آگاهی کامل در فلزات گرانبها سرمایه‌گذاری
				کنید.
			</p>

			<div
				className="relative"
				ref={containerRef}
			>
				<button className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all custom-swiper-button-next">
					<ChevronLeft className="h-6 w-6 text-gray-600" />
				</button>
				<button className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all custom-swiper-button-prev">
					<ChevronRight className="h-6 w-6 text-gray-600" />
				</button>

				<Swiper
					modules={[FreeMode, Navigation]}
					slidesPerView={"auto"}
					spaceBetween={16}
					navigation={{
						prevEl: ".custom-swiper-button-prev",
						nextEl: ".custom-swiper-button-next",
						disabledClass: "hidden",
					}}
					freeMode={{ enabled: true, sticky: true }}
					dir="rtl"
					direction="horizontal"
					className="py-4 my-4"
				>
					{loading ? (
						Array(5).fill(0).map((_, i) => (
							<SwiperSlide
								key={`skeleton-${i}`}
								style={{
									padding: "12px",
									width: "288px",
									height: "450px",
								}}
							>
								<ProductCard 
									skeletonMode
									product={{ id: i, title: "", description: "", price: 0 }}
								/>
							</SwiperSlide>
						))
					) : (
						products.map((product) => (
							<SwiperSlide
								key={product.id}
								style={{
									padding: "12px",
									width: "288px",
									height: "450px",
								}}
							>
								<ProductCard product={{
									...product,
									onSale: product.onSale,
									tag: product.tag,
								}} />
							</SwiperSlide>
						))
					)}
				</Swiper>
			</div>
		</div>
	);
};
