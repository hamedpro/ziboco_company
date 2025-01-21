import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const routes = [
	{
		name: "ورود به حساب",
		description:
			"با شماره موبایل و کد یک بار مصرف وارد حساب کاربری خودتون بشید",
		path: "/auth/entry",
	},
	{
		name: "کیف پول من",
		description:
			"وضعیت فعلی اعتبار حسابتون رو مشاهده کنید و واریز و برداشت انجام بدید",
		path: "/me/wallet",
	},
	{
		name: "تاریخچه تراکنش ها",
		description: "جزئیات تراکنش های خودتون رو میتونید اینجا ببینید",
		path: "/me/transactions",
	},
	{
		name: "حساب کاربری",
		description:
			"اطلاعات مربوط به احراز هویت و حساب کاربری خودتون رو از اینجا مشاهده کنید",
		path: "/me/profile",
	},
	{
		name: "معامله جدید",
		description:
			"از این بخش نرخ لحظه ای محصولات موجود رو بررسی کنید و در صورت تمایل خریداری کنید",
		path: "/me/trade",
	},
	{
		name: "رویداد های مالی",
		description: "این بخش هنوز در دست توسعه است",
		path: "/me/events",
	},
];

export default function Home() {
	return (
		<div
			className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
			dir="rtl"
		>
			<div className="container mx-auto px-4 py-16">
				<header className="text-center mb-12 mt-12">
					<h1 className="text-5xl font-extralight mb-2 text-gray-800">
						<span className="">ZIBOCO</span>
					</h1>
					<p className="text-sm text-gray-500 uppercase tracking-widest">
						طلا / نقره / کالای لوکس
					</p>
				</header>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{routes.map((route, index) => (
						<Link
							key={route.path}
							href={route.path}
						>
							<Card className="h-full bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
								<CardHeader className="p-4">
									<CardTitle className="text-lg font-normal text-gray-700 group-hover:text-primary transition-colors duration-300">
										{route.name}
									</CardTitle>
									<CardDescription className="text-xs text-gray-500 mt-1">
										{route.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="p-4 pt-0">
									<div className="w-full h-1 bg-gray-100 overflow-hidden">
										<div
											className="h-full bg-primary transition-all duration-300 ease-out"
											style={{
												width: "0%",
												transform: "translateX(-100%)",
											}}
										/>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
