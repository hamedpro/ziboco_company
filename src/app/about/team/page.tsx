"use client";

import { BriefcaseIcon, GraduationCapIcon, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function TeamPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10" dir="rtl">
      <div className="space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold">تیم ما</h1>
          <p className="text-muted-foreground">
            تیم متخصص و حرفه‌ای ما با سال‌ها تجربه در صنعت طلا و جواهر، آماده ارائه بهترین خدمات به مشتریان عزیز هستند
          </p>
        </div>

        <div className="relative h-60 sm:h-80 w-full rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1974&auto=format&fit=crop"
            alt="تیم ما"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 right-0 text-white p-6 z-20">
            <h2 className="text-2xl font-bold">با افتخار از سال ۱۳۷۵</h2>
            <p className="max-w-md">در خدمت مشتریان عزیز با حفظ اصالت و کیفیت</p>
          </div>
        </div>

        <Tabs defaultValue="leadership" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto mb-8">
            <TabsTrigger value="leadership">مدیریت</TabsTrigger>
            <TabsTrigger value="experts">کارشناسان</TabsTrigger>
            <TabsTrigger value="customer-service">پشتیبانی</TabsTrigger>
          </TabsList>

          <TabsContent value="leadership" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "علی محمدی",
                  role: "مدیرعامل",
                  image: "https://randomuser.me/api/portraits/men/32.jpg",
                  experience: "۲۵ سال",
                  education: "دکتری مدیریت بازرگانی",
                  expertise: ["مدیریت استراتژیک", "توسعه کسب و کار", "بازاریابی"]
                },
                {
                  name: "سارا رضایی",
                  role: "مدیر مالی",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                  experience: "۱۵ سال",
                  education: "کارشناسی ارشد حسابداری",
                  expertise: ["مدیریت مالی", "حسابداری", "بودجه‌ریزی"]
                },
                {
                  name: "امیر حسینی",
                  role: "مدیر عملیات",
                  image: "https://randomuser.me/api/portraits/men/59.jpg",
                  experience: "۱۸ سال",
                  education: "کارشناسی ارشد MBA",
                  expertise: ["مدیریت تولید", "زنجیره تأمین", "کنترل کیفیت"]
                }
              ].map((person, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md w-full">
                  <div className="relative h-64 w-full">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="pt-4 text-right">
                    <div className="flex flex-col items-center text-center mb-4">
                      <h3 className="text-xl font-bold">{person.name}</h3>
                      <p className="text-primary font-medium">{person.role}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="h-4 w-4 text-muted-foreground ml-1" />
                        <span className="text-sm">تجربه: {person.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCapIcon className="h-4 w-4 text-muted-foreground ml-1" />
                        <span className="text-sm">تحصیلات: {person.education}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 pt-2">
                        {person.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experts" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "رضا کریمی",
                  role: "کارشناس ارشد طلا",
                  image: "https://randomuser.me/api/portraits/men/22.jpg",
                  expertise: ["ارزیابی طلا", "قیمت‌گذاری"]
                },
                {
                  name: "فاطمه احمدی",
                  role: "کارشناس جواهرات",
                  image: "https://randomuser.me/api/portraits/women/55.jpg",
                  expertise: ["ارزیابی الماس", "جواهرشناسی"]
                },
                {
                  name: "محمد حسینی",
                  role: "طراح طلا و جواهر",
                  image: "https://randomuser.me/api/portraits/men/42.jpg",
                  expertise: ["طراحی جواهرات", "مدل‌سازی ۳D"]
                },
                {
                  name: "نیلوفر محمدی",
                  role: "کارشناس ساعت",
                  image: "https://randomuser.me/api/portraits/women/33.jpg",
                  expertise: ["ارزیابی ساعت‌های لوکس", "تعمیرات"]
                },
                {
                  name: "بهروز تهرانی",
                  role: "متخصص سکه",
                  image: "https://randomuser.me/api/portraits/men/36.jpg",
                  expertise: ["ارزیابی سکه", "عتیقه‌جات"]
                },
                {
                  name: "مهسا رضایی",
                  role: "کارشناس فروش",
                  image: "https://randomuser.me/api/portraits/women/68.jpg",
                  expertise: ["مشاوره خرید", "بازاریابی"]
                },
                {
                  name: "امیرحسین نوری",
                  role: "تکنسین تولید",
                  image: "https://randomuser.me/api/portraits/men/63.jpg",
                  expertise: ["ساخت طلا", "تعمیرات"]
                },
                {
                  name: "زهرا اکبری",
                  role: "بازاریاب دیجیتال",
                  image: "https://randomuser.me/api/portraits/women/11.jpg",
                  expertise: ["دیجیتال مارکتینگ", "شبکه‌های اجتماعی"]
                }
              ].map((person, index) => (
                <Card key={index} className="overflow-hidden w-full">
                  <div className="p-4 flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-3">
                      <AvatarImage src={person.image} alt={person.name} />
                      <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold">{person.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{person.role}</p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {person.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customer-service" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 w-full">
                <div className="space-y-4 text-right">
                  <h3 className="text-xl font-bold">تیم پشتیبانی مشتریان</h3>
                  <p className="text-muted-foreground">تیم پشتیبانی ما به صورت ۷ روز هفته آماده پاسخگویی به سوالات و درخواست‌های شما می‌باشد.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="rounded-lg border p-4 w-full">
                      <div className="font-medium mb-2">ساعات پاسخگویی</div>
                      <div className="text-sm text-muted-foreground">شنبه تا چهارشنبه: ۸ صبح تا ۸ شب</div>
                      <div className="text-sm text-muted-foreground">پنجشنبه و جمعه: ۹ صبح تا ۵ عصر</div>
                    </div>
                    
                    <div className="rounded-lg border p-4 w-full">
                      <div className="font-medium mb-2">راه‌های ارتباطی</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground ml-1" />
                        <span>support@ziboco.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground ml-1" />
                        <span>تهران، خیابان ولیعصر، پلاک ۲۴۵۶</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-none w-full">
                <div className="p-6 space-y-4 text-right">
                  <h3 className="text-xl font-bold">کارشناسان پشتیبانی</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        name: "سمیرا رضایی",
                        role: "مدیر پشتیبانی",
                        image: "https://randomuser.me/api/portraits/women/22.jpg"
                      },
                      {
                        name: "علی محمدی",
                        role: "کارشناس پشتیبانی آنلاین",
                        image: "https://randomuser.me/api/portraits/men/53.jpg"
                      },
                      {
                        name: "زهرا حسینی",
                        role: "کارشناس رسیدگی به شکایات",
                        image: "https://randomuser.me/api/portraits/women/45.jpg"
                      }
                    ].map((person, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={person.image} alt={person.name} />
                          <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-sm text-muted-foreground">{person.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 