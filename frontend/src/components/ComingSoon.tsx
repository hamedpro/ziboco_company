"use client";
import React from "react";
import { Clock } from "lucide-react";

export default function ComingSoon() {
	return (
		<div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-lg border border-solid border-orange-200">
			<Clock className="h-12 w-12 text-orange-500 animate-spin" />
			<h2 className="mt-4 text-3xl font-extrabold text-orange-600">
				به زودی
			</h2>
			<p className="mt-2 text-gray-700 text-center text-base max-w-sm">
				در حال آماده‌سازی بهترین پیشنهادها برای شما هستیم. لطفاً کمی صبر
				کنید.
			</p>
		</div>
	);
}
