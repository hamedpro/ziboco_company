"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const newsItems = [
  {
    id: 1,
    title: "سوالات مهم سرمایه‌گذاران طلا و نقره",
    image: "/placeholder.svg",
    date: "۹ بهمن ۱۴۰۲",
    type: "news",
  },
  {
    id: 2,
    title: "خورشید بر نقره می‌تابد!",
    image: "/placeholder.svg",
    date: "۹ بهمن ۱۴۰۲",
    type: "podcast",
  },
  {
    id: 3,
    title: "لایحه آریزونا برای ایجاد تراکنش‌های مبتنی بر طلا و نقره",
    image: "/placeholder.svg",
    date: "۷ بهمن ۱۴۰۲",
    type: "news",
  },
]

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= newsItems.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? newsItems.length - 1 : prevIndex - 1))
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">اخبار و پادکست‌های اخیر</h2>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="flex items-center text-blue-600 hover:text-blue-700">
            <span>اخبار بیشتر</span>
            <ChevronLeft className="w-4 h-4" />
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="flex items-center text-blue-600 hover:text-blue-700">
            <span>پادکست‌های بیشتر</span>
            <ChevronLeft className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 sm:h-56">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

