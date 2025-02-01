import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Youtube, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

const footerLinks = {
	resources: {
		title: "منابع",
		links: [
			{ name: "اخبار طلا و نقره", href: "#" },
			{ name: "خلاصه هفتگی بازار (پادکست)", href: "#" },
			{ name: "مرکز آموزش", href: "#" },
			{ name: "سوالات متداول", href: "#" },
			{ name: "خبرنامه فصلی", href: "#" },
			{ name: "فروش طلا و نقره", href: "#" },
			{ name: "دایرکتوری محلی", href: "#" },
			{ name: "ایمیل‌های لیست سفید", href: "#" },
		],
	},
	company: {
		title: "شرکت",
		links: [
			{ name: "درباره ما", href: "#" },
			{ name: "تماس با ما", href: "#" },
			{ name: "نظرات شرکت", href: "#" },
			{ name: "سیاست حریم خصوصی", href: "#" },
			{ name: "سیاست عدم افشا", href: "#" },
			{ name: "تحویل و مرجوعی", href: "#" },
			{ name: "شرایط استفاده و افشای قانونی", href: "#" },
		],
	},
	/* programs: {
    title: "برنامه‌ها",
    links: [
      { name: "سپرده‌گذاری", href: "#" },
      { name: "طرح ماهانه", href: "#" },
      { name: "وام‌های با وثیقه", href: "#" },
      { name: "IRA خود مدیریتی", href: "#" },
      { name: "بورسیه طلا", href: "#" },
      { name: "برنامه معرفی", href: "#" },
      { name: "تبدیل شدن به نماینده", href: "#" },
    ],
  },
  learn: {
    title: "بیشتر بدانید",
    links: [
      { name: "قیمت طلا", href: "#" },
      { name: "قیمت نقره", href: "#" },
      { name: "قیمت پلاتین", href: "#" },
      { name: "قیمت پالادیوم", href: "#" },
      { name: "قیمت‌های مس", href: "#" },
      { name: "قیمت رودیوم", href: "#" },
      { name: "قیمت‌های ارز دیجیتال", href: "#" },
    ],
  }, */
};

const socialLinks = [
  { Icon: Facebook, href: "#" },
  { Icon: Youtube, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Linkedin, href: "#" },
]

export default function Footer() {
  return (
		<footer
			className="bg-[#2851A3] text-white"
			dir="rtl"
		>
			<div className="max-w-7xl mx-auto px-4 py-16">
				{/* Newsletter Section - Full Width on Mobile */}
				<div className="mb-16 lg:mb-20 max-w-xl">
					<h2 className="text-2xl font-bold mb-2">
						عضویت در خبرنامه
					</h2>
					<p className="text-blue-100 mb-4">
						از آخرین قیمت‌ها، تحلیل‌ها و اخبار بازار طلا و ارز مطلع
						شوید
					</p>
					<form className="flex gap-2">
						<Input
							type="email"
							placeholder="ایمیل خود را وارد کنید"
							className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
						/>
						<Button
							type="submit"
							className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap"
						>
							ثبت‌نام
							<ArrowRight className="mr-2 h-4 w-4" />
						</Button>
					</form>
				</div>

				{/* Main Footer Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
					{/* Contact Section */}
					<div className="lg:col-span-2 space-y-8">
						<div>
							<Image
								src="/gold_and_white_ziboko.png"
								alt="زیبوکو"
								width={150}
								height={50}
								className="mb-6"
							/>
							<p className="text-blue-100 text-sm leading-relaxed mb-4">
								زیبوکو، پیشرو در ارائه خدمات خرید و فروش طلا و
								جواهر با بیش از یک دهه تجربه درخشان
							</p>
						</div>

						<div>
							<h3 className="text-lg font-bold mb-2">
								مشاوره رایگان
							</h3>
							<a
								href="tel:02112345678"
								className="text-2xl lg:text-3xl font-bold hover:text-blue-200 transition-colors"
							>
								۰۲۱-۲۳۴۵۶۷۸۹
							</a>
							<p className="text-blue-200 text-sm mt-1">
								شنبه تا پنجشنبه ۹ صبح تا ۵ عصر
							</p>
						</div>

						<div className="space-y-4">
							<h4 className="font-bold">ما را دنبال کنید</h4>
							<div className="flex gap-4">
								{socialLinks.map(({ Icon, href }, index) => (
									<a
										key={index}
										href={href}
										className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
										aria-label={`Follow us on ${Icon.name}`}
									>
										<Icon className="w-5 h-5" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Links Sections */}
					{Object.entries(footerLinks).map(([key, section]) => (
						<div
							key={key}
							className="space-y-4"
						>
							<h3 className="font-bold text-lg">
								{section.title}
							</h3>
							<ul className="space-y-3">
								{section.links.map((link) => (
									<li key={link.name}>
										<a
											href={link.href}
											className="text-blue-100 hover:text-white transition-colors inline-flex items-center group"
										>
											<span className="opacity-0 -mr-4 group-hover:mr-1 group-hover:opacity-100 transition-all">
												<ArrowRight className="h-3 w-3" />
											</span>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Trust Badges */}
				<div className="border-t border-blue-400/30 pt-8">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center mb-12">
						{[1, 2, 3, 4, 5].map((i) => (
							<div
								key={i}
								className="bg-white/10 rounded-lg p-4 w-full max-w-[160px] aspect-[3/2] flex items-center justify-center"
							>
								<Image
									src="/3dicons-medal-front-color-500-500.png"
									alt={`Trust Badge ${i}`}
									width={100}
									height={50}
									className="object-contain opacity-90"
								/>
							</div>
						))}
					</div>

					{/* Copyright and Legal */}
					<div className="text-sm text-blue-100 space-y-6">
						<div className="grid gap-4 text-center">
							<p>© ۱۴۰۲ زیبوکو. تمامی حقوق محفوظ است.</p>
							<p className="max-w-3xl mx-auto">
								استفاده از مطالب سایت زیبوکو فقط برای مقاصد
								غیرتجاری و با ذکر منبع بلامانع است. کلیه حقوق
								این سایت متعلق به شرکت زیبوکو می‌باشد.
							</p>
						</div>

						{/* Payment Methods */}
						<div className="flex flex-wrap justify-center gap-4">
							{[
								"visa",
								"mastercard",
								"amex",
								"discover",
								"paypal",
							].map((payment) => (
								<div
									key={payment}
									className="bg-white/10 p-2 rounded-lg"
								>
									<Image
										src="/3dicons-medal-front-color-500-500.png"
										alt={payment}
										width={40}
										height={25}
										className="object-contain opacity-75"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
  );
}

