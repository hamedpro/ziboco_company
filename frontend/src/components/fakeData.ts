const DEFAULT_IMAGE = "/3dicons-medal-front-color-500-500.png";

// Add theme block with the generic header banners
export const fakeData = {
	theme: {
		topHeaderBannerOne: "ارسال رایگان برای بالای ۵۰۰ هزار تومن",
		topHeaderBannerTwo:
			"🔥 پیشنهادهای شگفت‌انگیز برای سکه‌ها و شمش‌های نقره و طلا",
	},
	products: [
		// Regular products
		{
			id: "1",
			categoryId: "2", // "سکه طلا" → gold coin
			title: "سکه طلا",
			description: "سکه تمام بهار آزادی",
			image: DEFAULT_IMAGE,
			price: 25_000_000,
			tag: "پرفروش",
		},
		{
			id: "2",
			categoryId: "3", // "شمش نقره" → silver bullion
			title: "شمش نقره",
			description: "شمش نقره ۱۰۰ گرمی",
			image: DEFAULT_IMAGE,
			price: 2_500_000,
			tag: "جدید",
		},
		{
			id: "3",
			categoryId: "2", // "سکه پلاتین" → falls back to gold coin
			title: "سکه پلاتین",
			description: "سکه پلاتین ۱ انس",
			image: DEFAULT_IMAGE,
			price: 45_000_000,
			tag: "محدود",
		},
		{
			id: "4",
			categoryId: "4", // "شمش طلا" → gold bullion
			title: "شمش طلا",
			description: "شمش طلا ۵۰ گرمی",
			image: DEFAULT_IMAGE,
			price: 85_000_000,
			tag: "ویژه",
		},
		{
			id: "5",
			categoryId: "2", // "ربع سکه" → assumed gold coin
			title: "ربع سکه",
			description: "ربع سکه بهار آزادی",
			image: DEFAULT_IMAGE,
			price: 8_000_000,
			tag: "پرفروش",
		},
		// Featured products
		{
			id: "6",
			categoryId: "2", // "کروگرند - ۱ اونس طلای ۲۲ عیار" → gold coin (no "شمش" → coin)
			title: "کروگرند ۱ اونس طلای ۲۲ عیار",
			image: DEFAULT_IMAGE,
			onSale: true,
		},
		{
			id: "7",
			categoryId: "4", // "شمش پلاتین - ۱۰ اونس" → bullion; assign to gold bullion
			title: "شمش پلاتین ۱۰ اونس",
			image: DEFAULT_IMAGE,
			onSale: false,
		},
		{
			id: "8",
			categoryId: "7", // "شمش مس گایگر - ۱۰ AVDP OZ، خلوص ۹۹۹۹" → copper product → category "مس"
			title: "شمش مس گایگر ۱۰، خلوص ۹۹۹۹",
			image: DEFAULT_IMAGE,
			onSale: false,
		},
		{
			id: "9",
			categoryId: "1", // "گلدپنر - سکه نقره ۱ اونسی قابل تقسیم" → silver coin
			title: "گلدپنر سکه نقره ۱ اونسی قابل تقسیم",
			image: DEFAULT_IMAGE,
			onSale: false,
		},
		{
			id: "10",
			categoryId: "4", // "شمش طلا ۱۰۰ گرمی (برند انتخابی)" → gold bullion
			title: "شمش طلا ۱۰۰ گرمی (برند انتخابی)",
			image: DEFAULT_IMAGE,
			onSale: false,
		},
		// Hot Items
		{
			id: "11",
			categoryId: "2", // "سکه فیلارمونیک اتریش - ۱/۲۵ اونس طلا" → gold coin
			title: "سکه فیلارمونیک اتریش ۱/۲۵ اونس طلا",
			image: DEFAULT_IMAGE,
			price: 154_100_000,
			hot: true,
		},
		{
			id: "12",
			categoryId: "3", // "شمش نقره رویال کانادین - ۱۰ اونس" → silver bullion
			title: "شمش نقره رویال کانادین ۱۰ اونس",
			image: DEFAULT_IMAGE,
			price: 347_600_000,
			hot: true,
		},
		{
			id: "13",
			categoryId: "1", // "نیم دلار کندی نقره ۴۰٪" → silver coin
			title: "نیم دلار کندی نقره ۴۰٪",
			image: DEFAULT_IMAGE,
			price: 9_580_000,
			hot: true,
		},
		{
			id: "14",
			categoryId: "4", // "شمش طلا ۱ اونسی (برند انتخابی)" → gold bullion
			title: "شمش طلا ۱ اونسی (برند انتخابی)",
			image: DEFAULT_IMAGE,
			price: 2_810_450_000,
			hot: true,
		},
		{
			id: "15",
			categoryId: "4", // "بسته مخلوط گلدبک - ۱/۱۰۰۰ تروی اونس" → gold bullion (assumed)
			title: "بسته مخلوط گلدبک ۱/۱۰۰۰ تروی اونس",
			image: DEFAULT_IMAGE,
			price: 34_030_000,
			hot: true,
		},
	],
	categories: [
		{
			id: "1",
			name: "نقره",
			type: "سکه",
			typeColor: "سکه‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
		},
		{
			id: "2",
			name: "طلا",
			type: "سکه",
			typeColor: "سکه‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
		},
		{
			id: "3",
			name: "نقره",
			type: "شمش",
			typeColor: "شمش‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
		},
		{
			id: "4",
			name: "طلا",
			type: "شمش",
			typeColor: "شمش‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
		},
		{
			id: "5",
			name: "نقره",
			type: "پولک",
			typeColor: "پولک‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
		},
		{
			id: "6",
			name: "طلا",
			type: "پولک",
			typeColor: "پولک‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
		},
		{
			id: "7",
			name: "خرید",
			type: "مس",
			typeColor: "مس",
			image: DEFAULT_IMAGE,
			href: "#",
		},
	],
	metalPrices: [
		{ name: "سکه تمام بهار آزادی", price: 116_838_312, change: -500_000 }, // Full Bahar Azadi Coin
		{ name: "نیم سکه بهار آزادی", price: 58_419_156, change: -250_000 }, // Half Bahar Azadi Coin
		{ name: "ربع سکه بهار آزادی", price: 29_209_578, change: -125_000 }, // Quarter Bahar Azadi Coin
		{ name: "سکه گرمی", price: 14_604_789, change: -62_500 }, // One Gram Coin
		{ name: "طلای 24 عیار", price: 3_753_102, change: -16_000 }, // 24K Gold per Gram
		{ name: "طلای 18 عیار", price: 2_817_644, change: -12_000 }, // 18K Gold per Gram
		{ name: "نقره 925", price: 47_000, change: -500 }, // 925 Silver per Gram
	],
};
