import React from 'react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Logo data with local file paths
const logos = [
  {
    id: 'e-namad',
    tooltip: 'ای نماد',
    imageUrl: '/logos/e-namad.png',
    link: null
  },
  {
    id: 'kargoshaiee',
    tooltip: 'بانک کارگشایی',
    imageUrl: '/logos/kargoshaiee.png',
    link: null
  },
  {
    id: 'etehadiehTala',
    tooltip: 'اتحادیه طلا و جواهر استان تهران',
    imageUrl: '/logos/etehadieh-tala.png',
    link: null
  },
  {
    id: 'etehadiehKasbKar',
    tooltip: 'اتحادیه کسب و کارهای مجازی',
    imageUrl: '/logos/etehadieh-kasb-kar.png',
    link: null
  },
  {
    id: 'sazmanNezamSenfiLogo',
    tooltip: 'سازمان نظام صنفی رایانه ای کشور',
    imageUrl: '/logos/nezam-senfi-logo.png',
    link: null
  },
  {
    id: 'anjomanKarFarmaietala',
    tooltip: 'انجمن کارفرمایی طلا، جواهر و نقره استان تهران',
    imageUrl: '/logos/anjoman-karfarmaie.png',
    link: null
  },
  {
    id: 'samandehi',
    tooltip: 'ساماندهی',
    imageUrl: null,
    link: null
  },
  {
    id: 'ipmi',
    tooltip: null,
    link: null
  },
  {
    id: 'iso',
    tooltip: null,
    link: null
  },
  {
    id: 'anjomanTejaratElectronicIran',
    tooltip: 'انجمن تجارت الکترونیک ایران',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanModiriatKasbVaKarIran',
    tooltip: 'انجمن مدیریت کسب و کار ایران',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanModiriatFanavariKeshvar',
    tooltip: 'انجمن مدیریت فناوری کشور',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanBazarYabiIran',
    tooltip: 'انجمن علمی بازاریابی ایران',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanElmiParkHayeFanAvariVaSazmanNoAvari',
    // tooltip: 'انجمن علمی پارک های فن آوری و سازمان نوآوری ایران',
    tooltip: "متن پیشفرض",
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanMoshaverheIran',
    tooltip: 'انجمن مشاوره ایران',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanModiriatSanati',
    tooltip: 'انجمن مدیریت صنعتی',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanCumpoterIran',
    tooltip: 'انجمن کامپیوتر ایران',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanModiriatPoroject',
    tooltip: 'انجمن مدیریت پروژه ایران',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanModiriatIran',
    tooltip: 'انجمن مدیریت ایران',
    imageUrl: null,
    link: null
  },
  {
    id: 'anjomanMohandesMaliIran',
    tooltip: 'انجمن مهندسی مالی ایران',
    imageUrl: null ,
    link: null
  }
];

const LogoGrid = () => {
  return (
    <div className="mb-10">
      <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-6 pr-1">گواهی‌نامه‌ها و همکاران</h3>
      
      <TooltipProvider>
        <div className="w-full grid grid-cols-3 my-4 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 2xl:grid-cols-10">
          {logos.map((logo) => (
            <Tooltip key={logo.id}>
              <TooltipTrigger asChild>
                {logo.link ? (
                  <Link 
                    href={logo.link}
                    target="_blank"
                    className="bg-neutral-100 flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-neutral-200 rounded-[12px] h-[100px] lg:w-full"
                  >
                    {logo.imageUrl ? (
                      <div className="w-[65%] md:w-[60%] relative">
                        <img
                          src={logo.imageUrl}
                          alt={logo.tooltip || "Partner logo"}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-[65%] md:w-[60%] flex items-center justify-center bg-gray-100 rounded">
                        <div className="text-gray-400 text-xs text-center p-2">{logo.tooltip || "Partner"}</div>
                      </div>
                    )}
                  </Link>
                ) : (
                  <div 
                    className="bg-neutral-100 flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-neutral-200 rounded-[12px] h-[100px] lg:w-full"
                  >
                    {logo.imageUrl ? (
                      <div className="w-[65%] md:w-[60%] relative">
                        <img
                          src={logo.imageUrl}
                          alt={logo.tooltip || "Partner logo"}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-[65%] md:w-[60%] flex items-center justify-center bg-gray-100 rounded">
                        <div className="text-gray-400 text-xs text-center p-2">{logo.tooltip || "Partner"}</div>
                      </div>
                    )}
                  </div>
                )}
              </TooltipTrigger>
              {logo.tooltip && (
                <TooltipContent>
                  <p dir="rtl">{logo.tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default LogoGrid; 