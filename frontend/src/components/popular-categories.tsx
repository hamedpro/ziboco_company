import Image from "next/image"
import { fakeData } from "./fakeData";

export default function PopularCategories() {
  return (
		<div className="max-w-7xl mx-auto py-8 px-4">
			<h2 className="text-2xl font-bold text-center mb-8">
				دسته‌بندی‌های محبوب
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
				{fakeData.categories.map((category) => (
					<a
						key={`${category.name}-${category.type}`}
						href={category.href}
						className="flex flex-col items-center group"
					>
						<div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative mb-4 bg-white rounded-full p-2 shadow-sm">
							<Image
								src={
									category.image ||
									"/3dicons-medal-front-color-500-500.png"
								}
								alt={`${category.name} ${category.type}`}
								fill
								className="object-contain p-2 group-hover:scale-105 transition-transform"
							/>
						</div>
						<div className="text-center">
							<span className="font-medium text-sm sm:text-base">
								{category.name}{" "}
							</span>
							<span
								className={`${
									category.type === "مس"
										? "text-orange-600"
										: "text-blue-600"
								} font-semibold text-sm sm:text-base`}
							>
								{category.typeColor}
							</span>
						</div>
					</a>
				))}
			</div>
		</div>
  );
}

