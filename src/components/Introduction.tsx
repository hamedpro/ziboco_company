"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import ProductCard from "./ProductCard";
import { fetchLatestProducts, ProductResponse } from "@/API";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";

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
			<section className="bg-neutral-100 py-16 px-4 lg:px-10 2xl:px-[170px]">
				<Card className="max-w-3xl mx-auto border-0 shadow-sm rounded-[20px] p-8 text-center">
					<div className="mb-6 text-red-500">
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
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-neutral-900 mb-2">
						خطا در دریافت اطلاعات
					</h3>
					<p className="text-neutral-600 mb-6 max-w-md mx-auto">
						متاسفانه در دریافت لیست محصولات مشکلی پیش آمده است. لطفاً مجدداً تلاش
						کنید.
					</p>
					<Button
						onClick={() => {
							setError(null);
							setLoading(true);
							loadProducts();
						}}
						className="rounded-full"
					>
						تلاش مجدد
					</Button>
				</Card>
			</section>
		);
	}

	return (
		<section className="bg-neutral-100 py-16 px-4 lg:px-10 2xl:px-[170px]" dir="rtl">
			<div className="max-w-6xl mx-auto">
				<div className="mb-12">
					<h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
						امن‌ترین راه برای سرمایه‌گذاری در فلزات گرانبها
					</h2>
					<p className="text-center text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
						با بیش از یک دهه تجربه در بازار طلا و جواهر، ما به شما کمک
						می‌کنیم تا با اطمینان و آگاهی کامل در فلزات گرانبها سرمایه‌گذاری
						کنید.
					</p>
				</div>

				<Card className="border-0 shadow-sm rounded-[20px] overflow-hidden bg-white" ref={containerRef}>
					<div className="flex justify-between items-center px-6 py-4 border-b border-neutral-100">
						<h3 className="font-medium text-lg text-neutral-800">محصولات جدید</h3>
						<Link href="/products" className="flex items-center text-sm text-primary hover:underline gap-1" dir="rtl">
							مشاهده همه
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</div>
					
					<div className="relative p-6">
						<button className="absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-neutral-50 transition-all custom-swiper-button-next">
							<ChevronLeft className="h-5 w-5 text-neutral-700" />
						</button>
						<button className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-neutral-50 transition-all custom-swiper-button-prev">
							<ChevronRight className="h-5 w-5 text-neutral-700" />
						</button>

						<Swiper
							modules={[FreeMode, Navigation]}
							slidesPerView={"auto"}
							spaceBetween={16}
							navigation={{
								prevEl: ".custom-swiper-button-prev",
								nextEl: ".custom-swiper-button-next",
								disabledClass: "opacity-40 cursor-not-allowed",
							}}
							freeMode={{ enabled: true, sticky: true }}
							dir="rtl"
							direction="horizontal"
							className="py-4"
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
				</Card>
			</div>
		</section>
	);
};
