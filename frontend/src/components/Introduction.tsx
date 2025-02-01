"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fakeData, DEFAULT_IMAGE } from "./fakeData";
import { getPersianValue } from "@/lib/utils";

export const Introduction = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(false);

	const updateScrollButtons = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			setShowLeftButton(scrollLeft > 0);
			setShowRightButton(scrollLeft < scrollWidth - clientWidth);
		}
	};

	const scroll = (direction: "left" | "right") => {
		if (sliderRef.current) {
			const { clientWidth } = sliderRef.current;
			const scrollTo =
				direction === "left"
					? sliderRef.current.scrollLeft - clientWidth / 2
					: sliderRef.current.scrollLeft + clientWidth / 2;

			sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

			setTimeout(updateScrollButtons, 300);
		}
	};

	useEffect(() => {
		updateScrollButtons();
		window.addEventListener("resize", updateScrollButtons);
		return () => window.removeEventListener("resize", updateScrollButtons);
	}, []);

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

			<div className="relative">
				{showLeftButton && (
					<button
						onClick={() => scroll("left")}
						className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
					>
						<ChevronLeft className="h-6 w-6 text-gray-600" />
					</button>
				)}

				{showRightButton && (
					<button
						onClick={() => scroll("right")}
						className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
					>
						<ChevronRight className="h-6 w-6 text-gray-600" />
					</button>
				)}

				<div
					ref={sliderRef}
					className="flex overflow-x-auto gap-4 pb-4 scroll-smooth px-2"
					style={{ scrollbarWidth: "none" }}
					onScroll={updateScrollButtons}
				>
					{fakeData.products.map((product) => (
						<div
							key={product.id}
							className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
						>
							<div className="relative">
								<Image
									src={DEFAULT_IMAGE}
									alt={product.title}
									width={288}
									height={200}
									className="rounded-t-lg object-cover group-hover:opacity-90 transition-opacity"
								/>
								<span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
									{product.tag}
								</span>
							</div>

							<div className="p-4">
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
					))}
				</div>
			</div>
		</div>
	);
};
