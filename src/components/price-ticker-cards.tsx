"use client";

import { useState, useEffect } from "react";
import { fetchMetalPrices } from "@/API";
import { getPersianValue } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

interface MetalPrice {
  name: string;
  price: number;
  change: number;
}

// Helper function to pair items for the card layout
const pairItems = (items: MetalPrice[]): [MetalPrice, MetalPrice][] => {
  const result: [MetalPrice, MetalPrice][] = [];
  
  // Create default items in case we don't have enough data
  const defaultItem: MetalPrice = {
    name: "در حال بارگذاری",
    price: 0,
    change: 0
  };
  
  // Ensure we have an even number of items by adding a default if needed
  const paddedItems = [...items];
  if (paddedItems.length % 2 !== 0) {
    paddedItems.push(defaultItem);
  }
  
  // Pair items
  for (let i = 0; i < paddedItems.length; i += 2) {
    result.push([paddedItems[i], paddedItems[i + 1] || defaultItem]);
  }
  
  return result;
};

export default function PriceTickerCards() {
  const [prices, setPrices] = useState<MetalPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchMetalPrices();
        setPrices(data.map(item => ({
          name: item.title,
          price: item.price,
          change: item.change
        })));
        setError(null);
      } catch (err) {
        setError("خطا در دریافت اطلاعات قیمت فلزات");
        console.error("Error fetching prices:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, []);

  // Create paired items for the card layout
  const pairedPrices = pairItems(prices);
  
  // Determine the number of cards to display (max 5)
  const cardCount = Math.min(pairedPrices.length, 5);
  
  // Determine the appropriate grid columns based on card count
  const getGridCols = () => {
    if (cardCount <= 3) return "lg:grid-cols-3";
    if (cardCount === 4) return "lg:grid-cols-4";
    return "lg:grid-cols-5";
  };

  if (error) {
    return (
      <section className="w-full bg-white px-4 lg:px-10 2xl:px-[170px] py-[76px]" dir="rtl">
        <h2 className="text-center text-[24px] font-semibold mb-5 text-neutral-700 lg:text-[32px] lg:font-bold 2xl:text-[40px]">
          قیمت های لحظه ای
        </h2>
        <div className="text-center text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white px-4 lg:px-10 2xl:px-[170px] py-[76px]" dir="rtl">
      <h2 className="text-center text-[24px] font-semibold mb-5 text-neutral-700 lg:text-[32px] lg:font-bold 2xl:text-[40px]">
        قیمت های لحظه ای
      </h2>
      
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-wrap justify-center gap-4 md:gap-5 lg:grid ${getGridCols()} lg:gap-8`}>
          {loading ? (
            // Skeleton loader for cards - show 3 cards when loading
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-[#F2F5F8] rounded-[14px] relative flex flex-col items-center py-4 gap-3 w-[45%] md:w-[30%] lg:w-full">
                <div className="bg-neutral-800 rounded-b-16 w-7 h-[2px] absolute top-0"></div>
                <div className="flex flex-col items-center gap-2 w-full relative px-4">
                  <div className="animate-pulse bg-neutral-300 h-4 w-24 rounded"></div>
                  <div className="animate-pulse bg-neutral-300 h-5 w-32 rounded"></div>
                </div>
                <div className="w-full h-[1px] bg-[#F2DCDC]"></div>
                <div className="flex flex-col items-center gap-2 w-full relative px-4">
                  <div className="animate-pulse bg-neutral-300 h-4 w-24 rounded"></div>
                  <div className="animate-pulse bg-neutral-300 h-5 w-32 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual price cards - only show available cards
            pairedPrices.slice(0, cardCount).map((pair, index) => (
              <div key={index} className="bg-[#F2F5F8] rounded-[14px] relative flex flex-col items-center py-4 gap-3 w-[45%] md:w-[30%] lg:w-full">
                <div className="bg-neutral-800 rounded-b-16 w-7 h-[2px] absolute top-0"></div>
                
                {/* First item in pair */}
                <div className="flex flex-col items-center gap-2 w-full relative px-4">
                  <div className="flex justify-between w-full mb-1">
                    <span className="text-sm text-neutral-700">{pair[0].name}</span>
                    <div 
                      className={`flex items-center gap-1 text-sm ${
                        pair[0].change >= 0 ? "text-status-success-dark" : "text-red-600"
                      }`} 
                      dir="ltr"
                    >
                      {Math.abs(pair[0].change).toFixed(2)}
                      <div className="mb-1">
                        {pair[0].change >= 0 ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-neutral-800 text-base font-semibold">
                    {getPersianValue(pair[0].price.toString(), true)} ریال
                  </span>
                </div>
                
                <div className="w-full h-[1px] bg-[#F2DCDC]"></div>
                
                {/* Second item in pair */}
                <div className="flex flex-col items-center gap-2 w-full relative px-4">
                  <div className="flex justify-between w-full mb-1">
                    <span className="text-sm text-neutral-700">{pair[1].name}</span>
                    <div 
                      className={`flex items-center gap-1 text-sm ${
                        pair[1].change >= 0 ? "text-status-success-dark" : "text-red-600"
                      }`} 
                      dir="ltr"
                    >
                      {Math.abs(pair[1].change).toFixed(2)}
                      <div className="mb-1">
                        {pair[1].change >= 0 ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-neutral-800 text-base font-semibold">
                    {getPersianValue(pair[1].price.toString(), true)} ریال
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
} 