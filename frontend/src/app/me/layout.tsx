"use client";

import {
	ArrowLeftRight,
	CalendarRange,
	CircleUser,
	MenuIcon,
	ReceiptText,
	Wallet,
} from "lucide-react";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authLayoutColors } from "@/lib/utils";
import PhoneWrapper from "@/components/layouts/PhoneWrapper";

const menuItems = [
	{ id: 1, icon: <CalendarRange />, route: "/me/events" },
	{ id: 2, icon: <CircleUser />, route: "/me/profile" },
	{ id: 3, icon: <ReceiptText size={30} />, route: "/me/trade" },
	{ id: 4, icon: <ArrowLeftRight />, route: "/me/transactions" },
	{ id: 5, icon: <Wallet />, route: "/me/wallet" },
];

export default function MeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	
	let pageTitle: string;
	switch (pathname) {
		case "/me/profile":
			pageTitle = "پروفایل من";
			break;
		case "/me/transactions":
			pageTitle = "تاریخچه تراکنش ها";
			break;
		case "/me/wallet":
			pageTitle = "کیف پول من";
			break;
		case "/me/events":
			pageTitle = "رویداد های معاملاتی";
			break;
		case "/me/trade":
			pageTitle = "معامله جدید";
			break;
		default:
			pageTitle = "مسیر بی نام";
			break;
	}

	const innerLayout = (
		<>
			<div
				style={{
					height: "80dvh",
					width: "100%",
					position: "absolute",
					top: "10dvh",
					overflowY: "scroll",
					scrollbarWidth: "none",
				}}
			>
				{children}
			</div>
			<div
				style={{
					height: "10dvh",
					width: "100%",
					position: "absolute",
					top: "0dvh",
				}}
				className="flex justify-between items-center px-6 text-neutral-50"
			>
				<div></div>
				<h1>{pageTitle}</h1>
				<MenuIcon />
			</div>
			<div
				style={{
					height: "10dvh",
					width: "100%",
					position: "absolute",
					bottom: "0dvh",
				}}
				className="flex border-t-2 border-neutral-900"
			>
				{menuItems.map((item, index) => (
					<div
						key={item.id}
						className={`w-1/5 cursor-pointer relative h-full flex items-center justify-center border-neutral-900 
								   ${index !== menuItems.length - 1 ? "border-r-2" : ""} 
								   ${pathname === item.route ? "" : "text-neutral-500 hover:text-neutral-400 transition-colors"}
								`}
						style={pathname === item.route ? { color: authLayoutColors[1] } : {}}
						onClick={() => router.push(item.route)}
					>
						{index === 2 ? (
							<div className="absolute rounded-full top-0 w-full aspect-square -translate-y-1/3 bg-gradient-to-b from-[#B8860B] to-[#F0E68C] hover:from-[#A97A0A] hover:to-[#EEE8AA] flex items-center justify-center text-white">
								{item.icon}
							</div>
						) : (
							item.icon
						)}
					</div>
				))}
			</div>
		</>
	);

	return <PhoneWrapper>{innerLayout}</PhoneWrapper>;
}
