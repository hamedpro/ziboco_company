import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Youtube, Twitter, Instagram, Linkedin } from "lucide-react"

const footerLinks = {
  resources: {
    title: "منابع",
    links: [
      { name: "اخبار طلا و نقره", href: "#" },
      { name: "خلاصه هفتگی بازار (پادکست)", href: "#" },
      { name: "مرکز آموزش", href: "#" },
      { name: "سوالات متداول", href: "#" },
      { name: "خبرنامه فصلی", href: "#" },
      { name: "فروش طلا و نقره", href: "#" },
      { name: "دایرکتوری محلی", href: "#" },
      { name: "ایمیل‌های لیست سفید", href: "#" },
    ],
  },
  company: {
    title: "شرکت",
    links: [
      { name: "درباره ما", href: "#" },
      { name: "تماس با ما", href: "#" },
      { name: "نظرات شرکت", href: "#" },
      { name: "سیاست حریم خصوصی", href: "#" },
      { name: "سیاست عدم افشا", href: "#" },
      { name: "تحویل و مرجوعی", href: "#" },
      { name: "شرایط استفاده و افشای قانونی", href: "#" },
    ],
  },
  programs: {
    title: "برنامه‌ها",
    links: [
      { name: "سپرده‌گذاری", href: "#" },
      { name: "طرح ماهانه", href: "#" },
      { name: "وام‌های با وثیقه", href: "#" },
      { name: "IRA خود مدیریتی", href: "#" },
      { name: "بورسیه طلا", href: "#" },
      { name: "برنامه معرفی", href: "#" },
      { name: "تبدیل شدن به نماینده", href: "#" },
    ],
  },
  learn: {
    title: "بیشتر بدانید",
    links: [
      { name: "قیمت طلا", href: "#" },
      { name: "قیمت نقره", href: "#" },
      { name: "قیمت پلاتین", href: "#" },
      { name: "قیمت پالادیوم", href: "#" },
      { name: "قیمت‌های مس", href: "#" },
      { name: "قیمت رودیوم", href: "#" },
      { name: "قیمت‌های ارز دیجیتال", href: "#" },
    ],
  },
}

const socialLinks = [
  { Icon: Facebook, href: "#" },
  { Icon: Youtube, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Linkedin, href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-[#2851A3] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Consultation Section */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2">مشاوره رایگان با متخصص</h3>
              <a href="tel:800.800.1865" className="text-3xl font-bold hover:text-gray-200">
                ۸۰۰.۸۰۰.۱۸۶۵
              </a>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold">دریافت به‌روزرسانی‌های رایگان</h4>
              <form className="space-y-2">
                <Input type="email" placeholder="ایمیل خود را وارد کنید" className="bg-white text-black" />
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  ثبت‌نام کنید!
                </Button>
              </form>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold">ما را دنبال کنید</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ Icon, href }, index) => (
                  <a key={index} href={href} className="text-white hover:text-gray-200 transition-colors">
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3 className="font-bold text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-200 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center mb-8">
          <Image src="/placeholder.svg" alt="BBB A+ Rating" width={100} height={50} className="object-contain" />
          <Image src="/placeholder.svg" alt="Best in USA" width={100} height={50} className="object-contain" />
          <Image src="/placeholder.svg" alt="VeriSign" width={100} height={50} className="object-contain" />
          <Image src="/placeholder.svg" alt="DigiCert" width={100} height={50} className="object-contain" />
          <Image src="/placeholder.svg" alt="Over $4 Billion" width={100} height={50} className="object-contain" />
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-blue-400 pt-8 text-sm text-gray-300">
          <div className="grid gap-4">
            <p className="text-center">© ۱۴۰۲ صرافی مانی متالز • صندوق پستی ۲۵۹۹ • ایگل، آیداهو • ۸۳۶۱۶-۹۱۲۰</p>
            <p className="text-center">
              <span>شرایط خدمات، استفاده و معاملات</span> ما و{" "}
              <a href="#" className="underline hover:text-white">
                سیاست حریم خصوصی
              </a>{" "}
              (مجموعاً، "سیاست‌ها") دسترسی و استفاده شما از این وبسایت را کنترل می‌کنند.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex justify-center gap-4 mt-8">
            {["visa", "mastercard", "amex", "discover", "paypal", "bitpay", "western-union"].map((payment) => (
              <Image
                key={payment}
                src="/placeholder.svg"
                alt={payment}
                width={40}
                height={25}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

