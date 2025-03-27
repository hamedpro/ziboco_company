"use client";

import { AtSign, Building2, Clock, Headphones, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus("success");
    // Reset form (would be handled by a real form submission)
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-10" dir="rtl">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">تماس با ما</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            برای ارتباط با کارشناسان ما، درخواست مشاوره یا پیگیری سفارش خود، از راه‌های ارتباطی زیر استفاده کنید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <Tabs defaultValue="contact-form" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="contact-form">فرم تماس</TabsTrigger>
                <TabsTrigger value="branches">شعب ما</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact-form" className="w-full mt-0">
                <Card className="w-full">
                  <CardHeader className="text-right pb-4">
                    <CardTitle>ارسال پیام</CardTitle>
                    <CardDescription>
                      پیام خود را برای ما ارسال کنید. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {formStatus === "success" ? (
                      <Alert className="bg-primary/10 border-primary/30 text-right">
                        <MessageSquare className="h-4 w-4 text-primary ml-2" />
                        <AlertTitle>پیام شما با موفقیت ارسال شد</AlertTitle>
                        <AlertDescription>
                          کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-4 text-right w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          <div className="space-y-2 w-full">
                            <Label htmlFor="name" className="block">نام و نام خانوادگی</Label>
                            <Input id="name" required className="w-full" />
                          </div>
                          <div className="space-y-2 w-full">
                            <Label htmlFor="phone" className="block">شماره تماس</Label>
                            <Input id="phone" required className="w-full" />
                          </div>
                        </div>
                        
                        <div className="space-y-2 w-full">
                          <Label htmlFor="email" className="block">ایمیل</Label>
                          <Input id="email" type="email" className="w-full" />
                        </div>
                        
                        <div className="space-y-2 w-full">
                          <Label htmlFor="subject" className="block">موضوع</Label>
                          <Input id="subject" required className="w-full" />
                        </div>
                        
                        <div className="space-y-2 w-full">
                          <Label htmlFor="message" className="block">پیام</Label>
                          <Textarea id="message" rows={5} required className="w-full resize-none" />
                        </div>
                        
                        <div className="flex justify-start">
                          <Button type="submit" className="flex items-center gap-2">
                            <Send className="h-4 w-4 ml-1" />
                            ارسال پیام
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="branches" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "شعبه مرکزی",
                      address: "تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۲۴۵۶",
                      phone: "۰۲۱-۸۸۷۷۶۶۵۵",
                      hours: "شنبه تا پنجشنبه: ۱۰ صبح تا ۸ شب"
                    },
                    {
                      name: "شعبه شمال",
                      address: "تهران، پاسداران، بوستان دوم، پلاک ۱۲",
                      phone: "۰۲۱-۲۲۳۳۴۴۵۵",
                      hours: "شنبه تا پنجشنبه: ۱۰ صبح تا ۷ شب"
                    },
                    {
                      name: "شعبه غرب",
                      address: "تهران، شهرک غرب، فاز ۳، خیابان فلامک، پلاک ۱۲۳",
                      phone: "۰۲۱-۸۸۱۱۲۲۳۳",
                      hours: "شنبه تا پنجشنبه: ۱۰ صبح تا ۸ شب"
                    },
                    {
                      name: "شعبه اصفهان",
                      address: "اصفهان، خیابان چهارباغ، جنب پاساژ کوثر، پلاک ۵۶",
                      phone: "۰۳۱-۳۴۵۶۷۸۹۰",
                      hours: "شنبه تا پنجشنبه: ۹ صبح تا ۷ شب"
                    }
                  ].map((branch, index) => (
                    <Card key={index} className="w-full">
                      <CardHeader className="pb-2 text-right">
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary ml-1" />
                          {branch.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-right">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0 ml-1" />
                          <span className="text-sm">{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground shrink-0 ml-1" />
                          <span className="text-sm">{branch.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0 ml-1" />
                          <span className="text-sm">{branch.hours}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="w-full">
              <CardHeader className="text-right">
                <CardTitle>راه‌های ارتباطی</CardTitle>
                <CardDescription>
                  از طریق راه‌های زیر با ما در ارتباط باشید
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-right">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">تماس با ما</h4>
                      <p className="text-sm text-muted-foreground">شماره تماس: ۰۲۱-۸۸۷۷۶۶۵۵</p>
                      <p className="text-sm text-muted-foreground">واتس‌اپ: ۰۹۱۲۱۲۳۴۵۶۷</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <AtSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">ایمیل</h4>
                      <p className="text-sm text-muted-foreground">info@ziboco.com</p>
                      <p className="text-sm text-muted-foreground">support@ziboco.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">نشانی دفتر مرکزی</h4>
                      <p className="text-sm text-muted-foreground">تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۲۴۵۶</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-right">
                  <h4 className="font-medium mb-2">ساعات کاری</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>شنبه تا چهارشنبه: ۸ صبح تا ۸ شب</p>
                    <p>پنجشنبه: ۹ صبح تا ۶ عصر</p>
                    <p>جمعه: تعطیل</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Headphones className="h-4 w-4 ml-1" />
                  درخواست تماس
                </Button>
              </CardFooter>
            </Card>
            
            <div className="rounded-lg border overflow-hidden h-[300px] relative w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103693.44857323502!2d51.30870407929686!3d35.70503774999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1686930493266!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 