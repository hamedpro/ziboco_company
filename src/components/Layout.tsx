"use client";
import TopHeader from "@/components/top-header";
import Navigation from "@/components/navigation";
import MainHeader from "@/components/main-header";
import PriceTicker from "@/components/price-ticker";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let pathname = usePathname();
  if (pathname.startsWith("/auth")) {
    return children;
  }
  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      {pathname === "/" && <TopHeader />}
      <MainHeader />
      <Navigation />
      <PriceTicker />
      {children}
    </div>
  );
}
