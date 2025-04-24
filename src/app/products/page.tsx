"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { fetchAllProducts, fetchCategories, CategoryResponse, ProductDetailResponse } from "@/API";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search, SlidersHorizontal, ArrowDownAZ } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

function ProductsPage() {
	// Get category from URL if present
	const searchParams = useSearchParams();
	const categoryParam = searchParams?.get("category");

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
				
				// If category param exists, find the category name and only select that
				if (categoryParam) {
					const category = categoriesData.find(cat => cat.id === categoryParam);
					if (category) {
						setSelectedCategories([category.name]);
					} else {
						// If category not found, select all
						setSelectedCategories(categoriesData.map(cat => cat.name));
					}
				} else {
					// Initialize with all category names if no param
					setSelectedCategories(categoriesData.map(cat => cat.name));
				}
				
				setError(null);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError("خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [categoryParam]);

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
				sorted.sort((a, b) => {
					const priceA = a.priceWithDiscount !== undefined ? a.priceWithDiscount : a.price;
					const priceB = b.priceWithDiscount !== undefined ? b.priceWithDiscount : b.price;
					return priceA - priceB;
				});
				break;
			case "priceDesc":
				sorted.sort((a, b) => {
					const priceA = a.priceWithDiscount !== undefined ? a.priceWithDiscount : a.price;
					const priceB = b.priceWithDiscount !== undefined ? b.priceWithDiscount : b.price;
					return priceB - priceA;
				});
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
		<section className="px-6 pt-8 lg:px-10 2xl:px-[170px] bg-neutral-100 pb-8" dir="rtl">
			<div className="pb-2 flex justify-between items-center">
				<h1 className="text-xl font-semibold text-neutral-800">محصولات</h1>
				<p className="text-sm text-neutral-500">
					{!loading && `${sortedProducts.length} محصول`}
				</p>
			</div>

			{error && (
				<Alert variant="destructive" className="mb-6 max-w-3xl mx-auto">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{/* Search and Filters */}
			<Card className="mb-6 p-4 border-0 shadow-sm">
				<div className="flex flex-col md:flex-row gap-4 items-center">
					<div className="relative w-full md:w-64">
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
						<Input
							type="text"
							placeholder="جستجوی محصولات..."
							className="pr-4 pl-10 h-10 bg-white border-neutral-200"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							disabled={loading}
						/>
					</div>
					
					<Separator className="hidden md:block h-8 w-px bg-neutral-200" orientation="vertical" />
					
					<div className="flex items-center gap-2 w-full md:w-auto">
						<div className="flex items-center gap-1 text-neutral-500 text-xs">
							<SlidersHorizontal className="h-3.5 w-3.5" />
							<span>فیلتر:</span>
						</div>
						<div className="flex flex-wrap gap-2 overflow-x-auto max-w-full">
							{loading ? (
								Array(3).fill(0).map((_, i) => (
									<Skeleton key={i} className="h-7 w-16 rounded-md" />
								))
							) : (
								categories.map((cat) => (
									<Badge 
										key={cat.id} 
										variant={selectedCategories.includes(cat.name) ? "default" : "outline"}
										className="cursor-pointer transition-all hover:opacity-80 rounded-md whitespace-nowrap"
										onClick={() => {
											if (selectedCategories.includes(cat.name)) {
												setSelectedCategories(prev => prev.filter(c => c !== cat.name));
											} else {
												setSelectedCategories(prev => [...prev, cat.name]);
											}
										}}
									>
										{cat.name}
									</Badge>
								))
							)}
						</div>
					</div>
					
					<Separator className="hidden md:block h-8 w-px bg-neutral-200" orientation="vertical" />
					
					<div className="flex items-center gap-2 ml-auto">
						<div className="flex items-center gap-1 text-neutral-500 text-xs whitespace-nowrap">
							<ArrowDownAZ className="h-3.5 w-3.5" />
							<span>مرتب‌سازی:</span>
						</div>
						<Select 
							value={sortMethod} 
							onValueChange={setSortMethod}
							disabled={loading}
						>
							<SelectTrigger className="w-[150px] bg-white border-neutral-200 h-9 text-xs">
								<SelectValue placeholder="مرتب‌سازی" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="priceAsc">قیمت فروش: کم به زیاد</SelectItem>
								<SelectItem value="priceDesc">قیمت فروش: زیاد به کم</SelectItem>
								<SelectItem value="createdAsc">تاریخ: قدیمی به جدید</SelectItem>
								<SelectItem value="createdDesc">تاریخ: جدید به قدیمی</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</Card>

			{/* Products Grid */}
			<div className="flex flex-col gap-6 mt-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{loading ? (
					// Loading skeleton
					Array(8).fill(0).map((_, i) => (
						<ProductCard key={i} skeletonMode={true} product={{} as any} />
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
					<div className="col-span-full text-center py-12 text-neutral-500">
						محصولی با این مشخصات یافت نشد.
					</div>
				)}
			</div>

			<div className="mt-8 text-center">
				<Link href="/" className="text-primary hover:underline">
					بازگشت به خانه
				</Link>
			</div>
		</section>
	);
}

export default ProductsPage;
