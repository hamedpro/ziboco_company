"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
// Import fakeData from the components folder
import { fakeData } from "../../components/fakeData";
import ProductCard from "@/components/ProductCard";
import { CategoriesGrid } from "@/components/CategoriesGrid";
import { NewsGrid } from "@/components/NewsGrid";
import { Loader } from "@/components/Loader";
import { NoData } from "@/components/ui/no-data";
import { Input } from "@/components/ui/input";
import { Search, Package, Grid, Newspaper, Bell } from "lucide-react";

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
		<div className="max-w-7xl mx-auto p-6" dir="rtl">
			{/* Search Input */}
			<div className="max-w-2xl mx-auto mb-12">
				<div className="relative">
					<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
					<Input
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="جستجوی محصولات، دسته‌بندی‌ها، مقالات و اطلاعیه‌ها..."
						className="pr-10 py-6 text-lg"
					/>
				</div>
			</div>

			{searchQuery ? (
				<div className="space-y-16">
					{/* Products Section */}
					<section>
						<div className="flex items-center gap-2 mb-6">
							<Package className="w-6 h-6 text-primary" />
							<h2 className="text-2xl font-bold">نتایج محصولات</h2>
						</div>
						{filteredProducts.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
								{filteredProducts.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
									/>
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
						<div className="flex items-center gap-2 mb-6">
							<Grid className="w-6 h-6 text-primary" />
							<h2 className="text-2xl font-bold">نتایج دسته‌بندی‌ها</h2>
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
						<div className="flex items-center gap-2 mb-6">
							<Newspaper className="w-6 h-6 text-primary" />
							<h2 className="text-2xl font-bold">نتایج مقالات</h2>
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
						<div className="flex items-center gap-2 mb-6">
							<Bell className="w-6 h-6 text-primary" />
							<h2 className="text-2xl font-bold">نتایج اطلاعیه‌ها</h2>
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
	);
};

export default function Wrapper() {
	return (
		<Suspense fallback={<Loader isFullScreen />}>
			<SearchPage />
		</Suspense>
	);
}