"use client";
import PopularCategories from "@/components/popular-categories";
import FeaturedProducts from "@/components/featured-products";
import NewsViews from "@/components/news-views";
// import { BreadCrumb } from "@/components/BreadCrumb";
import { Introduction } from "@/components/Introduction";
import TabbedContent from "@/components/tabbed-content/TabbedContent";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      {/* <BreadCrumb className="px-4" /> */}
      <Hero /> 
      <Introduction />
      <PopularCategories />
      <TabbedContent />
      <NewsViews />
      <FeaturedProducts />
    </>
  );
}
