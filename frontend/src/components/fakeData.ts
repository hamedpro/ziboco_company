export const DEFAULT_IMAGE = "/3dicons-medal-front-color-500-500.png";

// Add theme block with the generic header banners
export const fakeData = {
	theme: {
		topHeaderBannerOne: "ارسال رایگان برای بالای ۵۰۰ هزار تومن",
		topHeaderBannerTwo:
			"🔥 پیشنهادهای شگفت‌انگیز برای سکه‌ها و شمش‌های نقره و طلا",
	},
	// Removed previously defined newsItems and added blogs and announcements:
	blogs: [
		{
			id: "101",
			title: "این ۳ کاتالیزور می‌تواند بازار فلزات گرانبها را تقویت کند",
			image: DEFAULT_IMAGE,
			date: 1704105600000, // January 30, 2024
		},
		{
			id: "102",
			title: "دیوید مورگان: طلا، نقره و بقا در اقتصاد ترامپ",
			image: DEFAULT_IMAGE,
			date: 1704192000000, // January 31, 2024
		},
		{
			id: "103",
			title: "معرفی همکاران پول صدادار ۲۰۲۵",
			image: DEFAULT_IMAGE,
			date: 1704278400000, // February 1, 2024
		},
		{
			id: "104",
			title: "آیا سال ۲۰۲۵ می‌تواند سال درخشش نقره باشد؟",
			image: DEFAULT_IMAGE,
			date: 1704364800000, // February 2, 2024
		},
		{
			id: "105",
			title: "سه نکته‌ای که سرمایه‌گذاران باید خارج از دفتر رئیس جمهور در نظر بگیرند",
			image: DEFAULT_IMAGE,
			date: 1704451200000, // February 3, 2024
		},
		{
			id: "106",
			title: "نقره به طور غیرعادی در مقابل طلا پایین است | هشدارهای جدید درباره وعده‌های کاغذی",
			image: DEFAULT_IMAGE,
			date: 1704537600000, // February 4, 2024
		},
	],
	announcements: [
		{
			id: "201",
			title: "اعلان: به علت یک اشتباه داخلی در تنظیمات سرورها، سیستم‌های اصلی ما برای چند ساعت به مشکل برخوردند؛ تیم فنی به سرعت در حال رفع آن هستند.",
			image: DEFAULT_IMAGE,
			date: 1704537600000, // February 4, 2024
		},
		{
			id: "202",
			title: "اعلان: به افتخار مشتریان وفادار، تخفیف‌های اختصاصی و ویژه‌ای در نظر گرفته شده است؛ از این پیشنهادات استثنایی حتماً بهره‌مند شوید.",
			image: DEFAULT_IMAGE,
			date: 1704624000000, // February 5, 2024
		},
		{
			id: "203",
			title: "اعلان: با امید به استقبال سال نو، جشنواره ویژه نوروز با تخفیف‌های تاکیدی و هدایا برای شما در راه است؛ از این فرصت استثنایی استفاده کنید.",
			image: DEFAULT_IMAGE,
			date: 1704710400000, // February 6, 2024
		},
		{
			id: "204",
			title: "اعلان: فروش ویژه آغاز شده است؛ از تخفیف‌های ویژه برخوردار شده و هم اکنون به خرید محصولات اختصاصی بپردازید.",
			image: DEFAULT_IMAGE,
			date: 1704796800000, // February 7, 2024
		},
		{
			id: "205",
			title: "اعلان: پس از بررسی‌های دقیق بازار، تغییرات چشمگیری در قیمت‌ها اعمال گردیده است؛ برای کسب اطلاعات بیشتر و بهره‌مندی از به‌روزرسانی‌ها به وبسایت ما مراجعه کنید.",
			image: DEFAULT_IMAGE,
			date: 1704883200000, // February 8, 2024
		},
	],
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
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "2",
			categoryId: "3", // "شمش نقره" → silver bullion
			title: "شمش نقره",
			description: "شمش نقره ۱۰۰ گرمی",
			image: DEFAULT_IMAGE,
			price: 2_500_000,
			tag: "جدید",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "3",
			categoryId: "2", // "سکه پلاتین" → falls back to gold coin
			title: "سکه پلاتین",
			description: "سکه پلاتین ۱ انس",
			image: DEFAULT_IMAGE,
			price: 45_000_000,
			tag: "محدود",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "4",
			categoryId: "4", // "شمش طلا" → gold bullion
			title: "شمش طلا",
			description: "شمش طلا ۵۰ گرمی",
			image: DEFAULT_IMAGE,
			price: 85_000_000,
			tag: "ویژه",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "5",
			categoryId: "2", // "ربع سکه" → assumed gold coin
			title: "ربع سکه",
			description: "ربع سکه بهار آزادی",
			image: DEFAULT_IMAGE,
			price: 8_000_000,
			tag: "پرفروش",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		// Featured products
		{
			id: "6",
			categoryId: "2", // "کروگرند - ۱ اونس طلای ۲۲ عیار" → gold coin (no "شمش" → coin)
			title: "کروگرند ۱ اونس طلای ۲۲ عیار",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: true,
			price: 10_000_000,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "7",
			categoryId: "4", // "شمش پلاتین - ۱۰ اونس" → bullion; assign to gold bullion
			title: "شمش پلاتین ۱۰ اونس",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: false,
			price: 10_000_000,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "8",
			categoryId: "7", // "شمش مس گایگر - ۱۰ AVDP OZ، خلوص ۹۹۹۹" → copper product → category "مس"
			title: "شمش مس گایگر ۱۰، خلوص ۹۹۹۹",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: false,
			price: 10_000_000,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "9",
			categoryId: "1", // "گلدپنر - سکه نقره ۱ اونسی قابل تقسیم" → silver coin
			title: "گلدپنر سکه نقره ۱ اونسی قابل تقسیم",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: false,
			price: 10_000_000,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "10",
			categoryId: "4", // "شمش طلا ۱۰۰ گرمی (برند انتخابی)" → gold bullion
			title: "شمش طلا ۱۰۰ گرمی (برند انتخابی)",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: false,
			price: 10_000_000,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		// Hot Items
		{
			id: "11",
			categoryId: "2", // "سکه فیلارمونیک اتریش - ۱/۲۵ اونس طلا" → gold coin
			title: "سکه فیلارمونیک اتریش ۱/۲۵ اونس طلا",
			description: "",
			image: DEFAULT_IMAGE,
			price: 154_100_000,
			hot: true,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "12",
			categoryId: "3", // "شمش نقره رویال کانادین - ۱۰ اونس" → silver bullion
			title: "شمش نقره رویال کانادین ۱۰ اونس",
			description: "",
			image: DEFAULT_IMAGE,
			price: 347_600_000,
			hot: true,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "13",
			categoryId: "1", // "نیم دلار کندی نقره ۴۰٪" → silver coin
			title: "نیم دلار کندی نقره ۴۰٪",
			description: "",
			image: DEFAULT_IMAGE,
			price: 9_580_000,
			hot: true,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "14",
			categoryId: "4", // "شمش طلا ۱ اونسی (برند انتخابی)" → gold bullion
			title: "شمش طلا ۱ اونسی (برند انتخابی)",
			description: "",
			image: DEFAULT_IMAGE,
			price: 2_810_450_000,
			hot: true,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "15",
			categoryId: "4", // "بسته مخلوط گلدبک - ۱/۱۰۰۰ تروی اونس" → gold bullion (assumed)
			title: "بسته مخلوط گلدبک ۱/۱۰۰۰ تروی اونس",
			description: "",
			image: DEFAULT_IMAGE,
			price: 34_030_000,
			hot: true,
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
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
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "2",
			name: "طلا",
			type: "سکه",
			typeColor: "سکه‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "3",
			name: "نقره",
			type: "شمش",
			typeColor: "شمش‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "4",
			name: "طلا",
			type: "شمش",
			typeColor: "شمش‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "5",
			name: "نقره",
			type: "پولک",
			typeColor: "پولک‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "6",
			name: "طلا",
			type: "پولک",
			typeColor: "پولک‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
		{
			id: "7",
			name: "خرید",
			type: "مس",
			typeColor: "مس",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: "2023-01-01T00:00:00Z",
			updatedAt: "2023-01-01T00:00:00Z",
		},
	],
	basket: [
		{ productId: "1", quantity: 2 },
		{ productId: "7", quantity: 1 },
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
