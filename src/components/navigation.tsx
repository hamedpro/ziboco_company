"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
	const [activeItem, setActiveItem] = useState("");
	const [showMore, setShowMore] = useState(false);

	const menuItems = [
		{ name: "طلا", path: "/products?category=gold" },
		{ name: "نقره", path: "/products?category=silver" },
		{ name: "سایر محصولات", path: "/products" },
		{ name: "پیشنهادات ویژه 🔥", path: "/products?special=true" },
		{ name: "محصولات جدید", path: "/products?sort=newest" },
		{ name: "وبلاگ", path: "/blogs" },
		{ name: "اخبار و اطلاعیه‌ها", path: "/announcements" },
		{ name: "کیف پول", path: "/wallet" },
		{ name: "پروفایل", path: "/profile" },
		{ name: "سبد خرید", path: "/basket" },
		{ name: "اعلان‌ها", path: "/notifications" },
		{ name: "جستجو", path: "/search" },
	];

	// Define visible items for each breakpoint
	const visibleItems = {
		default: menuItems.slice(0, 3), // Mobile: first 3 items
		sm: menuItems.slice(0, 5),
		md: menuItems.slice(0, 7),
		lg: menuItems.slice(0, 9),
		xl: menuItems.slice(0, 12),
	};

	return (
		<nav className="w-full bg-[#2851A3] text-white" dir="rtl">
			<div className="relative px-4">
				{/* Mobile View (3 items) */}
				<ul className="flex justify-between items-center sm:hidden">
					{visibleItems.default.map((item) => (
						<NavItem
							key={item.path}
							item={item}
							active={activeItem === item.name}
							onClick={() => setActiveItem(item.name)}
						/>
					))}
					<MoreDropdown
						items={menuItems.slice(3)}
						onSelect={(item) => setActiveItem(item.name)}
					/>
				</ul>

				{/* SM View (5 items) */}
				<ul className="hidden sm:flex md:hidden justify-between items-center">
					{visibleItems.sm.map((item) => (
						<NavItem
							key={item.path}
							item={item}
							active={activeItem === item.name}
							onClick={() => setActiveItem(item.name)}
						/>
					))}
					<MoreDropdown
						items={menuItems.slice(5)}
						onSelect={(item) => setActiveItem(item.name)}
					/>
				</ul>

				{/* MD View (7 items) */}
				<ul className="hidden md:flex lg:hidden justify-between items-center">
					{visibleItems.md.map((item) => (
						<NavItem
							key={item.path}
							item={item}
							active={activeItem === item.name}
							onClick={() => setActiveItem(item.name)}
						/>
					))}
					<MoreDropdown
						items={menuItems.slice(7)}
						onSelect={(item) => setActiveItem(item.name)}
					/>
				</ul>

				{/* LG View (9 items) */}
				<ul className="hidden lg:flex xl:hidden justify-between items-center">
					{visibleItems.lg.map((item) => (
						<NavItem
							key={item.path}
							item={item}
							active={activeItem === item.name}
							onClick={() => setActiveItem(item.name)}
						/>
					))}
					<MoreDropdown
						items={menuItems.slice(9)}
						onSelect={(item) => setActiveItem(item.name)}
					/>
				</ul>

				{/* XL View (all items) */}
				<ul className="hidden xl:flex justify-between items-center">
					{visibleItems.xl.map((item) => (
						<NavItem
							key={item.path}
							item={item}
							active={activeItem === item.name}
							onClick={() => setActiveItem(item.name)}
						/>
					))}
				</ul>
			</div>
		</nav>
	);
}

// NavItem Component
const NavItem = ({
	item,
	active,
	onClick,
}: {
	item: { name: string; path: string };
	active: boolean;
	onClick: () => void;
}) => (
	<li>
		<a
			href={item.path}
			className={`px-4 py-3 block hover:bg-blue-700 transition-colors whitespace-nowrap ${
				active ? "bg-blue-700" : ""
			}`}
			onClick={(e) => {
				e.preventDefault();
				onClick();
				window.location.href = item.path;
			}}
		>
			{item.name}
		</a>
	</li>
);

// MoreDropdown Component
const MoreDropdown = ({
	items,
	onSelect,
}: {
	items: Array<{ name: string; path: string }>;
	onSelect: (item: { name: string; path: string }) => void;
}) => {
	const [showMore, setShowMore] = useState(false);

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
				<div className="absolute top-full right-0 bg-[#2851A3] w-48 shadow-lg z-50">
					{items.map((item) => (
						<a
							key={item.path}
							href={item.path}
							className="px-4 py-2 block hover:bg-blue-700 transition-colors whitespace-nowrap text-right"
							onClick={(e) => {
								e.preventDefault();
								onSelect(item);
								setShowMore(false);
								window.location.href = item.path;
							}}
							dir="rtl"
						>
							{item.name}
						</a>
					))}
				</div>
			)}
		</li>
	);
};
