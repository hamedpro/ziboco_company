"use client";

import Image from "next/image";
import { getPersianValue } from "@/lib/utils";
import { DEFAULT_IMAGE } from "./fakeData";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Product {
	id: string | number;
	title: string;
	description: string;
	price: number;
	tag?: string;
	image?: string;
	onSale?: boolean;
}

interface ProductCardProps {
	product: Product;
	variant?: "default" | "featured" | "hot";
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	variant = "default",
}) => {
	const router = useRouter();

	if (variant === "featured") {
		return (
			<div
				className="flex-none w-[280px] sm:w-[320px]"
				onClick={() => router.push(`/products/${product.id}`)}
			>
				<div className="relative h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
					{product.onSale && (
						<div className="absolute top-2 right-2 z-10">
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
								تخفیف ویژه
							</span>
						</div>
					)}
					<div className="aspect-square relative">
						<Image
							src={product.image || DEFAULT_IMAGE}
							alt={product.title}
							fill
							className="object-contain p-4 rounded-t-lg"
						/>
					</div>
					<div className="p-4">
						<h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-12 mb-4">
							{product.title}
						</h3>
						<Button
							className="w-full bg-orange-500 hover:bg-orange-600 text-white"
							size="sm"
							dir="rtl"
						>
							قیمت و خرید <ArrowLeft />
						</Button>
					</div>
				</div>
			</div>
		);
	}

	if (variant === "hot") {
		return (
			<div
				className="bg-white rounded-lg shadow-sm overflow-hidden relative"
				onClick={() => router.push(`/products/${product.id}`)}
			>
				<div className="absolute top-0 left-0 bg-orange-500 text-white py-1 px-3 rounded-br-lg text-sm">
					داغ
				</div>
				<div className="relative h-48 p-4">
					<Image
						src={product.image || DEFAULT_IMAGE}
						alt={product.title}
						fill
						className="object-contain"
					/>
				</div>
				<div className="p-4">
					<h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">
						{product.title}
					</h3>
					<p className="text-sm text-gray-600 mb-3">
						از قیمت: {product.price} تومان
					</p>
					<Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
						قیمت و خرید
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col"
			onClick={() => router.push(`/products/${product.id}`)}
		>
			<div className="relative">
				<Image
					src={product.image || DEFAULT_IMAGE}
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
						{getPersianValue(product.price.toString(), true)} تومان
					</span>
					<button
						onClick={(e) => e.stopPropagation()}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
					>
						افزودن به سبد
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
