import TopHeader from "@/components/top-header"
import MainHeader from "@/components/main-header"
import PriceTicker from "@/components/price-ticker"
import Navigation from "@/components/navigation"
import CategoryCard from "@/components/category-card"
import PopularCategories from "@/components/popular-categories"
import FeaturedProducts from "@/components/featured-products"
import NewsSection from "@/components/news-section"
import HotItems from "@/components/hot-items"
import NewsViews from "@/components/news-views"
import NewsletterIRA from "@/components/newsletter-ira"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <MainHeader />
      <PriceTicker />
      <Navigation />

      {/* Promotional Banner */}
      <div className="bg-red-600 text-white text-center py-2">
        <a href="#" className="hover:underline">
          پیشنهادات ویژه سکه و شمش طلا و نقره ←
        </a>
      </div>

      {/* Main Categories */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <CategoryCard
            title="نقره"
            subtitle="مشاهده سکه‌ها، پولک‌ها و شمش‌ها"
            imageSrc="/placeholder.svg"
            imageAlt="سکه نقره"
          />
          <CategoryCard
            title="طلا"
            subtitle="مشاهده سکه‌ها، پولک‌ها و شمش‌ها"
            imageSrc="/placeholder.svg"
            imageAlt="سکه طلا"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <CategoryCard
            title="سایر فلزات"
            subtitle="مس، پلاتین، پالادیوم، رودیوم"
            imageSrc="/placeholder.svg"
            imageAlt="سکه پلاتین"
          />
          <CategoryCard
            title="خدمات"
            subtitle="نگهداری، طرح ماهانه، IRA و بیشتر"
            imageSrc="/placeholder.svg"
            imageAlt="شمش طلا"
          />
        </div>
      </div>

      <PopularCategories />
      <FeaturedProducts />
      <NewsSection />
      <HotItems />
      <NewsViews />
      <NewsletterIRA />
      <Footer />
    </div>
  )
}

