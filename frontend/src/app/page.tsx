import TopHeader from "@/components/top-header";
import MainHeader from "@/components/main-header";
import PriceTicker from "@/components/price-ticker";
import Navigation from "@/components/navigation";
import PopularCategories from "@/components/popular-categories";
import FeaturedProducts from "@/components/featured-products";
import HotItems from "@/components/hot-items";
import NewsViews from "@/components/news-views";
import Footer from "@/components/footer";
// import { BreadCrumb } from "@/components/BreadCrumb";
import { Introduction } from "@/components/Introduction";

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
			<TopHeader />
			<MainHeader />
			<Navigation />
			<PriceTicker />
			{/* <BreadCrumb className="px-4" /> */}
			<Introduction />
			<PopularCategories />
			<HotItems />
			<NewsViews />
			<FeaturedProducts />
			<Footer />
		</div>
	);
}
