"use client";

import Image from "next/image";
import { getPersianValue } from "@/lib/utils";
import { DEFAULT_IMAGE } from "./fakeData";
import { useRouter } from "next/navigation";

interface Product {
	id: string | number;
	title: string;
	description: string | null;
	price: number;
	tag?: string;
	image?: string;
	onSale?: boolean;
	purity?: string;
	categoryId?: string;
}

interface ProductCardProps {
	product: Product;
	variant?: "default" | "featured" | "hot";
	skeletonMode?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	variant = "default",
	skeletonMode = false,
}) => {
	const router = useRouter();

	if (skeletonMode) {
		return (
			<div className="bg-white w-full rounded-[20px] p-5 transition-all hover:shadow-md">
				<div>
					<div className="flex text-xs text-neutral-500 items-center gap-2 justify-between">
						<span>خلوص: <span className="h-4 w-16 bg-neutral-200 rounded inline-block"></span></span>
					</div>
					<div className="h-6 w-2/3 bg-neutral-200 rounded mt-3"></div>
					<div className="h-4 w-1/2 bg-neutral-200 rounded mt-2"></div>
				</div>
				<div className="w-full rounded-[16px] bg-neutral-100 h-60 flex justify-center items-center mt-4">
					<div className="h-20 w-20 bg-neutral-200 rounded"></div>
				</div>
			</div>
		);
	}

	// Display either purity or categoryId for the product metadata
	const displayMetadata = product.purity || product.categoryId || "995";

	return (
		<div 
			className="bg-white w-full rounded-[20px] p-5 transition-all lg:flex lg:flex-col lg:justify-between lg:h-[400px] hover:shadow-containerShadow cursor-pointer"
			onClick={() => router.push(`/products/${product.id}`)}
		>
			<div>
				<div className="flex text-xs text-neutral-500 items-center gap-2 justify-between">
					<span>خلوص: <span className="text-neutral-900 font-medium">{displayMetadata}</span></span>
					{product.tag && (
						<div className="h-7 flex justify-center items-center text-xs rounded-[6px] px-2 bg-primary-light text-primary font-medium">
							{product.tag}
						</div>
					)}
				</div>
				<h3 className="text-neutral-950 font-medium text-base mt-3">{product.title}</h3>
				<p className="font-medium text-primary text-sm mt-2">
					قیمت: {getPersianValue(product.price.toString(), true)} تومان
				</p>
			</div>
			<div className="w-full rounded-[16px] bg-neutral-100 h-60 flex justify-center items-center mt-4 relative">
				{product.onSale && (
					<div className="h-7 flex justify-center items-center text-xs rounded-[6px] px-2 bg-red-100 text-red-600 absolute top-3 left-3">
						تخفیف ویژه
					</div>
				)}
				<Image
					src={product.image || DEFAULT_IMAGE}
					alt={product.title}
					width={80}
					height={120}
					className="w-20 object-contain"
				/>
			</div>
		</div>
	);
};

export default ProductCard;
