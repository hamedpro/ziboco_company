import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Clock, Shield, TrendingUp } from "lucide-react";

export default function NewsletterIRA() {
	return (
		<div
			className="bg-[#2851A3] text-white"
			dir="rtl"
		>
			<div className="max-w-7xl mx-auto py-12 px-4">
				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* Newsletter Section */}
					<div className="space-y-6">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold">
								دریافت به‌روزرسانی‌های{" "}
								<span className="italic">رایگان</span>!
							</h2>
							<p className="text-gray-200">
								آخرین اخبار و تخفیف‌های فلزات گرانبها را دریافت
								کنید. به بیش از ۱ میلیون سرمایه‌گذار آگاه
								بپیوندید.
							</p>
						</div>

						<form className="space-y-4">
							<div className="flex gap-2">
								<Input
									type="email"
									placeholder="ایمیل خود را وارد کنید"
									className="bg-white text-black"
								/>
								<Button
									type="submit"
									className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap px-8"
								>
									ثبت‌نام کنید!
								</Button>
							</div>
							<p className="text-sm text-gray-300">
								ما به حفاظت از اطلاعات شما اهمیت می‌دهیم.
								<a
									href="#"
									className="underline hover:text-white"
								>
									سیاست حریم خصوصی
								</a>{" "}
								ما را مطالعه کنید.
							</p>
						</form>
					</div>

					{/* IRA Section */}
					<div className="bg-[#1a2847] p-8 rounded-lg relative overflow-hidden flex gap-5">
						<div className="">
							<h2 className="text-3xl font-serif mb-2">
								بازنشستگی خود را
								<br />
								<span className="italic">تأمین</span> کنید
							</h2>
							<p className="text-xl mb-6">IRA فلزات گرانبها</p>
							<Button
								variant="secondary"
								className="bg-white text-black hover:bg-gray-100"
							>
								بیشتر بدانید →
							</Button>
						</div>
						{/* <img
							src="/3dicons-medal-front-color-500-500.png"
							alt="Golden eggs in nest"
							className="object-contain"
						/> */}
						{/* <div className="bg-slate-300 rounded aspect-square flex-1"></div> */}
					</div>
				</div>
				<div className="mb-16 text-center">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
						<div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
								<Shield className="w-6 h-6 text-blue-800" />
							</div>
							<h3 className="text-lg font-semibold mb-2">
								تضمین اصالت
							</h3>
							<p className="text-gray-600 text-sm text-center">
								تمامی محصولات دارای گواهی اصالت و ضمانت بازخرید
								هستند
							</p>
						</div>

						<div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
								<TrendingUp className="w-6 h-6 text-blue-800" />
							</div>
							<h3 className="text-lg font-semibold mb-2">
								قیمت‌گذاری شفاف
							</h3>
							<p className="text-gray-600 text-sm text-center">
								قیمت‌های لحظه‌ای و رقابتی با کمترین حاشیه سود
							</p>
						</div>

						<div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
								<Clock className="w-6 h-6 text-blue-800" />
							</div>
							<h3 className="text-lg font-semibold mb-2">
								تحویل سریع
							</h3>
							<p className="text-gray-600 text-sm text-center">
								ارسال ایمن و سریع به سراسر کشور با بیمه کامل
								محموله
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
