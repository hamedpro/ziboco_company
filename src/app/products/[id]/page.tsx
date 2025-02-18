"use client";

import { useParams } from "next/navigation";
import { ProductMetadataProvider } from "@/components/product/product-metadata-provider";
import { RelatedProductsProvider } from "@/components/product/related-products-provider";
import { ErrorDisplayComponent } from "@/components/error-display";

export default function ProductDetailPage() {
	const { id } = useParams();

	if (!id || Array.isArray(id)) {
		return (
			<div className="max-w-4xl mx-auto p-16 flex flex-col items-center justify-center">
				<ErrorDisplayComponent
					title="شناسه محصول نامعتبر است"
					description="لطفا از طریق لیست محصولات وارد صفحه محصول شوید"
					variant="generic"
				/>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto p-4 min-h-screen" dir="rtl">
			<ProductMetadataProvider productId={id} />
			<RelatedProductsProvider currentProductId={id} />
		</div>
	);
}
