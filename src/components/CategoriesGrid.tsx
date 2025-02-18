import React from "react";
import { DEFAULT_IMAGE } from "./fakeData";
import Image from "next/image";

interface CategoryItem {
	id: string;
	name: string;
	image: string;
	href?: string;
}

interface CategoriesGridProps {
	categories: CategoryItem[];
}

export const CategoriesGrid = ({ categories }: CategoriesGridProps) => {
	return (
		<div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
			{categories.map((category) => (
				<div 
					key={category.id}
					className="min-w-[150px] md:min-w-[180px] lg:min-w-[200px] flex-shrink-0"
				>
					<a
						href={category.href}
						className="flex flex-col items-center group"
					>
						<div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative mb-4 bg-white rounded-full p-2 shadow-sm">
							<Image
								src={category.image || DEFAULT_IMAGE}
								alt={category.name}
								fill
								className="object-contain p-2 group-hover:scale-105 transition-transform"
							/>
						</div>
						<div className="text-center">
							<span className="font-medium text-sm sm:text-base">
								{category.name}
							</span>
						</div>
					</a>
				</div>
			))}
		</div>
	);
};
