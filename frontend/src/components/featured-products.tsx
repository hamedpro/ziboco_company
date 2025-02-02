"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fakeData, DEFAULT_IMAGE } from "./fakeData";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(true);

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
					{fakeData.products
						.filter((product) => product.hot)
						.map((product) => (
							<div
								key={product.id}
								className="flex-none w-[280px] sm:w-[320px]"
							>
								<ProductCard
									product={product}
									variant="featured"
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

