"use client";

import { Button } from "@/components/ui/button";
import TransactionItem from "./TransactionItem";
import { localColors } from "./variables";


let transactionsData = [
	{
		operationType: "cashWithdraw",
		date: new Date(new Date().getTime() - 10 * 24 * 3600 * 1000),
		fields: {
			"پرداخت کننده": "رضا موسوی",
			"دریافت کننده": "پروانه فرهاد بیگی",
			"نحوه انتقال": "پایا",
			"قابلیت بازگشت": "ندارد",
		},
	},
	{
		operationType: "cashWithdraw",
		date: new Date(new Date().getTime() - 9 * 24 * 3600 * 1000),
		fields: {
			"پرداخت کننده": "رضا موسوی",
			"دریافت کننده": "پروانه فرهاد بیگی",
			"نحوه انتقال": "پایا",
			"قابلیت بازگشت": "ندارد",
		},
	},
	{
		operationType: "sell",
		date: new Date(new Date().getTime() - 8 * 24 * 3600 * 1000),
		fields: {
			"پرداخت کننده": "رضا موسوی",
			"دریافت کننده": "پروانه فرهاد بیگی",
			"نحوه انتقال": "پایا",
			"قابلیت بازگشت": "ندارد",
		},
	},

	{
		operationType: "buy",
		date: new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
		fields: {
			"پرداخت کننده": "رضا موسوی",
			"دریافت کننده": "پروانه فرهاد بیگی",
			"نحوه انتقال": "پایا",
			"قابلیت بازگشت": "ندارد",
		},
	},
	{
		operationType: "rebuy",
		date: new Date(new Date().getTime() - 6 * 24 * 3600 * 1000),
		fields: {
			"پرداخت کننده": "رضا موسوی",
			"دریافت کننده": "پروانه فرهاد بیگی",
			"نحوه انتقال": "پایا",
			"قابلیت بازگشت": "ندارد",
		},
	},
];

export default function Transactions() {
	return (
		<>
			<div
				className="overflow-x-auto flex flex-row-reverse px-6"
				style={{
					scrollbarWidth: "none",
				}}
			>
				{[
					"تاریخچه",
					"برداشت ها",
					"خرید ها",
					"فروش ها",
					"سفارش مجدد",
				].map((item) => (
					<Button
						key={item}
						className="ml-2 text-neutral-50 rounded-xl"
						style={{
							backgroundColor: localColors[0],
							border: `2px solid ${localColors[1]}`,
						}}
					>
						{item}
					</Button>
				))}
			</div>
			<div className="flex flex-col w-full py-6">
				{transactionsData.map((trans, transIndex) => (
					<TransactionItem
						key={transIndex}
						trans={trans}
						defaultOpen={transIndex === 1}
					/>
				))}
			</div>
		</>
	);
}
