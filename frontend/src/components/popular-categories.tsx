import Image from "next/image"
import { fakeData, DEFAULT_IMAGE } from "./fakeData";
import { CategoriesGrid } from "./CategoriesGrid";

export default function PopularCategories() {
	return (
		<div className="max-w-7xl mx-auto py-8 px-4">
			<h2 className="text-2xl font-bold text-center mb-8">
				دسته‌بندی‌های محبوب
			</h2>
			<CategoriesGrid categories={fakeData.categories} />
		</div>
	);
}

