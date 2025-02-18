"use client";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, BadgeInfoIcon, MessageCircleMore } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Banner, TopBannersResponse, fetchTopBanners } from "@/API";
import { Skeleton } from "@/components/ui/skeleton";

const TopHeader = () => {
	const [banners, setBanners] = useState<TopBannersResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadBanners = async () => {
			try {
				const data = await fetchTopBanners();
				setBanners(data);
			} catch (error) {
				console.error("Failed to load banners:", error);
			} finally {
				setLoading(false);
			}
		};

		loadBanners();
	}, []);

	let customButtonStyle =
		"py-1 px-2 hover:bg-slate-700 transition duration-500 flex items-center gap-x-2 cursor-pointer";

	if (loading) {
		return (
			<>
				<div dir="rtl" className="bg-slate-900 text-slate-100 flex justify-center md:justify-between px-6 py-2">
					<Skeleton className="h-6 w-[200px]" />
					<Skeleton className="h-6 w-[120px] hidden md:block" />
				</div>
				<div dir="rtl" className="px-4 py-4 border-b border-slate-200 bg-gray-50">
					<Skeleton className="h-6 w-[300px] mx-auto" />
				</div>
			</>
		);
	}

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
					<div className={cn(customButtonStyle, "hidden lg:flex")}>|</div>
					<div
						className={customButtonStyle}
						onClick={() => {
							window.open(banners?.topBanner1.pathname, "_blank");
						}}
					>
						{banners?.topBanner1.text}
					</div>
				</div>

				<div
					className={cn(customButtonStyle, "hidden md:flex")}
					onClick={() => {
						window.open(banners?.topBanner1.pathname, "_blank");
					}}
				>
					<BadgeInfoIcon size={18} />
					<p>بیشتر بدانید</p>
				</div>
			</div>

			<div
				dir="rtl"
				className="px-4 py-4 border-b border-slate-200 bg-gray-50 print:hidden text-red-600 flex items-center justify-center"
			>
				<div
					className="group flex justify-center gap-x-2 cursor-pointer"
					onClick={() => {
						window.open(banners?.topBanner2.pathname, "_blank");
					}}
				>
					<div className="font-bold transition duration-300">
						<div className="underline" style={{ textUnderlineOffset: "6px" }}>
							{banners?.topBanner2.text}
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

export default TopHeader;
