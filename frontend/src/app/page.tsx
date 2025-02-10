"use client";
import TopHeader from "@/components/top-header";
import MainHeader from "@/components/main-header";
import PriceTicker from "@/components/price-ticker";
import Navigation from "@/components/navigation";
import PopularCategories from "@/components/popular-categories";
import FeaturedProducts from "@/components/featured-products";
import NewsViews from "@/components/news-views";
import Footer from "@/components/footer";
// import { BreadCrumb } from "@/components/BreadCrumb";
import { Introduction } from "@/components/Introduction";
import TabbedContent from "@/components/tabbed-content/TabbedContent";

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
			<TabbedContent />
			<NewsViews />
			<FeaturedProducts />
			<Footer />
		</div>
	);
}
