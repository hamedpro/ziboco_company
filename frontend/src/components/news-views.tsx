import Image from "next/image"
import { ChevronLeft } from "lucide-react"

const newsItems = [
	{
		id: 1,
		title: "این ۳ کاتالیزور می‌تواند بازار فلزات گرانبها را تقویت کند",
		image: "/3dicons-medal-front-color-500-500.png",
		date: "۷ بهمن ۱۴۰۲",
	},
	{
		id: 2,
		title: "دیوید مورگان: طلا، نقره و بقا در اقتصاد ترامپ",
		image: "/3dicons-medal-front-color-500-500.png",
		date: "۵ بهمن ۱۴۰۲",
	},
	{
		id: 3,
		title: "معرفی همکاران پول صدادار ۲۰۲۵",
		image: "/3dicons-medal-front-color-500-500.png",
		date: "۴ بهمن ۱۴۰۲",
	},
	{
		id: 4,
		title: "آیا سال ۲۰۲۵ می‌تواند سال درخشش نقره باشد؟",
		image: "/3dicons-medal-front-color-500-500.png",
		date: "۴ بهمن ۱۴۰۲",
	},
	{
		id: 5,
		title: "سه نکته‌ای که سرمایه‌گذاران باید خارج از دفتر رئیس جمهور در نظر بگیرند",
		image: "/3dicons-medal-front-color-500-500.png",
		date: "۶ بهمن ۱۴۰۲",
	},
	{
		id: 6,
		title: "نقره به طور غیرعادی در مقابل طلا پایین است | هشدارهای جدید درباره وعده‌های کاغذی",
		image: "/3dicons-medal-front-color-500-500.png",
		date: "۴ بهمن ۱۴۰۲",
	},
];

export default function NewsViews() {
	return (
		<div
			className="max-w-7xl mx-auto py-8 px-4"
			dir="rtl"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">
					اخبار و دیدگاه‌های بیشتر از زیبوکو
				</h2>
				<div className="flex items-center gap-4 text-sm">
					<a
						href="#"
						className="flex items-center text-blue-600 hover:text-blue-700"
					>
						<span>اخبار بیشتر</span>
						<ChevronLeft className="w-4 h-4" />
					</a>
					<span className="text-gray-300">|</span>
					<a
						href="#"
						className="flex items-center text-blue-600 hover:text-blue-700"
					>
						<span>پادکست‌های بیشتر</span>
						<ChevronLeft className="w-4 h-4" />
					</a>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{newsItems.map((item) => (
					<a
						key={item.id}
						href="#"
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
							<p className="text-sm text-gray-600">{item.date}</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}

