import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
	return (
		<div className="w-full relative overflow-hidden" dir="rtl">
			{/* Full-width video background */}
			<div className="absolute inset-0 w-full h-full z-0">
				<video
					className="w-full h-full object-cover"
					autoPlay
					muted
					loop
					playsInline
				>
					<source src="/loading-motion.mp4" type="video/mp4" />
				</video>
				{/* Dark overlay for better text visibility */}
				<div className="absolute inset-0 bg-black/40"></div>
			</div>

			{/* Content container */}
			<div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
				<div className="flex flex-col lg:flex-row gap-8 items-center">
					{/* Hero content */}
					<div className="w-full lg:w-1/2 text-center lg:text-right">
						<Badge className="mb-4 bg-amber-500 text-white hover:bg-amber-600 border-none">
							سرمایه‌گذاری مطمئن
						</Badge>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[vazirmatn] text-white">
							بازار طلا و جواهر
						</h1>
						<p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mr-0 font-[vazirmatn]">
							امن‌ترین راه برای سرمایه‌گذاری در فلزات گرانبها با پشتوانه معتبرترین صرافی‌های کشور
						</p>
						<Button className="bg-amber-500 hover:bg-amber-600 text-white font-[vazirmatn] px-8 py-6 text-lg rounded-full">
							مشاهده محصولات
							<ArrowLeft className="mr-2 h-5 w-5" />
						</Button>
					</div>

					{/* Feature cards */}
					<div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
						<Card className="p-6 backdrop-blur-md bg-white/10 border-white/20 shadow-xl text-white">
							<div className="flex items-start gap-4">
								<div className="p-3 bg-amber-500/20 rounded-lg">
									<ShieldCheck className="w-6 h-6 text-amber-400" />
								</div>
								<div>
									<h3 className="font-semibold mb-2 font-[vazirmatn] text-amber-300">امنیت سرمایه</h3>
									<p className="text-sm text-white/80 font-[vazirmatn]">
										تضمین اصالت و خلوص با گواهی‌نامه معتبر و ضمانت بازخرید
									</p>
								</div>
							</div>
						</Card>

						<Card className="p-6 backdrop-blur-md bg-white/10 border-white/20 shadow-xl text-white">
							<div className="flex items-start gap-4">
								<div className="p-3 bg-amber-500/20 rounded-lg">
									<TrendingUp className="w-6 h-6 text-amber-400" />
								</div>
								<div>
									<h3 className="font-semibold mb-2 font-[vazirmatn] text-amber-300">قیمت به روز</h3>
									<p className="text-sm text-white/80 font-[vazirmatn]">
										قیمت‌گذاری لحظه‌ای بر اساس نرخ روز بازار جهانی و داخلی
									</p>
								</div>
							</div>
						</Card>

						<Card className="md:col-span-2 p-6 backdrop-blur-md bg-white/10 border-white/20 shadow-xl text-white">
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								<div>
									<h3 className="font-semibold mb-2 font-[vazirmatn] text-amber-300">مشاوره تخصصی</h3>
									<p className="text-sm text-white/80 font-[vazirmatn]">
										دریافت مشاوره رایگان از کارشناسان متخصص بازار طلا
									</p>
								</div>
								<Button variant="outline" className="border-amber-400 text-amber-300 hover:bg-amber-500/20 font-[vazirmatn]">
									تماس با ما
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};