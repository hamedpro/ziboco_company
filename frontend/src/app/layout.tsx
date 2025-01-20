import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { authLayoutColors } from "@/lib/utils";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const vazirmatn = localFont({
	src: "../../public/Vazirmatn/Vazirmatn-VariableFont_wght.ttf",
	weight: "400", // Default weight for the variable font
	style: "normal",
});

export const metadata: Metadata = {
	title: "زیب و کو",
	description: "طلا نقره کالای لوکس",
	icons: {
		icon: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={vazirmatn.className}
		>
			<body
			// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="h-screen w-screen flex justify-center items-center bg-neutral-100 overflow-y-auto">
					<div
						className="w-full h-screen shadow-sm justify-around flex flex-col relative"
						style={{
							maxWidth: "430px",
							backgroundColor: authLayoutColors[0],
						}}
					>
						{children}
					</div>
				</div>

				<div>
					<Toaster
						dir="rtl"
						className={vazirmatn.className}
					/>
				</div>
			</body>
		</html>
	);
}
