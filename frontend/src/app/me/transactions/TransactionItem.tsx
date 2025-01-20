"use client";

import { ChevronLeft } from "lucide-react";
import { localColors } from "./page";
import { getPersianDate, translateValue } from "@/lib/utils";
import { useState } from "react";

export default function TransactionItem({
	trans,
	defaultOpen = false,
}: {
	trans: any;
	defaultOpen?: boolean;
}) {
	let [open, setOpen] = useState(defaultOpen);
	return (
		<div
			className="flex flex-col w-full items-center p-6 gap-x-6 gap-y-3"
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

				<div
					className="flex flex-row-reverse justify-between text-neutral-50 items-center"
					style={{ flex: "auto 1 1" }}
				>
					<p>
						{translateValue(
							{
								cashWithdraw: "برداشت نقدی",
								sell: "فروش",
								buy: "خرید",
								rebuy: "خرید دوباره",
							},
							trans.operationType
						)}
					</p>
					<p>{getPersianDate(trans.date)}</p>
				</div>
			</div>

			{open ? (
				<div
					className="flex text-neutral-50 flex-col w-full"
					dir="rtl"
				>
					{Object.entries(trans.fields).map(([key, value]) => (
						<p key={key}>
							{key} : {String(value)}
						</p>
					))}
				</div>
			) : (
				<div
					className="flex flex-row-reverse justify-between text-neutral-50"
					dir="rtl"
				>
					<p className="">
						توضیحات مختصری در مورد این تراکنش نمایش داده خواهد شد
					</p>
				</div>
			)}
		</div>
	);
}
