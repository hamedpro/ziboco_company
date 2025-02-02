"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fakeData, DEFAULT_IMAGE } from "./fakeData";
import { getPersianValue } from "@/lib/utils";

// --- Added Swiper imports ---
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

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
							<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col">
								<div className="relative">
									<Image
										src={DEFAULT_IMAGE}
										alt={product.title}
										width={288}
										height={200}
										className="rounded-t-lg object-cover group-hover:opacity-90 transition-opacity"
									/>
									<span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
										{product.tag || "عادی"}
									</span>
								</div>

								<div className="p-4 flex-1 justify-end flex flex-col">
									<h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
										{product.title}
									</h3>
									<p className="text-gray-600 text-sm mt-1">
										{product.description}
									</p>
									<div className="mt-4 flex justify-between items-center">
										<span className="text-blue-600 font-bold">
											{getPersianValue(
												product.price.toString(),
												true
											)}{" "}
											تومان
										</span>
										<button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
											افزودن به سبد
										</button>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};
