import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import Link from "next/link";
import { fakeData } from "./fakeData";

const announcementItems = fakeData.announcements.map((item) => ({
	...item,
	type: "announcement",
}));
const blogItems = fakeData.blogs.map((item) => ({ ...item, type: "blog" }));
const combinedItems = [...announcementItems, ...blogItems].sort(
	(a, b) => b.date - a.date
);

const latestItems = combinedItems.slice(0, 6);

export default function NewsViews() {
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
				{latestItems.map((item) => (
					<Link
						key={item.id}
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
				))}
			</div>
		</div>
	);
}

