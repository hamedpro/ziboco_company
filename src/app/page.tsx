"use client";
import { Introduction } from "@/components/Introduction";
import { Hero } from "@/components/Hero";
import PriceTickerCards from "@/components/price-ticker-cards";
import { ServicesWidget } from "@/components/services-widget";
import { BlogArticles } from "@/components/blog-articles";
import { HeroSlider } from "@/components/HeroSlider";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero /> 
      <PriceTickerCards />
      <HeroSlider />
      <Introduction />
      <ServicesWidget />
      <BlogArticles />
      <Footer />
    </>
  );
}
