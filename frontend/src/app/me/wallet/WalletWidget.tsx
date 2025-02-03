"use client";

import { useState } from "react";
import { Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getPersianValue } from "@/lib/utils";

type WalletData = {
	silver: {
		balance: number;
		unit: string;
	};
	gold: {
		balance: number;
		unit: string;
	};
	rial: {
		balance: number;
		unit: string;
	};
};

type WalletWidgetProps = {
	data: WalletData;
};

const walletTypes = ["silver", "gold", "rial"] as const;
type WalletType = (typeof walletTypes)[number];

export const WalletWidget = ({ data }: WalletWidgetProps) => {
	const [activeWallet, setActiveWallet] = useState<WalletType>("gold");

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
					{getPersianValue(data[activeWallet].balance.toString())}
					{data[activeWallet].unit}
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
