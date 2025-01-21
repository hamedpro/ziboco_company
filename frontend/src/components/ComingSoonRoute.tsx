"use client";

import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Diamond } from "lucide-react";

export default function ComingSoonRoute() {
	const pathname = usePathname();

	return (
		<Card
			className="w-full max-w-sm mx-auto overflow-hidden shadow-lg"
			dir="rtl"
		>
			<CardContent className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
				<div className="flex flex-col items-center text-center space-y-4">
					<Diamond className="w-12 h-12 text-yellow-400" />
					<h2 className="text-2xl font-bold">در حال توسعه</h2>
					<p className="text-sm opacity-80">
						این بخش از سایت در حال تکمیل است. از طریق راه های
						ارتباطی ما در جریان اخبار آتی باشید.
					</p>
					{/* <Button
						variant="outline"
						className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900"
					>
						اطلاع‌رسانی
					</Button> */}
					<p
						className="text-xs opacity-60 pt-4 border-t border-gray-700 w-full"
						dir="ltr"
					>
						{pathname}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
