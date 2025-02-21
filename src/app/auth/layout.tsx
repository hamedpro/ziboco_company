"use client";

import { authLayoutColors } from "@/lib/utils";
import HatchedBackground from "@/components/ui/hatched-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-row-reverse">
      <div
        className="flex-1 h-full"
        style={{
          backgroundColor: authLayoutColors[0],
		  maxWidth : "600px"
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-center">
            {/* <div
              className="flex flex-col items-center p-8"
              style={{ color: authLayoutColors[1] }}
              dir="rtl"
            >
              <h1 className="text-2xl" style={{ letterSpacing: "8px" }}>
                ZIBOKO
              </h1>
              <p className="text-sm" style={{}}>
                طلا / نقره / کالای لوکس
              </p>
            </div> */}
            <img src="/gold_and_white_ziboko.png" className="h-10 px-6 py-12" style={{boxSizing : "content-box"}} />
          </div>

          {children}

          <div className="flex flex-col gap-y-4 p-8" dir="rtl">
            <div className="flex items-center justify-center flex-col">
              <h1 className="" style={{ color: authLayoutColors[1] }}>
                وبسایت شرکت زیبوکو
              </h1>
            </div>
            <div
              className="flex items-center justify-center flex-col"
              dir="rtl"
            >
              <h1 style={{ color: authLayoutColors[3] }} className="">
                استفاده از محتوای این سامانه تنها برای «اهداف
              </h1>
              <h1 style={{ color: authLayoutColors[4] }} className="">
                غیرتجاری» با ذکر «منبع» مجاز است.
              </h1>
            </div>
            <div className="flex justify-center">
              <img src="/enamad.png" className="h-20" />
            </div>
          </div>
        </div>
      </div>
	  <HatchedBackground 
        className="flex-1 hidden md:block"
        backgroundColor="#0ea5e9"
        color="rgba(255,255,255,0.1)"
        size={15}
      />
    </div>
  );
}
