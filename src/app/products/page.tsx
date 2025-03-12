"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fetchAllProducts, fetchCategories, CategoryResponse, ProductDetailResponse } from "@/API";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ProductsPage() {
	// State for API data
	const [products, setProducts] = useState<ProductDetailResponse[]>([]);
	const [categories, setCategories] = useState<CategoryResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// State for search and filters
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [sortMethod, setSortMethod] = useState("priceAsc");

	// Fetch data from API
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [productsData, categoriesData] = await Promise.all([
					fetchAllProducts(),
					fetchCategories(),
				]);
				setProducts(productsData);
				setCategories(categoriesData);
				// Initialize with all category names since categoryId in products is the category name
				setSelectedCategories(categoriesData.map(cat => cat.name));
				setError(null);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError("خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Filter products based on the search query and selected categories
	const filteredProducts = useMemo(() => {
		if (!products.length) return [];
		
		return products.filter((product) => {
			const matchesSearch = product.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			// Match on category name instead of ID
			const matchesCategory = selectedCategories.includes(
				product.categoryId
			);
			return matchesSearch && matchesCategory;
		});
	}, [searchQuery, selectedCategories, products]);

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

			{error && (
				<Alert variant="destructive" className="mb-4">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{/* Filtering and Sorting Controls */}
			<div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex flex-col md:flex-row gap-2">
					{/* Search Input */}
					<Input
						type="text"
						placeholder="جستجو..."
						className="max-w-[300px]"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						disabled={loading}
					/>
					{/* Category Filter Checkboxes */}
					<div className="flex flex-wrap gap-2">
						{loading ? (
							Array(3).fill(0).map((_, i) => (
								<Skeleton key={i} className="h-8 w-20" />
							))
						) : (
							categories.map((cat) => (
								<div key={cat.id} className="flex items-center space-x-2 space-x-reverse gap-1 border border-gray-300 rounded px-2 py-1">
									<Checkbox
										id={`cat-${cat.id}`}
										checked={selectedCategories.includes(cat.name)}
										onCheckedChange={(checked) => {
											if (checked) {
												setSelectedCategories((prev) => [...prev, cat.name]);
											} else {
												setSelectedCategories((prev) => prev.filter((name) => name !== cat.name));
											}
										}}
									/>
									<Label htmlFor={`cat-${cat.id}`} className="text-sm">{cat.name}</Label>
								</div>
							))
						)}
					</div>
				</div>
				{/* Sorting Controls */}
				<div>
					<Select 
						value={sortMethod} 
						onValueChange={setSortMethod}
						disabled={loading}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="مرتب‌سازی" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="priceAsc">قیمت: کم به زیاد</SelectItem>
							<SelectItem value="priceDesc">قیمت: زیاد به کم</SelectItem>
							<SelectItem value="createdAsc">تاریخ ساخت: قدیمی به جدید</SelectItem>
							<SelectItem value="createdDesc">تاریخ ساخت: جدید به قدیمی</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Products Grid with responsive CSS Grid */}
			<div
				className="grid gap-4"
				style={{
					gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
				}}
			>
				{loading ? (
					// Loading skeleton
					Array(8).fill(0).map((_, i) => (
						<div key={i} className="flex flex-col gap-2">
							<Skeleton className="h-40 w-full" />
							<Skeleton className="h-6 w-2/3" />
							<Skeleton className="h-4 w-1/3" />
							<Skeleton className="h-8 w-1/2" />
						</div>
					))
				) : sortedProducts.length > 0 ? (
					// Display products
					sortedProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))
				) : (
					// No products found
					<div className="col-span-full text-center py-8 text-gray-500">
						محصولی یافت نشد.
					</div>
				)}
			</div>

			<div className="mt-4 text-center">
				<Button asChild variant="link">
					<Link href="/">بازگشت به خانه</Link>
				</Button>
			</div>
		</div>
	);
}

export default ProductsPage;
