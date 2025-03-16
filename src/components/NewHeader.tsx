"use client";

import React from "react";
import {
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  ShoppingBag,
  Percent,
  Sparkles,
  CreditCard,
  BadgeDollarSign,
  Users,
  Mail,
  Wallet2,
  Wallet,
  ExternalLink,
  ChevronRight,
  SquareChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./logo";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import axios from "axios";
import { API_BASE_URL } from "../../configs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
// Path to Persian title mapping
const pathToBreadcrumb: Record<string, string> = {
  "": "صفحه اصلی",
  products: "محصولات",
  "products/latest": "جدیدترین ها",
  "products/hot": "محصولات پرطرفدار",
  "products/onsale": "تخفیف دار",
  services: "خدمات ما",
  "services/buy": "خرید آنلاین",
  "services/sell": "فروش طلا",
  about: "درباره ما",
  "about/team": "تیم ما",
  "about/contact": "تماس با ما",
  login: "ورود/ثبت نام",
  wallet: "دارایی های من",
  basket: "سبد خرید",
  profile: "پروفایل",
  announcements: "اطلاعیه ها",
  blogs: "وبلاگ",
  search: "جستجو",
  auth: "احراز هویت",
  "auth/entry": "ورود",
  "auth/verify-otp": "تایید کد",
  notifications: "اعلان ها",
};

export function NewHeader() {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<
    "loading" | "authenticated" | "unauthenticated" | "error"
  >("loading");
  const pathname = usePathname();
  const [showDebug, setShowDebug] = useState(false);

  // Toggle debug mode with Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setShowDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Generate breadcrumb items based on current path
  const getBreadcrumbs = () => {
    if (!pathname || pathname === "/") return [];

    // Remove leading slash and split path segments
    const segments = pathname.substring(1).split("/");
    const breadcrumbs = [];

    // Add home page
    breadcrumbs.push({
      href: "/",
      label: "صفحه اصلی",
    });

    // Add path segments
    let currentPath = "";
    for (let i = 0; i < segments.length; i++) {
      currentPath += (currentPath ? "/" : "") + segments[i];
      const isLast = i === segments.length - 1;

      breadcrumbs.push({
        href: "/" + currentPath,
        label: pathToBreadcrumb[currentPath] || segments[i],
        isLast,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");

      // If no token exists, user is not authenticated
      if (!accessToken) {
        setAuthStatus("unauthenticated");
        return;
      }

      try {
        const response = await axios.get("/api/profile", {
          baseURL: API_BASE_URL,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        // If request is successful, user is authenticated
        setAuthStatus("authenticated");
      } catch (error) {
        // If error is 401, user is not authenticated
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setAuthStatus("unauthenticated");
        } else {
          // For other errors, mark as error state
          console.error("Auth check error:", error);
          setAuthStatus("error");
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="flex flex-col" dir="rtl">
      {showDebug && (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 bg-black/80 p-3 rounded-lg text-white text-xs">
          <div>Debug Mode (Ctrl+Shift+D to hide)</div>
          <div className="flex gap-2">
            <button 
              onClick={() => setAuthStatus("loading")}
              className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-600"
            >
              Loading
            </button>
            <button 
              onClick={() => setAuthStatus("authenticated")}
              className="px-2 py-1 bg-green-500 rounded hover:bg-green-600"
            >
              Authenticated
            </button>
            <button 
              onClick={() => setAuthStatus("unauthenticated")}
              className="px-2 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Unauthenticated
            </button>
            <button 
              onClick={() => setAuthStatus("error")}
              className="px-2 py-1 bg-red-500 rounded hover:bg-red-600"
            >
              Error
            </button>
          </div>
          <div>Current state: {authStatus}</div>
        </div>
      )}
      {/* Desktop Header (lg and above) */}
      <div className="hidden lg:flex items-center justify-between p-8">
        <div className="flex items-center gap-x-4">
          <Logo />

          <NavigationMenu dir="rtl">
            <style jsx global>{`
              .nav-trigger-custom {
                color: hsl(var(--muted-foreground));
                font-weight: 500;
              }

              .nav-trigger-custom:hover {
                color: hsl(var(--foreground));
              }

              .nav-trigger-custom[data-state="open"] {
                color: hsl(var(--foreground));
              }

              .nav-trigger-custom [data-state="open"] > svg {
                transform: rotate(180deg);
              }

              .nav-trigger-custom > svg {
                margin-right: 8px;
                height: 22px;
                width: 22px;
                transition: transform 0.3s ease;
                color: hsl(var(--muted-foreground));
              }

              .nav-trigger-custom:hover > svg {
                color: hsl(var(--foreground));
              }
            `}</style>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link href="/#" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    صفحه اصلی
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-trigger-custom">
                  محصولات ما
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col w-[400px] gap-3 p-4">
                    {[
                      { href: "/products", icon: <ShoppingBag className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-y-[-1px]" />, label: "همه محصولات", color: "bg-slate-500" },
                      { href: "/products/hot", icon: <Sparkles className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-y-[-1px]" />, label: "محصولات پرطرفدار", color: "bg-amber-500" },
                      { href: "/products/onsale", icon: <Percent className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-y-[-1px]" />, label: "تخفیف دار", color: "bg-red-500" },
                      { href: "/products/latest", icon: <Sparkles className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-y-[-1px]" />, label: "جدیدترین ها", color: "bg-green-500" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="group flex flex-row items-center gap-4 select-none rounded-md bg-gradient-to-r from-muted/50 to-muted p-4 no-underline outline-none transition-all duration-300 hover:rounded-xl">
                          <div className={cn("h-10 w-10 shrink-0 rounded-md flex items-center justify-center transition-all duration-300 group-hover:rounded-xl", item.color)}>
                            {item.icon}
                          </div>
                          <div className="text-lg font-medium">{item.label}</div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-trigger-custom">
                  خدمات ما
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col w-[400px] gap-3 p-4">
                    {[
                      { href: "/services/buy", icon: <CreditCard className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-y-[-1px]" />, label: "خرید آنلاین", color: "bg-green-500" },
                      { href: "/services/sell", icon: <BadgeDollarSign className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-y-[-1px]" />, label: "فروش طلا", color: "bg-red-500" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="group flex flex-row items-center gap-4 select-none rounded-md bg-gradient-to-r from-muted/50 to-muted p-4 no-underline outline-none transition-all duration-300 hover:rounded-xl">
                          <div className={cn("h-10 w-10 shrink-0 rounded-md flex items-center justify-center transition-all duration-300 group-hover:rounded-xl", item.color)}>
                            {item.icon}
                          </div>
                          <div className="text-lg font-medium">{item.label}</div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-trigger-custom">
                  درباره ما
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col w-[400px] gap-3 p-4">
                    {[
                      { href: "/about/team", icon: <Users className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-y-[-1px]" />, label: "تیم ما", color: "bg-blue-500" },
                      { href: "/about/contact", icon: <Mail className="h-6 w-6 text-white transition-all duration-300 group-hover:translate-y-[-1px]" />, label: "تماس با ما", color: "bg-purple-500" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="group flex flex-row items-center gap-4 select-none rounded-md bg-gradient-to-r from-muted/50 to-muted p-4 no-underline outline-none transition-all duration-300 hover:rounded-xl">
                          <div className={cn("h-10 w-10 shrink-0 rounded-md flex items-center justify-center transition-all duration-300 group-hover:rounded-xl", item.color)}>
                            {item.icon}
                          </div>
                          <div className="text-lg font-medium">{item.label}</div>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/basket" className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-200 group-hover:scale-100"></div>
            <div className="relative p-2.5 rounded-full bg-muted/30 hover:bg-muted/70 transition-colors">
              <ShoppingCart className="h-6 w-6 text-foreground transition-all duration-200 group-hover:scale-105" />
            </div>
          </Link>

          <Button
            variant="default"
            size="lg"
            className={cn(
              "min-w-32 relative rounded-md font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              authStatus === "loading" && "opacity-80"
            )}
            onClick={() => {
              if (authStatus === "authenticated") {
                router.push("/wallet");
              } else {
                // For both unauthenticated and error states, redirect to auth page
                router.push("/auth/entry");
              }
            }}
          >
            <span className="flex items-center gap-2">
              {authStatus === "loading" ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : authStatus === "authenticated" ? (
                <>
                  <Wallet className="h-5 w-5" />
                  <span>دارایی های من</span>
                </>
              ) : (
                <>
                  <User className="h-5 w-5" />
                  <span>ثبت نام/ورود</span>
                </>
              )}
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Header (below lg) */}
      <div className="flex lg:hidden items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <button className="relative group p-0 transition-transform focus:outline-none">
                <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-200 group-hover:scale-100"></div>
                <div className="relative p-2.5 rounded-full bg-muted/30 hover:bg-muted/70 transition-colors">
                  <Menu className="h-6 w-6 text-foreground transition-all duration-200 group-hover:scale-105" />
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto" dir="rtl">
            <SheetTitle className="my-4 text-xl font-bold"></SheetTitle>
              
              <div className="flex flex-col gap-6 pt-6">
                <Link
                  href="/"
                  className="px-2 py-2 text-lg font-medium hover:text-primary"
                >
                  صفحه اصلی
                </Link>

                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium mb-1">محصولات ما</h3>
                  <div className="border-s-2 ps-3 flex flex-col gap-2">
                    <Link
                      href="/products"
                      className="text-muted-foreground hover:text-primary"
                    >
                      همه محصولات
                    </Link>
                    <Link
                      href="/products/hot"
                      className="text-muted-foreground hover:text-primary"
                    >
                      محصولات پرطرفدار
                    </Link>
                    <Link
                      href="/products/onsale"
                      className="text-muted-foreground hover:text-primary"
                    >
                      تخفیف دار
                    </Link>
                    <Link
                      href="/products/latest"
                      className="text-muted-foreground hover:text-primary"
                    >
                      جدیدترین ها
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium mb-1">خدمات ما</h3>
                  <div className="border-s-2 ps-3 flex flex-col gap-2">
                    <Link
                      href="/services/buy"
                      className="text-muted-foreground hover:text-primary"
                    >
                      خرید آنلاین
                    </Link>
                    <Link
                      href="/services/sell"
                      className="text-muted-foreground hover:text-primary"
                    >
                      فروش طلا
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium mb-1">درباره ما</h3>
                  <div className="border-s-2 ps-3 flex flex-col gap-2">
                    <Link
                      href="/about/team"
                      className="text-muted-foreground hover:text-primary"
                    >
                      تیم ما
                    </Link>
                    <Link
                      href="/about/contact"
                      className="text-muted-foreground hover:text-primary"
                    >
                      تماس با ما
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {authStatus === "loading" ? (
            <div className="relative p-2.5 rounded-full bg-muted/30">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/70 border-t-transparent" />
            </div>
          ) : authStatus === "authenticated" ? (
            <Link href="/wallet" className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-200 group-hover:scale-100"></div>
              <div className="relative p-2.5 rounded-full bg-muted/30 hover:bg-muted/70 transition-colors">
                <Wallet className="h-6 w-6 text-foreground transition-all duration-200 group-hover:scale-105" />
              </div>
            </Link>
          ) : (
            <Link href="/auth/entry" className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-200 group-hover:scale-100"></div>
              <div className="relative p-2.5 rounded-full bg-muted/30 hover:bg-muted/70 transition-colors">
                <User className="h-6 w-6 text-foreground transition-all duration-200 group-hover:scale-105" />
              </div>
            </Link>
          )}

          <Link href="/basket" className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-primary hover:bg-primary/80 transition-colors flex-row-reverse">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
        <Logo />
      </div>

      {breadcrumbs.length > 0 && (
        <div className="px-4 lg:px-8 -mt-2 mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.href}>
                  <BreadcrumbItem>
                    {breadcrumb.isLast ? (
                      <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={breadcrumb.href}>
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
    </div>
  );
}
