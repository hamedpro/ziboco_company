"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-10" dir="rtl">
      <div className="space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold">درباره زیبوکو</h1>
        </div>

        <div className="relative h-60 sm:h-80 w-full rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 opacity-80"></div>
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-10"></div>
          <div className="absolute bottom-0 right-0 text-white p-6 z-20">
            <h2 className="text-2xl font-bold">زیبوکو</h2>
            <p className="max-w-md">شکوه طلا؛ زیرکی صنعت؛ زیبایی هنر</p>
          </div>
        </div>

        <Card className="border-none shadow-md overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-justify">
              <p className="text-lg font-medium mb-6">
                هر شکوهی، جایی در دل یک رویا آغاز می‌شود.
                زیبوکو، روایتی است از رویایی که از دل خاک طلایی سر برآورد، با زیرکی آمیخته شد و بر بال‌های زیبایی به پرواز درآمد.
              </p>

              <p className="mb-6">
                زیبوکو، داستان تلاقی زیرکی و زیبایی است؛<br/>
                زیرکی که در ژرفای صنعت، معدن و اقتصاد ریشه دارد،<br/>
                و زیبایی که بر بال‌های خیال و هنر به پرواز درآمده است.
              </p>

              <p className="mb-6">
                این برند، میوه‌ی پیوندی خلاقانه میان دو قطب بزرگ است:<br/>
                شرکت تجارت الکترونیکی فناوران ساویس مرجان، که در دل خاک، گوهر طلا را می‌یابد و با زیرکی بی‌مثال، گنج‌های زمین را به ثروت بدل می‌کند؛<br/>
                و شرکت تابان الماس نامدار، که در جهان آی‌تی، فروش، برندینگ و هنر، به زیبایی جانی دوباره می‌بخشد و از تکنولوژی، پلی به سوی خیال می‌سازد.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-4">در قلب این رویا سه چهره‌ی درخشان ایستاده‌اند:</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">حسن آخوندپور</h4>
                  <p>هنرمند خلاق، نویسنده و کارگردانی که نغمه‌ی زیبایی را در گوش زیبوکو زمزمه کرد</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">دکتر میثم کرمانی</h4>
                  <p>معمار هوشمند اقتصاد و توسعه‌دهنده‌ی برندهای نامدار، که جادوی زیرکی را به جان آن دمید</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">مهندس هادی معماریان</h4>
                  <p>نابغه‌ی آی‌تی و الکترونیک، که ریشه‌های فناورانه‌ی این درخت زرین را استوار ساخت</p>
                </div>
              </div>

              <p className="mt-8">
                زیبوکو بیش از یک نام است؛<br/>
                زیبوکو قصیده‌ای است از طلا، شکوه، ظرافت و نبوغ.<br/>
                هر قطعه‌ای از زیبوکو، سرشار از خردِ صنعت و افسونِ هنر است؛<br/>
                روایتی از دستیابی به کمال، جایی که زیرکی به زیبایی پیوند می‌خورد و درخشان‌ترین جلوه‌ی خلاقیت انسانی را می‌آفریند.
              </p>

              <p className="mt-6 text-lg font-medium">
                اینجا، در زیبوکو، ما طلایی را می‌تراشیم که نه تنها درخشندگی دارد، بلکه روایتگر روحی است که در گذر زمان جاودان می‌شود.<br/>
                زیبوکو، شکوه طلا؛ زیرکی صنعت؛ زیبایی هنر.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 