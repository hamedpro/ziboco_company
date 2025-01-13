import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
				{children}
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
