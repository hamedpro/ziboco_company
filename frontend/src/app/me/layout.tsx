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

const menuItems = [
	{ id: 1, icon: <CalendarRange />, route: "/me/profile" },
	{ id: 2, icon: <CircleUser />, route: "/me/wallet" },
	{ id: 3, icon: <ReceiptText size={30} />, route: "/me/transactions" },
	{ id: 4, icon: <ArrowLeftRight />, route: "/me/exchanges" },
	{ id: 5, icon: <Wallet />, route: "/me/balance" },
];

export default function ({ children }: { children: ReactNode }) {
	const pathname = usePathname(); // Get the current route
	const router = useRouter(); // Navigate between routes
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
		default:
			pageTitle = "مسیر بی نام";
			break;
	}
	return (
		<>
			<div
				style={{
					height: "80vh",
					width: "100%",
					position: "absolute",
					top: "10vh",
					overflowY: "scroll",
					scrollbarWidth: "none",
				}}
			>
				{children}
			</div>
			<div
				style={{
					height: "10vh",
					width: "100%",
					position: "absolute",
					top: "0vh",
				}}
				className="flex justify-between items-center px-6 text-neutral-50"
			>
				<div></div>
				<h1>{pageTitle} </h1>
				<MenuIcon />
			</div>
			<div
				style={{
					height: "10vh",
					width: "100%",
					position: "absolute",
					bottom: "0vh",
				}}
				className="flex border-t-2 border-neutral-900"
			>
				{menuItems.map((item, index) => (
					<div
						key={item.id}
						className={`cursor-pointer relative h-full flex-grow flex-shrink-0 flex items-center justify-center border-neutral-900 
                                ${
									index !== menuItems.length - 1
										? "border-r-2"
										: ""
								} 
                                ${
									pathname === item.route
										? ""
										: "text-neutral-500"
								}
                            `}
						style={
							pathname === item.route
								? { color: authLayoutColors[1] }
								: {}
						}
						onClick={() => router.push(item.route)}
					>
						{index === 2 ? (
							<div className="absolute rounded-full top-0 w-full h-full -translate-y-1/3 bg-gradient-to-b from-[#B8860B] to-[#F0E68C] hover:from-[#A97A0A] hover:to-[#EEE8AA] flex items-center justify-center text-white">
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
}
