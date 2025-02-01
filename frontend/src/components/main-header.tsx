"use client";
import {
	MenuIcon,
	PhoneIcon,
	SearchIcon,
	ShoppingCartIcon,
	UserIcon,
} from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
	const router = useRouter();

	return (
		<div className="flex items-center py-5 px-4 gap-x-4 justify-between">
			<div className="flex items-center gap-x-4">
				<UserIcon
					className="text-slate-600 cursor-pointer"
					onClick={() => router.push("/auth/entry?mode=register")}
				/>
				<ShoppingCartIcon className="text-blue-800 cursor-pointer" />
			</div>
			{/* <img
					src="/GitHub_Logo.png"
					alt="لوگوی زیبوکو"
					className=" h-14 md:h-14 p-2"
				/> */}
			{/* <h1 className="text-3xl font-bold">Ziboko</h1> */}

			{/* <div
				className="flex items-center border-2 rounded-lg bg-slate-50 border-blue-800 hover:border-blue-900"
				dir="rtl"
			>
				<input
					name="q"
					value={""}
					onChange={(e) => console.log(e.target.value)}
					className="appearance-none bg-transparent border-none w-full text-slate-700 px-4 leading-tight focus:outline-none lg:text-sm focus:ring-0"
					placeholder="جستجوی محصولات..."
				/>
				<button
					className="flex-shrink-0 bg-blue-800 border-blue-800 text-sm border-4 text-white md:py-1 lg:py-2 px-2 rounded-l"
					type="button"
				>
					<SearchIcon />
				</button>
			</div> */}

			<div
				className="flex flex-col items-center"
				style={{ color: "#B8860B" }}
				dir="rtl"
			>
				<h1
					className="text-2xl"
					style={{ letterSpacing: "8px", color: "#B8860B" }}
				>
					ZIBOCO
				</h1>
				<p
					className="text-sm"
					style={{}}
				>
					طلا / نقره / کالای لوکس
				</p>
			</div>

			{/* <div
				className="flex flex-col items-center"
				style={{ color: "#B8860B" }}
				dir="rtl"
			>
				<h1
					className="text-2xl"
					style={{ letterSpacing: "8px", color: "#B8860B" }}
				>
					ZIBOCO
				</h1>
				<p
					className="text-sm"
					style={{}}
				>
					طلا / نقره / کالای لوکس
				</p>
			</div> */}

			<div className="flex items-center gap-x-4">
				<SearchIcon className="text-blue-800 cursor-pointer" />
				<PhoneIcon className="text-slate-600 cursor-pointer" />
			</div>

			{/* Desktop Header */}
			{/* <div className="logo hidden lg:flex md:w-6/12 lg:w-5/12 md:pr-2 md:pl-4 lg:pr-2 lg:pl-0">
				<a href="/">
					<img
						src="/gold_and_white_ziboko.png"
						alt="لوگوی زیبوکو"
						width="440"
						height="77"
						loading="lazy"
						className="bg-slate-200 p-2 rounded-sm"
					/>
				</a>
			</div>

			<div className="search relative hidden print:hidden lg:inline-block md:mb-8 lg:mb-0 md:w-6/12 lg:w-4/12 lg:pl-4 xl:pl-2">
				<form className="w-full mb-0">
					<div className="flex items-center border-2 rounded-lg bg-slate-50 border-blue-800 hover:border-blue-900">
						<input
							name="q"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="appearance-none bg-transparent border-none w-full text-slate-700 md:py-1 lg:py-2 px-4 leading-tight focus:outline-none lg:text-sm focus:ring-0"
							placeholder="جستجوی محصولات..."
						/>
						<button
							className="flex-shrink-0 bg-blue-800 border-blue-800 text-sm border-4 text-white md:py-1 lg:py-2 px-2 rounded-r"
							type="button"
						>
							<SearchIcon />
						</button>
					</div>
				</form>
			</div>

			<div className="phone hidden lg:flex lg:justify-center lg:items-center md:pb-1 md:w-6/12 lg:w-3/12 md:pr-4 lg:pr-0 xl:pr-0">
				<p className="text-center">
					<span className="block xl:text-lg -mb-1 tracking-wide text-slate-700">
						(شنبه-پنجشنبه) • آنلاین ۲۴/۷
					</span>
					<span className="text-2xl xl:text-3xl font-bold text-slate-700">
						۰۲۱-۲۳۴۵۶۷۸۹
					</span>
				</p>
			</div>

			{/* <div className="cart hidden print:hidden lg:flex md:justify-center md:w-3/12 lg:w-2/12">
				<div className="relative w-full lg:pr-2">
					<a
						href="/cart"
						className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white lg:pr-3 text-sm xl:text-base p-3 rounded w-full border border-orange-600 font-semibold"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
						</svg>
						<span className="mr-1">سبد خرید ({cartCount})</span>
					</a>
				</div>
			</div> */}
		</div>
	);
};

export default Header;
