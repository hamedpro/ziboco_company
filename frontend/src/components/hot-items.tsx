"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "hot", label: "محصولات داغ" },
  { id: "new", label: "محصولات جدید" },
  { id: "deals", label: "بهترین معاملات" },
  { id: "sale", label: "حراج" },
]

const products = [
  {
    id: 1,
    name: "سکه فیلارمونیک اتریش - ۱/۲۵ اونس طلا",
    image: "/placeholder.svg",
    price: "۱۵۴.۱۰",
    hot: true,
  },
  {
    id: 2,
    name: "شمش نقره رویال کانادین - ۱۰ اونس",
    image: "/placeholder.svg",
    price: "۳۴۷.۶۰",
    hot: true,
  },
  {
    id: 3,
    name: "نیم دلار کندی نقره ۴۰٪",
    image: "/placeholder.svg",
    price: "۹.۵۸",
    hot: true,
  },
  {
    id: 4,
    name: "شمش طلا ۱ اونسی (برند انتخابی)",
    image: "/placeholder.svg",
    price: "۲,۸۱۰.۴۵",
    hot: true,
  },
  {
    id: 5,
    name: "بسته مخلوط گلدبک - ۱/۱۰۰۰ تروی اونس",
    image: "/placeholder.svg",
    price: "۳۴.۰۳",
    hot: true,
  },
]

export default function HotItems() {
  const [activeTab, setActiveTab] = useState("hot")

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex overflow-x-auto border-b mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden relative">
            <div className="absolute top-0 left-0 bg-orange-500 text-white py-1 px-3 rounded-br-lg text-sm">داغ</div>
            <div className="relative h-48 p-4">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">از قیمت: {product.price} تومان</p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">قیمت و خرید</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

