import React from "react";

export const BreadCrumb = ({className}: {className?: string}) => {
	return (
		<nav
			className={`no-scrollbar flex flex-row overflow-auto overflow-x-auto border-t border-b border-gray-100 -mx-4 py-2 md:flex-row lg:mx-0 lg:border-none lg:pt-4 ${className}`}
			aria-label="مسیر"
			dir="rtl"
		>
			<ol className="mx-4 flex items-center justify-start space-x-1 space-x-reverse whitespace-nowrap md:space-x-4 lg:mx-0">
				<li>
					<div className="flex items-center">
						<a
							href="/"
							className="text-xs text-gray-500 hover:underline"
						>
							زیبوکو
						</a>
					</div>
				</li>
				<li>
					<div className="flex items-center">
						<svg
							className="h-4 w-4 flex-shrink-0 text-gray-400 rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							></path>
						</svg>
						<a
							href="/buy"
							className="mr-1 text-xs font-semibold text-gray-500 hover:underline md:mr-4"
						>
							خرید فلزات گرانبها
						</a>
					</div>
				</li>
			</ol>
		</nav>
	);
};
