"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fakeData } from "./fakeData";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import ProductCard from "./ProductCard";

export const Introduction = () => {
	const containerRef = useRef<HTMLDivElement>(null);

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
					{fakeData.products.map((product) => (
						<SwiperSlide
							key={product.id}
							style={{
								padding: "12px",
								width: "288px",
								height: "450px",
							}}
						>
							<ProductCard product={product} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};
