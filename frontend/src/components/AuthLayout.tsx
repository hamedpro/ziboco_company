"use client";

import { authLayoutColors } from "@/lib/utils";
import { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen w-screen flex justify-center items-center bg-neutral-100 overflow-y-auto">
			<div
				className="w-full h-screen shadow-sm justify-around flex flex-col"
				style={{
					maxWidth: "430px",
					backgroundColor: authLayoutColors[0],
				}}
			>
				<div className="flex justify-end">
					<div
						className="flex flex-col items-center p-8"
						style={{ color: authLayoutColors[1] }}
						dir="rtl"
					>
						<h1
							className="text-2xl"
							style={{ letterSpacing: "8px" }}
						>
							ZIBOCO
						</h1>
						<p
							className="text-sm"
							style={{}}
						>
							طلا / نقره / کالای لوکس
						</p>
					</div>
				</div>

				{children}

				<div
					className="flex flex-col gap-y-4 p-8"
					dir="rtl"
				>
					<div className="flex items-center justify-center flex-col">
						<h1
							className=""
							style={{ color: authLayoutColors[1] }}
						>
							وبسایت شرکت زیبوکو
						</h1>
					</div>
					<div
						className="flex items-center justify-center flex-col"
						dir="rtl"
					>
						<h1
							style={{ color: authLayoutColors[3] }}
							className=""
						>
							استفاده از محتوای این سامانه تنها برای «اهداف
						</h1>
						<h1
							style={{ color: authLayoutColors[4] }}
							className=""
						>
							غیرتجاری» با ذکر «منبع» مجاز است.
						</h1>
					</div>
					<div className="flex justify-center">
						<img
							src="/enamad.png"
							className="h-20"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
