export const DEFAULT_IMAGE = "/3dicons-medal-front-color-500-500.png";

export const SAMPLE_CONTENT = `در دنیای پرتلاطم امروز، سرمایه‌گذاری در فلزات گرانبها به یک استراتژی کلیدی برای حفظ ارزش دارایی‌ها تبدیل شده است. طلا و نقره، به عنوان پناهگاه‌های امن سنتی، همچنان توجه سرمایه‌گذاران را به خود جلب می‌کنند. در شرایط اقتصادی فعلی، با توجه به نوسانات ارزی و تورم جهانی، اهمیت این دارایی‌های ملموس بیش از پیش نمایان شده است.

تحلیلگران بازار معتقدند که روند صعودی قیمت فلزات گرانبها در سال‌های آینده ادامه خواهد داشت. عوامل متعددی از جمله تنش‌های ژئوپلیتیک، سیاست‌های پولی بانک‌های مرکزی و تقاضای صنعتی، همگی بر این روند تأثیرگذار هستند. به ویژه در بخش نقره، افزایش تقاضا در صنایع الکترونیک و انرژی‌های تجدیدپذیر، چشم‌انداز قیمتی این فلز را مثبت‌تر کرده است.

سرمایه‌گذاران خرد و کلان باید با دقت بیشتری بازار را رصد کنند و استراتژی‌های خود را متناسب با شرایط جدید تنظیم نمایند. تنوع‌بخشی به سبد سرمایه‌گذاری و توجه به نسبت‌های قیمتی طلا به نقره می‌تواند در اتخاذ تصمیمات سرمایه‌گذاری مؤثر باشد. همچنین، آگاهی از روندهای جهانی و تحلیل دقیق داده‌های اقتصادی برای موفقیت در این بازار ضروری است.`;

export const PRODUCT_SAMPLE_CONTENT = `این محصول یکی از برجسته‌ترین گزینه‌های سرمایه‌گذاری در بازار فلزات گرانبها است. با خلوص بالا و کیفیت استاندارد جهانی، این محصول توسط معتبرترین تولیدکنندگان بین‌المللی ضرب شده و دارای گواهی اصالت معتبر است. طراحی منحصر به فرد و جزئیات دقیق آن، نشان‌دهنده هنر و مهارت استادان این صنعت است.

این محصول با بهره‌گیری از پیشرفته‌ترین فناوری‌های روز دنیا تولید شده و تمامی استانداردهای بین‌المللی را رعایت می‌کند. هر قطعه دارای شماره سریال منحصر به فرد و بارکد اختصاصی است که امکان ردیابی و تأیید اصالت آن را فراهم می‌کند. بسته‌بندی حرفه‌ای و ایمن آن، از محصول در برابر آسیب‌های فیزیکی محافظت می‌کند.

سرمایه‌گذاری در این محصول، علاوه بر حفظ ارزش دارایی، امکان نقدشوندگی سریع را نیز فراهم می‌کند. با توجه به اعتبار جهانی تولیدکننده و کیفیت بالای محصول، ارزش آن در طول زمان حفظ شده و حتی می‌تواند افزایش یابد. این محصول برای سرمایه‌گذاران حرفه‌ای و تازه‌کار، گزینه‌ای مطمئن و قابل اعتماد است.`;

// Theme types
export type Theme = {
	topHeaderBannerOne: {
		text: string;
		url: string;
	};
	topHeaderBannerTwo: {
		text: string;
		url: string;
	};
};

// Blog type
export type Blog = {
	id: string;
	title: string;
	image: string;
	date: number; // JS epoch timestamp (e.g., 1704105600000 for 2024-01-01T00:00:00Z)
	content: string;
};

// Announcement type
export type Announcement = {
	id: string;
	title: string;
	image: string;
	date: number; // JS epoch timestamp (e.g., 1704105600000 for 2024-01-01T00:00:00Z)
	content: string;
};

// Product type
export type Product = {
	id: string;
	categoryId: string;
	title: string;
	description: string;
	image: string;
	price: number;
	priceWithDiscount?: number;
	tag?: string;
	onSale: boolean;
	hot: boolean;
	createdAt: number; // JS epoch timestamp (e.g., 1704105600000 for 2024-01-01T00:00:00Z)
	updatedAt: number; // JS epoch timestamp (e.g., 1704105600000 for 2024-01-01T00:00:00Z)
	content: string;
};

// Category type
export type Category = {
	id: string;
	name: string;
	type: string;
	typeColor: string;
	image: string;
	href: string;
	createdAt: number; // JS epoch timestamp (e.g., 1704105600000 for 2024-01-01T00:00:00Z)
	updatedAt: number; // JS epoch timestamp (e.g., 1704105600000 for 2024-01-01T00:00:00Z)
};

