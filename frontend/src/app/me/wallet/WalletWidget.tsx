"use client";

import { useState, useEffect } from "react";
import { Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getPersianValue } from "@/lib/utils";
import axios from "axios";
import { API_BASE_URL } from "../../../../configs";

export type WalletItem = {
	id: string;
	categoryId: string;
	customerId: string;
	category: string;
	walletItemType: 0 | 1 | 2;
	rialBalance: number;
	balance: number;
};

// New type for the transformed wallet data
export type WalletData = {
	rial: { balance: number; unit: string };
	gold: { balance: number; unit: string };
	silver: { balance: number; unit: string };
};

export const WalletWidget = () => {
	// State now holds the transformed wallet data
	const [walletData, setWalletData] = useState<WalletData | null>(null);

	// Define wallet types based on the mapping: index0 "rial", 1 "gold", 2 "silver"
	const walletTypes = ["rial", "gold", "silver"] as const;
	type WalletType = (typeof walletTypes)[number];
	const [activeWallet, setActiveWallet] = useState<WalletType>("gold");

	useEffect(() => {
		axios({
			url: "/api/wallet",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
			baseURL: API_BASE_URL,
			withCredentials: true,
		})
			.then((res) => res.data)
			.then((payload: { data: WalletItem[] }) => {
				const walletItems = payload.data;
				const transformedData: WalletData = {
					rial: { balance: 0, unit: "ریال" },
					gold: { balance: 0, unit: "طلا" },
					silver: { balance: 0, unit: "نقره" },
				};

				walletItems.forEach((item) => {
					if (item.walletItemType === 0) {
						transformedData.rial = {
							balance: item.rialBalance,
							unit: "ریال",
						};
					} else if (item.walletItemType === 1) {
						transformedData.gold = {
							balance: item.balance,
							unit: "گرم",
						};
					} else if (item.walletItemType === 2) {
						transformedData.silver = {
							balance: item.balance,
							unit: "گرم",
						};
					}
				});

				setWalletData(transformedData);
			})
			.catch((err) => console.error(err));
	}, []);

	const nextWallet = () => {
		const currentIndex = walletTypes.indexOf(activeWallet);
		setActiveWallet(walletTypes[(currentIndex + 1) % walletTypes.length]);
	};

	const prevWallet = () => {
		const currentIndex = walletTypes.indexOf(activeWallet);
		setActiveWallet(
			walletTypes[
				(currentIndex - 1 + walletTypes.length) % walletTypes.length
			]
		);
	};

	const getWalletColor = (type: WalletType) => {
		switch (type) {
			case "silver":
				return "bg-gray-800 hover:bg-gray-700";
			case "gold":
				return "bg-yellow-800 hover:bg-yellow-700";
			case "rial":
				return "bg-blue-800 hover:bg-blue-700";
		}
	};

	const getWalletTitle = (type: WalletType) => {
		switch (type) {
			case "silver":
				return "کیف پول نقره";
			case "gold":
				return "کیف پول طلا";
			case "rial":
				return "کیف پول ریالی";
		}
	};

	return (
		<div
			className={cn(
				"flex flex-col w-full rounded-xl overflow-hidden transition-colors",
				getWalletColor(activeWallet)
			)}
		>
			<div
				className="flex justify-between items-center text-neutral-50 p-4"
				dir="rtl"
			>
				<div className="flex items-center gap-x-2 text-sm">
					<Wallet size={16} />
					<p>{getWalletTitle(activeWallet)}</p>
				</div>
				<div className="flex gap-x-2">
					<button
						onClick={prevWallet}
						className="p-1 rounded-full hover:bg-white/20 transition-colors"
						aria-label="کیف پول قبلی"
					>
						<ChevronRight size={20} />
					</button>
					<button
						onClick={nextWallet}
						className="p-1 rounded-full hover:bg-white/20 transition-colors"
						aria-label="کیف پول بعدی"
					>
						<ChevronLeft size={20} />
					</button>
				</div>
			</div>
			<div
				className="flex text-neutral-50 gap-x-2 items-center px-4 pb-4"
				dir="rtl"
			>
				<h1 className="text-2xl font-bold">
					{walletData ? (
						<>
							{getPersianValue(
								walletData[activeWallet].balance.toString()
							)}{" "}
							{walletData[activeWallet].unit}
						</>
					) : (
						"در حال بارگذاری..."
					)}
				</h1>
			</div>
			<div className="border-t border-neutral-50/20 flex text-neutral-50">
				<button className="flex-1 border-r border-neutral-50/20 py-3 hover:bg-white/10 transition-colors cursor-pointer">
					{activeWallet === "rial" ? "واریز" : "خرید"}
				</button>
				<button className="flex-1 py-3 hover:bg-white/10 transition-colors cursor-pointer">
					{activeWallet === "rial" ? "برداشت" : "فروش"}
				</button>
			</div>
		</div>
	);
};
