import React from "react";
import Link from "next/link";

interface LogoProps {
	long?: boolean;
}

const Logo: React.FC<LogoProps> = ({ long = false }) => {

	return (
		<Link href="/" className="cursor-pointer flex-none">
			<img src="/png site.png" alt="ZIBOKO" className="h-8 lg:h-10 flex-none" />
			<div className="relative text-[12px] sm:text-xs lg:text-sm tracking-normal sm:tracking-wide font-medium mt-1 sm:mt-1.5 whitespace-nowrap text-center bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
              طلا | نقره | کالای لوکس
			</div>
		</Link>
	);
};

export default Logo;
