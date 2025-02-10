"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CategoriesGrid } from "./CategoriesGrid";
import { fetchCategories, CategoryResponse } from "@/API";

export default function PopularCategories() {
	const [categories, setCategories] = useState<CategoryResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadCategories = async () => {
		try {
			const data = await fetchCategories();
			setCategories(data);
			setError(null);
		} catch (err) {
			setError("خطا در دریافت دسته‌بندی‌ها");
			console.error("Error fetching categories:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
	}, []);

	if (error) {
		return (
			<div className="max-w-7xl mx-auto py-8 px-4">
				<div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-8 text-center">
					<div className="mb-4 text-blue-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-16 w-16 mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						خطا در دریافت اطلاعات
					</h3>
					<p className="text-gray-600 mb-4 max-w-md mx-auto">
						متاسفانه در دریافت لیست دسته‌بندی‌ها مشکلی پیش آمده است.
					</p>
					<button
						onClick={() => {
							setError(null);
							setLoading(true);
							loadCategories();
						}}
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
					>
						تلاش مجدد
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto py-8 px-4">
			<h2 className="text-2xl font-bold text-center mb-8">
				دسته‌بندی‌های محبوب
			</h2>
			
			{loading ? (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
					{Array(4).fill(0).map((_, i) => (
						<div key={i} className="bg-gray-100 rounded-lg p-4 h-40 flex flex-col items-center justify-center">
							<div className="bg-gray-300 w-20 h-20 rounded-full mb-3"></div>
							<div className="bg-gray-300 h-4 w-24 rounded"></div>
						</div>
					))}
				</div>
			) : (
				<CategoriesGrid categories={categories.map(c => ({
					id: c.id,
					name: c.name,
					image: c.image
				}))} />
			)}
		</div>
	);
}

