import { Card } from "@/components/ui/card";
import HatchedBackground from "@/components/ui/hatched-background";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldCheck, TrendingUp } from "lucide-react";

export const Hero = () => {
	return (
		<div className="w-full p-6" dir="rtl">
			<div className="flex flex-col lg:flex-row gap-6 items-start">
				{/* Right column with hatched background */}
				<div className="w-full lg:w-2/3 relative aspect-[16/9] lg:aspect-[16/10] rounded-xl overflow-hidden">
					<HatchedBackground 
						color="rgba(184, 134, 11, 0.12)" // Darker gold color
						backgroundColor="#FFFAF0" // Floral white
						size={16}
					/>
					<div className="absolute inset-0 p-8 flex flex-col justify-center">
						<Badge className="w-fit mb-4 bg-amber-100 text-amber-900 hover:bg-amber-200">
							سرمایه‌گذاری مطمئن
						</Badge>
						<h1 className="text-4xl lg:text-5xl font-bold mb-4 font-[vazirmatn] text-[#B8860B]">
							بازار طلا و جواهر
						</h1>
						<p className="text-neutral-700 text-lg max-w-md font-[vazirmatn]">
							امن‌ترین راه برای سرمایه‌گذاری در فلزات گرانبها با پشتوانه معتبرترین صرافی‌های کشور
						</p>
					</div>
				</div>

				{/* Left column with cards */}
				<div className="w-full lg:w-1/3 flex flex-col gap-4">
					<Card className="p-6 hover:shadow-lg transition-shadow border-amber-200/60 bg-gradient-to-b from-amber-50/50 to-transparent">
						<div className="flex items-start gap-4">
							<div className="p-2 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg">
								<ShieldCheck className="w-6 h-6 text-[#B8860B]" />
							</div>
							<div>
								<h3 className="font-semibold mb-2 font-[vazirmatn] text-[#B8860B]">امنیت سرمایه</h3>
								<p className="text-sm text-neutral-600 font-[vazirmatn]">
									تضمین اصالت و خلوص با گواهی‌نامه معتبر و ضمانت بازخرید
								</p>
							</div>
						</div>
					</Card>

					<Card className="p-6 hover:shadow-lg transition-shadow border-amber-200/60 bg-gradient-to-b from-amber-50/50 to-transparent">
						<div className="flex items-start gap-4">
							<div className="p-2 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg">
								<TrendingUp className="w-6 h-6 text-[#B8860B]" />
							</div>
							<div>
								<h3 className="font-semibold mb-2 font-[vazirmatn] text-[#B8860B]">قیمت به روز</h3>
								<p className="text-sm text-neutral-600 font-[vazirmatn]">
									قیمت‌گذاری لحظه‌ای بر اساس نرخ روز بازار جهانی و داخلی
								</p>
							</div>
						</div>
					</Card>

					<Card className="group p-6 hover:shadow-lg transition-shadow cursor-pointer border-amber-200/60 bg-gradient-to-b from-amber-50/50 to-transparent">
						<div className="flex items-center justify-between">
							<span className="font-semibold font-[vazirmatn] text-[#B8860B]">مشاهده محصولات</span>
							<ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-[#B8860B]" />
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};