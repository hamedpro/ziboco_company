import { cn } from "@/lib/utils";
import { ArrowLeftIcon, BadgeInfoIcon, MessageCircleMore } from "lucide-react";
import React from "react";
import { fakeData } from "@/components/fakeData";

const PersianNavbar = () => {
	let customButtonStyle =
		"py-1 px-2 hover:bg-slate-700 transition duration-500 flex items-center gap-x-2 cursor-pointer";

	const { topHeaderBannerOne, topHeaderBannerTwo } = fakeData.theme;

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
						{topHeaderBannerOne}
					</div>
				</div>

				<div className={cn(customButtonStyle, "hidden md:flex")}>
					<BadgeInfoIcon size={18} />
					<p>بیشتر بدانید</p>
				</div>
			</div>

			<div
				dir="rtl"
				className="px-4 py-4 border-b border-slate-200 bg-gray-50 print:hidden text-red-600 flex items-center justify-center"
			>
				<div className="group flex justify-center gap-x-2 cursor-pointer">
					<div className="font-bold transition duration-300">
						<div
							className="underline"
							style={{ textUnderlineOffset: "6px" }}
						>
							{topHeaderBannerTwo}
						</div>
					</div>
					<div className="flex-shrink-0 hidden md:block">
						<ArrowLeftIcon size={18} />
					</div>
				</div>
			</div>
		</>
	);
};

export default PersianNavbar;
