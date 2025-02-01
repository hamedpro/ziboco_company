import { cn } from "@/lib/utils";
import { BadgeInfoIcon, MessageCircleMore } from "lucide-react";
import React from "react";

const PersianNavbar = () => {
	let customButtonStyle =
		"py-1 px-2 hover:bg-slate-700 transition duration-500 flex items-center gap-x-2 cursor-pointer";
	return (
		<>
			<div
				dir="rtl"
				className="bg-slate-900 text-slate-100 flex justify-center md:justify-between px-6"
			>
				<div className="flex items-center">
					<div className={cn(customButtonStyle, "hidden lg:flex")}>
						<MessageCircleMore size={18} />
						<p>تماس با ما</p>
					</div>
					<div className={cn(customButtonStyle, "hidden lg:flex")}>
						|
					</div>
					<div className={customButtonStyle}>
						ارسال رایگان برای بالای ۵۰۰ هزار تومن
					</div>
				</div>

				<div className={cn(customButtonStyle, "hidden md:flex")}>
					<BadgeInfoIcon size={18} />
					<p>بیشتر بدانید</p>
				</div>
			</div>

			<div
				dir="rtl"
				className="border-b border-slate-200 bg-gray-50 px-4 py-4 lg:px-0 lg:py-2 print:hidden"
			>
				<div className="mx-auto flex max-w-screen-xl flex-col justify-center gap-y-4 md:flex-row md:justify-start md:gap-x-8 md:gap-y-0 lg:justify-center lg:gap-x-40">
					<div className="group flex justify-center gap-x-2">
						<div>
							<div className="font-bold text-red-600 transition duration-300">
								<a
									className="underline underline-offset-4"
									href="https://www.moneymetals.com/buy/specials"
								>
									پیشنهادهای شگفت‌انگیز برای سکه‌ها و شمش‌های
									نقره و طلا
								</a>
							</div>
						</div>
						<div className="flex-shrink-0 hidden md:block">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-6 w-6 text-red-600 transition duration-300 rotate-180"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PersianNavbar;
