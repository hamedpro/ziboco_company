"use client";
import PopularCategories from "@/components/popular-categories";
import FeaturedProducts from "@/components/featured-products";
import NewsViews from "@/components/news-views";
// import { BreadCrumb } from "@/components/BreadCrumb";
import { Introduction } from "@/components/Introduction";
import TabbedContent from "@/components/tabbed-content/TabbedContent";
import { Hero } from "@/components/Hero";
import PriceTickerCards from "@/components/price-ticker-cards";
import { ServicesWidget } from "@/components/services-widget";
import { BlogArticles } from "@/components/blog-articles";

export default function Home() {
  return (
    <>
      <Hero /> 
      <PriceTickerCards />
      <Introduction />
      <ServicesWidget />
      <BlogArticles />
    </>
  );
}
