import Image from "next/image"
import { Button } from "@/components/ui/button"

interface CategoryCardProps {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
}

export default function CategoryCard({ title, subtitle, imageSrc, imageAlt }: CategoryCardProps) {
  return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow flex-1 min-w-[300px]">
			<div
				className="p-6 flex items-center gap-x-4 space-x-reverse flex-row-reverse"
				dir="rtl"
			>
				<div className="flex-1">
					<h3 className="text-xl font-bold mb-2">خرید {title}</h3>
					<p className="text-gray-600 text-sm">{subtitle}</p>
				</div>
				<div
					className="w-24 h-24 relative flex items-center justify-center"
					style={{ margin: 0 }}
				>
					<Image
						src={
							imageSrc || "/3dicons-medal-front-color-500-500.png"
						}
						alt={imageAlt}
						width={96}
						height={96}
						className="object-contain rounded-md"
					/>
				</div>
			</div>
		</div>
  );
}

