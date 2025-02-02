"use client";

import Image from "next/image";
import { getPersianValue } from "@/lib/utils";
import { DEFAULT_IMAGE } from "./fakeData";

interface Product {
	id: string | number;
	title: string;
	description: string;
	price: number;
	tag?: string;
}

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
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
						{getPersianValue(product.price.toString(), true)} تومان
					</span>
					<button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
						افزودن به سبد
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
