import Link from "next/link";
import React from "react";

export const NewsGrid = ({ items }: { items: any[] }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{items.map((item) => (
				<Link
					key={item.id}
					href={`/blogs/${item.id}`}
					className="group hover:bg-gray-50 p-3 rounded-lg transition-colors block"
				>
					<div className="relative w-24 h-24 flex-shrink-0 mb-2">
						<img
							src={item.image}
							alt={item.title}
							className="object-cover rounded w-full h-full"
						/>
					</div>
					<h3 className="text-lg font-medium group-hover:text-blue-600 transition-colors">
						{item.title}
					</h3>
					<p className="text-sm text-gray-600">
						{new Date(item.date).toLocaleDateString("fa-IR")}
					</p>
				</Link>
			))}
		</div>
	);
};
