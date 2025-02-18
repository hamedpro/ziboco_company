import { fakeData } from "@/components/fakeData";
import { NewsGrid } from "@/components/NewsGrid";
import Link from "next/link";

export default function AnnouncementsPage() {
	return (
		<div
			className="max-w-7xl mx-auto py-8 px-4"
			dir="rtl"
		>
			<h1 className="text-3xl font-bold mb-6">اطلاعیه‌ها</h1>
			<NewsGrid items={fakeData.announcements} />
		</div>
	);
}
