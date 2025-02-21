import React from "react";
import Link from "next/link";

interface LogoProps {
	long?: boolean;
}

const Logo: React.FC<LogoProps> = ({ long = false }) => {

	return (
		<Link href="/" className="cursor-pointer flex-none">
			<img src="/png site.png" alt="ZIBOKO" className="h-12 md:h-16 flex-none" />
		</Link>
	);
};

export default Logo;
