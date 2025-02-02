"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
// Import fakeData from the components folder
import { fakeData } from "../../components/fakeData";
import ProductCard from "@/components/ProductCard";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { NewsGrid } from "@/components/NewsGrid";

const SearchPage = () => {
	// Get the initial query from the URL search params
	const searchParams = useSearchParams();
	const initialQuery = searchParams?.get("q") || "";
	const [searchQuery, setSearchQuery] = useState(initialQuery);

	const filteredProducts = fakeData.products.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filteredCategories = fakeData.categories.filter((category) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filteredBlogs = fakeData.blogs.filter((blog) =>
		blog.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
	const filteredAnnouncements = fakeData.announcements.filter(
		(announcement) =>
			announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div
			className="max-w-7xl mx-auto p-6"
			dir="rtl"
		>
			{/* Search Input to update query on the page */}
			<div className="mb-8">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="جستجوی همه موارد"
					className="w-full p-3 border-2 rounded-lg focus:outline-none"
				/>
			</div>

			{searchQuery ? (
				<>
					{/* Section for product results */}
					<section className="mb-12">
						<h2 className="text-2xl font-bold mb-4">
							نتایج محصولات
						</h2>
						{filteredProducts.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{filteredProducts.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
									/>
								))}
							</div>
						) : (
							<p className="text-gray-600">
								هیچ نتیجه‌ای برای محصولات یافت نشد.
							</p>
						)}
					</section>

					{/* Section for category results */}
					<section>
						<h2 className="text-2xl font-bold mb-4">
							نتایج دسته‌بندی‌ها
						</h2>
						{filteredCategories.length > 0 ? (
							<CategoriesGrid categories={filteredCategories} />
						) : (
							<p className="text-gray-600">
								هیچ نتیجه‌ای برای دسته‌بندی‌ها یافت نشد.
							</p>
						)}
					</section>

					{/* Section for blog results */}
					<section>
						<h2 className="text-2xl font-bold mb-4">
							نتایج بلاگ‌ها
						</h2>
						<NewsGrid items={filteredBlogs} />
					</section>

					{/* Section for announcement results */}
					<section>
						<h2 className="text-2xl font-bold mb-4">
							نتایج اعلان‌ها
						</h2>
						<NewsGrid items={filteredAnnouncements} />
					</section>
				</>
			) : (
				<p className="text-gray-600">
					لطفا عبارت مورد نظر خود را وارد کنید.
				</p>
			)}
		</div>
	);
};

export default SearchPage;
