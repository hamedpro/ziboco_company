"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
// Import fakeData from the components folder
import { fakeData } from "../../components/fakeData";

const SearchPage = () => {
	// Get the initial query from the URL search params
	const searchParams = useSearchParams();
	const initialQuery = searchParams?.get("q") || "";
	const [searchQuery, setSearchQuery] = useState(initialQuery);

	// Removed dummyProducts and dummyCategories in favor of data from fakeData
	// Filter products from fakeData based on searchQuery (case insensitive)
	const filteredProducts = fakeData.products.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Filter categories from fakeData based on searchQuery using category.name instead of title
	const filteredCategories = fakeData.categories.filter((category) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="max-w-7xl mx-auto p-6">
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
									<div
										key={product.id}
										className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group p-4"
									>
										<div className="relative">
											<img
												src={product.image}
												alt={product.title}
												className="rounded-t-lg object-cover group-hover:opacity-90 transition-opacity w-full h-40"
											/>
											{/* Show tag if available */}
											{product.tag && (
												<span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
													{product.tag}
												</span>
											)}
										</div>
										<h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mt-2">
											{product.title}
										</h3>
										<p className="text-gray-600 text-sm mt-1">
											{product.description ||
												"توضیحی موجود نیست"}
										</p>
										<div className="mt-4 flex justify-between items-center">
											<span className="text-blue-600 font-bold">
												{(typeof product.price ===
												"number"
													? product.price.toLocaleString()
													: product.price) + " تومان"}
											</span>
											<button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
												افزودن به سبد
											</button>
										</div>
									</div>
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
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{filteredCategories.map((category) => (
									<div
										key={category.id}
										className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group p-4"
									>
										<h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
											{category.name}
										</h3>
										<p className="text-gray-600 text-sm mt-1">
											{category.type}
										</p>
									</div>
								))}
							</div>
						) : (
							<p className="text-gray-600">
								هیچ نتیجه‌ای برای دسته‌بندی‌ها یافت نشد.
							</p>
						)}
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
