"use client";
import PopularCategories from "@/components/popular-categories";
import FeaturedProducts from "@/components/featured-products";
import NewsViews from "@/components/news-views";
// import { BreadCrumb } from "@/components/BreadCrumb";
import { Introduction } from "@/components/Introduction";
import TabbedContent from "@/components/tabbed-content/TabbedContent";

export default function Home() {
  return (
    <>
      {/* <BreadCrumb className="px-4" /> */}
      <Introduction />
      <PopularCategories />
      <TabbedContent />
      <NewsViews />
      <FeaturedProducts />
    </>
  );
}
