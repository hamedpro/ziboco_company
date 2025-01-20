"use client";

import { ChevronLeft } from "lucide-react";
import { ReactNode, useState } from "react";

export function ProfileAccordin({
	title,
	children,
	isTheFirst,
}: {
	title: string;
	children?: ReactNode;
	isTheFirst: boolean;
}) {
	console.log({ children });
	let [open, setOpen] = useState(false);
	return (
		<div
			className={`flex flex-col w-full items-center gap-x-6 gap-y-3 py-2 px-6 ${
				isTheFirst ? "border-t-2 border-neutral-400" : ""
			} border-b-2 border-neutral-400`}
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
					<p>{title}</p>
				</div>
			</div>

			{open && children && (
				<div
					className="flex text-neutral-50 flex-col w-full"
					dir="rtl"
				>
					{children}
				</div>
			)}
		</div>
	);
}
