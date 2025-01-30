"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Navigation() {
  const [activeItem, setActiveItem] = useState("")
  const [showMore, setShowMore] = useState(false)

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

  // Define visible items for each breakpoint
  const visibleItems = {
    default: menuItems.slice(0, 3),  // Mobile: first 3 items
    sm: menuItems.slice(0, 5),       // SM: first 5 items
    md: menuItems.slice(0, 7),       // MD: first 7 items
    lg: menuItems.slice(0, 9),       // LG: first 9 items
    xl: menuItems,                   // XL: all items
  }

  return (
    <nav className="w-full bg-[#2851A3] text-white">
      <div className="max-w-7xl mx-auto relative px-4">
        {/* Mobile View (3 items) */}
        <ul className="flex justify-between items-center sm:hidden">
          {visibleItems.default.map((item) => (
            <NavItem key={item} item={item} active={activeItem === item} onClick={() => setActiveItem(item)} />
          ))}
          <MoreDropdown items={menuItems.slice(3)} onSelect={setActiveItem} />
        </ul>

        {/* SM View (5 items) */}
        <ul className="hidden sm:flex md:hidden justify-between items-center">
          {visibleItems.sm.map((item) => (
            <NavItem key={item} item={item} active={activeItem === item} onClick={() => setActiveItem(item)} />
          ))}
          <MoreDropdown items={menuItems.slice(5)} onSelect={setActiveItem} />
        </ul>

        {/* MD View (7 items) */}
        <ul className="hidden md:flex lg:hidden justify-between items-center">
          {visibleItems.md.map((item) => (
            <NavItem key={item} item={item} active={activeItem === item} onClick={() => setActiveItem(item)} />
          ))}
          <MoreDropdown items={menuItems.slice(7)} onSelect={setActiveItem} />
        </ul>

        {/* LG View (9 items) */}
        <ul className="hidden lg:flex xl:hidden justify-between items-center">
          {visibleItems.lg.map((item) => (
            <NavItem key={item} item={item} active={activeItem === item} onClick={() => setActiveItem(item)} />
          ))}
          <MoreDropdown items={menuItems.slice(9)} onSelect={setActiveItem} />
        </ul>

        {/* XL View (all items) */}
        <ul className="hidden xl:flex justify-between items-center">
          {visibleItems.xl.map((item) => (
            <NavItem key={item} item={item} active={activeItem === item} onClick={() => setActiveItem(item)} />
          ))}
        </ul>
      </div>
    </nav>
  )
}

// NavItem Component
const NavItem = ({ item, active, onClick }: { item: string; active: boolean; onClick: () => void }) => (
  <li>
    <a
      href="#"
      className={`px-4 py-3 block hover:bg-blue-700 transition-colors whitespace-nowrap ${
        active ? "bg-blue-700" : ""
      }`}
      onClick={onClick}
    >
      {item}
    </a>
  </li>
)

// MoreDropdown Component
const MoreDropdown = ({ items, onSelect }: { items: string[]; onSelect: (item: string) => void }) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <li className="relative">
      <button
        onClick={() => setShowMore(!showMore)}
        className="px-4 py-3 flex items-center hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        بیشتر
        <ChevronDown className="h-4 w-4 mr-1" />
      </button>

      {showMore && (
        <div className="absolute top-full left-0 bg-[#2851A3] w-48 shadow-lg z-50">
          {items.map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-2 block hover:bg-blue-700 transition-colors whitespace-nowrap"
              onClick={() => {
                onSelect(item)
                setShowMore(false)
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </li>
  )
}

