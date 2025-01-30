"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

export default function Navigation() {
  const [activeItem, setActiveItem] = useState("")

  const menuItems = [
    "نقره",
    "طلا",
    "سایر",
    "پیشنهادات ویژه 🔥",
    "محصولات جدید",
    "منابع",
    "اخبار 📰",
    "برنامه‌ها",
    "حساب‌های IRA",
    "نگهداری امن",
    "فروش به ما",
    "وام‌ها",
  ]

  return (
    <nav className="w-full bg-[#2851A3] text-white">
      <div className="max-w-7xl mx-auto">
        <ul className="flex items-center">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className={`px-4 py-3 block hover:bg-blue-700 transition-colors ${
                  activeItem === item ? "bg-blue-700" : ""
                }`}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