// Basket item type
export type BasketItem = {
	productId: string;
	quantity: number;
};

// Metal price type
export type MetalPrice = {
	name: string;
	price: number;
	change: number;
};

// Notification type
export type Notification = {
	id: string;
	title: string;
	content: string;
	date: number; // JS epoch timestamp (e.g., 1704105600000 for 2024-01-01T00:00:00Z)
	read: boolean;
};

// Main fakeData type
export type FakeDataType = {
	theme: Theme;
	blogs: Blog[];
	announcements: Announcement[];
	products: Product[];
	categories: Category[];
	basket: BasketItem[];
	metalPrices: MetalPrice[];
	notifications: Notification[];
};

// The actual fakeData object with type annotation
export const fakeData: FakeDataType = {
	theme: {
		topHeaderBannerOne: {
			text: "ارسال رایگان برای بالای ۵۰۰ هزار تومن",
			url: "/shipping-policy",
		},
		topHeaderBannerTwo: {
			text: "🔥 پیشنهادهای شگفت‌انگیز برای سکه‌ها و شمش‌های نقره و طلا",
			url: "/special-offers",
		},
	},
	// Removed previously defined newsItems and added blogs and announcements:
	blogs: [
		{
			id: "101",
			title: "این ۳ کاتالیزور می‌تواند بازار فلزات گرانبها را تقویت کند",
			image: DEFAULT_IMAGE,
			date: 1704105600000, // January 30, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "102",
			title: "دیوید مورگان: طلا، نقره و بقا در اقتصاد ترامپ",
			image: DEFAULT_IMAGE,
			date: 1704192000000, // January 31, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "103",
			title: "معرفی همکاران پول صدادار ۲۰۲۵",
			image: DEFAULT_IMAGE,
			date: 1704278400000, // February 1, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "104",
			title: "آیا سال ۲۰۲۵ می‌تواند سال درخشش نقره باشد؟",
			image: DEFAULT_IMAGE,
			date: 1704364800000, // February 2, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "105",
			title: "سه نکته‌ای که سرمایه‌گذاران باید خارج از دفتر رئیس جمهور در نظر بگیرند",
			image: DEFAULT_IMAGE,
			date: 1704451200000, // February 3, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "106",
			title: "نقره به طور غیرعادی در مقابل طلا پایین است | هشدارهای جدید درباره وعده‌های کاغذی",
			image: DEFAULT_IMAGE,
			date: 1704537600000, // February 4, 2024
			content: SAMPLE_CONTENT,
		},
	],
	announcements: [
		{
			id: "201",
			title: "اعلان: به علت یک اشتباه داخلی در تنظیمات سرورها، سیستم‌های اصلی ما برای چند ساعت به مشکل برخوردند؛ تیم فنی به سرعت در حال رفع آن هستند.",
			image: DEFAULT_IMAGE,
			date: 1704537600000, // February 4, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "202",
			title: "اعلان: به افتخار مشتریان وفادار، تخفیف‌های اختصاصی و ویژه‌ای در نظر گرفته شده است؛ از این پیشنهادات استثنایی حتماً بهره‌مند شوید.",
			image: DEFAULT_IMAGE,
			date: 1704624000000, // February 5, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "203",
			title: "اعلان: با امید به استقبال سال نو، جشنواره ویژه نوروز با تخفیف‌های تاکیدی و هدایا برای شما در راه است؛ از این فرصت استثنایی استفاده کنید.",
			image: DEFAULT_IMAGE,
			date: 1704710400000, // February 6, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "204",
			title: "اعلان: فروش ویژه آغاز شده است؛ از تخفیف‌های ویژه برخوردار شده و هم اکنون به خرید محصولات اختصاصی بپردازید.",
			image: DEFAULT_IMAGE,
			date: 1704796800000, // February 7, 2024
			content: SAMPLE_CONTENT,
		},
		{
			id: "205",
			title: "اعلان: پس از بررسی‌های دقیق بازار، تغییرات چشمگیری در قیمت‌ها اعمال گردیده است؛ برای کسب اطلاعات بیشتر و بهره‌مندی از به‌روزرسانی‌ها به وبسایت ما مراجعه کنید.",
			image: DEFAULT_IMAGE,
			date: 1704883200000, // February 8, 2024
			content: SAMPLE_CONTENT,
		},
	],
	products: [
		// Regular products
		{
			id: "1",
			categoryId: "2",
			title: "سکه طلا",
			description: "سکه تمام بهار آزادی",
			image: DEFAULT_IMAGE,
			price: 25_000_000,
			tag: "پرفروش",
			onSale: false,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "2",
			categoryId: "3",
			title: "شمش نقره",
			description: "شمش نقره ۱۰۰ گرمی",
			image: DEFAULT_IMAGE,
			price: 2_500_000,
			tag: "جدید",
			onSale: false,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "3",
			categoryId: "2",
			title: "سکه پلاتین",
			description: "سکه پلاتین ۱ انس",
			image: DEFAULT_IMAGE,
			price: 45_000_000,
			tag: "محدود",
			onSale: false,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "4",
			categoryId: "4",
			title: "شمش طلا",
			description: "شمش طلا ۵۰ گرمی",
			image: DEFAULT_IMAGE,
			price: 85_000_000,
			tag: "ویژه",
			onSale: false,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "5",
			categoryId: "2",
			title: "ربع سکه",
			description: "ربع سکه بهار آزادی",
			image: DEFAULT_IMAGE,
			price: 8_000_000,
			tag: "پرفروش",
			onSale: false,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		// Featured products
		{
			id: "6",
			categoryId: "2",
			title: "کروگرند ۱ اونس طلای ۲۲ عیار",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: true,
			price: 10_000_000,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "7",
			categoryId: "4",
			title: "شمش پلاتین ۱۰ اونس",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: false,
			price: 10_000_000,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "8",
			categoryId: "7",
			title: "شمش مس گایگر ۱۰، خلوص ۹۹۹۹",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: false,
			price: 10_000_000,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "9",
			categoryId: "1",
			title: "گلدپنر سکه نقره ۱ اونسی قابل تقسیم",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: false,
			price: 10_000_000,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "10",
			categoryId: "4",
			title: "شمش طلا ۱۰۰ گرمی (برند انتخابی)",
			description: "",
			image: DEFAULT_IMAGE,
			onSale: false,
			price: 10_000_000,
			hot: false,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		// Hot Items
		{
			id: "11",
			categoryId: "2",
			title: "سکه فیلارمونیک اتریش ۱/۲۵ اونس طلا",
			description: "",
			image: DEFAULT_IMAGE,
			price: 154_100_000,
			onSale: false,
			hot: true,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "12",
			categoryId: "3",
			title: "شمش نقره رویال کانادین ۱۰ اونس",
			description: "",
			image: DEFAULT_IMAGE,
			price: 347_600_000,
			onSale: false,
			hot: true,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "13",
			categoryId: "1",
			title: "نیم دلار کندی نقره ۴۰٪",
			description: "",
			image: DEFAULT_IMAGE,
			price: 9_580_000,
			onSale: false,
			hot: true,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "14",
			categoryId: "4",
			title: "شمش طلا ۱ اونسی (برند انتخابی)",
			description: "",
			image: DEFAULT_IMAGE,
			price: 2_810_450_000,
			onSale: false,
			hot: true,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
		},
		{
			id: "15",
			categoryId: "4",
			title: "بسته مخلوط گلدبک ۱/۱۰۰۰ تروی اونس",
			description: "",
			image: DEFAULT_IMAGE,
			price: 34_030_000,
			onSale: false,
			hot: true,
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
			content: PRODUCT_SAMPLE_CONTENT,
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
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
		},
		{
			id: "2",
			name: "طلا",
			type: "سکه",
			typeColor: "سکه‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
		},
		{
			id: "3",
			name: "نقره",
			type: "شمش",
			typeColor: "شمش‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
		},
		{
			id: "4",
			name: "طلا",
			type: "شمش",
			typeColor: "شمش‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
		},
		{
			id: "5",
			name: "نقره",
			type: "پولک",
			typeColor: "پولک‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
		},
		{
			id: "6",
			name: "طلا",
			type: "پولک",
			typeColor: "پولک‌ها",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
		},
		{
			id: "7",
			name: "خرید",
			type: "مس",
			typeColor: "مس",
			image: DEFAULT_IMAGE,
			href: "#",
			createdAt: 1704105600000,
			updatedAt: 1704105600000,
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
	notifications: [
		{
			id: "1",
			title: "تراکنش موفق",
			content: "سفارش شما با موفقیت ثبت شد و در انتظار پردازش است.",
			date: 1704883200000, // 2024-01-10
			read: false,
		},
		{
			id: "2",
			title: "تخفیف ویژه",
			content:
				"به مناسبت عید نوروز، ۱۰٪ تخفیف ویژه برای خرید شمش طلا در نظر گرفته شده است.",
			date: 1704796800000, // 2024-01-09
			read: true,
		},
		{
			id: "3",
			title: "به‌روزرسانی قیمت‌ها",
			content:
				"قیمت‌های جدید محصولات در سایت به‌روزرسانی شد. لطفاً قبل از خرید بررسی کنید.",
			date: 1704710400000, // 2024-01-08
			read: false,
		},
	],
};
