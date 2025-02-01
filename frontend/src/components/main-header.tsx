"use client";
import React, { useState, useEffect } from "react";

const Header = () => {
	const [scrollAtTop, setScrollAtTop] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchDrop, setSearchDrop] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [cartMenuOpen, setCartMenuOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollAtTop(window.scrollY === 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSearch = (e: any) => {
		e.preventDefault();
		// Implement search logic
	};

	const debounce = (func: any, wait: any) => {
		let timeout: any;
		return (...args: any) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), wait);
		};
	};

	const handleSearchInput = debounce((value: any) => {
		if (value.length > 2) {
			setIsLoading(true);
			// Implement search API call
			setTimeout(() => setIsLoading(false), 1000);
		}
	}, 500);

	return (
		<div
			className={`header lg:flex items-center max-w-screen-xl mx-auto md:py-5 px-4 gap-x-5`}
			dir="rtl"
		>
			{/* Mobile Header */}
			<div
				className={`lg:hidden bg-white z-40 ${
					!scrollAtTop
						? "fixed w-full top-0 shadow-xl slide-in-top left-0"
						: ""
				}`}
			>
				<div className="px-4 py-3">
					<div className="flex justify-between items-center h-10">
						<div className="flex items-center gap-x-3 print:hidden space-x-reverse">
							<button className="h-7 min-h-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-7 w-7 text-blue-800"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
							<button className="h-7 min-h-full text-slate-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-7 w-7"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h7"
									/>
								</svg>
							</button>
						</div>
						<a href="/">
							<img
								src="/gold_and_white_ziboko.png"
								alt="لوگوی زیبوکو"
								className="mx-auto h-9 md:h-14 bg-slate-200 p-2 rounded-sm"
							/>
						</a>
						<div className="flex items-center gap-x-3 print:hidden space-x-reverse">
							<a
								href="tel:02112345678"
								className="h-7 min-h-full"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-7 w-7 text-blue-800"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
								</svg>
							</a>
							<div className="relative h-7 min-h-full">
								<a
									href="/cart"
									className="relative"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-7 w-7 text-slate-600"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
									</svg>
									<span className="absolute -left-2 -top-2 rounded-full bg-blue-800 w-4 h-4 text-white text-xs text-center">
										{cartCount}
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Desktop Header */}
			<div className="logo hidden lg:flex md:w-6/12 lg:w-5/12 md:pr-2 md:pl-4 lg:pr-2 lg:pl-0">
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
				<form
					className="w-full mb-0"
					onSubmit={handleSearch}
				>
					<div className="flex items-center border-2 rounded-lg bg-slate-50 border-blue-800 hover:border-blue-900">
						<input
							name="q"
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								handleSearchInput(e.target.value);
							}}
							className="appearance-none bg-transparent border-none w-full text-slate-700 md:py-1 lg:py-2 px-4 leading-tight focus:outline-none lg:text-sm focus:ring-0"
							placeholder="جستجوی محصولات..."
						/>
						<button
							className="flex-shrink-0 bg-blue-800 border-blue-800 text-sm border-4 text-white md:py-1 lg:py-2 px-2 rounded-r"
							type="submit"
						>
							<svg
								className="w-6 h-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
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

			<div className="cart hidden print:hidden lg:flex md:justify-center md:w-3/12 lg:w-2/12">
				<div
					className="relative w-full lg:pr-2"
					onMouseLeave={() => setCartMenuOpen(false)}
				>
					<a
						href="/cart"
						onMouseEnter={() => setCartMenuOpen(true)}
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
			</div>
		</div>
	);
};

export default Header;
