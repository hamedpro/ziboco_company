"use client";

import { useState, useEffect } from "react";
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import Link from "next/link";
import { fetchBlogPosts, fetchAnnouncements } from "@/API";
import type { BlogPostResponse, AnnouncementResponse } from "@/API";

type CombinedItem = 
	| (BlogPostResponse & { type: "blog" })
	| (AnnouncementResponse & { type: "announcement" });

export default function NewsViews() {
	const [combinedItems, setCombinedItems] = useState<CombinedItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadData = async () => {
		try {
			const [blogs, announcements] = await Promise.all([
				fetchBlogPosts(),
				fetchAnnouncements()
			]);
			
			const combined = [
				...blogs.map(b => ({ ...b, type: "blog" as const })),
				...announcements.map(a => ({ ...a, type: "announcement" as const }))
			].sort((a, b) => b.date - a.date)
			 .slice(0, 6);

			setCombinedItems(combined);
			setError(null);
		} catch (err) {
			setError("خطا در دریافت آخرین اطلاعات");
			console.error("Error fetching data:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	if (error) {
		return (
			<div className="max-w-7xl mx-auto py-8 px-4" dir="rtl">
				<div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-8 text-center">
					<div className="mb-4 text-blue-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-16 w-16 mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						خطا در دریافت اطلاعات
					</h3>
					<p className="text-gray-600 mb-4 max-w-md mx-auto">
						متاسفانه در دریافت آخرین اطلاعیه‌ها و بلاگ‌ها مشکلی پیش آمده است.
					</p>
					<button
						onClick={loadData}
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
					>
						تلاش مجدد
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="max-w-7xl mx-auto py-8 px-4"
			dir="rtl"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">
					آخرین اطلاعیه‌ها و بلاگ‌ها
				</h2>
				<div className="flex items-center gap-4 text-sm">
					<Link
						href="/announcements"
						className="flex items-center text-blue-600 hover:text-blue-700"
					>
						<span>اطلاعیه‌های بیشتر</span>
						<ChevronLeft className="w-4 h-4" />
					</Link>
					<span className="text-gray-300">|</span>
					<Link
						href="/blogs"
						className="flex items-center text-blue-600 hover:text-blue-700"
					>
						<span>بلاگ‌های بیشتر</span>
						<ChevronLeft className="w-4 h-4" />
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{loading ? (
					Array(6).fill(0).map((_, i) => (
						<div key={i} className="flex gap-4 items-start group hover:bg-gray-50 p-3 rounded-lg transition-colors">
							<div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded animate-pulse" />
							<div className="flex-1 space-y-2">
								<div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
								<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
							</div>
						</div>
					))
				) : (
					combinedItems.map((item) => (
						<Link
							key={`${item.type}-${item.id || item.title}-${item.date}`}
							href={
								item.type === "blog"
									? `/blogs/${item.id}`
									: `/announcements/${item.id}`
							}
							className="flex gap-4 items-start group hover:bg-gray-50 p-3 rounded-lg transition-colors"
						>
							<div className="relative w-24 h-24 flex-shrink-0">
								<Image
									src={
										item.image ||
										"/3dicons-medal-front-color-500-500.png"
									}
									alt={item.title}
									fill
									className="object-cover rounded"
								/>
							</div>
							<div>
								<h3 className="text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
									{item.title}
								</h3>
								<p className="text-sm text-gray-600">
									{new Date(item.date).toLocaleDateString(
										"fa-IR"
									)}
								</p>
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
}

