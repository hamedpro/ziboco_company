"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchBlogPosts, BlogPostResponse } from "@/API";

export function BlogArticles() {
  const [articles, setArticles] = useState<BlogPostResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogPosts();
        setArticles(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("خطا در بارگذاری مقالات");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Safely display date without conversion
  const safelyDisplayDate = (timestamp: number) => {
    // If timestamp is valid, try to format it, otherwise return a fallback
    if (!timestamp) return 'تاریخ نامشخص';
    
    try {
      // First try Persian date formatting
      const date = new Date(timestamp * 1000);
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    } catch (e) {
      // If that fails, just return the timestamp as a string
      return `${timestamp}`;
    }
  };

  // Safely display time without conversion
  const safelyDisplayTime = (dateString: string) => {
    if (!dateString) return 'زمان نامشخص';
    
    try {
      // Try to extract time portion if it's a full ISO string
      if (dateString.includes('T')) {
        const timePart = dateString.split('T')[1].substring(0, 8);
        return timePart;
      }
      
      // Try to format as time
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If invalid date, return the string directly
        return dateString;
      }
      
      return date.toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      // If all else fails, return the string directly
      return dateString;
    }
  };

  // Generate excerpt from content
  const generateExcerpt = (content: string, maxLength = 100) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <section className="px-6 w-full lg:px-10 2xl:px-[170px] pt-[80px] pb-[40px] text-center" dir="rtl">
        <div className="h-60 flex items-center justify-center">
          <div className="animate-pulse">در حال بارگذاری مقالات...</div>
        </div>
      </section>
    );
  }

  if (error || articles.length === 0) {
    return null; // Don't show the section if there's an error or no articles
  }

  return (
    <section className="px-6 w-full lg:px-10 2xl:px-[170px] pt-[80px] pb-[40px]" dir="rtl">
      <div className="flex flex-col items-center text-center lg:text-right lg:flex-row lg:justify-between lg:items-end mb-5">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-[24px] font-semibold text-neutral-700 lg:text-[32px] lg:font-bold 2xl:text-[40px]">
            آخرین مقالات <span className="text-primary">زیبوکو</span>
          </h2>
          <p className="mt-2 leading-[180%] w-[calc(100%-20px)] 2xl:w-full">
            زیبوکو پیشرو در خرید و فروش شمش و پلاک‌های طلا و نقره، تجربه‌ای نوین و جامع را برای سرمایه‌گذاران فراهم کرده است.
          </p>
        </div>
        <Button 
          className="font-medium text-[18px] text-white bg-primary h-[48px] px-7 md:w-fit rounded-[8px] whitespace-nowrap"
          asChild
        >
          <a href="/blogs">
            مشاهده همه مقالات
          </a>
        </Button>
      </div>

      <div className="relative pb-14">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={"auto"}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination'
          }}
          dir="rtl"
          className="mt-6"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id} style={{ width: "367px" }}>
              <a href={`/blogs/${article.id}`}>
                <div className="bg-[#F2F5F8] rounded-[16px] p-4 h-60 flex flex-col justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-neutral-800 leading-[190%]">
                      {article.title}
                    </h2>
                    <div className="text-sm text-neutral-600 mt-[2px]">
                      <p>{generateExcerpt(article.content)}</p>
                    </div>
                  </div>
                  <div className="w-full bg-white mt-4 text-amber-600 flex text-sm justify-between items-center rounded-[6px] px-3 py-2">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75ZM16 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75ZM8.5 14.498c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.44-.29-.71 0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.2-.16.33-.21.36-.15.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29ZM12 14.499c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.44-.29-.71 0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.2-.16.33-.21.36-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29ZM15.5 14.499c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21l-.12-.15a.757.757 0 0 1-.09-.18.636.636 0 0 1-.06-.18c-.01-.07-.02-.14-.02-.2 0-.26.11-.52.29-.71.1-.09.2-.16.33-.21.37-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29ZM8.5 18c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.18-.19-.29-.45-.29-.71 0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.37-.37 1.05-.37 1.42 0 .18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM12 18c-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.37-.37 1.05-.37 1.42 0 .09.09.16.2.21.33.05.12.08.25.08.38 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM15.5 18c-.26 0-.52-.11-.71-.29a.933.933 0 0 1-.21-.33.995.995 0 0 1-.08-.38c0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.23-.23.58-.34.9-.27.07.01.13.03.19.06.06.02.12.05.18.09.05.03.1.08.15.12.18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM20.5 9.84h-17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h17c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="currentColor"></path>
                        <path d="M16 22.75H8c-3.65 0-5.75-2.1-5.75-5.75V8.5c0-3.65 2.1-5.75 5.75-5.75h8c3.65 0 5.75 2.1 5.75 5.75V17c0 3.65-2.1 5.75-5.75 5.75ZM8 4.25c-2.86 0-4.25 1.39-4.25 4.25V17c0 2.86 1.39 4.25 4.25 4.25h8c2.86 0 4.25-1.39 4.25-4.25V8.5c0-2.86-1.39-4.25-4.25-4.25H8Z" fill="currentColor"></path>
                      </svg>
                      {safelyDisplayDate(article.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75Zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75Z" fill="currentColor"></path>
                        <path d="M15.71 15.932a.67.67 0 0 1-.38-.11l-3.1-1.85c-.77-.46-1.34-1.47-1.34-2.36v-4.1c0-.41.34-.75.75-.75s.75.34.75.75v4.1c0 .36.3.89.61 1.07l3.1 1.85c.36.21.47.67.26 1.03a.77.77 0 0 1-.65.37Z" fill="currentColor"></path>
                      </svg>
                      {safelyDisplayTime(article.createDate)}
                    </div>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom navigation buttons with swapped positions for RTL */}
        <div className="custom-swiper-button-prev absolute top-1/2 right-0 z-10 transform -translate-y-1/2 text-primary w-10 h-10 flex items-center justify-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <div className="custom-swiper-button-next absolute top-1/2 left-0 z-10 transform -translate-y-1/2 text-primary w-10 h-10 flex items-center justify-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        
        {/* Custom pagination */}
        <div className="swiper-pagination absolute bottom-0 left-0 right-0 z-10 flex justify-center mt-6"></div>
      </div>
    </section>
  );
} 