import { fakeData } from "@/components/fakeData";
import Link from "next/link";


export default function AnnouncementDetail({ params }: any) {
	const announcement = fakeData.announcements.find((a) => a.id === params.id);

	if (!announcement) {
		return <div>اطلاعیه مورد نظر یافت نشد!</div>;
	}

	return (
		<div
			className="max-w-3xl mx-auto py-8 px-4"
			dir="rtl"
		>
			<h1 className="text-3xl font-bold mb-4">{announcement.title}</h1>
			<p className="text-sm text-gray-600 mb-4">
				{new Date(announcement.date).toLocaleDateString("fa-IR")}
			</p>
			<div className="relative w-full h-64 mb-4">
				<img
					src={announcement.image}
					alt={announcement.title}
					className="object-cover rounded w-full h-full"
				/>
			</div>
			<p>متن اطلاعیه اینجا قرار می‌گیرد...</p>
			<Link
				href="/announcements"
				className="mt-4 inline-block text-blue-600 hover:text-blue-700"
			>
				← برگشت به اطلاعیه‌ها
			</Link>
		</div>
	);
}

export async function generateStaticParams() {
	return fakeData.announcements.map((announcement) => ({
		id: announcement.id.toString(),
	}));
}
