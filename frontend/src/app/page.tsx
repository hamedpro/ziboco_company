import TopHeader from "@/components/top-header";
import MainHeader from "@/components/main-header";
import PriceTicker from "@/components/price-ticker";
import Navigation from "@/components/navigation";
import CategoryCard from "@/components/category-card";
import PopularCategories from "@/components/popular-categories";
import FeaturedProducts from "@/components/featured-products";
import NewsSection from "@/components/news-section";
import HotItems from "@/components/hot-items";
import NewsViews from "@/components/news-views";
import NewsletterIRA from "@/components/newsletter-ira";
import Footer from "@/components/footer";
import { BreadCrumb } from "@/components/BreadCrumb";
import { Introduction } from "@/components/Introduction";

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
			<TopHeader />
			<MainHeader />
			<PriceTicker />
			<Navigation />
			<BreadCrumb className="px-4" />
			{/* Promotional Banner */}
			{/* <div className="bg-red-600 text-white text-center py-2">
				<a
					href="#"
					className="hover:underline"
				>
					پیشنهادات ویژه سکه و شمش طلا و نقره ←
				</a>
			</div> */}

			<Introduction />
			{/* <div className="max-w-7xl mx-auto py-8 px-4 flex-wrap flex justify-between gap-4">
				<CategoryCard
					title="نقره"
					subtitle="مشاهده سکه‌ها، پولک‌ها و شمش‌ها"
					imageSrc="/3dicons-medal-front-color-500-500.png"
					imageAlt="سکه نقره"
				/>
				<CategoryCard
					title="طلا"
					subtitle="مشاهده سکه‌ها، پولک‌ها و شمش‌ها"
					imageSrc="/3dicons-medal-front-color-500-500.png"
					imageAlt="سکه طلا"
				/>

				<CategoryCard
					title="سایر فلزات"
					subtitle="مس، پلاتین، پالادیوم، رودیوم"
					imageSrc="/3dicons-medal-front-color-500-500.png"
					imageAlt="سکه پلاتین"
				/>
				<CategoryCard
					title="خدمات"
					subtitle="نگهداری، طرح ماهانه، IRA و بیشتر"
					imageSrc="/3dicons-medal-front-color-500-500.png"
					imageAlt="شمش طلا"
				/>
			</div> */}
			<PopularCategories />
			<FeaturedProducts />
			<HotItems />
			<NewsSection />
			<NewsViews />
			<NewsletterIRA />
			<Footer />
		</div>
	);
}
