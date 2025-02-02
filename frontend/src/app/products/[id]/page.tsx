import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fakeData } from "@/components/fakeData";
import ProductCard from "@/components/ProductCard";

function ProductPage({ params }: { params: { id: string } }) {
	// Extract id from the route params
	const { id } = params;

	const product = fakeData.products.find((p) => p.id === id);

	if (!product) {
		// If no product is found, trigger a 404 page.
		notFound();
	}

	return (
		<div
			className="max-w-3xl mx-auto my-8 p-4"
			dir="rtl"
		>
			{/* Render the ProductCard component */}
			<ProductCard product={product} />
			<div className="mt-4">
				<Link
					href="/products"
					className="text-blue-600 hover:underline"
				>
					بازگشت به لیست محصولات
				</Link>
			</div>
		</div>
	);
}

export default function Page({ params }: { params: { id: string } }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ProductPage params={params} />
		</Suspense>
	);
}

// Static generation for dynamic routes using fakeData
export async function generateStaticParams() {
	return fakeData.products.map((product) => ({
		id: product.id,
	}));
}
