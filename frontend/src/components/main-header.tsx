"use client";
import React, { useState, useEffect } from "react";
import {
	PhoneIcon,
	SearchIcon,
	ShoppingCartIcon,
	UserIcon,
	Loader2,
	UserX,
	LogInIcon,
	Wallet,
	KeyRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "../../configs";
import Logo from "./logo";
import { fakeData } from "./fakeData";

// Calculate total basket items (sum of quantities)
const totalBasketItems = fakeData.basket.reduce(
	(acc, item) => acc + item.quantity,
	0
);

const Header = () => {
	const router = useRouter();

	// userIsLoggedIn state:
	// • undefined → loading,
	// • false → not logged in,
	// • true → logged in,
	// • any other string → error state.
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<
		boolean | string | undefined
	>(undefined);

	// Added state for syncing the search query
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		axios
			.get("/api/profile", {
				baseURL: API_BASE_URL,
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			})
			.then((res) => {
				setUserIsLoggedIn(true); // user is logged in
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					setUserIsLoggedIn(false); // not logged in
				} else {
					setUserIsLoggedIn("Unexpected error");
				}
			});
	}, []);

	// Function to navigate to /search with the queried text
	const handleSearch = () => {
		router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
	};

	return (
		<>
			{/* Mobile Header: visible on screens smaller than lg */}
			<div className="flex items-center py-5 px-4 gap-x-4 justify-between lg:hidden">
				<div className="flex items-center gap-x-4">
					{/* Conditionally render the user state button in mobile */}
					{userIsLoggedIn === undefined ? (
						<Loader2 className="animate-spin text-slate-600" />
					) : userIsLoggedIn === false ? (
						<LogInIcon
							className="text-slate-600 cursor-pointer"
							onClick={() => router.push("/auth/entry")}
						/>
					) : userIsLoggedIn === true ? (
						<UserIcon
							className="text-slate-600 cursor-pointer"
							onClick={() => router.push("/me/wallet")}
						/>
					) : (
						<UserX
							className="text-red-600 cursor-pointer"
							onClick={() => router.push("/auth/entry")}
						/>
					)}
					{/* Existing Shopping Cart Icon */}
					<div
						className="relative cursor-pointer"
						onClick={() => router.push("/basket")}
					>
						<ShoppingCartIcon className="text-blue-800" />
						{totalBasketItems > 0 && (
							<span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
								{totalBasketItems}
							</span>
						)}
					</div>
				</div>
				<Logo />
				<div className="flex items-center gap-x-4">
					{/* Updated mobile search icon with onClick navigation */}
					<SearchIcon
						className="text-blue-800 cursor-pointer"
						onClick={handleSearch}
					/>
					<PhoneIcon className="text-slate-600 cursor-pointer" />
				</div>
			</div>

			{/* Desktop Header: visible on screens lg and higher */}
			<div className="hidden lg:flex items-center py-5 px-4 gap-x-8 justify-between">
				{/* Left section: render the user state button (styled as the orange button) alongside the cart */}
				<div className="print:hidden flex items-center gap-x-4">
					{/* Desktop version of the User State Button */}
					{userIsLoggedIn === undefined ? (
						<button className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white text-sm xl:text-base p-3 rounded border border-orange-600 font-semibold transition-all duration-300">
							<Loader2 className="animate-spin w-6 h-6 mr-2" />
							احراز هویت
						</button>
					) : userIsLoggedIn === false ? (
						<button
							onClick={() => router.push("/auth/entry")}
							className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white text-sm xl:text-base p-3 rounded border border-orange-600 font-semibold transition-all duration-300"
						>
							<KeyRound className="w-6 h-6 mr-1" />
							ورود به حساب
						</button>
					) : userIsLoggedIn === true ? (
						<button
							onClick={() => router.push("/me/wallet")}
							className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white text-sm xl:text-base p-3 rounded border border-orange-600 font-semibold transition-all duration-300"
						>
							<Wallet className="w-6 h-6 mr-1" />
							کیف پول من
						</button>
					) : (
						<button
							onClick={() => router.push("/auth/entry")}
							className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white text-sm xl:text-base p-3 rounded border border-orange-600 font-semibold transition-all duration-300"
						>
							<UserX className="w-6 h-6 mr-1" />
							خطای احراز هویت
						</button>
					)}
					<div
						className="relative cursor-pointer"
						onClick={() => router.push("/basket")}
					>
						<ShoppingCartIcon className="text-blue-800" />
						{totalBasketItems > 0 && (
							<span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
								{totalBasketItems}
							</span>
						)}
					</div>
				</div>

				<div className="phone flex justify-center items-center">
					<p className="text-center">
						<span className="block xl:text-lg -mb-1 tracking-wide text-slate-700">
							(شنبه-پنجشنبه) • آنلاین ۲۴/۷
						</span>
						<span className="text-2xl xl:text-3xl font-bold text-slate-700">
							۰۲۱-۲۳۴۵۶۷۸۹
						</span>
					</p>
				</div>

				{/* Updated search input container */}
				<div
					className="flex items-center border-2 rounded-lg bg-slate-50 border-blue-800 hover:border-blue-900"
					style={{ maxWidth: "300px", flex: 1 }}
					dir="rtl"
				>
					<input
						name="q"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSearch();
						}}
						className="appearance-none bg-transparent border-none w-full text-slate-700 py-1 lg:py-2 px-4 leading-tight focus:outline-none lg:text-sm focus:ring-0"
						placeholder="جستجوی همه موارد"
					/>
					<button
						onClick={handleSearch}
						className="flex-shrink-0 bg-blue-800 border-blue-800 text-sm border-4 text-white py-1 lg:py-2 px-2 rounded-l"
						type="button"
					>
						<SearchIcon />
					</button>
				</div>

				<div className="logo flex">
					<Logo long={true} />
				</div>
			</div>
		</>
	);
};

export default Header;
