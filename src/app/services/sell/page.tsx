"use client";

import { BadgeDollarSign, Check, Clock, FileText, Scale, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function SellServicePage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10" dir="rtl">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">فروش طلا</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">با بهترین قیمت و شرایط، طلای خود را به ما بفروشید</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <Card className="w-full">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">قیمت خرید امروز</CardTitle>
                    <CardDescription>آخرین به‌روزرسانی: ۱۴۰۳/۰۴/۰۵ ساعت ۱۰:۰۰</CardDescription>
                  </div>
                  <Badge variant="outline" className="px-3 py-1.5 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 ml-0.5" />
                    <span>زنده</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "طلای ۱۸ عیار",
                      price: "۸۲,۳۵۰,۰۰۰",
                      change: "+۱.۲%",
                      positive: true,
                    },
                    {
                      title: "طلای ۲۴ عیار",
                      price: "۱۰۹,۸۰۰,۰۰۰",
                      change: "+۰.۸%",
                      positive: true,
                    },
                    {
                      title: "سکه امامی",
                      price: "۱۲۸,۵۰۰,۰۰۰",
                      change: "+۰.۵%",
                      positive: true,
                    },
                    {
                      title: "سکه بهار آزادی",
                      price: "۱۲۰,۳۰۰,۰۰۰",
                      change: "-۰.۲%",
                      positive: false,
                    },
                  ].map((item, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <Badge variant={item.positive ? "default" : "destructive"} className="text-xs">
                          {item.change}
                        </Badge>
                      </div>
                      <div className="text-xl font-bold flex items-center gap-1">
                        {item.price}
                        <span className="text-sm font-normal text-muted-foreground">تومان</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-right">مراحل فروش طلا</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "ارزیابی اولیه",
                    description: "تصویر طلا یا جواهرات خود را برای ما ارسال کنید تا ارزیابی اولیه انجام شود",
                    icon: <Scale className="h-5 w-5 text-primary" />
                  },
                  {
                    title: "مراجعه حضوری",
                    description: "برای ارزیابی دقیق و کارشناسی به یکی از شعب ما مراجعه کنید",
                    icon: <FileText className="h-5 w-5 text-primary" />
                  },
                  {
                    title: "پرداخت وجه",
                    description: "پس از تایید قیمت، وجه به صورت آنی به حساب شما واریز می‌شود",
                    icon: <BadgeDollarSign className="h-5 w-5 text-primary" />
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start w-full bg-muted/20 rounded-lg p-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="text-right">
                      <h3 className="font-medium">{index + 1}. {item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Alert className="text-right">
              <Sparkles className="h-4 w-4 ml-2" />
              <AlertTitle>پیشنهاد ویژه</AlertTitle>
              <AlertDescription>
                با فروش طلا به ارزش بیش از ۵۰ میلیون تومان، از ۵٪ کارمزد بیشتر بهره‌مند شوید.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-right">سؤالات متداول</h2>
              
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "چه نوع طلا و جواهراتی را می‌توانم بفروشم؟",
                    answer: "شما می‌توانید انواع طلا، سکه، جواهرات، شمش و... را به ما بفروشید. تنها محدودیت این است که کالا باید اصل و دارای عیار مشخص باشد."
                  },
                  {
                    question: "قیمت خرید طلا چگونه محاسبه می‌شود؟",
                    answer: "قیمت خرید بر اساس عیار طلا، وزن و قیمت روز بازار محاسبه می‌شود. برای جواهرات، قیمت سنگ‌ها نیز به صورت جداگانه محاسبه می‌شود."
                  },
                  {
                    question: "آیا کارمزد یا هزینه‌ای برای فروش طلا دریافت می‌شود؟",
                    answer: "بله، برای خدمات کارشناسی و معامله، کارمزدی معادل ۲ تا ۵ درصد از ارزش طلا (بسته به نوع و مقدار) دریافت می‌شود."
                  },
                  {
                    question: "آیا امکان ارسال طلا از شهرستان وجود دارد؟",
                    answer: "خیر، برای حفظ امنیت و اطمینان از اصالت کالا، نیاز به مراجعه حضوری به یکی از شعب ما در تهران یا شهرهای بزرگ وجود دارد."
                  }
                ].map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-right">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-right">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="sticky top-6 w-full">
              <CardHeader className="text-right">
                <CardTitle>فرم درخواست فروش طلا</CardTitle>
                <CardDescription>اطلاعات اولیه را وارد کنید تا با شما تماس بگیریم</CardDescription>
              </CardHeader>
              <CardContent className="text-right">
                <div className="rounded-lg overflow-hidden relative h-40 mb-4 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1610447985940-c561a752cf22?q=80&w=1780&auto=format&fit=crop"
                    alt="فروش طلا"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-medium">مزایای فروش طلا به ما</div>
                    <ul className="space-y-2">
                      {[
                        "پرداخت نقدی و بدون تاخیر",
                        "قیمت عادلانه بر اساس نرخ روز",
                        "امکان معاوضه با محصولات جدید",
                        "بدون محدودیت در مقدار"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary ml-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div className="text-center space-y-1">
                    <p className="text-sm text-muted-foreground">برای دریافت مشاوره رایگان تماس بگیرید</p>
                    <div className="font-bold text-lg">۰۲۱-۸۸۷۷۶۶۵۵</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">ثبت درخواست فروش</Button>
              </CardFooter>
            </Card>
            
            <Card className="w-full">
              <CardHeader className="pb-2 text-right">
                <CardTitle>نشانی شعبه مرکزی</CardTitle>
              </CardHeader>
              <CardContent className="text-right">
                <p className="text-muted-foreground">تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۲۴۵۶</p>
                <p className="font-medium mt-2">ساعات کاری: شنبه تا پنجشنبه ۱۰ صبح تا ۸ شب</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 