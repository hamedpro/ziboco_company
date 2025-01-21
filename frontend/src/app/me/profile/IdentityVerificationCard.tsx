import React from "react";
import { localColors } from "./page";
import { MoveLeft } from "lucide-react";

export const IdentityVerificationCard = () => {
	return (
		<div
			style={{ backgroundColor: localColors[1] }}
			className="rounded-xl w-full p-4 flex flex-col gap-y-4 text-neutral-300 "
			dir="rtl"
		>
			<p>برای دسترسی به خدمات توکنیکو احراز هویت خود را تکمیل نمایید. </p>
			<p
				style={{ color: localColors[2] }}
				className="flex gap-x-2 cursor-pointer"
			>
				تکمیل فرآیند احراز هویت <MoveLeft />
			</p>
		</div>
	);
};
