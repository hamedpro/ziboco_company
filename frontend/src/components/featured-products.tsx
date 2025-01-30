"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "کروگرند - ۱ اونس طلای ۲۲ عیار",
    image: "/placeholder.svg",
    onSale: true
  },
  {
    id: 2,
    name: "شمش پلاتین - ۱۰ اونس",
    image: "/placeholder.svg",
    onSale: false
  },
  {
    id: 3,
    name: "شمش مس گایگر - ۱۰ AVDP OZ، خلوص ۹۹۹۹",
    image: "/placeholder.svg",
    onSale: false
  },
  {
    id: 4,
    name: "گلدپنر - سکه نقره ۱ اونسی قابل تقسیم",
    image: "/placeholder.svg",
    onSale: false
  },
  {
    id: 5,
    name: "شمش طلا ۱۰۰ گرمی (برند انتخابی)",
    image: "/placeholder.svg",
    onSale: false
  }
]

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= products.length ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? products.length - 1 : prevIndex - 1
    )
  }

  // Calculate visible products based on screen size
  const getVisibleProducts = () => {
    const allProducts = [...products, ...products] // Duplicate for infinite scroll
    const start = currentIndex
    return allProducts.slice(start, start + 5)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-8">محصولات ویژه</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {getVisibleProducts().map((product, index) => (
                <div 
                  key={`${product.id}-${index}`} 
                  className={cn(
                    "relative bg-white rounded-lg shadow-sm p-4",
                    "transform transition-all duration-300"
                  )}
                >
                  {product.onSale && (
                    <div className="absolute -top-3 -right-3 bg-red-600 text-white py-1 px-3 rounded-md transform rotate-12 text-sm">
                      تخفیف ویژه!
                    </div>
                  )}
                  <div className="aspect-square relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center mb-4 h-12 line-clamp-2">
                    {product.name}
                  </h3>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm"
                  >
                    قیمت و خرید →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows - Hidden on mobile */}
        <button 
          onClick={prevSlide}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

