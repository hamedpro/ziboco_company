import { fakeData } from "@/components/fakeData";
import { NewsGrid } from "@/components/NewsGrid";

export default function BlogsPage() {
	return (
		<div
			className="max-w-7xl mx-auto py-8 px-4"
			dir="rtl"
		>
			<h1 className="text-3xl font-bold mb-6">بلاگ‌ها</h1>

			<NewsGrid items={fakeData.blogs} />
		</div>
	);
}
