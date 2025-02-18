import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";

const vazirmatn = localFont({
  src: "../../public/Vazirmatn/Vazirmatn-VariableFont_wght.ttf",
  weight: "400", // Default weight for the variable font
  style: "normal",
});

export const metadata: Metadata = {
  title: "زیب و کو",
  description: "طلا نقره کالای لوکس",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={vazirmatn.className}>
      <body>
        <Layout>{children}</Layout>
        <div>
          <Toaster dir="rtl" className={vazirmatn.className} />
        </div>
      </body>
    </html>
  );
}
