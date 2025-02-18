"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fakeData } from "@/components/fakeData";

function ProductsPage() {
	// State for search and filters
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
		fakeData.categories.map((cat) => cat.id)
	);
	const [sortMethod, setSortMethod] = useState("priceAsc");

	// Compute unique categories from the products data
	const categories = useMemo(() => {
		const cats = fakeData.products.map((p) => p.categoryId).filter(Boolean);
		return ["all", ...Array.from(new Set(cats))];
	}, []);

	// Filter products based on the search query and selected categories
	const filteredProducts = useMemo(() => {
		return fakeData.products.filter((product) => {
			const matchesSearch = product.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategories.includes(
				product.categoryId
			);
			return matchesSearch && matchesCategory;
		});
	}, [searchQuery, selectedCategories]);

	// Sort the filtered products based on selected sortMethod
	const sortedProducts = useMemo(() => {
		let sorted = [...filteredProducts];
		switch (sortMethod) {
			case "priceAsc":
				sorted.sort((a, b) => a.price - b.price);
				break;
			case "priceDesc":
				sorted.sort((a, b) => b.price - a.price);
				break;
			case "createdAsc":
				sorted.sort(
					(a, b) =>
						new Date(a.createdAt).getTime() -
						new Date(b.createdAt).getTime()
				);
				break;
			case "createdDesc":
				sorted.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
				);
				break;
			default:
				break;
		}
		return sorted;
	}, [filteredProducts, sortMethod]);

	return (
		<div
			className="max-w-6xl mx-auto p-4"
			dir="rtl"
		>
			<h1 className="text-3xl font-bold mb-4 text-center">محصولات</h1>

			{/* Filtering and Sorting Controls */}
			<div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex gap-2">
					{/* Search Input */}
					<input
						type="text"
						placeholder="جستجو..."
						className="border border-gray-300 rounded px-2 py-1"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					{/* Category Filter Checkboxes */}
					<div className="flex flex-wrap gap-2">
						{fakeData.categories.map((cat) => (
							<label
								key={cat.id}
								className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 cursor-pointer"
							>
								<input
									type="checkbox"
									checked={selectedCategories.includes(
										cat.id
									)}
									onChange={(e) => {
										if (e.target.checked) {
											setSelectedCategories((prev) => [
												...prev,
												cat.id,
											]);
										} else {
											setSelectedCategories((prev) =>
												prev.filter(
													(id) => id !== cat.id
												)
											);
										}
									}}
								/>
								<span className="text-sm">{cat.name}</span>
							</label>
						))}
					</div>
				</div>
				{/* Sorting Controls */}
				<div>
					<select
						className="border border-gray-300 rounded px-2 py-1"
						value={sortMethod}
						onChange={(e) => setSortMethod(e.target.value)}
					>
						<option value="priceAsc">قیمت: کم به زیاد</option>
						<option value="priceDesc">قیمت: زیاد به کم</option>
						<option value="createdAsc">
							تاریخ ساخت: قدیمی به جدید
						</option>
						<option value="createdDesc">
							تاریخ ساخت: جدید به قدیمی
						</option>
					</select>
				</div>
			</div>

			{/* Products Grid with responsive CSS Grid */}
			<div
				className="grid gap-4"
				style={{
					gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
				}}
			>
				{sortedProducts.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>

			<div className="mt-4 text-center">
				<Link
					href="/"
					className="text-blue-600 hover:underline"
				>
					بازگشت به خانه
				</Link>
			</div>
		</div>
	);
}

export default ProductsPage;
