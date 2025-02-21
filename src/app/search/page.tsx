"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
// Removed fakeData import as we now fetch real data
import ProductCard from "@/components/ProductCard";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { NewsGrid } from "@/components/NewsGrid";
import { Loader } from "@/components/Loader";
import { NoData } from "@/components/ui/no-data";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Grid, Newspaper, Bell, X } from "lucide-react";
import {
	fetchAllProducts,
	fetchCategories,
	fetchBlogPosts,
	fetchAnnouncements,
} from "@/API";

// Import API response types if needed
import type {
	ProductDetailResponse,
	CategoryResponse,
	BlogPostResponse,
	AnnouncementResponse,
} from "@/API";

import { ErrorDisplayComponent } from "@/components/error-display";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SearchPage = () => {
	// Get the initial query from the URL search params
	const searchParams = useSearchParams();
	const initialQuery = searchParams?.get("q") || "";
	const [searchQuery, setSearchQuery] = useState(initialQuery);

	// State for fetched data and flags
	const [products, setProducts] = useState<ProductDetailResponse[]>([]);
	const [categories, setCategories] = useState<CategoryResponse[]>([]);
	const [blogs, setBlogs] = useState<BlogPostResponse[]>([]);
	const [announcements, setAnnouncements] = useState<AnnouncementResponse[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadData = async () => {
		try {
			setLoading(true);
			setError(null);
			const [allProducts, allCategories, allBlogs, allAnnouncements] =
				await Promise.all([
					fetchAllProducts(),
					fetchCategories(),
					fetchBlogPosts(),
					fetchAnnouncements(),
				]);

				// throw new Error("test error");
			setProducts(allProducts);
			setCategories(allCategories);
			setBlogs(allBlogs);
			setAnnouncements(allAnnouncements);
		} catch (err: any) {
			console.error("Error fetching search data:", err);
			setError(err.message || "خطا در دریافت اطلاعات");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	// Filter the fetched data based on the search query
	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filteredBlogs = blogs.filter((blog) =>
		blog.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filteredAnnouncements = announcements.filter((announcement) =>
		announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Add count badges for each section
	const getResultCounts = () => ({
		products: filteredProducts.length,
		categories: filteredCategories.length,
		blogs: filteredBlogs.length,
		announcements: filteredAnnouncements.length,
	});

	const counts = getResultCounts();

	// Improved skeleton loading
	const SkeletonSection = () => (
		<section className="animate-pulse">
			<div className="flex items-center gap-2 mb-6">
				<div className="w-6 h-6 bg-gray-200 rounded-full" />
				<div className="h-8 bg-gray-200 rounded w-48" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="bg-gray-100 rounded-lg h-[300px]" />
				))}
			</div>
		</section>
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// You can add search submission logic here if needed
	};

	return (
		<div className="min-h-screen bg-white" dir="rtl">
			<div className="max-w-7xl mx-auto px-6 py-8">
				{/* Enhanced Search Section */}
				<div className="w-full bg-gray-50 rounded-xl p-8 mb-12">
					<div className="max-w-2xl mx-auto space-y-4">
						<div className="text-center mb-6">
							<h1 className="text-3xl font-semibold text-gray-900">جستجو هوشمند</h1>
							<p className="text-gray-600 mt-2">محصولات، مقالات و سایر محتوای مورد نظر خود را جستجو کنید</p>
						</div>
						<form onSubmit={handleSubmit} className="relative flex gap-3">
							<div className="relative flex-1">
								<Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<Input
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="عبارت مورد نظر خود را وارد کنید..."
									className="pr-12 h-14 text-base bg-white border-gray-200 focus:border-primary"
								/>
							</div>
							{/* <Button 
								type="submit" 
								className="h-14 px-6 text-base"
							>
								جستجو
							</Button> */}
						</form>
						
						{searchQuery && (
							<div className="flex items-center gap-4 text-sm text-gray-600 pt-4">
								<span>عبارت جستجو شده:</span>
								<div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
									<span className="font-medium text-gray-900">{searchQuery}</span>
									<Button
										variant="ghost"
										size="sm"
										className="h-5 w-5 p-0 hover:bg-transparent"
										onClick={() => setSearchQuery("")}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
								<Separator orientation="vertical" className="h-5" />
								<span>
									{filteredProducts.length + 
									 filteredCategories.length + 
									 filteredBlogs.length + 
									 filteredAnnouncements.length} نتیجه یافت شد
								</span>
							</div>
						)}
					</div>
				</div>

				{error ? (
					<ErrorDisplayComponent
						title="خطا در دریافت اطلاعات"
						description={error}
						onRetry={loadData}
						className="py-16"
					/>
				) : loading ? (
					<div className="space-y-16">
						<SkeletonSection />
						<SkeletonSection />
					</div>
				) : searchQuery ? (
					<div className="space-y-16">
						{/* Products Section */}
						<section>
							<div className="flex items-center gap-3 mb-8">
								<Package className="w-7 h-7 text-primary" />
								<h2 className="text-2xl font-bold">نتایج محصولات</h2>
								<Badge variant="secondary" className="mr-auto">
									{filteredProducts.length} مورد
								</Badge>
							</div>
							{filteredProducts.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
									{filteredProducts.map((product) => (
										<ProductCard key={product.id} product={product} />
									))}
								</div>
							) : (
								<NoData
									icon={Package}
									title="محصولی یافت نشد"
									description="هیچ محصولی با عبارت جستجو شده مطابقت ندارد"
								/>
							)}
						</section>

						{/* Categories Section */}
						<section>
							<div className="flex items-center gap-3 mb-8">
								<Grid className="w-7 h-7 text-primary" />
								<h2 className="text-2xl font-bold">نتایج دسته‌بندی‌ها</h2>
								<Badge variant="secondary" className="mr-auto">
									{filteredCategories.length} مورد
								</Badge>
							</div>
							{filteredCategories.length > 0 ? (
								<CategoriesGrid categories={filteredCategories} />
							) : (
								<NoData
									icon={Grid}
									title="دسته‌بندی یافت نشد"
									description="هیچ دسته‌بندی با عبارت جستجو شده مطابقت ندارد"
								/>
							)}
						</section>

						{/* Blogs Section */}
						<section>
							<div className="flex items-center gap-3 mb-8">
								<Newspaper className="w-7 h-7 text-primary" />
								<h2 className="text-2xl font-bold">نتایج مقالات</h2>
								<Badge variant="secondary" className="mr-auto">
									{filteredBlogs.length} مورد
								</Badge>
							</div>
							{filteredBlogs.length > 0 ? (
								<NewsGrid items={filteredBlogs} />
							) : (
								<NoData
									icon={Newspaper}
									title="مقاله‌ای یافت نشد"
									description="هیچ مقاله‌ای با عبارت جستجو شده مطابقت ندارد"
								/>
							)}
						</section>

						{/* Announcements Section */}
						<section>
							<div className="flex items-center gap-3 mb-8">
								<Bell className="w-7 h-7 text-primary" />
								<h2 className="text-2xl font-bold">نتایج اطلاعیه‌ها</h2>
								<Badge variant="secondary" className="mr-auto">
									{filteredAnnouncements.length} مورد
								</Badge>
							</div>
							{filteredAnnouncements.length > 0 ? (
								<NewsGrid items={filteredAnnouncements} />
							) : (
								<NoData
									icon={Bell}
									title="اطلاعیه‌ای یافت نشد"
									description="هیچ اطلاعیه‌ای با عبارت جستجو شده مطابقت ندارد"
								/>
							)}
						</section>
					</div>
				) : (
					<NoData
						title="جستجوی خود را شروع کنید"
						description="برای مشاهده نتایج، عبارت مورد نظر خود را وارد کنید"
						className="py-16"
					/>
				)}
			</div>
		</div>
	);
};

export default function Wrapper() {
	return (
		<Suspense fallback={<Loader isFullScreen />}>
			<SearchPage />
		</Suspense>
	);
}