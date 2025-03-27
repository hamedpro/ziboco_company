"use client";

import { CalendarIcon, CreditCard, HelpCircle, Package, Truck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function BuyServicePage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10" dir="rtl">
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">خرید آنلاین طلا و جواهرات</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">با بهترین قیمت و ضمانت اصالت، طلا و جواهرات مورد نظر خود را به راحتی خریداری کنید</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="process" className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-6">
                <TabsTrigger value="process">فرآیند خرید</TabsTrigger>
                <TabsTrigger value="guarantee">گارانتی و ضمانت</TabsTrigger>
                <TabsTrigger value="faq">سوالات متداول</TabsTrigger>
              </TabsList>
              
              <TabsContent value="process" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "انتخاب محصول",
                      description: "محصول مورد نظر خود را از میان مجموعه متنوع ما انتخاب کنید",
                      icon: <Package className="h-10 w-10 text-primary" />
                    },
                    {
                      title: "پرداخت امن",
                      description: "با استفاده از درگاه‌های پرداخت امن، خرید خود را تکمیل کنید",
                      icon: <CreditCard className="h-10 w-10 text-primary" />
                    },
                    {
                      title: "ارسال سریع",
                      description: "محصول شما با بسته‌بندی ویژه و به صورت بیمه شده ارسال می‌شود",
                      icon: <Truck className="h-10 w-10 text-primary" />
                    },
                    {
                      title: "پشتیبانی",
                      description: "در تمام مراحل خرید، کارشناسان ما آماده پاسخگویی هستند",
                      icon: <HelpCircle className="h-10 w-10 text-primary" />
                    }
                  ].map((item, index) => (
                    <Card key={index} className="border border-muted/60 w-full">
                      <CardHeader className="pb-2 text-right">
                        <div className="mb-2">{item.icon}</div>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-right">
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button asChild size="lg" className="px-8">
                    <Link href="/products">مشاهده محصولات</Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="guarantee" className="mt-0">
                <Card className="w-full">
                  <CardHeader className="text-right">
                    <CardTitle>ضمانت اصالت کالا</CardTitle>
                    <CardDescription>تمامی محصولات دارای گواهی اصالت هستند</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-right">
                    <p>تمامی محصولات ما دارای گواهی اصالت و شناسنامه معتبر هستند. کیفیت طلا و جواهرات ما مطابق با استانداردهای جهانی است.</p>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">ضمانت ۳۰ روزه بازگشت کالا</h4>
                          <p className="text-sm text-muted-foreground">در صورت عدم رضایت می‌توانید کالا را بازگرداند</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">پرداخت امن</h4>
                          <p className="text-sm text-muted-foreground">درگاه‌های پرداخت امن و معتبر</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-0 space-y-4">
                {[
                  {
                    question: "آیا امکان سفارش محصول سفارشی وجود دارد؟",
                    answer: "بله، شما می‌توانید طرح دلخواه خود را به ما ارسال کنید تا کارشناسان ما آن را بررسی و امکان ساخت آن را به شما اعلام کنند."
                  },
                  {
                    question: "هزینه ارسال به چه صورت محاسبه می‌شود؟",
                    answer: "هزینه ارسال بر اساس وزن محصول و مسافت محاسبه می‌شود. برای سفارش‌های بالای مبلغ مشخص، ارسال رایگان است."
                  },
                  {
                    question: "مدت زمان تحویل محصول چقدر است؟",
                    answer: "محصولات موجود در انبار معمولاً ظرف ۲ تا ۳ روز کاری به دست شما می‌رسند. برای محصولات سفارشی، زمان تحویل متغیر است."
                  },
                  {
                    question: "آیا امکان خرید اقساطی وجود دارد؟",
                    answer: "بله، برای خریدهای بالای مبلغ مشخص، امکان پرداخت اقساطی با کارت‌های اعتباری بانک‌های طرف قرارداد وجود دارد."
                  }
                ].map((item, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader className="text-right">
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-right">
                      <p className="text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="sticky top-6 w-full">
              <CardHeader className="pb-2 text-right">
                <CardTitle>مشاوره خرید</CardTitle>
                <CardDescription>با کارشناسان ما تماس بگیرید</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-right">
                <div className="rounded-lg overflow-hidden relative h-40 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1974&auto=format&fit=crop"
                    alt="مشاوره خرید طلا"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">کارشناسان ما آماده پاسخگویی به سوالات شما هستند</p>
                  <div className="font-medium">شماره تماس: ۰۲۱-۸۸۷۷۶۶۵۵</div>
                  <div className="font-medium">ساعات پاسخگویی: ۸ صبح تا ۸ شب</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">درخواست مشاوره</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 