"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
	// Get the initial query from the URL search params
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get("q") || "";
	const [searchQuery, setSearchQuery] = useState(initialQuery);

	// Dummy data for products - similar to your Introduction page cards
	const dummyProducts = [
		{
			id: 1,
			title: "محصول طلایی",
			description: "توضیحات محصول طلایی",
			price: "۵۰۰۰ تومان",
			image: "/3dicons-medal-front-color-500-500.png",
			tag: "جدید",
		},
		{
			id: 2,
			title: "محصول نقره‌ای",
			description: "توضیحات محصول نقره‌ای",
			price: "۳۰۰۰ تومان",
			image: "/3dicons-medal-front-color-500-500.png",
			tag: "ویژه",
		},
		{
			id: 3,
			title: "محصول برنزی",
			description: "توضیحات محصول برنزی",
			price: "۲۰۰۰ تومان",
			image: "/3dicons-medal-front-color-500-500.png",
			tag: "پرفروش",
		},
	];

	// Dummy data for categories
	const dummyCategories = [
		{
			id: 1,
			title: "فلزات گرانبها",
			description: "دسته‌بندی فلزات گرانبها",
		},
		{ id: 2, title: "سکه", description: "دسته‌بندی سکه‌های قدیمی و مدرن" },
		{
			id: 3,
			title: "تاریخی",
			description: "آثار و محصولات دارای ارزش تاریخی",
		},
	];

	// Filter the dummy data based on the current searchQuery (case insensitive)
	const filteredProducts = dummyProducts.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
	const filteredCategories = dummyCategories.filter((category) =>
		category.title.toLowerCase().includes(searchQuery.toLowerCase())
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
											<span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
												{product.tag}
											</span>
										</div>
										<h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mt-2">
											{product.title}
										</h3>
										<p className="text-gray-600 text-sm mt-1">
											{product.description}
										</p>
										<div className="mt-4 flex justify-between items-center">
											<span className="text-blue-600 font-bold">
												{product.price}
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
											{category.title}
										</h3>
										<p className="text-gray-600 text-sm mt-1">
											{category.description}
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
