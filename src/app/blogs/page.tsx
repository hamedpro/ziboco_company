"use client";

import { useState, useEffect } from "react";
import { BlogPostResponse, fetchBlogPosts } from "@/API";
import { Card } from "@/components/ui/card";
import { ErrorDisplayComponent } from "@/components/error-display";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";

export default function BlogsPage() {
	const [blogs, setBlogs] = useState<BlogPostResponse[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadBlogs = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await fetchBlogPosts();
			
			// Make sure we have an array, even if empty
			if (!Array.isArray(data)) {
				throw new Error("Invalid data format");
			}
			
			setBlogs(data);
		} catch (err) {
			console.error("Error fetching blogs:", err);
			setError("خطا در بارگذاری مقالات");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadBlogs();
	}, []);

	if (isLoading) {
		return (
			<div className="max-w-7xl mx-auto py-8 px-4 animate-pulse" dir="rtl">
				<div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div key={i} className="bg-gray-50 p-4 rounded-lg">
							<div className="aspect-[3/2] bg-gray-200 rounded mb-4"></div>
							<div className="h-6 bg-gray-200 w-3/4 rounded mb-2"></div>
							<div className="h-4 bg-gray-200 w-1/4 rounded"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-7xl mx-auto py-12 px-4" dir="rtl">
				<ErrorDisplayComponent
					title="خطا در بارگذاری مقالات"
					description="متأسفانه در بارگذاری مقالات مشکلی پیش آمده است"
					button={{
						text: "تلاش مجدد",
						icon: RefreshCcw,
						onClick: loadBlogs
					}}
				/>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto py-8 px-4" dir="rtl">
			<h1 className="text-3xl font-bold mb-6">مقالات و اخبار</h1>

			{blogs.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-500">در حال حاضر مقاله‌ای وجود ندارد</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{blogs.map((blog) => (
						<Card key={blog.id} className="overflow-hidden group">
							<Link href={`/blogs/${blog.id}`}>
								<div className="aspect-[3/2] relative overflow-hidden">
									<Image
										src={blog.image || "/placeholder-blog.jpg"}
										alt={blog.title || "تصویر مقاله"}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="p-4">
									<h2 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
										{blog.title}
									</h2>
									<p className="mt-2 text-gray-600 line-clamp-3 text-sm">
										{blog.content?.substring(0, 120)}...
									</p>
									<div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
										<div className="flex items-center gap-1">
											<CalendarDays className="w-4 h-4" />
											<span>{blog.createDate}</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock className="w-4 h-4" />
											<span>۵ دقیقه مطالعه</span>
										</div>
									</div>
								</div>
							</Link>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
