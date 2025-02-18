"use client";

import { Wallet, ChevronLeft, ChevronRight, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { cn, getPersianValue } from "@/lib/utils";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type WalletData = {
	rial: { balance: number; unit: string };
	gold: { balance: number; unit: string };
	silver: { balance: number; unit: string };
};

interface WalletWidgetProps {
	data: WalletData;
}

export const WalletWidget = ({ data }: WalletWidgetProps) => {
	const walletTypes = ["rial", "gold", "silver"] as const;
	type WalletType = (typeof walletTypes)[number];
	const [activeWallet, setActiveWallet] = useState<WalletType>("gold");

	const nextWallet = () => {
		const currentIndex = walletTypes.indexOf(activeWallet);
		setActiveWallet(walletTypes[(currentIndex + 1) % walletTypes.length]);
	};

	const prevWallet = () => {
		const currentIndex = walletTypes.indexOf(activeWallet);
		setActiveWallet(
			walletTypes[(currentIndex - 1 + walletTypes.length) % walletTypes.length]
		);
	};

	const getWalletColor = (type: WalletType) => {
		switch (type) {
			case "silver":
				return "from-gray-800 to-gray-700";
			case "gold":
				return "from-yellow-700 to-yellow-600";
			case "rial":
				return "from-blue-700 to-blue-600";
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

	const getWalletIcon = (type: WalletType) => {
		switch (type) {
			case "silver":
				return "🪙";
			case "gold":
				return "💰";
			case "rial":
				return "💵";
		}
	};

	return (
		<div className="w-full aspect-[1.6/1]">
			<Card className="w-full h-full overflow-hidden bg-gradient-to-br transition-all duration-300">
				<div className="relative h-full flex flex-col">
					{/* Background Pattern */}
					<div 
						className={cn(
							"absolute inset-0 bg-gradient-to-br opacity-90",
							getWalletColor(activeWallet)
						)}
					/>
					
					{/* Content */}
					<div className="relative z-10 flex flex-col h-full">
						{/* Header */}
						<div className="flex items-center justify-between p-6 text-white">
							<div className="flex gap-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={nextWallet}
									className="text-white hover:bg-white/20"
								>
									<ChevronLeft className="h-5 w-5" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={prevWallet}
									className="text-white hover:bg-white/20"
								>
									<ChevronRight className="h-5 w-5" />
								</Button>
							</div>
							<div className="flex items-center gap-3">
								<div className="text-end">
									<h2 className="text-lg font-bold">{getWalletTitle(activeWallet)}</h2>
									<p className="text-sm opacity-80">موجودی فعلی</p>
								</div>
								<span className="text-2xl">{getWalletIcon(activeWallet)}</span>
							</div>
						</div>

						{/* Balance */}
						<div className="px-6 text-white text-end flex-1">
							<h1 className="text-4xl font-bold">
								{getPersianValue(data[activeWallet].balance.toString())}
								<span className="text-xl font-normal mr-2">
									{data[activeWallet].unit}
								</span>
							</h1>
						</div>

						{/* Actions */}
						<div className="grid grid-cols-2 gap-px bg-white/20 text-white mt-auto">
							<Button
								variant="ghost"
								className="py-4 rounded-none hover:bg-white/10 transition-colors flex-row-reverse"
							>
								<ArrowUpCircle className="h-5 w-5 mr-2" />
								{activeWallet === "rial" ? "واریز" : "خرید"}
							</Button>
							<Button
								variant="ghost"
								className="py-4 rounded-none hover:bg-white/10 transition-colors flex-row-reverse"
							>
								<ArrowDownCircle className="h-5 w-5 mr-2" />
								{activeWallet === "rial" ? "برداشت" : "فروش"}
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};
