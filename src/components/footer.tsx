import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { IconBrandInstagram, IconBrandTelegram, IconBrandWhatsapp, IconBrandYoutube, IconBrandLinkedin, IconMapPin, IconPhone, IconMail, IconShield, IconCertificate, IconTrophy } from "@tabler/icons-react";
import LogoGrid from "./LogoGrid";

export function Footer() {
  return (
    <div className="w-full border-t-[1px] border-neutral-200 pt-12 pb-8 lg:pt-16 lg:pb-12 dir-rtl" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:gap-6">
          <div className="md:flex md:gap-6 lg:w-1/2">
            <div className="md:w-1/3 md:border-l-[1px] border-l-neutral-200 pr-4">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-6">دسترسی سریع</h3>
              <div className="space-y-4">
                <Link className="flex gap-2 items-center text-base hover:text-primary-golden transition-colors" href="/">
                  <div className="w-[10px] h-[10px] border-[2px] border-primary-golden-tint rounded-full"></div>
                  <span className="text-neutral-700">صفحه اصلی</span>
                </Link>
                <Link className="flex gap-2 items-center text-base hover:text-primary-golden transition-colors" href="/products">
                  <div className="w-[10px] h-[10px] border-[2px] border-primary-golden-tint rounded-full"></div>
                  <span className="text-neutral-700">محصولات ما</span>
                </Link>
                <Link className="flex gap-2 items-center text-base hover:text-primary-golden transition-colors" href="/investment">
                  <div className="w-[10px] h-[10px] border-[2px] border-primary-golden-tint rounded-full"></div>
                  <span className="text-neutral-700">سرمایه‌گذاری</span>
                </Link>
                <Link className="flex gap-2 items-center text-base hover:text-primary-golden transition-colors" href="/blog">
                  <div className="w-[10px] h-[10px] border-[2px] border-primary-golden-tint rounded-full"></div>
                  <span className="text-neutral-700">مجله تخصصی</span>
                </Link>
                <Link className="flex gap-2 items-center text-base hover:text-primary-golden transition-colors" href="/privacy">
                  <div className="w-[10px] h-[10px] border-[2px] border-primary-golden-tint rounded-full"></div>
                  <span className="text-neutral-700">قوانین و مقررات</span>
                </Link>
                <Link className="flex gap-2 items-center text-base hover:text-primary-golden transition-colors" href="/representation-request">
                  <div className="w-[10px] h-[10px] border-[2px] border-primary-golden-tint rounded-full"></div>
                  <span className="text-neutral-700">درخواست نمایندگی</span>
                </Link>
                <Link className="flex gap-2 items-center text-base hover:text-primary-golden transition-colors" href="/about-us">
                  <div className="w-[10px] h-[10px] border-[2px] border-primary-golden-tint rounded-full"></div>
                  <span className="text-neutral-700">درباره ما</span>
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-2/3 lg:border-l-[1px] lg:border-l-neutral-200 lg:pl-10 lg:pr-6">
              <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-6">تماس با زیبوکو</h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-full bg-primary-golden/10 text-primary-golden">
                    <IconMapPin size={18} />
                  </div>
                  <div>
                    <p className="text-base font-medium text-neutral-800">دفتر مرکزی:</p>
                    <p className="text-sm text-neutral-700">تهران، خیابان ولیعصر، برج زیبوکو، طبقه 12، واحد 1204</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-full bg-primary-golden/10 text-primary-golden">
                    <IconPhone size={18} />
                  </div>
                  <div>
                    <p className="text-base font-medium text-neutral-800">شماره تماس:</p>
                    <p className="text-sm text-neutral-700 font-medium" dir="ltr">021-88776655 (10 خط)</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-full bg-primary-golden/10 text-primary-golden">
                    <IconMail size={18} />
                  </div>
                  <div>
                    <p className="text-base font-medium text-neutral-800">ایمیل:</p>
                    <p className="text-sm text-neutral-700 font-medium" dir="ltr">info@ziboco.com</p>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1 bg-primary-golden/5 px-3 py-1.5 rounded-full">
                      <IconShield size={16} className="text-primary-golden" />
                      <span className="text-xs font-medium">ضمانت اصالت کالا</span>
                    </div>
                    <div className="flex items-center gap-1 bg-primary-golden/5 px-3 py-1.5 rounded-full">
                      <IconCertificate size={16} className="text-primary-golden" />
                      <span className="text-xs font-medium">دارای مجوز رسمی</span>
                    </div>
                    <div className="flex items-center gap-1 bg-primary-golden/5 px-3 py-1.5 rounded-full">
                      <IconTrophy size={16} className="text-primary-golden" />
                      <span className="text-xs font-medium">برند برتر سال 1402</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pr-6">
            <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-6">درباره زیبوکو</h3>
            <p className="text-base text-neutral-700 leading-[170%] text-justify">
              زیبوکو به عنوان پیشگام در عرصه سرمایه‌گذاری طلا و فلزات گرانبها، از سال 1394 فعالیت خود را آغاز کرده است. ما با بیش از یک دهه تجربه در بازارهای مالی، بستری امن و شفاف برای خرید، فروش و سرمایه‌گذاری در طلا، نقره و سایر فلزات ارزشمند فراهم کرده‌ایم.
            </p>
            <p className="text-base text-neutral-700 leading-[170%] text-justify mt-4">
              مجموعه زیبوکو با اتکا به تیم متخصص و حرفه‌ای، همواره به دنبال ارائه خدمات نوآورانه و متمایز بوده است. با استفاده از فناوری‌های پیشرفته، تمامی فرآیندهای خرید، فروش و نگهداری در امن‌ترین شرایط انجام می‌شود. محصولات ما دارای گواهی اصالت و ضمانتنامه رسمی هستند.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="border border-primary-golden/30 rounded p-3 flex flex-col items-center justify-center w-24 h-24">
                <p className="text-lg font-bold text-primary-golden">+۲۵,۰۰۰</p>
                <p className="text-xs text-neutral-600 text-center mt-1">مشتری فعال</p>
              </div>
              <div className="border border-primary-golden/30 rounded p-3 flex flex-col items-center justify-center w-24 h-24">
                <p className="text-lg font-bold text-primary-golden">۹ سال</p>
                <p className="text-xs text-neutral-600 text-center mt-1">سابقه فعالیت</p>
              </div>
              <div className="border border-primary-golden/30 rounded p-3 flex flex-col items-center justify-center w-24 h-24">
                <p className="text-lg font-bold text-primary-golden">۱۰۰٪</p>
                <p className="text-xs text-neutral-600 text-center mt-1">تضمین کیفیت</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logo Grid Section */}
        <div className="mt-12">
          <LogoGrid />
        </div>
        
        <div className="mt-8 mb-8 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-l from-primary-golden/10 via-primary-golden/30 to-primary-golden/10 py-5 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center">
                <span className="ml-2">ما را در شبکه های اجتماعی دنبال کنید</span>
                <span className="h-[1px] w-10 bg-primary-golden/50 hidden md:block"></span>
              </h3>
              <div className="flex items-center gap-3">
                <Link href="#" className="p-2.5 rounded-full bg-white hover:bg-white/90 transition-all hover:shadow-md text-primary-golden hover:scale-105 duration-300">
                  <IconBrandInstagram size={20} stroke={1.5} />
                </Link>
                <Link href="#" className="p-2.5 rounded-full bg-white hover:bg-white/90 transition-all hover:shadow-md text-primary-golden hover:scale-105 duration-300">
                  <IconBrandTelegram size={20} stroke={1.5} />
                </Link>
                <Link href="#" className="p-2.5 rounded-full bg-white hover:bg-white/90 transition-all hover:shadow-md text-primary-golden hover:scale-105 duration-300">
                  <IconBrandWhatsapp size={20} stroke={1.5} />
                </Link>
                <Link href="#" className="p-2.5 rounded-full bg-white hover:bg-white/90 transition-all hover:shadow-md text-primary-golden hover:scale-105 duration-300">
                  <IconBrandYoutube size={20} stroke={1.5} />
                </Link>
                <Link href="#" className="p-2.5 rounded-full bg-white hover:bg-white/90 transition-all hover:shadow-md text-primary-golden hover:scale-105 duration-300">
                  <IconBrandLinkedin size={20} stroke={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-neutral-200" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p>© تمامی حقوق برای شرکت زیبوکو محفوظ است - {new Date().getFullYear()}</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary-golden transition-colors">حریم خصوصی</Link>
            <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
            <Link href="/terms" className="hover:text-primary-golden transition-colors">شرایط استفاده</Link>
            <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
            <Link href="/faq" className="hover:text-primary-golden transition-colors">سوالات متداول</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
