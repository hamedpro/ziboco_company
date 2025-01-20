import type React from "react";

const LuxeLogo = () => (
	<svg
		width="60"
		height="60"
		viewBox="0 0 60 60"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="30"
			cy="30"
			r="30"
			fill="url(#paint0_linear)"
		/>
		<path
			d="M15 37.5L30 15L45 37.5H15Z"
			stroke="white"
			strokeWidth="2"
		/>
		<defs>
			<linearGradient
				id="paint0_linear"
				x1="0"
				y1="0"
				x2="60"
				y2="60"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#FFD700" />
				<stop
					offset="1"
					stopColor="#FFA500"
				/>
			</linearGradient>
		</defs>
	</svg>
);

const PersianCreditCard: React.FC = () => {
	return (
		<div
			className="w-96 h-56 bg-gradient-to-br from-purple-600 to-indigo-900 rounded-xl shadow-2xl overflow-hidden p-6 text-white font-sans"
			dir="rtl"
		>
			<div className="flex justify-between items-start mb-8">
				<div className="text-xl font-bold tracking-wider">
					بانک صادرات ایران
				</div>
				<LuxeLogo />
			</div>
			<div className="mb-6 text-2xl tracking-widest text-left font-mono">
				6219 8619 7754 5614
			</div>
			<div className="flex justify-between items-center">
				<div className="text-sm">
					<div className="mb-1 text-xs uppercase tracking-wider opacity-75">
						CVC
					</div>
					123
				</div>
				<div className="text-sm">
					<div className="mb-1 text-xs uppercase tracking-wider opacity-75">
						تاریخ انقضا
					</div>
					۱۴۰۷/۰۹
				</div>
			</div>
			<div className="mt-4 text-lg tracking-wide">جان دو</div>
		</div>
	);
};

export default PersianCreditCard;
