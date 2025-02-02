import { fakeData } from "@/components/fakeData";
import Link from "next/link";

export default function BlogsPage() {
	return (
		<div
			className="max-w-7xl mx-auto py-8 px-4"
			dir="rtl"
		>
			<h1 className="text-3xl font-bold mb-6">بلاگ‌ها</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{fakeData.blogs.map((blog) => (
					<Link
						key={blog.id}
						href={`/blogs/${blog.id}`}
						className="group hover:bg-gray-50 p-3 rounded-lg transition-colors block"
					>
						<div className="relative w-24 h-24 flex-shrink-0 mb-2">
							<img
								src={blog.image}
								alt={blog.title}
								className="object-cover rounded w-full h-full"
							/>
						</div>
						<h3 className="text-lg font-medium group-hover:text-blue-600 transition-colors">
							{blog.title}
						</h3>
						<p className="text-sm text-gray-600">
							{new Date(blog.date).toLocaleDateString("fa-IR")}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
