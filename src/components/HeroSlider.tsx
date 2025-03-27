"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSliderContent, SliderContentResponse } from "@/API";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { LazyImage } from "./ui/lazy-image";

export const HeroSlider = () => {
  const [sliderContent, setSliderContent] = useState<SliderContentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    loadSliderContent();
  }, []);

  const loadSliderContent = async () => {
    try {
      const data = await fetchSliderContent();
      setSliderContent(data.sort((a, b) => a.order - b.order));
      setError(null);
    } catch (err) {
      setError("خطا در دریافت محتوای اسلایدر");
      console.error("Error fetching slider content:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <section className="bg-white py-12 px-4 lg:px-10 2xl:px-[170px]">
        <Card className="max-w-3xl mx-auto border-0 shadow-sm rounded-[20px] p-8 text-center">
          <div className="mb-6 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            خطا در دریافت اطلاعات
          </h3>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            متاسفانه در دریافت محتوای اسلایدر مشکلی پیش آمده است. لطفاً مجدداً تلاش
            کنید.
          </p>
          <Button
            onClick={() => {
              setError(null);
              setLoading(true);
              loadSliderContent();
            }}
            className="rounded-full"
          >
            تلاش مجدد
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 px-4 lg:px-10 2xl:px-[170px]" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <Carousel 
            className="w-full" 
            opts={{ 
              loop: true,
              align: "start",
              direction: "rtl"
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <CarouselItem key={`skeleton-${i}`}>
                    <div className="relative w-full">
                      <AspectRatio ratio={16 / 9} className="bg-neutral-200 rounded-lg overflow-hidden">
                        <Skeleton className="w-full h-full" />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                sliderContent.map((slide) => (
                  <CarouselItem key={slide.order}>
                    <div className="relative w-full">
                      <AspectRatio ratio={16 / 9} className="bg-neutral-200 rounded-lg overflow-hidden">
                        <Link href={slide.link} className="block w-full h-full">
                          <LazyImage
                            src={slide.imageUrl}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            priority
                            wrapperClassName="w-full h-full"
                            fallback={
                              <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-500">
                                <ImageOff className="h-12 w-12 mb-2" />
                                <p className="text-sm font-medium">تصویر قابل نمایش نیست</p>
                              </div>
                            }
                          />
                        </Link>
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            
            <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
              <Button 
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border-0 shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  api?.scrollPrev();
                }}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
              
              <Button 
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border-0 shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  api?.scrollNext();
                }}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}; 