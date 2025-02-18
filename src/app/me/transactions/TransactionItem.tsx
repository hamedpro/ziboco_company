"use client";

import { ChevronLeft } from "lucide-react";
import { getPersianValue } from "@/lib/utils";
import { useState } from "react";
import { localColors } from "./variables";

type Transaction = {
	id: string;
	transactionType: string;
	walletType: string;
	description: string;
	date: string;
	val: number;
};

export default function TransactionItem({
	trans,
	defaultOpen = false,
}: {
	trans: Transaction;
	defaultOpen?: boolean;
}) {
	let [open, setOpen] = useState(defaultOpen);

	// Convert date string like "1403/11/20" to Persian format
	const getPersianDate = (dateStr: string) => {
		const [year, month, day] = dateStr.split("/");
		const months = {
			"01": "فروردین",
			"02": "اردیبهشت",
			"03": "خرداد",
			"04": "تیر",
			"05": "مرداد",
			"06": "شهریور",
			"07": "مهر",
			"08": "آبان",
			"09": "آذر",
			"10": "دی",
			"11": "بهمن",
			"12": "اسفند",
		};
		return `${getPersianValue(day)} ${
			months[month as keyof typeof months]
		} ${getPersianValue(year)}`;
	};

	return (
		<div
			className="flex flex-col w-full items-center p-6 gap-x-6 gap-y-5"
			style={{
				borderBottom: `2px solid ${localColors[2]}`,
				backgroundColor: localColors[3],
			}}
		>
			<div
				className="flex w-full gap-x-6 items-center cursor-pointer"
				onClick={() => setOpen((prev) => !prev)}
			>
				<ChevronLeft
					size={25}
					className={`${
						open ? "-rotate-90" : ""
					} text-neutral-500 flex-none hover:text-neutral-400 transition`}
				/>

				<div className="flex flex-row-reverse justify-between text-neutral-50 items-center w-full">
					<div className="flex items-center gap-2">
						<span>{trans.transactionType}</span>
						<span className="text-sm text-neutral-400">
							{trans.walletType}
						</span>
					</div>
					<span>{getPersianDate(trans.date)}</span>
				</div>
			</div>

			{open ? (
				<div
					className="flex text-neutral-50 flex-col w-full gap-2"
					dir="rtl"
				>
					<p>
						<span className="text-neutral-400">توضیحات: </span>
						<span className="text-neutral-50">
							{trans.description}
						</span>
					</p>
					<p>
						<span className="text-neutral-400">مقدار: </span>
						{getPersianValue(trans.val.toString())}{" "}
						{trans.walletType === "Gold" ? "گرم" : "ریال"}
					</p>
				</div>
			) : (
				<div
					className="flex text-neutral-50 w-full"
					dir="rtl"
				>
					<p>
						<span className="text-neutral-400">توضیحات: </span>
						<span>{trans.description}</span>
					</p>
				</div>
			)}
		</div>
	);
}
