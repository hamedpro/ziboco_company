import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function NewsletterIRA() {
  return (
    <div className="bg-[#2851A3] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Newsletter Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">
                دریافت به‌روزرسانی‌های <span className="italic">رایگان</span>!
              </h2>
              <p className="text-gray-200">
                آخرین اخبار و تخفیف‌های فلزات گرانبها را دریافت کنید. به بیش از ۱ میلیون سرمایه‌گذار آگاه بپیوندید.
              </p>
            </div>

            <form className="space-y-4">
              <div className="flex gap-2">
                <Input type="email" placeholder="ایمیل خود را وارد کنید" className="bg-white text-black" />
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap px-8">
                  ثبت‌نام کنید!
                </Button>
              </div>
              <p className="text-sm text-gray-300">
                ما به حفاظت از اطلاعات شما اهمیت می‌دهیم.
                <a href="#" className="underline hover:text-white">
                  سیاست حریم خصوصی
                </a>{" "}
                ما را مطالعه کنید.
              </p>
            </form>
          </div>

          {/* IRA Section */}
          <div className="bg-[#1a2847] p-8 rounded-lg relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-serif mb-2">
                بازنشستگی خود را
                <br />
                <span className="italic">تأمین</span> کنید
              </h2>
              <p className="text-xl mb-6">IRA فلزات گرانبها</p>
              <Button variant="secondary" className="bg-white text-black hover:bg-gray-100">
                بیشتر بدانید →
              </Button>
            </div>
            <div className="absolute bottom-0 left-0">
              <Image
                src="/placeholder.svg"
                alt="Golden eggs in nest"
                width={192}
                height={192}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="space-y-2">
            <h3 className="font-bold text-xl">بیش از ۴$ میلیارد</h3>
            <p className="text-gray-200">در معاملات مورد اعتماد</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-xl">ارسال رایگان</h3>
            <p className="text-gray-200">برای سفارشات بالای ۱۹۹$</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-xl">بهترین کلی</h3>
            <p className="text-gray-200">رتبه ۱ در Investopedia</p>
          </div>
        </div>
      </div>
    </div>
  )
}

