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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow">
      <div className="p-6 flex items-center space-x-4 space-x-reverse">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">خرید {title}</h3>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
        <div className="w-24 h-24 relative">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

