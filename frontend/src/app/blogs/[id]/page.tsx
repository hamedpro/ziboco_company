import { fakeData } from "@/components/fakeData";
import Link from "next/link";

interface PageProps {
	params: {
		id: string;
	};
}

export default function BlogDetail({ params }: PageProps) {
	const blog = fakeData.blogs.find((b) => b.id === params.id);

	if (!blog) {
		return <div>بلاگ مورد نظر یافت نشد!</div>;
	}

	return (
		<div
			className="max-w-3xl mx-auto py-8 px-4"
			dir="rtl"
		>
			<h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
			<p className="text-sm text-gray-600 mb-4">
				{new Date(blog.date).toLocaleDateString("fa-IR")}
			</p>
			<div className="relative w-full h-64 mb-4">
				<img
					src={blog.image}
					alt={blog.title}
					className="object-cover rounded w-full h-full"
				/>
			</div>
			<p>متن بلاگ اینجا قرار می‌گیرد...</p>
			<Link
				href="/blogs"
				className="mt-4 inline-block text-blue-600 hover:text-blue-700"
			>
				← برگشت به بلاگ‌ها
			</Link>
		</div>
	);
}

export async function generateStaticParams() {
	return fakeData.blogs.map((blog) => ({
		id: blog.id.toString(),
	}));
}
