"use client";

import Link from "next/link";

export function ServicesWidget() {
  const services = [
    {
      href: "/services/buy",
      label: "خرید آنلاین طلا و نقره",
    },
    {
      href: "/services/sell",
      label: "فروش طلا و نقره",
    },
  ];

  return (
    <section className="flex flex-col gap-4 w-full px-6 md:flex-row lg:px-10 2xl:px-[170px] mt-20 text-neutral-950 font-semibold md:gap-7" dir="rtl">
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className="p-4 rounded-[10px] bg-neutral-100 flex items-center justify-between w-full"
        >
          <div className="flex gap-2 items-center">
            <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z" fill="currentColor"></path>
            </svg>
            {service.label}
          </div>
          <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path fill="currentColor" d="M15 20.67c-.19 0-.38-.07-.53-.22l-6.52-6.52a2.74 2.74 0 010-3.86l6.52-6.52c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-6.52 6.52c-.48.48-.48 1.26 0 1.74l6.52 6.52c.29.29.29.77 0 1.06-.15.14-.34.22-.53.22z"></path>
          </svg>
        </Link>
      ))}
    </section>
  );
} 