import { Wallet } from "lucide-react";

export const WalletWidget = () => {
	return (
		<div className="flex flex-col w-full rounded-xl bg-[#6B3583] overflow-hidden">
			<div
				className="flex text-neutral-50 gap-x-2 items-center text-sm p-4"
				dir="rtl"
			>
				<Wallet size={16} /> <p>اعتبار دیجیتال</p>
			</div>
			<div
				className="flex text-neutral-50 gap-x-2 items-center px-4 pb-4"
				dir="rtl"
			>
				<h1 className="text-2xl">۵۰۰۰۰ تومان</h1>
			</div>
			<div className="border-t-2 border-neutral-50 flex text-neutral-50">
				<button className="flex-1 border-r-2 border-neutral-50 py-2 hover:bg-[#55216c] transition-colors">
					واریز
				</button>
				<button className="flex-1 py-2 hover:bg-[#55216c] transition-colors">
					برداشت
				</button>
			</div>
		</div>
	);
};
