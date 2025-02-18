import React from "react";

interface LogoProps {
	long?: boolean;
}

const Logo: React.FC<LogoProps> = ({ long = false }) => {
	// Define the texts based on the "long" prop
	const headingText = long ? "ZIBOKO.COM" : "ZIBOKO";
	// You can update the subheading text for the long version as needed
	const subheadingText = long
		? "طلا / نقره / کالای لوکس و محصولات برتر"
		: "طلا / نقره / کالای لوکس";

	return (
		<div
			className="flex flex-col whitespace-nowrap"
			style={{ color: "#B8860B" }}
			dir="rtl"
		>
			<h1
				className="text-2xl whitespace-nowrap"
				style={{ letterSpacing: "8px", color: "#B8860B" }}
			>
				{headingText}
			</h1>
			<p className="text-sm whitespace-nowrap ml-2">{subheadingText}</p>
		</div>
	);
};

export default Logo;
